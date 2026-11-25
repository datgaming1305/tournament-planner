// Tab 1: Tổng quan, Cấu hình Mùa giải đa mùa & Lộ trình 13 ngày
(function (global) {
  'use strict';

  function OverviewView(props) {
    const html = htm.bind(React.createElement);
    const { useState } = React;
    const {
      isBtc,
      seasonConfig,
      onUpdateSeason,
      cars,
      pets,
      maps,
      schedule13Days,
      onExportJson,
      onImportJson,
      onResetDefaults
    } = props;

    const [phaseFilter, setPhaseFilter] = useState('all');
    const [isEditingSeason, setIsEditingSeason] = useState(false);
    const [draft, setDraft] = useState(seasonConfig);
    const [copiedMd, setCopiedMd] = useState(false);

    const activeCarsCount = cars.filter(function (c) { return c.active; }).length;
    const activePetsCount = (pets || []).filter(function (p) { return p.active; }).length;
    const activeMapsCount = maps.filter(function (m) { return m.active; }).length;

    const filteredDays = schedule13Days.filter(function (d) {
      return phaseFilter === 'all' || d.phase === phaseFilter;
    });

    function saveSeason(e) {
      e.preventDefault();
      onUpdateSeason(draft);
      setIsEditingSeason(false);
    }

    function copyScheduleMarkdown() {
      const lines = [
        '# KẾ HOẠCH & LỘ TRÌNH GIẢI ĐẤU ' + seasonConfig.seasonName + ' (' + seasonConfig.seasonCode + ')',
        '- Slogan: ' + seasonConfig.slogan,
        '- Đơn vị tổ chức: ' + seasonConfig.organizer,
        '- Quy mô: ' + seasonConfig.playerCount + ' Tuyển thủ | Thời lượng: ' + seasonConfig.totalDays + ' ngày',
        '- Kho tài nguyên Active: ' + activeCarsCount + ' Xe | ' + activePetsCount + ' Pet | ' + activeMapsCount + ' Map (3★ - 7★)',
        '',
        '## LỘ TRÌNH 13 NGÀY THI ĐẤU',
        schedule13Days.map(function (d) {
          return '- **Ngày ' + d.day + '** (' + d.phaseLabel + '): ' + d.title + ' - *' + d.format + '*';
        }).join('\n')
      ].join('\n');

      navigator.clipboard.writeText(lines).then(function () {
        setCopiedMd(true);
        setTimeout(function () { setCopiedMd(false); }, 2500);
      });
    }

    function handleFileChange(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      onImportJson(file);
      e.target.value = '';
    }

    return html`
      <div className="space-y-6">
        <!-- Hero Banner White-Blue -->
        <div className="ne-card-blue p-6 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl ne-badge-logo flex items-center justify-center p-2 shrink-0">
                <img src="logo_trang.png" alt="Clan New Era Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white tracking-wider uppercase">
                    ${seasonConfig.seasonCode}
                  </span>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    ${seasonConfig.organizer}
                  </span>
                </div>
                <h2 className="font-chakra font-bold text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                  ${seasonConfig.seasonName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  <span className="font-bold text-blue-700">${seasonConfig.slogan}</span> - ${seasonConfig.dateRange}
                </p>
              </div>
            </div>

            ${isBtc && html`
              <div className="flex flex-wrap items-center gap-2 no-print">
                <button
                  onClick=${function () { setDraft(seasonConfig); setIsEditingSeason(!isEditingSeason); }}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold transition-all shadow-sm"
                >
                  ${isEditingSeason ? 'Đóng Sửa Mùa Giải' : 'Chỉnh Sửa Mùa Giải'}
                </button>
                <button
                  onClick=${copyScheduleMarkdown}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  ${copiedMd ? 'Đã Copy Markdown!' : 'Copy Kế Hoạch (Markdown)'}
                </button>
              </div>
            `}
          </div>

          <!-- Form chỉnh sửa thông tin Mùa giải (Chỉ hiển thị ở chế độ BTC) -->
          ${isBtc && isEditingSeason && html`
            <form onSubmit=${saveSeason} className="mt-5 pt-5 border-t border-blue-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mã Mùa Giải (VD: NES27, NEA27)</label>
                <input
                  type="text"
                  value=${draft.seasonCode}
                  onInput=${function (e) { setDraft(Object.assign({}, draft, { seasonCode: e.target.value })); }}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên Giải Đấu</label>
                <input
                  type="text"
                  value=${draft.seasonName}
                  onInput=${function (e) { setDraft(Object.assign({}, draft, { seasonName: e.target.value })); }}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Slogan</label>
                <input
                  type="text"
                  value=${draft.slogan}
                  onInput=${function (e) { setDraft(Object.assign({}, draft, { slogan: e.target.value })); }}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Thời Gian Diễn Ra</label>
                <input
                  type="text"
                  value=${draft.dateRange}
                  onInput=${function (e) { setDraft(Object.assign({}, draft, { dateRange: e.target.value })); }}
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-2 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick=${onExportJson} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-300">
                    Xuất Cấu Hình JSON
                  </button>
                  <label className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-300 cursor-pointer">
                    Nhập Cấu Hình JSON
                    <input type="file" accept=".json" onChange=${handleFileChange} className="hidden" />
                  </label>
                  <button type="button" onClick=${onResetDefaults} className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200">
                    Khôi Phục Mặc Định
                  </button>
                </div>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  Lưu Thông Tin Mùa Giải
                </button>
              </div>
            </form>
          `}
        </div>

        <!-- KPI Cards -->
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="ne-card p-4">
            <div className="text-[11px] font-bold uppercase text-slate-500">Quy Mô Giải Đấu</div>
            <div className="font-chakra font-bold text-2xl text-blue-700 mt-1">${seasonConfig.playerCount} Tuyển Thủ</div>
            <div className="text-xs text-slate-500 mt-0.5">8 Bảng -> 16 Swiss -> Top 8 Playoff</div>
          </div>
          <div className="ne-card p-4">
            <div className="text-[11px] font-bold uppercase text-slate-500">Tổng Thời Lượng</div>
            <div className="font-chakra font-bold text-2xl text-slate-900 mt-1">${seasonConfig.totalDays} Ngày</div>
            <div className="text-xs text-slate-500 mt-0.5">Liên tục qua 3 giai đoạn chính</div>
          </div>
          <div className="ne-card p-4">
            <div className="text-[11px] font-bold uppercase text-slate-500">Kho Xe & Pet Active</div>
            <div className="font-chakra font-bold text-2xl text-blue-700 mt-1">${activeCarsCount} Xe | ${activePetsCount} Pet</div>
            <div className="text-xs text-slate-500 mt-0.5">1 Xe 1 Map (1R) | Tối đa 2 Map (3R)</div>
          </div>
          <div className="ne-card p-4">
            <div className="text-[11px] font-bold uppercase text-slate-500">Kho Map Active</div>
            <div className="font-chakra font-bold text-2xl text-slate-900 mt-1">${activeMapsCount} / ${maps.length} Map</div>
            <div className="text-xs text-slate-500 mt-0.5">Độ khó từ 3★ đến 7★</div>
          </div>
        </div>

        <!-- 3 Giai đoạn tóm tắt -->
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="ne-card p-5 border-t-4 border-t-blue-500">
            <div className="text-xs font-bold text-blue-700 uppercase">Giai Đoạn 1 - Ngày 1 & 2</div>
            <h3 className="font-chakra font-bold text-lg text-slate-900 mt-1">Qualifier (32 Tuyển Thủ)</h3>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
              <li>- <strong>Ngày 1 (Phase 1):</strong> 8 bảng x 4 người đua 9 map tích điểm theo khoảng cách giây. Top 1 vào thẳng Swiss; Top 4 bị loại.</li>
              <li>- <strong>Ngày 2 (Phase 2):</strong> 8 trận Play-in Solo Bo7 1-Round (Top 2 vs Top 3) tranh 8 vé còn lại.</li>
            </ul>
          </div>
          <div className="ne-card p-5 border-t-4 border-t-blue-600">
            <div className="text-xs font-bold text-blue-700 uppercase">Giai Đoạn 2 - Ngày 3 đến 9</div>
            <h3 className="font-chakra font-bold text-lg text-slate-900 mt-1">Swiss Stage (16 Tuyển Thủ)</h3>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
              <li>- Phân 3 Pool (5-6-5), áp dụng <strong>Rematch & Shift Rule</strong> tránh tái đấu.</li>
              <li>- Nhánh thường (0-0, 1-0, 0-1, 1-1): <strong>Bo7 1-Round</strong>. Nhánh quyết định (2-0, 0-2, 2-1, 1-2, 2-2): <strong>Bo7 3-Round</strong> (không Deuce).</li>
            </ul>
          </div>
          <div className="ne-card p-5 border-t-4 border-t-blue-800">
            <div className="text-xs font-bold text-blue-800 uppercase">Giai Đoạn 3 - Ngày 10 đến 13</div>
            <h3 className="font-chakra font-bold text-lg text-slate-900 mt-1">Playoff & Finals Day (Top 8)</h3>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
              <li>- Loại trực tiếp nhánh đơn, toàn bộ đánh <strong>Bo9 3-Round</strong>.</li>
              <li>- Round 3 hòa 4-4 kích hoạt <strong>Deuce đặc biệt</strong>: Reset Pool Map 5★+ (không reset xe), Roll Map 9, thắng cách 2 điểm (trần 8-7).</li>
            </ul>
          </div>
        </div>

        <!-- Lộ trình 13 ngày chi tiết -->
        <div className="ne-card p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-100">
            <div>
              <h3 className="font-chakra font-bold text-lg text-slate-900 uppercase">
                Lộ Trình Chi Tiết 13 Ngày Thi Đấu (${seasonConfig.seasonCode})
              </h3>
              <p className="text-xs text-slate-500">Chuẩn hóa theo Điều lệ & Thể thức thi đấu chính thức</p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs no-print">
              ${[
                { id: 'all', label: 'Tất cả (13 ngày)' },
                { id: 'qualifier', label: 'Qualifier (N1-2)' },
                { id: 'swiss', label: 'Swiss Stage (N3-9)' },
                { id: 'playoff', label: 'Playoff (N10-13)' }
              ].map(function (btn) {
                const active = phaseFilter === btn.id;
                return html`
                  <button
                    key=${btn.id}
                    onClick=${function () { setPhaseFilter(btn.id); }}
                    className=${'px-3 py-1.5 rounded-lg font-semibold border transition-all ' + (active ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50')}
                  >
                    ${btn.label}
                  </button>
                `;
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-blue-50/80 text-blue-900 border-b border-blue-200">
                  <th className="py-2.5 px-3 font-bold w-20">Ngày</th>
                  <th className="py-2.5 px-3 font-bold w-44">Giai Đoạn</th>
                  <th className="py-2.5 px-3 font-bold">Nội Dung & Thể Thức</th>
                  <th className="py-2.5 px-3 font-bold">Chi Tiết Điều Hành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                ${filteredDays.map(function (d) {
                  const badgeColor = d.phase === 'qualifier'
                    ? 'bg-sky-100 text-sky-800 border-sky-200'
                    : (d.phase === 'swiss' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-indigo-100 text-indigo-800 border-indigo-200');
                  return html`
                    <tr key=${d.day} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 px-3 font-chakra font-bold text-blue-700">Ngày ${d.day}</td>
                      <td className="py-3 px-3">
                        <span className=${'inline-block px-2 py-0.5 rounded border text-[11px] font-semibold ' + badgeColor}>
                          ${d.phaseLabel}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">${d.title}</div>
                        <div className="text-[11px] font-semibold text-blue-600 mt-0.5">${d.format}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed">${d.detail}</td>
                    </tr>
                  `;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  global.CLAN_VIEWS = global.CLAN_VIEWS || {};
  global.CLAN_VIEWS.OverviewView = OverviewView;
})(window);
