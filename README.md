# BỘ LANDING PAGE JABI 21

Bộ trang gồm:
- `index.html`: Landing page tuyển sinh.
- `thank-you.html`: Trang chúc mừng và kéo người đăng ký vào nhóm Zalo.
- `styles.css`: Giao diện responsive cho máy tính và điện thoại.
- `script.js`: Cấu hình link Zalo, Google Sheet và chuyển trang.
- `assets/co-bich.jpg`: Vị trí đặt ảnh chân dung cô Phạm Thị Ngọc Bích.

## 1. Thêm ảnh cô Bích
Đổi tên ảnh chân dung thành:

`co-bich.jpg`

Sau đó đặt vào thư mục:

`assets/`

Nên dùng ảnh dọc, tỷ lệ khoảng 4:5, khuôn mặt rõ, nền sáng.

## 2. Thay link nhóm Zalo
Mở file `script.js` và thay:

`https://zalo.me/g/THAY_LINK_NHOM_ZALO`

bằng link nhóm Zalo thật.

## 3. Kết nối form với Google Sheet
Tạo Google Apps Script Web App nhận dữ liệu từ form, sau đó dán URL vào:

`FORM_ENDPOINT: ""`

Ví dụ:

`FORM_ENDPOINT: "https://script.google.com/macros/s/xxxxxxxx/exec"`

Khi chưa cấu hình, form vẫn chạy thử bằng cách lưu dữ liệu tạm trên trình duyệt và chuyển sang trang cảm ơn.

## 4. Đăng website
Có thể tải toàn bộ thư mục lên:
- Hosting/cPanel
- GitHub Pages
- Netlify
- Vercel

Trang chính là `index.html`.

## 5. Các nội dung cần thay trước khi chạy quảng cáo
- Ảnh thật cô Phạm Thị Ngọc Bích.
- Link nhóm Zalo.
- Hotline hỗ trợ.
- Ngày bắt đầu chương trình nếu muốn hiển thị.
- Link thanh toán hoặc quy trình xác nhận thanh toán.
- Feedback học viên thật nếu bổ sung sau này.

## Lưu ý
Mức thu chính thức đang được đặt là **199.000 đồng/học viên**.


## Cấu hình đã cập nhật trong phiên bản này
- Ảnh cô Phạm Thị Ngọc Bích: `assets/co-bich.jpg`
- Nhóm Zalo: `https://zalo.me/g/w37hrcla55mordeumcpl`
- Google Apps Script URL đang đặt:
  `https://script.google.com/macros/s/AKfycbysQ6D0rv6URamofwHpR4TAr9nHz-eRBBUdTmmzQ21BbdAXnFeBgvz3l7bEGcZyoyIi/exec`

### Trạng thái
Đường dẫn Google Apps Script đã được cập nhật bằng URL Web App đầy đủ do bạn cung cấp.


## Thông tin thanh toán đã bổ sung
- Ngân hàng: Techcombank
- Số tài khoản: 05082006
- Chủ tài khoản: VND-TGTT-TT TV TAM LI-GIAO DUC TRE EM
- Số tiền: 199.000 đồng
- Nội dung chuyển khoản: JABI21 - HỌ TÊN - SĐT
- QR chuyển khoản: assets/qr-techcombank-cpec.jpg

Flow mới:
Đăng ký → Thanh toán → Xác nhận đã chuyển khoản → Vào nhóm Zalo.
