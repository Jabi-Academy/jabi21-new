/*
  CẤU HÌNH NHANH
  1) Thay link nhóm Zalo bên dưới.
  2) Nếu dùng Google Apps Script để ghi dữ liệu vào Google Sheet,
     dán Web App URL vào FORM_ENDPOINT.
  3) Thay số hotline nếu cần.
*/
const CONFIG = {
  ZALO_GROUP_URL: "https://zalo.me/g/w37hrcla55mordeumcpl",
  FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycbysQ6D0rv6URamofwHpR4TAr9nHz-eRBBUdTmmzQ21BbdAXnFeBgvz3l7bEGcZyoyIi/exec",
  SUPPORT_PHONE: "THAY_SO_HOTLINE"
};

document.addEventListener("DOMContentLoaded", () => {
  const zaloButton = document.getElementById("zaloButton");
  if (zaloButton) zaloButton.href = CONFIG.ZALO_GROUP_URL;

  const form = document.getElementById("signupForm");
  const message = document.getElementById("formMessage");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "ĐANG XỬ LÝ...";

    const formData = new FormData(form);
    formData.append("source", "JABI21 Landing Page");
    formData.append("registered_at", new Date().toISOString());

    try {
      if (CONFIG.FORM_ENDPOINT) {
        await fetch(CONFIG.FORM_ENDPOINT, {
          method: "POST",
          body: formData,
          mode: "no-cors"
        });
      } else {
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem("jabi21_registration", JSON.stringify(data));
      }

      window.location.href = "thank-you.html";
    } catch (error) {
      message.textContent = "Chưa thể gửi thông tin. Vui lòng thử lại hoặc liên hệ JABI ACADEMY.";
      message.style.color = "#d8452b";
      submitBtn.disabled = false;
      submitBtn.textContent = "ĐĂNG KÝ JABI 21 – 199.000 ĐỒNG";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
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

  if (checkbox && zaloButton) {
    zaloButton.href = CONFIG.ZALO_GROUP_URL;

    const updateState = () => {
      if (checkbox.checked) {
        zaloButton.classList.remove("disabled-link");
        zaloButton.setAttribute("aria-disabled", "false");
      } else {
        zaloButton.classList.add("disabled-link");
        zaloButton.setAttribute("aria-disabled", "true");
      }
    };

    checkbox.addEventListener("change", updateState);
    zaloButton.addEventListener("click", (event) => {
      if (!checkbox.checked) {
        event.preventDefault();
        alert("Vui lòng xác nhận bạn đã chuyển khoản trước khi vào nhóm Zalo.");
      }
    });
    updateState();
  }
});
