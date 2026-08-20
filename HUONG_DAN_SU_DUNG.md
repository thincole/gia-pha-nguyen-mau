# HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH GIA PHẢ DÒNG HỌ NGUYỄN MẬU (NGÀNH 4)
**Hệ thống Gia phả Điện tử Dòng họ Nguyễn Mậu - Thôn Thượng Đền, Cổ Lễ, Trực Ninh, Nam Định**

---

## I. TỔNG QUAN HỆ THỐNG

Hệ thống được phát triển dựa trên mã nguồn mở **GiaPha-OS** (`https://github.com/homielab/giapha-os`), được tùy biến hoàn chỉnh cho **Dòng họ Nguyễn Mậu (Ngành 4) tại Thôn Thượng Đền, Thị trấn Cổ Lễ, Huyện Trực Ninh, Tỉnh Nam Định**.

### Các tệp dữ liệu có sẵn trong dự án:
1. `docs/schema.sql`: Cấu trúc bảng CSDL, bảo mật phân quyền Row Level Security (RLS), hàm phân quyền Admin/Editor/Member, Trigger tự động.
2. `docs/seed_nguyen_mau_nganh4.sql`: Tệp SQL chứa toàn bộ 48 thành viên và 76 quan hệ phả hệ của Dòng họ Nguyễn Mậu Ngành 4 (từ Đời 1 đến Đời 5).
3. `data/gia_pha_nguyen_mau_nganh4.json`: Tệp sao lưu JSON chuẩn v3, dùng để nạp dữ liệu trực tiếp trong trang quản trị web.
4. `data/gia_pha_nguyen_mau_nganh4.ged`: Tệp GEDCOM 7.0 chuẩn quốc tế, tương thích với MyHeritage, Gramps, Family Tree Maker.
5. `GIA_PHA_NGUYEN_MAU_NGANH_4.md`: Tài liệu Phả ký, tộc ước, danh sách kỵ nhật (ngày giỗ Âm lịch) và sơ đồ thế thứ.

---

## II. BƯỚC 1: KHỞI TẠO DATABASE SUPABASE (MIỄN PHÍ)

1. Truy cập [https://supabase.com](https://supabase.com) và đăng nhập (khuyên dùng tài khoản GitHub hoặc Google).
2. Nhấn nút **New Project**.
   - **Name**: `Gia Pha Nguyen Mau Nganh 4`
   - **Database Password**: Đặt mật khẩu an toàn và lưu lại.
   - **Region**: Chọn `Singapore (ap-southeast-1)` để tốc độ truy cập từ Việt Nam nhanh nhất.
   - **Pricing Plan**: Chọn **Free Plan**.
3. Chờ khoảng 1 - 2 phút để Supabase khởi tạo máy chủ CSDL.
4. Lấy thông tin kết nối API:
   - Vào **Project Settings** (biểu tượng bánh răng góc dưới bên trái) $\rightarrow$ **API**.
   - Lưu lại 2 giá trị:
     - **Project URL** (ví dụ: `https://uwlluncglayxwumfgqbj.supabase.co/rest/v1/`)
     - **Project API Keys** $\rightarrow$ khóa `anon` / `public` (ví dụ: `sb_publishable_JmQAeQDs9cu4k6kbHuva4Q_aBjn_PXF`).

---

## III. BƯỚC 2: NẠP CẤU TRÚC VÀ DỮ LIỆU VÀO SUPABASE

1. Tại giao diện Supabase của bạn, nhấp vào mục **SQL Editor** ở thanh menu bên trái.
2. Nhấn **New Query**:
   - Mở tệp `docs/schema.sql` trong dự án, copy toàn bộ nội dung và dán vào SQL Editor.
   - Nhấn **Run** (hoặc tổ hợp phím `Ctrl + Enter`). Chờ thông báo `Success. No rows returned`.
3. Nhấn tiếp **New Query** lần thứ 2:
   - Mở tệp `docs/seed_nguyen_mau_nganh4.sql` trong dự án, copy toàn bộ nội dung và dán vào SQL Editor.
   - Nhấn **Run**.
   - Sau khi chạy xong, toàn bộ dữ liệu 5 đời của Dòng họ Nguyễn Mậu Ngành 4 đã được nạp thành công vào CSDL.

---

## IV. BƯỚC 3: CHẠY DỰ ÁN TRÊN MÁY TÍNH CÁ NHÂN (LOCAL)

### Yêu cầu:
- Máy tính đã cài đặt **Node.js** (phiên bản 18+ trở lên) hoặc **Bun**.

### Các bước thực hiện:
1. Mở Terminal (PowerShell hoặc Command Prompt) tại thư mục `e:\0 - Gia pha Nguyen Mau`.
2. Tạo file `.env.local` bằng cách copy từ `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
3. Mở file `.env.local` và điền thông tin Supabase của bạn:
   ```env
   SITE_NAME="Gia Phả Họ Nguyễn Mậu (Ngành 4)"
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-anon-key"
   ```
4. Cài đặt các thư viện:
   ```bash
   bun install
   # hoặc dùng npm nếu chưa cài bun:
   npm install
   ```
5. Khởi chạy ứng dụng ở chế độ phát triển:
   ```bash
   bun run dev
   # hoặc:
   npm run dev
   ```
6. Mở trình duyệt truy cập: `http://localhost:3000`.

---

## V. BƯỚC 4: TRIỂN KHAI MIỄN PHÍ LÊN VERCEL (ONLINE CLOUD)

Để toàn thể con cháu họ Nguyễn Mậu ở khắp nơi (Hà Nội, Nam Định, TP.HCM,...) có thể truy cập qua điện thoại di động:

1. Đẩy mã nguồn dự án lên GitHub của bạn:
   ```bash
   git add .
   git commit -m "Khoi tao Gia Pha Ho Nguyen Mau Nganh 4"
   git remote add origin https://github.com/thincole/gia-pha-nguyen-mau.git
   git push -u origin main
   ```
2. Đăng nhập [https://vercel.com](https://vercel.com) (bằng tài khoản GitHub).
3. Nhấn **Add New...** $\rightarrow$ **Project** $\rightarrow$ Chọn repository `gia-pha-nguyen-mau`.
4. Trong phần **Environment Variables**, cấu hình 3 biến:
   - `SITE_NAME`: `Gia Phả Họ Nguyễn Mậu (Ngành 4)`
   - `NEXT_PUBLIC_SUPABASE_URL`: `<Project URL từ Supabase>`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`: `<Anon Key từ Supabase>`
5. Nhấn **Deploy**.
6. Sau khoảng 2 phút, bạn sẽ nhận được đường dẫn website trực tuyến dạng `https://gia-pha-nguyen-mau.vercel.app` để gửi cho bà con dòng tộc cùng xem.

> **Cấu hình Redirect URL trong Supabase (Quan trọng để tránh lỗi đăng ký):**  
> Vào **Supabase Dashboard** $\rightarrow$ **Authentication** $\rightarrow$ **URL Configuration**:  
> - **Site URL**: Điền `https://gia-pha-nguyen-mau.vercel.app` (hoặc domain của bạn).  
> - **Redirect URLs**: Nhấn **Add URL** và thêm `https://gia-pha-nguyen-mau.vercel.app/**` và `http://localhost:3000/**`.

---

## VI. BƯỚC 5: TÀI KHOẢN QUẢN TRỊ & PHÂN QUYỀN

1. **Tài khoản Admin đầu tiên**:
   - Khi truy cập website lần đầu, bạn vào trang **Đăng nhập** $\rightarrow$ chuyển sang tab **Đăng ký**.
   - Tạo tài khoản với Email và Mật khẩu của bạn.
   - **Hệ thống tự động cấp quyền Admin cao nhất cho tài khoản đăng ký đầu tiên**.
2. **Cấp quyền cho người biên soạn (Editor) & Thành viên (Member)**:
   - Khi các bác, các anh chị em khác đăng ký tài khoản, tài khoản sẽ mặc định ở vai trò `member` (chỉ xem sơ đồ, tìm danh xưng, xem lịch giỗ).
   - Admin vào trang **Quản lý người dùng** (`/dashboard/users`) để:
     - Duyệt trạng thái kích hoạt (`Kích hoạt`).
     - Đổi vai trò thành `Editor` (có quyền thêm mới thành viên, sửa thông tin sinh mất, cập nhật phả hệ) hoặc giữ quyền `Member`.

---

## VII. BƯỚC 6: SỬ DỤNG CÁC TÍNH NĂNG CHÍNH CỦA HỆ THỐNG

### 1. Xem Sơ đồ Phả hệ & Mindmap
- Vào mục **Sơ đồ phả hệ** (`/dashboard`):
  - Xem dạng **Cây phả hệ (Tree View)**: Hiển thị các thế hệ từ Cụ Tổ đến các cháu đời 5.
  - Xem dạng **Sơ đồ tư duy (Bubble Map)**: Phóng to, thu nhỏ, kéo thả trực quan.
  - Bấm vào bất kỳ thành viên nào để xem chi tiết thông tin, tiểu sử, ngày kỵ nhật và mối quan hệ gia đình.

### 2. Tra cứu Danh xưng (Kinship Finder)
- Vào mục **Tìm danh xưng** (`/dashboard/kinship`):
  - Chọn **Người thứ nhất** (ví dụ: Cháu Đăng Khoa - Đời 5).
  - Chọn **Người thứ hai** (ví dụ: Bác sĩ Nguyễn Mậu Minh - Đời 4).
  - Hệ thống tự động tính toán mối quan hệ theo đúng quy chuẩn xưng hô của người Việt: *"Bác họ"* / *"Cháu họ"*.

### 3. Lịch Sự Kiện & Kỵ Nhật (Ngày Giỗ Âm Lịch)
- Vào mục **Sự kiện & Ngày giỗ** (`/dashboard/events`):
  - Hệ thống tự động đồng bộ ngày mất của các cụ và chuyển đổi sang lịch Âm - Dương.
  - Tự động đếm ngược số ngày còn lại đến ngày kỵ nhật gần nhất trong năm.

### 4. Sao lưu & Phục hồi Dữ liệu
- Vào mục **Quản lý dữ liệu** (`/dashboard/data`):
  - **Xuất JSON / CSV / GEDCOM**: Tải bản sao lưu toàn bộ hoặc theo từng nhánh gia đình về máy tính.
  - **Phục hồi dữ liệu**: Chọn file `data/gia_pha_nguyen_mau_nganh4.json` hoặc file `.ged` để khôi phục lại khi cần.

---

## VIII. LIÊN HỆ & HỖ TRỢ DÒNG HỌ
- **Ban Liên lạc Dòng họ**: Nguyễn Mậu Ngành 4 - Thôn Thượng Đền, TT. Cổ Lễ, Huyện Trực Ninh, Tỉnh Nam Định.
- **Trưởng ban liên lạc**: Ông Nguyễn Mậu Tuấn (Đời 4).
- **Phụ trách kỹ thuật & số hóa**: Kỹ sư Nguyễn Mậu Tùng (Đời 4).
