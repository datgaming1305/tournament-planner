# ZingSpeed Mobile - New Era Tournament Planner & Broadcast Portal 🏁

Cổng thông tin điều hành, tra cứu luật thi đấu, cơ sở dữ liệu Xe/Pet/Map, bảng xếp hạng Global Power Ranking (GPR) và hệ thống mô phỏng bốc thăm Swiss Stage cho các giải đấu Clan New Era (NES / NEA).

🌐 **Live Demo (GitHub Pages):**
- **Cổng Quản trị & Điều hành (BTC):** [https://datgaming1305.github.io/tournament-planner/](https://datgaming1305.github.io/tournament-planner/)
- **Cổng Tra cứu VĐV & Khán giả (Client Mode):** [https://datgaming1305.github.io/tournament-planner/?mode=client](https://datgaming1305.github.io/tournament-planner/?mode=client)
- **Sơ đồ Broadcast Swiss Stage (Livestream Overlay):** [https://datgaming1305.github.io/tournament-planner/swiss.html](https://datgaming1305.github.io/tournament-planner/swiss.html)

---

## 📌 Tính năng nổi bật

### 1. Phân quyền BTC & Client Mode
- **Client Mode (`?mode=client`):** Giao diện tinh gọn, khóa toàn bộ nút chỉnh sửa dữ liệu, ẩn các công cụ quản trị (Reset, Switch Mode, Edit Season). Thích hợp chia sẻ công khai cho tuyển thủ và khán giả theo dõi.
- **BTC Mode:** Cho phép chỉnh sửa cấu hình mùa giải, thêm/sửa/vô hiệu hóa Map và Xe, cập nhật điểm tân binh, điều phối kết quả thi đấu và bốc thăm.

### 2. Tổng quan & Lộ trình 13 ngày (Schedule)
- Lộ trình chuẩn hóa 13 ngày thi đấu (Qualifier, Swiss Stage, Playoffs).
- Hỗ trợ xuất kế hoạch ra file Markdown hoặc in ấn trực tiếp chuẩn A4/PDF (`@media print`).

### 3. Sổ tay Luật Ban/Pick & Thể thức thi đấu
- Quy định chi tiết thể thức Bo3, Bo5, Bo7, Bo9 (Playoffs 3-Round).
- Luật Ban/Pick xe và map, cơ chế Deuce ván 9 (chênh lệch 2 điểm hoặc chạm trần ván 15).
- Tích hợp công cụ Vòng quay Bản đồ Ngẫu nhiên (Random Map Wheel) lọc theo số sao (3★, 4★, 5★+) từ kho map kích hoạt.

### 4. Kho Xe, Pet & Map thi đấu
- **Kho Xe (46 xe A & S-Tier):** Sắp xếp linh hoạt theo mức độ phổ biến / lượt sử dụng (`Usage Count`) hoặc theo bảng chữ cái.
- **Kho Pet (67 Pet):** Danh sách đầy đủ kèm chỉ số và bộ lọc độ phổ biến.
- **Kho Map (44 Map):** Phân chia theo độ khó (3★, 4★, 5★+). Xem bảng thành tích Top 5 tuyển thủ giữ kỷ lục thời gian tốt nhất từng map. Hỗ trợ bật/tắt (Enable/Disable) map khỏi vòng bốc thăm.

### 5. New Era Global Ranking & Công cụ tính điểm GPR
- Bảng xếp hạng GPR 32 tuyển thủ (dữ liệu tích lũy từ mùa NEAC26).
- Hỗ trợ cơ chế trọng số Rolling Window (Pre-season 100% vs 50% khi giải đấu chính thức khởi tranh).
- **Khảo sát Tân Binh (Clan Gatekeeper):** Tính điểm khảo sát đầu vào theo chuẩn time-gap `m:ss:cc` tương thích định dạng web tính điểm giải đấu.

### 6. Mô phỏng giải đấu & Sơ đồ Swiss Stage
- Thuật toán bốc thăm Swiss 5 vòng chuẩn thể thức Buchholz / Không tái đấu (Rematch Backtracking).
- Bảng Broadcast Swiss riêng biệt (`swiss.html`) với hiệu ứng hiển thị giải đấu Esports, đồng bộ dữ liệu thời gian thực 2 chiều qua `localStorage` và `BroadcastChannel`.

---

## 🛠️ Cấu trúc thư mục

```text
tournament-planner/
├── index.html                  # Cổng thông tin chính (BTC & Client)
├── swiss.html                  # Sơ đồ Broadcast Swiss 5 vòng (OBS/Livestream)
├── css/
│   ├── theme.css               # Hệ thống giao diện Esports (White & Royal Blue)
│   └── swiss.css               # Styling bảng nhánh đấu Swiss Stage
├── js/
│   ├── tournament-data.js      # Dữ liệu chuẩn hóa Xe, Pet, Map, Lịch trình, GPR
│   ├── tournament-engine.js    # Thuật toán tính điểm, Swiss pairing, Deuce Bo9
│   └── views/
│       ├── OverviewView.js     # Tab 1: Tổng quan & Lộ trình
│       ├── RulesHandbookView.js# Tab 2: Sổ tay luật & Random map wheel
│       ├── GarageMapsView.js   # Tab 3: Kho Xe, Pet & Map (Top 5 thành tích)
│       ├── ScoringGprView.js   # Tab 4: Quy chuẩn điểm & Khảo sát tân binh
│       └── SimulatorView.js    # Tab 5: Mô phỏng Swiss & Nhánh Playoffs
└── list/                       # Tài liệu luật và dữ liệu gốc mùa NES27
```

---

## 🚀 Hướng dẫn cài đặt & Chạy cục bộ

Dự án được xây dựng hoàn toàn bằng **Vanilla JavaScript, HTML5 và CSS3**, không phụ thuộc vào framework nặng, có thể mở trực tiếp:

1. Clone repository về máy:
   ```bash
   git clone https://github.com/datgaming1305/tournament-planner.git
   cd tournament-planner
   ```

2. Chạy trực tiếp:
   - Nhấp đúp vào `index.html` để mở bằng trình duyệt bất kỳ (Chrome, Edge, Firefox).
   - Hoặc khởi tạo web server tĩnh:
     ```bash
     npx serve .
     # hoặc
     python -m http.server 8000
     ```

---

## 👥 Liên hệ & Bản quyền
- **Đơn vị tổ chức:** Ban Tổ Chức & Ban Trọng Tài Clan New Era (ZingSpeed Mobile).
- **Thiết kế & Phát triển:** Datgaming1305.
