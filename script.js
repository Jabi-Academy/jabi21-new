/*
  JABI21 LANDING PAGE
  - Gửi form về Google Apps Script
  - Lưu dữ liệu tạm trên trình duyệt
  - Trang thanh toán xác nhận "đã chuyển khoản"
*/
const CONFIG = {
  ZALO_GROUP_URL: "https://zalo.me/g/w37hrcla55mordeumcpl",
  FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycbzUJjbeoU8738pVM_ZAOv3sPg2yP3ARB2yAFm3ug-T6ddV0Z0VIfGgXphm-hN1iU5-x/exec",
  SUPPORT_PHONE: "05082006"
};

async function postToJabiEndpoint(data) {
  if (!CONFIG.FORM_ENDPOINT) return;

  const payload = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    payload.append(key, String(value ?? ""));
  });

  await fetch(CONFIG.FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: payload.toString(),
    mode: "no-cors"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "ĐANG XỬ LÝ...";

      const data = Object.fromEntries(new FormData(form).entries());
      data.action = "register";
      data.source = "JABI21 Landing Page";
      data.registered_at = new Date().toISOString();
      data.payment_status = "Đăng ký mới";

      try {
        localStorage.setItem("jabi21_registration", JSON.stringify(data));
        await postToJabiEndpoint(data);
        window.location.href = "./thank-you.html";
      } catch (error) {
        if (message) {
          message.textContent = "Chưa thể gửi thông tin. Vui lòng thử lại hoặc liên hệ JABI ACADEMY.";
          message.style.color = "#d8452b";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "ĐĂNG KÝ JABI 21 – 199.000 ĐỒNG";
      }
    });
  }

  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(text);
        const oldText = button.textContent;
        button.textContent = "Đã sao chép";
        setTimeout(() => button.textContent = oldText, 1500);
      } catch (error) {
        alert("Vui lòng sao chép thủ công: " + text);
      }
    });
  });

  const checkbox = document.getElementById("paymentConfirmed");
  const zaloButton = document.getElementById("zaloButton");

  if (zaloButton) zaloButton.href = CONFIG.ZALO_GROUP_URL;

  if (checkbox && zaloButton) {
    const updateState = () => {
      if (checkbox.checked) {
        zaloButton.classList.remove("disabled-link");
        zaloButton.setAttribute("aria-disabled", "false");
      } else {
        zaloButton.classList.add("disabled-link");
        zaloButton.setAttribute("aria-disabled", "true");
      }
    };

    checkbox.addEventListener("change", async () => {
      updateState();

      if (checkbox.checked) {
        try {
          const saved = JSON.parse(localStorage.getItem("jabi21_registration") || "{}");
          await postToJabiEndpoint({
            action: "payment_self_confirmed",
            email: saved.email || "",
            phone: saved.phone || "",
            name: saved.name || "",
            payment_status: "Người đăng ký xác nhận đã chuyển khoản",
            payment_confirmed_at: new Date().toISOString()
          });
        } catch (error) {
          console.warn("Không thể cập nhật xác nhận chuyển khoản:", error);
        }
      }
    });

    zaloButton.addEventListener("click", (event) => {
      if (!checkbox.checked) {
        event.preventDefault();
        alert("Vui lòng xác nhận bạn đã chuyển khoản trước khi vào nhóm Zalo.");
      }
    });

    updateState();
  }
});
