// Tab 4: New Era Ranking (BXH 32 Tuyển Thủ), Quy chuẩn Tính điểm & Khảo sát Tân binh (Format pointcount)
(function (global) {
  'use strict';

  function ScoringGprView(props) {
    const html = htm.bind(React.createElement);
    const { useState, useMemo } = React;
    const { isBtc, globalRanking, setGlobalRanking } = props;
    const Data = global.CLAN_TOURNAMENT_DATA;
    const Engine = global.CLAN_TOURNAMENT_ENGINE;

    const [subTab, setSubTab] = useState('new_era_ranking'); // 'new_era_ranking' | 'rules' | 'calculators' | 'rookie'
    const [grSearch, setGrSearch] = useState('');
    // Trước giải NES27: NEAC26 tính 100%; khi NES27 khởi tranh: NEAC26 khấu hao 50%
    const [rankingPhase, setRankingPhase] = useState('pre_season'); // 'pre_season' | 'rolling_nes27'
    const [editingGrId, setEditingGrId] = useState(null);
    const [editGrRow, setEditGrRow] = useState({});
    const [newHandle, setNewHandle] = useState('');

    // Calculator 1: Vòng bảng
    const [grpTop1, setGrpTop1] = useState(false);
    const [grpKingMap, setGrpKingMap] = useState(false);
    const [grpGap, setGrpGap] = useState(1.25);
    const [grpDnf, setGrpDnf] = useState(false);
    const [grpTotal9, setGrpTotal9] = useState(95);

    // Calculator 2: Solo 1R & 3R
    const [solo1Base, setSolo1Base] = useState(4.0);
    const [solo1LoserWins, setSolo1LoserWins] = useState(2);
    const [solo3Base, setSolo3Base] = useState(6.0);
    const [solo3Score, setSolo3Score] = useState('2-1');
    const [solo3Diff, setSolo3Diff] = useState(1);

    // Calculator 3: New Era Ranking Đa mùa
    const [gprN, setGprN] = useState(75);
    const [gprN1, setGprN1] = useState(60);
    const [gprN2, setGprN2] = useState(35);
    const [gprRecords, setGprRecords] = useState(2);

    // Calculator 4: Khảo sát Tân binh 6 Map
    const [banned4StarId, setBanned4StarId] = useState('rt_4');
    const [rookieInputs, setRookieInputs] = useState({
      rt_1: { timeStr: '1:36:50', beatCaptain: true },
      rt_2: { timeStr: '1:34:50', beatCaptain: true },
      rt_3: { timeStr: '1:08:50', beatCaptain: true },
      rt_4: { timeStr: '1:07:50', beatCaptain: false },
      rt_5: { timeStr: '1:12:40', beatCaptain: false },
      rt_6: { timeStr: '1:48:20', beatCaptain: false }
    });

    const computedRanking = useMemo(function () {
      const q = grSearch.trim().toLowerCase();
      return (globalRanking || []).map(function (r) {
        const neac26Total = Number((Number(r.neac26Pos || 0) + Number(r.neac26Solo || 0) + Number(r.neac26GroupBonus || 0)).toFixed(2));
        let totalScore = 0;
        let neac26Weighted = 0;
        let seasonNWeighted = 0;

        if (rankingPhase === 'pre_season') {
          neac26Weighted = neac26Total;
          seasonNWeighted = 0;
          totalScore = Number((neac26Weighted + Number(r.activeRecords || 0)).toFixed(2));
        } else {
          const calc = Engine.calcMultiSeasonGpr(r.seasonNPoints || 0, neac26Total, r.seasonN2Points || 0, r.activeRecords || 0);
          neac26Weighted = calc.sN1;
          seasonNWeighted = calc.sN;
          totalScore = calc.total;
        }

        return Object.assign({}, r, {
          neac26Total: neac26Total,
          neac26Weighted: neac26Weighted,
          seasonNWeighted: seasonNWeighted,
          totalScore: totalScore
        });
      }).sort(function (a, b) {
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        return (b.activeRecords || 0) - (a.activeRecords || 0);
      }).map(function (item, idx) {
        return Object.assign({}, item, { rankNum: idx + 1 });
      }).filter(function (item) {
        return !q || item.handle.toLowerCase().indexOf(q) !== -1;
      });
    }, [globalRanking, grSearch, rankingPhase]);

    const racePts = Engine.calcGroupRacePoints(grpTop1, grpKingMap, grpGap, grpDnf);
    const grpBonusGpr = Engine.calcGroupPerformanceGpr(grpTotal9);
    const solo1Res = Engine.calcSolo1RoundPoints(solo1Base, solo1LoserWins);
    const solo3Res = Engine.calcSolo3RoundPoints(solo3Base, solo3Score, solo3Diff);
    const gprMulti = Engine.calcMultiSeasonGpr(gprN, gprN1, gprN2, gprRecords);

    const activeRookieMaps = Data.ROOKIE_TRIAL_MAPS.filter(function (m) {
      return m.id !== banned4StarId;
    });

    const rookieResult = Engine.calcRookieTrialScore(activeRookieMaps.map(function (m) {
      const inp = rookieInputs[m.id] || {};
      return {
        targetMs: m.targetMs,
        targetTime: m.targetTime,
        basePoints: m.basePoints,
        timeStr: inp.timeStr || '',
        beatCaptain: inp.beatCaptain
      };
    }));

    function updateRookieInput(id, patch) {
      const next = Object.assign({}, rookieInputs);
      next[id] = Object.assign({}, next[id], patch);
      setRookieInputs(next);
    }

    function formatRookieTimeBlur(id) {
      const cur = (rookieInputs[id] && rookieInputs[id].timeStr) || '';
      updateRookieInput(id, { timeStr: Engine.formatTimeDisplay(cur) });
    }

    function addRankingPlayer(e) {
      e.preventDefault();
      const handle = newHandle.trim();
      if (!handle) return;
      setGlobalRanking([{
        id: 'gr_custom_' + Date.now(),
        handle: handle,
        neac26Rank: 'Tân Binh / Mới',
        neac26Pos: 0,
        neac26Solo: 0,
        neac26GroupBonus: 0,
        seasonNPoints: 0,
        seasonN2Points: 0,
        activeRecords: 0
      }].concat(globalRanking || []));
      setNewHandle('');
    }

    function saveEditGr(id) {
      setGlobalRanking((globalRanking || []).map(function (r) {
        return r.id === id ? Object.assign({}, r, {
          handle: editGrRow.handle,
          neac26Rank: editGrRow.neac26Rank,
          neac26Pos: Number(editGrRow.neac26Pos) || 0,
          neac26Solo: Number(editGrRow.neac26Solo) || 0,
          neac26GroupBonus: Number(editGrRow.neac26GroupBonus) || 0,
          seasonNPoints: Number(editGrRow.seasonNPoints) || 0,
          seasonN2Points: Number(editGrRow.seasonN2Points) || 0,
          activeRecords: Number(editGrRow.activeRecords) || 0
        }) : r;
      }));
      setEditingGrId(null);
    }

    return html`
      <div className="space-y-6">
        <!-- Header & Sub-tabs -->
        <div className="ne-card p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-chakra font-bold text-lg text-slate-900 uppercase">
              New Era Ranking & Quy Chuẩn Tính Điểm
            </h2>
            <p className="text-xs text-slate-500">
              Hệ thống xếp hạng Clan New Era chuẩn hóa theo Asian Cup (Time-gap), FIA F1 (Countback) & Chu kỳ trượt 3 mùa giải
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 bg-blue-50 p-1 rounded-xl border border-blue-200 text-xs font-bold no-print">
            <button
              onClick=${function () { setSubTab('new_era_ranking'); }}
              className=${'px-3 py-1.5 rounded-lg transition-all ' + (subTab === 'new_era_ranking' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100')}
            >
              New Era Ranking (32 VĐV)
            </button>
            <button
              onClick=${function () { setSubTab('rules'); }}
              className=${'px-3 py-1.5 rounded-lg transition-all ' + (subTab === 'rules' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100')}
            >
              Bảng Điểm & Quy Chuẩn
            </button>
            <button
              onClick=${function () { setSubTab('calculators'); }}
              className=${'px-3 py-1.5 rounded-lg transition-all ' + (subTab === 'calculators' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100')}
            >
              Máy Tính Thử Điểm
            </button>
            <button
              onClick=${function () { setSubTab('rookie'); }}
              className=${'px-3 py-1.5 rounded-lg transition-all ' + (subTab === 'rookie' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100')}
            >
              Khảo Sát Tân Binh (6 Map)
            </button>
          </div>
        </div>

        <!-- SUBTAB 1: NEW ERA RANKING -->
        ${subTab === 'new_era_ranking' && html`
          <div className="ne-card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 pb-3">
              <div>
                <h3 className="font-chakra font-bold text-base text-blue-900 uppercase">
                  Bảng Xếp Hạng New Era Ranking (Đủ 32 Tuyển Thủ NEAC26)
                </h3>
                <p className="text-xs text-slate-600">
                  ${rankingPhase === 'pre_season'
                    ? 'Hiện trạng trước giải NES27: Mùa NEAC26 giữ nguyên 100% giá trị điểm + Kỷ lục Map Active (+1.0đ/map).'
                    : 'Chế độ giả lập khi NES27 khởi tranh: Mùa mới 100%, NEAC26 (N-1) khấu hao còn 50% + Kỷ lục Map Active.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value=${rankingPhase}
                  onChange=${function (e) { setRankingPhase(e.target.value); }}
                  className="px-3 py-1.5 rounded-lg border border-blue-300 bg-blue-50 text-blue-900 font-bold"
                >
                  <option value="pre_season">Trước giải NES27 (NEAC26 = 100%)</option>
                  <option value="rolling_nes27">Khi NES27 khởi tranh (NEAC26 = 50%)</option>
                </select>
                <input
                  type="text"
                  placeholder="Tìm Racer Handle..."
                  value=${grSearch}
                  onInput=${function (e) { setGrSearch(e.target.value); }}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
                ${isBtc && html`
                  <form onSubmit=${addRankingPlayer} className="flex gap-1.5 no-print">
                    <input
                      type="text"
                      placeholder="Thêm Racer mới..."
                      value=${newHandle}
                      onInput=${function (e) { setNewHandle(e.target.value); }}
                      className="px-2.5 py-1.5 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-500 w-36"
                    />
                    <button type="submit" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">+ Thêm</button>
                  </form>
                `}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
                    <th className="p-2.5 font-bold text-center w-14">Hạng</th>
                    <th className="p-2.5 font-bold">Racer Handle</th>
                    <th className="p-2.5 font-bold">Thành Tích NEAC26 (Vòng Bảng & Chung Cuộc)</th>
                    <th className="p-2.5 font-bold text-right">
                      ${rankingPhase === 'pre_season' ? 'NEAC26 (100%)' : 'NEAC26 (x50%)'}
                    </th>
                    ${rankingPhase === 'rolling_nes27' && html`<th className="p-2.5 font-bold text-right">NES27 (100%)</th>`}
                    <th className="p-2.5 font-bold text-center">Kỷ Lục Map (+1đ)</th>
                    <th className="p-2.5 font-bold text-right">Điểm Ranking</th>
                    ${isBtc && html`<th className="p-2.5 font-bold text-center no-print">BTC</th>`}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  ${computedRanking.map(function (r) {
                    const isEditing = isBtc && editingGrId === r.id;
                    const rankBadge = r.rankNum === 1
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : (r.rankNum === 2 ? 'bg-slate-200 text-slate-800 border-slate-300' : (r.rankNum === 3 ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-blue-50 text-blue-700 border-blue-100'));

                    if (isEditing) {
                      return html`
                        <tr key=${r.id} className="bg-blue-50/70">
                          <td className="p-2 text-center font-bold">#${r.rankNum}</td>
                          <td className="p-2"><input type="text" value=${editGrRow.handle} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { handle: e.target.value })); }} className="w-24 px-2 py-1 border rounded" /></td>
                          <td className="p-2"><input type="text" value=${editGrRow.neac26Rank} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { neac26Rank: e.target.value })); }} className="w-40 px-2 py-1 border rounded" /></td>
                          <td className="p-2 text-right">
                            <div className="flex justify-end gap-1">
                              <input type="number" step="0.01" title="Vị trí" value=${editGrRow.neac26Pos} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { neac26Pos: e.target.value })); }} className="w-14 px-1 py-1 border rounded text-right" />
                              <input type="number" step="0.01" title="Solo" value=${editGrRow.neac26Solo} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { neac26Solo: e.target.value })); }} className="w-12 px-1 py-1 border rounded text-right" />
                              <input type="number" step="0.01" title="Vòng bảng" value=${editGrRow.neac26GroupBonus} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { neac26GroupBonus: e.target.value })); }} className="w-14 px-1 py-1 border rounded text-right" />
                            </div>
                          </td>
                          ${rankingPhase === 'rolling_nes27' && html`
                            <td className="p-2 text-right"><input type="number" step="0.01" value=${editGrRow.seasonNPoints} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { seasonNPoints: e.target.value })); }} className="w-16 px-2 py-1 border rounded text-right" /></td>
                          `}
                          <td className="p-2 text-center"><input type="number" min="0" value=${editGrRow.activeRecords} onInput=${function (e) { setEditGrRow(Object.assign({}, editGrRow, { activeRecords: e.target.value })); }} className="w-14 px-2 py-1 border rounded text-center" /></td>
                          <td className="p-2 text-right font-bold">-</td>
                          <td className="p-2 text-center">
                            <button onClick=${function () { saveEditGr(r.id); }} className="px-2 py-1 bg-blue-600 text-white rounded font-bold mr-1">Lưu</button>
                            <button onClick=${function () { setEditingGrId(null); }} className="px-2 py-1 bg-slate-200 rounded">Hủy</button>
                          </td>
                        </tr>
                      `;
                    }

                    return html`
                      <tr key=${r.id} className="hover:bg-blue-50/40">
                        <td className="p-2.5 text-center">
                          <span className=${'inline-block px-2 py-0.5 rounded border font-chakra font-bold ' + rankBadge}>#${r.rankNum}</span>
                        </td>
                        <td className="p-2.5 font-chakra font-bold text-slate-900 text-sm">${r.handle}</td>
                        <td className="p-2.5 text-slate-600">${r.neac26Rank}</td>
                        <td className="p-2.5 text-right font-mono text-slate-700">
                          <span title=${'Chi tiết: Vị trí ' + r.neac26Pos + ' + Solo ' + r.neac26Solo + ' + Vòng bảng ' + r.neac26GroupBonus}>
                            ${r.neac26Weighted.toFixed(2)}
                          </span>
                        </td>
                        ${rankingPhase === 'rolling_nes27' && html`
                          <td className="p-2.5 text-right font-mono text-slate-700">${r.seasonNWeighted.toFixed(2)}</td>
                        `}
                        <td className="p-2.5 text-center font-bold text-blue-700">${r.activeRecords || 0}</td>
                        <td className="p-2.5 text-right font-chakra font-bold text-base text-blue-700">${r.totalScore.toFixed(2)}</td>
                        ${isBtc && html`
                          <td className="p-2.5 text-center no-print">
                            <button
                              onClick=${function () { setEditingGrId(r.id); setEditGrRow(r); }}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-100 text-slate-700 font-semibold text-[11px]"
                            >
                              Sửa
                            </button>
                          </td>
                        `}
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        `}

        ${subTab === 'rules' && html`
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="ne-card p-5 space-y-3">
                <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                  Bảng A: Thể Thức Mới (Có Play-in & Swiss Stage)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
                        <th className="p-2 font-bold">Thứ Hạng</th>
                        <th className="p-2 font-bold">Thành Tích / Dừng Bước</th>
                        <th className="p-2 font-bold text-right">Điểm Ranking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      ${Data.POSITION_POINTS_NEW.map(function (r) {
                        return html`
                          <tr key=${r.rank} className="hover:bg-blue-50/40">
                            <td className="p-2 font-bold text-slate-900">${r.rank}</td>
                            <td className="p-2 text-slate-600">
                              <div className="font-semibold text-slate-800">${r.title}</div>
                              <div className="text-[11px] text-slate-500">${r.stage}</div>
                            </td>
                            <td className="p-2 text-right font-chakra font-bold text-blue-700 text-sm">${r.points}</td>
                          </tr>
                        `;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="ne-card p-5 space-y-3">
                <h3 className="font-chakra font-bold text-base text-slate-800 uppercase border-b border-slate-200 pb-2">
                  Bảng B: Thể Thức Cũ (Hồi Tố NEAC26 - Top 16 Knockout)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                        <th className="p-2 font-bold">Thứ Hạng</th>
                        <th className="p-2 font-bold">Thành Tích NEAC26</th>
                        <th className="p-2 font-bold text-right">Điểm Ranking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      ${Data.POSITION_POINTS_LEGACY_NEAC26.map(function (r) {
                        return html`
                          <tr key=${r.rank} className="hover:bg-slate-50">
                            <td className="p-2 font-bold text-slate-900">${r.rank}</td>
                            <td className="p-2 text-slate-600">
                              <div className="font-semibold text-slate-800">${r.title}</div>
                              <div className="text-[11px] text-slate-500">${r.stage}</div>
                            </td>
                            <td className="p-2 text-right font-chakra font-bold text-slate-700 text-sm">${r.points}</td>
                          </tr>
                        `;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="ne-card p-5 space-y-3">
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                Điểm Trận Đối Kháng Solo 1-Round & Solo 3-Round (Bo3 Lớn)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                  <div className="font-bold text-blue-900">1. Solo 1-Round (Play-in Bo7 Base 3.0đ | Swiss Bo7 Base 4.0đ)</div>
                  <div>- <strong>Người thắng:</strong> Base x [1 - (Số ván thua / 4) x 0.4]</div>
                  <div>- <strong>An ủi người thua:</strong> +0.2 điểm / mỗi ván nhỏ thắng được.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                  <div className="font-bold text-blue-900">2. Solo 3-Round (Thưởng/Phạt Hiệu Số Ván Nhỏ)</div>
                  <div>- Tỉ số Round lớn: <strong>2-0</strong> (100%), <strong>2-1</strong> (75%), <strong>1-2</strong> (25% bản lĩnh), <strong>0-2</strong> (0%).</div>
                  <div>- <strong>Hiệu số Map:</strong> (Tổng ván nhỏ thắng - Tổng ván nhỏ thua) x 0.1 điểm.</div>
                </div>
              </div>
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
                      <th className="p-2 font-bold">Giai Đoạn Thi Đấu (3-Round)</th>
                      <th className="p-2 font-bold">Thể Thức</th>
                      <th className="p-2 font-bold text-center">Base</th>
                      <th className="p-2 font-bold text-center">Thắng 2-0 (100%)</th>
                      <th className="p-2 font-bold text-center">Thắng 2-1 (75%)</th>
                      <th className="p-2 font-bold text-center">Thua 1-2 (25%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    ${Data.SOLO_3R_BASE_TABLE.map(function (row) {
                      return html`
                        <tr key=${row.stage}>
                          <td className="p-2 font-semibold text-slate-900">${row.stage}</td>
                          <td className="p-2 text-slate-600">${row.format}</td>
                          <td className="p-2 text-center font-bold">${row.base.toFixed(1)}đ</td>
                          <td className="p-2 text-center font-bold text-emerald-700">${row.w20.toFixed(2)}đ</td>
                          <td className="p-2 text-center font-bold text-blue-700">${row.w21.toFixed(2)}đ</td>
                          <td className="p-2 text-center font-semibold text-slate-600">${row.l12.toFixed(2)}đ</td>
                        </tr>
                      `;
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="ne-card p-4 space-y-2">
                <div className="font-chakra font-bold text-sm text-blue-800 uppercase">Kỷ Lục Map & Hall of Fame</div>
                <p className="text-slate-600 leading-relaxed">
                  Chỉ công nhận sub-time lập trong giải chính thức (+1.0đ/map). Nếu Map bị gỡ khỏi Active Map Pool: <strong>không còn cộng +1.0đ vào New Era Ranking hiện tại</strong>, nhưng danh hiệu vẫn lưu vĩnh viễn trong Hall of Fame.
                </p>
              </div>
              <div className="ne-card p-4 space-y-2">
                <div className="font-chakra font-bold text-sm text-blue-800 uppercase">Chu Kỳ Trượt 3 Mùa Ranking</div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>New Era Ranking = (Mùa N x 100%) + (Mùa N-1 x 50%) + (Mùa N-2 x 25%) + Điểm Kỷ Lục Active.</strong> Từ mùa N-3 trở về trước hết hạn và chuyển vào Hall of Fame.
                </p>
              </div>
              <div className="ne-card p-4 space-y-2">
                <div className="font-chakra font-bold text-sm text-blue-800 uppercase">Định Danh & Phòng Giao Lưu</div>
                <p className="text-slate-600 leading-relaxed">
                  Định danh theo <strong>Racer Handle cố định</strong>. Các trận <strong>Friendly Scrims</strong> tách phòng riêng, chỉ lưu H2H tại chỗ, tuyệt đối không tính vào New Era Ranking.
                </p>
              </div>
            </div>
          </div>
        `}

        ${subTab === 'calculators' && html`
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="ne-card p-5 space-y-4">
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                1. Máy Tính Điểm Vòng Bảng (Time-Gap Penalty)
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                  <input type="checkbox" checked=${grpTop1} onChange=${function (e) { setGrpTop1(e.target.checked); }} className="accent-blue-600" />
                  Về Top 1 Ván Đấu
                </label>
                <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                  <input type="checkbox" checked=${grpKingMap} onChange=${function (e) { setGrpKingMap(e.target.checked); }} className="accent-blue-600" />
                  King Map của mình (+1đ)
                </label>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Chậm hơn Top 1 (giây):</label>
                  <input
                    type="number" step="0.01" min="0"
                    disabled=${grpTop1 || grpDnf}
                    value=${grpGap}
                    onInput=${function (e) { setGrpGap(e.target.value); }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 disabled:bg-slate-100"
                  />
                </div>
                <div className="flex items-end pb-1.5">
                  <label className="flex items-center gap-2 font-semibold text-rose-700 cursor-pointer">
                    <input type="checkbox" checked=${grpDnf} onChange=${function (e) { setGrpDnf(e.target.checked); }} className="accent-rose-600" />
                    Không hoàn thành (DNF)
                  </label>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Điểm ván đấu nhận được:</span>
                <span className="font-chakra font-bold text-xl text-blue-700">${racePts} điểm</span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <label className="font-semibold text-slate-700">Tổng điểm nhỏ sau 9 Map:</label>
                  <input
                    type="number" min="0" max="108"
                    value=${grpTotal9}
                    onInput=${function (e) { setGrpTotal9(e.target.value); }}
                    className="w-28 px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-right"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Điểm Thưởng Hiệu Suất Vòng Bảng (x 15%):</span>
                  <span className="font-chakra font-bold text-lg text-blue-700">+${grpBonusGpr} điểm</span>
                </div>
              </div>
            </div>

            <div className="ne-card p-5 space-y-4">
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase border-b border-blue-100 pb-2">
                2. Máy Tính Điểm Trận Solo (1-Round & 3-Round)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-800">Solo 1-Round (Bo7)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Giai đoạn:</label>
                    <select value=${solo1Base} onChange=${function (e) { setSolo1Base(Number(e.target.value)); }} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white">
                      <option value="3">Play-in Bo7 (Base 3.0đ)</option>
                      <option value="4">Swiss Thường Bo7 (Base 4.0đ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Số ván người thua thắng (0-3):</label>
                    <input type="number" min="0" max="3" value=${solo1LoserWins} onInput=${function (e) { setSolo1LoserWins(e.target.value); }} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300" />
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex justify-between">
                  <span>Người thắng: <strong className="text-blue-700">+${solo1Res.winnerPts}đ</strong></span>
                  <span>Người thua (an ủi): <strong className="text-slate-700">+${solo1Res.loserPts}đ</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="font-bold text-slate-800">Solo 3-Round (Bo3 Lớn)</div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1">Vòng đấu:</label>
                    <select value=${solo3Base} onChange=${function (e) { setSolo3Base(Number(e.target.value)); }} className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white">
                      <option value="5">Swiss Sinh Tử (5đ)</option>
                      <option value="6">Tứ Kết (6đ)</option>
                      <option value="8">Bán Kết (8đ)</option>
                      <option value="10">CK / Hạng 3 (10đ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Tỷ số Round:</label>
                    <select value=${solo3Score} onChange=${function (e) { setSolo3Score(e.target.value); }} className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white">
                      <option value="2-0">Thắng 2-0 (100%)</option>
                      <option value="2-1">Thắng 2-1 (75%)</option>
                      <option value="1-2">Thua 1-2 (25%)</option>
                      <option value="0-2">Thua 0-2 (0%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Hiệu số ván nhỏ:</label>
                    <input type="number" value=${solo3Diff} onInput=${function (e) { setSolo3Diff(e.target.value); }} className="w-full px-2 py-1.5 rounded-lg border border-slate-300" />
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex justify-between items-center">
                  <span>Cơ bản: <strong>${solo3Res.baseEarned}đ</strong> | Hiệu số: <strong>${solo3Res.diffBonus >= 0 ? '+' + solo3Res.diffBonus : solo3Res.diffBonus}đ</strong></span>
                  <span className="font-chakra font-bold text-base text-blue-700">Tổng: ${solo3Res.total}đ</span>
                </div>
              </div>
            </div>

            <div className="ne-card-blue p-5 space-y-4 lg:col-span-2">
              <h3 className="font-chakra font-bold text-base text-blue-900 uppercase border-b border-blue-200 pb-2">
                3. Máy Tính New Era Ranking (Chu Kỳ Trượt 3 Mùa Giải)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Điểm Mùa N (100%):</label>
                  <input type="number" step="0.1" value=${gprN} onInput=${function (e) { setGprN(e.target.value); }} className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white font-bold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Điểm Mùa N-1 (50%):</label>
                  <input type="number" step="0.1" value=${gprN1} onInput=${function (e) { setGprN1(e.target.value); }} className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white font-bold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Điểm Mùa N-2 (25%):</label>
                  <input type="number" step="0.1" value=${gprN2} onInput=${function (e) { setGprN2(e.target.value); }} className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white font-bold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số Kỷ Lục Map Active (+1đ):</label>
                  <input type="number" min="0" value=${gprRecords} onInput=${function (e) { setGprRecords(e.target.value); }} className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white font-bold" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-blue-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Chi tiết: <strong>${gprMulti.sN}</strong> (Mùa N) + <strong>${gprMulti.sN1}</strong> (Mùa N-1) + <strong>${gprMulti.sN2}</strong> (Mùa N-2) + <strong>${gprMulti.rec}</strong> (Kỷ lục Active)
                </div>
                <div className="font-chakra font-bold text-2xl text-blue-700">
                  TỔNG ĐIỂM: ${gprMulti.total} điểm
                </div>
              </div>
            </div>
          </div>
        `}

        <!-- SUBTAB 4: KHẢO SÁT TÂN BINH -->
        ${subTab === 'rookie' && html`
          <div className="ne-card p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 pb-3">
              <div>
                <h3 className="font-chakra font-bold text-base text-blue-800 uppercase">
                  Quy Chế Khảo Sát Tân Binh (Clan Gatekeeper) - Pool 6 Map Đầu Vào
                </h3>
                <p className="text-xs text-slate-600">
                  Nhập thời gian chuẩn định dạng <strong>pointcount</strong>: gõ <code className="px-1 bg-slate-100 rounded">1:36:50</code> hoặc gõ nhanh <code className="px-1 bg-slate-100 rounded">13650</code> (tự format), nhập <code className="px-1 bg-rose-50 text-rose-700 rounded font-bold">X</code> nếu DNF.
                </p>
              </div>
              <div className="text-xs flex items-center gap-2">
                <span className="font-bold text-slate-700">Ban 1 Map 4★:</span>
                <select
                  value=${banned4StarId}
                  onChange=${function (e) { setBanned4StarId(e.target.value); }}
                  className="px-3 py-1.5 rounded-lg border border-blue-300 bg-white font-bold text-blue-800"
                >
                  ${Data.ROOKIE_TRIAL_MAPS.filter(function (m) { return m.optional4Star; }).map(function (m) {
                    return html`<option key=${m.id} value=${m.id}>Ban: ${m.name} (${m.targetTime})</option>`;
                  })}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
                    <th className="p-2.5 font-bold">Thứ Tự</th>
                    <th className="p-2.5 font-bold">Bản Đồ</th>
                    <th className="p-2.5 font-bold">Mốc Yêu Cầu</th>
                    <th className="p-2.5 font-bold text-center">Điểm Gốc</th>
                    <th className="p-2.5 font-bold">Thời Gian Đạt (m:ss:cc hoặc X)</th>
                    <th className="p-2.5 font-bold text-center">Thắng Chủ Clan (+1đ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  ${activeRookieMaps.map(function (m, idx) {
                    const inp = rookieInputs[m.id] || {};
                    const isX = String(inp.timeStr || '').trim().toUpperCase() === 'X';
                    return html`
                      <tr key=${m.id} className="hover:bg-blue-50/40">
                        <td className="p-2.5 font-bold text-blue-700">Ván ${idx + 1}</td>
                        <td className="p-2.5">
                          <div className="font-bold text-slate-900">${m.name}</div>
                          <div className="text-[11px] text-slate-500">${m.starLabel}</div>
                        </td>
                        <td className="p-2.5 font-mono font-bold text-slate-800">${m.targetTime}</td>
                        <td className="p-2.5 text-center font-bold text-blue-700">${m.basePoints.toFixed(1)}đ</td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            placeholder="VD: 13650 hoặc X"
                            value=${inp.timeStr || ''}
                            onInput=${function (e) { updateRookieInput(m.id, { timeStr: e.target.value }); }}
                            onBlur=${function () { formatRookieTimeBlur(m.id); }}
                            className=${'w-36 px-2.5 py-1.5 rounded-lg border font-mono font-bold focus:outline-none focus:border-blue-500 ' + (isX ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-300 bg-white text-slate-900')}
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked=${Boolean(inp.beatCaptain)}
                            onChange=${function (e) { updateRookieInput(m.id, { beatCaptain: e.target.checked }); }}
                            className="accent-blue-600 w-4 h-4"
                          />
                        </td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>

            <div className="ne-card-blue p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="text-slate-500 font-semibold">Điểm Thời Gian (max 52đ)</div>
                <div className="font-chakra font-bold text-xl text-slate-900">${rookieResult.timePoints} đ</div>
              </div>
              <div>
                <div className="text-slate-500 font-semibold">Đối Kháng Chủ Clan (max 8đ)</div>
                <div className="font-chakra font-bold text-xl text-slate-900">
                  ${rookieResult.matchBonus} đ <span className="text-xs font-normal text-slate-500">(${rookieResult.beatCaptainWins}/5 ván)</span>
                </div>
              </div>
              <div>
                <div className="text-slate-500 font-semibold">Tổng Điểm Khảo Sát</div>
                <div className="font-chakra font-bold text-xl text-blue-700">${rookieResult.totalSurveyScore} / 60 đ</div>
              </div>
              <div>
                <div className="text-slate-500 font-semibold">Điểm Khởi Đầu & Phân Nhóm</div>
                <div className="font-chakra font-bold text-xl text-blue-800">
                  ${rookieResult.initialGpr} đ - ${rookieResult.tier}
                </div>
                <div className="text-[11px] text-slate-600">${rookieResult.tierDesc}</div>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  global.CLAN_VIEWS = global.CLAN_VIEWS || {};
  global.CLAN_VIEWS.ScoringGprView = ScoringGprView;
})(window);
