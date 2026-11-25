// Tab 2: Luật Ban/Pick Xe & Map + Sổ Tay Tuyển Thủ
(function (global) {
  'use strict';

  function RulesHandbookView(props) {
    const html = htm.bind(React.createElement);
    const { useState } = React;
    const { seasonConfig } = props;
    const [activeSection, setActiveSection] = useState('all');

    const sections = [
      { id: 'all', label: 'Tất Cả Quy Định' },
      { id: 'car_map', label: 'Xe & Ban/Pick Map' },
      { id: 'stages', label: 'Luật Từng Giai Đoạn & Deuce' },
      { id: 'handbook', label: 'Sổ Tay & Xử Lý Sự Cố' }
    ];

    const show = function (id) {
      return activeSection === 'all' || activeSection === id;
    };

    return html`
      <div className="space-y-6">
        <!-- Sub-navigation -->
        <div className="ne-card p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">${seasonConfig.seasonCode}</span>
            <span className="font-chakra font-bold text-slate-900 text-sm sm:text-base uppercase">
              Điều Lệ, Luật Ban/Pick & Sổ Tay Tuyển Thủ
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs no-print">
            ${sections.map(function (s) {
              const active = activeSection === s.id;
              return html`
                <button
                  key=${s.id}
                  onClick=${function () { setActiveSection(s.id); }}
                  className=${'px-3 py-1.5 rounded-lg font-semibold border transition-all ' + (active ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50')}
                >
                  ${s.label}
                </button>
              `;
            })}
          </div>
        </div>

        <!-- SECTION 1: XE & BAN/PICK MAP -->
        ${show('car_map') && html`
          <div className="space-y-4">
            <div className="ne-card p-5 space-y-4">
              <h3 className="font-chakra font-bold text-lg text-blue-800 uppercase border-b border-blue-100 pb-2">
                I. Nguyên Tắc Sử Dụng Xe & Reset Kho Xe / Pool Map
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
                      <th className="p-2.5 font-bold">Thể Thức Giai Đoạn</th>
                      <th className="p-2.5 font-bold">Quy Định Sử Dụng Xe</th>
                      <th className="p-2.5 font-bold">Cơ Chế Reset Kho Xe & Pool Map</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900">Vòng Bảng 4 Người (Phase 1 - 9 Map)</td>
                      <td className="p-2.5 text-slate-700">Đua đủ <strong>9 xe khác nhau</strong> trên 9 map (Mỗi xe chỉ đua đúng 1 map).</td>
                      <td className="p-2.5 text-slate-600">Thi đấu đủ 9 map để tính tổng điểm tích lũy. Mỗi map chỉ xuất hiện 1 lần.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900">Trận Solo 1-Round (Bo7 Play-in & Swiss)</td>
                      <td className="p-2.5 text-slate-700"><strong>1 Xe đua 1 Map</strong> (Mỗi ván đổi xe khác nhau, chạm 4 ván thắng).</td>
                      <td className="p-2.5 text-slate-600">Không reset (thi đấu đến khi phân định thắng thua).</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900">Trận Solo 3-Round (Bo7 Swiss & Bo9 Playoff)</td>
                      <td className="p-2.5 text-slate-700"><strong>1 Xe tối đa 2 Map</strong> cho TOÀN BỘ trận đấu.</td>
                      <td className="p-2.5 text-slate-600">
                        <div>- <strong>Round 1 -> Round 2:</strong> KHÔNG RESET (phải dùng xe/map chưa đua ở R1).</div>
                        <div>- <strong>Round 2 -> Round 3:</strong> RESET TOÀN BỘ kho xe và pool map (được dùng lại xe/map đã đua ở R1 & R2).</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="ne-card p-5 space-y-2.5">
                <h4 className="font-chakra font-bold text-base text-blue-700 uppercase">
                  II. Quy Trình Ban/Pick Map Solo - Round 1
                </h4>
                <ol className="space-y-2 text-xs text-slate-700 list-decimal pl-4">
                  <li><strong>Bước 1 (Map 1 - Mở màn):</strong> Do BTC chỉ định chọn ngẫu nhiên.</li>
                  <li><strong>Bước 2 (Map 2 - King Map 1):</strong> Tuyển thủ về Top 1 ở Map 1 được quyền chọn King Map của mình.</li>
                  <li><strong>Bước 3 (Map 3 - King Map 2):</strong> Tuyển thủ về Top 2 (thua) ở Map 1 được quyền chọn King Map của mình.</li>
                  <li><strong>Bước 4 (Ban Map):</strong> Mỗi tuyển thủ tiến hành Ban 2 Map trong pool map giải đấu.</li>
                  <li><strong>Bước 5 (Từ Map 4 trở đi):</strong> Tuyển thủ đang bị dẫn trước về điểm số nhận lượt pick map ván tiếp theo. Tuyển thủ vừa bị đối phương gỡ hòa (VD: 2-1 thành 2-2, 3-2 thành 3-3) nhận lượt pick để lấy lại thế trận.</li>
                </ol>
              </div>

              <div className="ne-card p-5 space-y-2.5">
                <h4 className="font-chakra font-bold text-base text-blue-700 uppercase">
                  III. Ban/Pick Linh Hoạt - Round 2 & Round 3 (3-Round)
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li>- <strong>Cơ chế Ban linh hoạt:</strong> Khi kết thúc mỗi Round, tuyển thủ <strong>ĐƯỢC QUYỀN THAY ĐỔI 2 map Ban</strong> của mình (không bị chốt cứng 2 map Ban từ Round 1).</li>
                  <li>- <strong>Map 1 Round mới:</strong> Tuyển thủ <strong>THUA ở Round trước</strong> được ưu tiên chọn Map 1 mở màn cho Round tiếp theo.</li>
                  <li>- <strong>King Map Round mới (Map 2 & 3):</strong> Tuyển thủ Top 1 ở Map 1 (Round mới) chọn King Map trước, Top 2 chọn sau.</li>
                  <li>- <strong>Giới hạn pick map ở Round 2:</strong> Không được pick lại các map đã đua ở Round 1.</li>
                </ul>
              </div>
            </div>
          </div>
        `}

        <!-- SECTION 2: LUẬT TỪNG GIAI ĐOẠN & DEUCE -->
        ${show('stages') && html`
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="ne-card p-5 space-y-3">
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                Vòng Bảng 4 Người (Qualifier Phase 1 - 9 Map)
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li>- <strong>Thứ tự chọn Map:</strong> Map 1 (BTC ngẫu nhiên) -> Map 2-5 (King Map theo thứ tự Top 1 -> Top 4 tại Map 1) -> Map 6-9 (Tuyển thủ đang xếp Top 2 tổng điểm tính đến trước ván đó chọn; <strong>Map 8 & 9 bắt buộc từ 5★ trở lên</strong>).</li>
                <li>- <strong>Tính điểm từng map:</strong> Top 1 nhận 11đ (+1đ nếu là King Map của mình = 12đ). Top 2-4 trừ theo khoảng cách giây so với Top 1 (0.00-0.99s trừ 1đ -> 10đ; 1.00-1.99s trừ 2đ -> 9đ...). DNF nhận 0đ.</li>
                <li>- <strong>Xử lý bằng điểm:</strong> Ưu tiên Số lần Top 1 -> Số lần Top 2 -> Đấu 1 ván Tiebreak trên map ngẫu nhiên BTC chỉ định.</li>
              </ul>
            </div>

            <div className="ne-card-blue p-5 space-y-3">
              <h3 className="font-chakra font-bold text-base text-blue-900 uppercase border-b border-blue-200 pb-2">
                Cơ Chế Deuce Đặc Biệt Tại Playoff (Ván 9 - Round 3)
              </h3>
              <p className="text-xs text-slate-600">
                Lưu ý: <strong>KHÔNG áp dụng Deuce ở giai đoạn Swiss Stage</strong> (chạm 4 ván thắng Round). Deuce chỉ kích hoạt ở <strong>Round 3 Playoff Bo9</strong>:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-800">
                <li>- <strong>Chạm 5 thắng chuẩn:</strong> Nếu một bên chạm 5 điểm trước khi hòa 4-4 thì thắng ngay Round 3.</li>
                <li>- <strong>Kích hoạt Deuce khi hòa 4-4:</strong></li>
                <li className="pl-3">+ <strong>Reset Pool Map 5★+:</strong> BTC reset lại toàn bộ danh sách Map từ 5 sao trở lên (loại trừ các map 5★ đã bị Ban trước đó nếu có). <strong>KHÔNG reset kho xe</strong>.</li>
                <li className="pl-3">+ <strong>Map 9 ngẫu nhiên:</strong> BTC Roll ngẫu nhiên Map thứ 9 từ pool 5★+ vừa reset.</li>
                <li className="pl-3">+ <strong>Thắng cách 2 điểm:</strong> Phải dẫn cách biệt 2 điểm mới thắng Round (VD: 6-4, 7-5).</li>
                <li className="pl-3">+ <strong>Trần sinh tử 8-7:</strong> Nếu hòa 7-7, ai ghi điểm thứ 8 trước sẽ thắng chung cuộc ngay lập tức.</li>
              </ul>
            </div>
          </div>
        `}

        <!-- SECTION 3: SỔ TAY TUYỂN THỦ & XỬ LÝ SỰ CỐ -->
        ${show('handbook') && html`
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="ne-card p-5 space-y-2.5">
                <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                  Checklist Trước Giờ Thi Đấu & Check-in
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li>- <strong>Trước 30 phút:</strong> Tải 100% tài nguyên (Map 3★-7★, Xe, Pet trong danh mục), sạc đầy pin, tắt app chạy ngầm, Ping khuyến nghị &lt; 60ms.</li>
                  <li>- <strong>Trước 10 phút:</strong> Có mặt tại box chat Messenger <strong>${seasonConfig.grandHallChannel}</strong> hoặc phòng ingame để Trọng tài điểm danh.</li>
                  <li>- <strong>Trễ quá 05 phút:</strong> Cảnh cáo lần 1, mất quyền chọn King Map (nếu có).</li>
                  <li>- <strong>Trễ quá 10 phút:</strong> Xử thua mặc định (0-4 ở Bo7 hoặc 0-5 ở Bo9).</li>
                </ul>
              </div>

              <div className="ne-card p-5 space-y-2.5">
                <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                  Cú Pháp Khai Báo & Sẵn Sàng Trong Phòng
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px]">
                    <div><strong>Khai báo King Map:</strong> [Tên] - King map: [Tên Map]</div>
                    <div className="text-slate-500">VD: Chin - King map: Núi Mùa Thu</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px]">
                    <div><strong>Khai báo Ban Map:</strong> [Tên] - Ban: [Map 1], [Map 2]</div>
                    <div className="text-slate-500">VD: Ruz - Ban: Tây Hồ, Thành Troy</div>
                  </div>
                  <p>- <strong>Xe & Pet:</strong> Không cần khai báo trước ván, Trọng tài tự kiểm tra trực tiếp trong phòng và dữ liệu trận.</p>
                  <p>- <strong>Xác nhận Ready:</strong> Gõ số <strong className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">1</strong> vào ô Chat phòng ingame. Đủ người gõ 1 sẽ bắt đầu ngay.</p>
                </div>
              </div>
            </div>

            <div className="ne-card p-5 space-y-2.5">
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                Quy Trình Xử Lý Sự Cố & Khiếu Nại (Thời Hạn 15 Phút)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <div className="font-bold text-blue-900 mb-1">1. Văng Game / Mất Kết Nối</div>
                  <p>- <strong>Trước khi đếm ngược (3-2-1):</strong> Remake phòng 01 lần duy nhất.</p>
                  <p>- <strong>Sau khi xuất phát (đã bấm Nitro):</strong> Thi đấu tiếp bình thường, tính kết quả máy chủ (gặp sự cố tính DNF / 0đ, không đua lại).</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <div className="font-bold text-blue-900 mb-1">2. Vi Phạm Xe & Map</div>
                  <p>- <strong>Chọn sai Map:</strong> Dừng phòng và chọn lại ngay lập tức.</p>
                  <p>- <strong>Chọn sai Xe:</strong> Nhắc nhở & làm lại 01 lần nếu phát hiện trước xuất phát. Cố tình đua tiếp hoặc hoàn thành ván bị xử thua ván đó (0đ).</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                  <div className="font-bold text-blue-900 mb-1">3. Fair-Play & Khiếu Nại</div>
                  <p>- Cấm hack, mod, thi đấu hộ, nhường điểm.</p>
                  <p>- Khiếu nại tối đa trong <strong>15 phút</strong> sau trận kèm clip/ảnh bằng chứng. Quyết định của Ban Trọng Tài là cuối cùng.</p>
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  global.CLAN_VIEWS = global.CLAN_VIEWS || {};
  global.CLAN_VIEWS.RulesHandbookView = RulesHandbookView;
})(window);
