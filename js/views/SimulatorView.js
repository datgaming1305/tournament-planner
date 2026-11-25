// Tab 5: Mô phỏng Giải Đấu Toàn Phần (Phân tách Client Read-only vs BTC Điều Khiển)
(function (global) {
  'use strict';

  function SimulatorView(props) {
    const html = htm.bind(React.createElement);
    const { useState } = React;
    const {
      isBtc,
      seasonConfig,
      racers,
      setRacers,
      seedMethod,
      setSeedMethod,
      drawSeed,
      setDrawSeed,
      playInWinners,
      setPlayInWinners,
      swissWinners,
      setSwissWinners,
      playoffWinners,
      setPlayoffWinners,
      simData,
      onResetSimResults,
      onAutoSimulateSwiss,
      onResetDefaultRacers
    } = props;

    const [subTab, setSubTab] = useState('swiss'); // 'qualifier' | 'swiss' | 'playoff' | 'roster'
    const [rosterText, setRosterText] = useState(racers.join('\n'));

    function applyRosterText() {
      const lines = rosterText.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
      const next = [];
      for (let i = 0; i < 32; i++) {
        next.push(lines[i] || ('Tuyển thủ #' + (i + 1)));
      }
      setRacers(next);
      onResetSimResults();
    }

    function togglePlayInWinner(matchId, playerId) {
      if (!isBtc) return;
      const next = Object.assign({}, playInWinners);
      next[matchId] = playerId;
      setPlayInWinners(next);
      setSwissWinners({});
      setPlayoffWinners({});
    }

    function pickSwissWinner(matchId, playerId) {
      if (!isBtc) return;
      const next = Object.assign({}, swissWinners);
      if (next[matchId] === playerId) {
        delete next[matchId];
      } else {
        next[matchId] = playerId;
      }
      setSwissWinners(next);
      setPlayoffWinners({});
    }

    function pickPlayoffWinner(matchId, playerId) {
      if (!isBtc) return;
      const next = Object.assign({}, playoffWinners);
      if (next[matchId] === playerId) {
        delete next[matchId];
      } else {
        next[matchId] = playerId;
      }
      setPlayoffWinners(next);
    }

    const { groups, playInMatches, pools, swissResult, playoffBracket } = simData;

    function renderMatchCard(m) {
      if (!m || !m.p1 || !m.p2) return null;
      const p1Win = m.winnerId === m.p1.id;
      const p2Win = m.winnerId === m.p2.id;
      return html`
        <div key=${m.id} className="p-2 rounded-lg border border-blue-100 bg-white text-xs space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>${m.id}</span>
            <span className="font-bold text-blue-600">${m.format}</span>
          </div>
          <div className="grid grid-cols-[1fr_24px_1fr] items-center gap-1">
            <button
              onClick=${function () { pickSwissWinner(m.id, m.p1.id); }}
              disabled=${!isBtc}
              className=${'px-2 py-1 rounded text-right font-bold truncate border transition-all ' + (p1Win ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200 ') + (isBtc ? 'hover:border-blue-400 cursor-pointer' : 'cursor-default')}
              title=${m.p1.name}
            >
              ${m.p1.name}
            </button>
            <span className="text-center text-[10px] font-black text-blue-600">VS</span>
            <button
              onClick=${function () { pickSwissWinner(m.id, m.p2.id); }}
              disabled=${!isBtc}
              className=${'px-2 py-1 rounded text-left font-bold truncate border transition-all ' + (p2Win ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200 ') + (isBtc ? 'hover:border-blue-400 cursor-pointer' : 'cursor-default')}
              title=${m.p2.name}
            >
              ${m.p2.name}
            </button>
          </div>
        </div>
      `;
    }

    const subTabsList = [
      { id: 'qualifier', label: '1. Qualifier (8 Bảng & Play-in)' },
      { id: 'swiss', label: '2. Swiss Stage (5 Vòng)' },
      { id: 'playoff', label: '3. Playoff Top 8 (Bo9 3-Round)' }
    ];
    if (isBtc) {
      subTabsList.push({ id: 'roster', label: '4. Danh Sách 32 Tuyển Thủ' });
    }

    return html`
      <div className="space-y-6">
        <!-- Control Bar (BTC có nút thao tác, Client chỉ thấy link Broadcast) -->
        <div className="ne-card p-4 flex flex-wrap items-center justify-between gap-3">
          ${isBtc ? html`
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value=${seedMethod}
                onChange=${function (e) { setSeedMethod(e.target.value); onResetSimResults(); }}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white font-semibold text-slate-800"
              >
                <option value="pot_draw">Chia bảng: 4 Nhóm Pot (1-4)</option>
                <option value="snake">Chia bảng: Snake Draft</option>
                <option value="random">Chia bảng: Ngẫu nhiên hoàn toàn</option>
              </select>
              <button
                onClick=${function () { setDrawSeed(drawSeed + 1); onResetSimResults(); }}
                className="px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold transition-all"
              >
                Bốc Thăm Lại (#${drawSeed})
              </button>
              <button
                onClick=${onAutoSimulateSwiss}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all"
              >
                Giả Lập Nhanh Toàn Bộ Swiss
              </button>
              <button
                onClick=${onResetSimResults}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200"
              >
                Reset Kết Quả
              </button>
            </div>
          ` : html`
            <div className="text-xs font-semibold text-slate-600">
              Sơ đồ nhánh đấu và kết quả giải đấu ${seasonConfig.seasonName} (${seasonConfig.seasonCode}).
            </div>
          `}

          <a
            href="swiss.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-chakra font-bold shadow-sm transition-all"
          >
            Mở Màn Hình Broadcast Swiss ↗
          </a>
        </div>

        <!-- Sub-tabs -->
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          ${subTabsList.map(function (t) {
            const active = subTab === t.id;
            return html`
              <button
                key=${t.id}
                onClick=${function () { setSubTab(t.id); }}
                className=${'px-4 py-2 rounded-xl border transition-all ' + (active ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-blue-100 hover:bg-blue-50')}
              >
                ${t.label}
              </button>
            `;
          })}
        </div>

        <!-- SUBTAB 1: QUALIFIER & PLAY-IN -->
        ${subTab === 'qualifier' && html`
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              ${groups.map(function (g) {
                return html`
                  <div key=${g.letter} className="ne-card overflow-hidden text-xs">
                    <div className="px-3.5 py-2 bg-blue-600 text-white font-chakra font-bold flex justify-between items-center">
                      <span>${g.name}</span>
                      <span className="text-[10px] font-normal opacity-90">9 Map Tích Điểm</span>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-blue-50 text-blue-900 text-[10px] border-b border-blue-100">
                          <th className="p-2">#</th>
                          <th className="p-2">Tuyển Thủ</th>
                          <th className="p-2 text-right">Điểm</th>
                          <th className="p-2 text-center">1st</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        ${g.standings.map(function (p) {
                          const rowCls = p.rank === 1 ? 'bg-emerald-50/70' : (p.rank <= 3 ? 'bg-sky-50/50' : 'bg-slate-50 text-slate-400');
                          return html`
                            <tr key=${p.id} className=${rowCls}>
                              <td className="p-2 font-bold">${p.rank}</td>
                              <td className="p-2 font-semibold text-slate-900">
                                ${p.name}
                                ${p.needsTiebreakRace && html`<span className="ml-1 text-[9px] px-1 rounded bg-amber-100 text-amber-800">TB</span>`}
                              </td>
                              <td className="p-2 text-right font-bold text-blue-700">${p.points}</td>
                              <td className="p-2 text-center">${p.top1}</td>
                            </tr>
                          `;
                        })}
                      </tbody>
                    </table>
                  </div>
                `;
              })}
            </div>

            <div className="ne-card p-5 space-y-3">
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase">
                Phase 2: 8 Trận Play-in Solo Bo7 1-Round ${isBtc ? '(Click Chọn Người Thắng Vào Swiss)' : ''}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                ${playInMatches.map(function (m) {
                  const chosen = playInWinners[m.id] || m.p1.id;
                  return html`
                    <div key=${m.id} className="p-3 rounded-xl border border-blue-100 bg-blue-50/30 text-xs space-y-2">
                      <div className="font-bold text-blue-800 flex justify-between">
                        <span>Play-in Bảng ${m.group}</span>
                        <span className="text-[10px] text-slate-500">Bo7 1R</span>
                      </div>
                      <div className="space-y-1">
                        <button
                          onClick=${function () { togglePlayInWinner(m.id, m.p1.id); }}
                          disabled=${!isBtc}
                          className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold flex justify-between ' + (chosen === m.p1.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200')}
                        >
                          <span>#2 ${m.p1.name}</span>
                          <span>${m.p1.points}đ</span>
                        </button>
                        <button
                          onClick=${function () { togglePlayInWinner(m.id, m.p2.id); }}
                          disabled=${!isBtc}
                          className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold flex justify-between ' + (chosen === m.p2.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200')}
                        >
                          <span>#3 ${m.p2.name}</span>
                          <span>${m.p2.points}đ</span>
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            </div>
          </div>
        `}

        <!-- SUBTAB 2: SWISS STAGE -->
        ${subTab === 'swiss' && html`
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="ne-card p-4 border-t-4 border-t-blue-700">
                <div className="font-chakra font-bold text-sm text-blue-800 uppercase mb-2">Pool 1 (5 VĐV - Top 5 Nhất Bảng)</div>
                <div className="flex flex-wrap gap-1.5">
                  ${pools.pool1.map(function (p) {
                    return html`<span key=${p.id} className="px-2 py-1 rounded bg-blue-50 border border-blue-200 font-bold text-blue-900">${p.name} (${p.group} - ${p.points}đ)</span>`;
                  })}
                </div>
              </div>
              <div className="ne-card p-4 border-t-4 border-t-blue-500">
                <div className="font-chakra font-bold text-sm text-blue-700 uppercase mb-2">Pool 2 (6 VĐV - 3 Top 1 + 3 Play-in)</div>
                <div className="flex flex-wrap gap-1.5">
                  ${pools.pool2.map(function (p) {
                    return html`<span key=${p.id} className="px-2 py-1 rounded bg-sky-50 border border-sky-200 font-bold text-sky-900">${p.name} (${p.group} - ${p.points}đ)</span>`;
                  })}
                </div>
              </div>
              <div className="ne-card p-4 border-t-4 border-t-slate-400">
                <div className="font-chakra font-bold text-sm text-slate-700 uppercase mb-2">Pool 3 (5 VĐV - Play-in Còn Lại)</div>
                <div className="flex flex-wrap gap-1.5">
                  ${pools.pool3.map(function (p) {
                    return html`<span key=${p.id} className="px-2 py-1 rounded bg-slate-100 border border-slate-200 font-bold text-slate-800">${p.name} (${p.group} - ${p.points}đ)</span>`;
                  })}
                </div>
              </div>
            </div>

            <div className="ne-card p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-100 pb-2">
                <div>
                  <h3 className="font-chakra font-bold text-base text-slate-900 uppercase">
                    Sơ Đồ Swiss Stage (${seasonConfig.seasonCode})
                  </h3>
                  <p className="text-xs text-slate-500">
                    ${isBtc
                      ? 'Click vào tên tuyển thủ ở từng cặp đấu để chọn người thắng - hệ thống tự ghép nhánh & áp dụng Shift Rule sang vòng tiếp theo.'
                      : 'Theo dõi tiến trình các cặp đấu 5 vòng Swiss Stage.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-chakra font-bold text-center">ROUND 1 (0-0) - Bo7 1R</div>
                  ${swissResult.buckets.r1_00.map(renderMatchCard)}
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-chakra font-bold text-center">ROUND 2 (1-0) - Bo7 1R</div>
                    ${swissResult.buckets.r2_10.length ? swissResult.buckets.r2_10.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-4 border border-dashed rounded-lg">Chờ kết quả R1</div>`}
                  </div>
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-slate-700 text-white text-xs font-chakra font-bold text-center">ROUND 2 (0-1) - Bo7 1R</div>
                    ${swissResult.buckets.r2_01.length ? swissResult.buckets.r2_01.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-4 border border-dashed rounded-lg">Chờ kết quả R1</div>`}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-chakra font-bold text-center">2-0 (Tranh Vé) - Bo7 3R</div>
                    ${swissResult.buckets.r3_20.length ? swissResult.buckets.r3_20.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-3 border border-dashed rounded-lg">Chờ R2</div>`}
                  </div>
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-chakra font-bold text-center">1-1 (Thường) - Bo7 1R</div>
                    ${swissResult.buckets.r3_11.length ? swissResult.buckets.r3_11.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-3 border border-dashed rounded-lg">Chờ R2</div>`}
                  </div>
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-chakra font-bold text-center">0-2 (Sinh Tử) - Bo7 3R</div>
                    ${swissResult.buckets.r3_02.length ? swissResult.buckets.r3_02.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-3 border border-dashed rounded-lg">Chờ R2</div>`}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-chakra font-bold text-center">2-1 (Tranh Vé) - Bo7 3R</div>
                    ${swissResult.buckets.r4_21.length ? swissResult.buckets.r4_21.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-4 border border-dashed rounded-lg">Chờ R3</div>`}
                  </div>
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-chakra font-bold text-center">1-2 (Sinh Tử) - Bo7 3R</div>
                    ${swissResult.buckets.r4_12.length ? swissResult.buckets.r4_12.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-4 border border-dashed rounded-lg">Chờ R3</div>`}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-blue-800 text-white text-xs font-chakra font-bold text-center">2-2 (Quyết Định) - Bo7 3R</div>
                    ${swissResult.buckets.r5_22.length ? swissResult.buckets.r5_22.map(renderMatchCard) : html`<div className="text-xs text-slate-400 text-center py-4 border border-dashed rounded-lg">Chờ R4</div>`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-blue-100 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <div className="font-chakra font-bold text-emerald-800 uppercase mb-2">Vào Playoff Top 8 (${swissResult.advancing.length}/8)</div>
                  <div className="flex flex-wrap gap-1.5">
                    ${swissResult.advancing.map(function (a) {
                      return html`<span key=${a.player.id} className="px-2 py-1 rounded bg-white border border-emerald-300 font-bold text-emerald-900">${a.seedLabel} ${a.player.name}</span>`;
                    })}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">
                  <div className="font-chakra font-bold text-slate-700 uppercase mb-2">Bị Loại (${swissResult.eliminated.length}/8)</div>
                  <div className="flex flex-wrap gap-1.5">
                    ${swissResult.eliminated.map(function (e) {
                      return html`<span key=${e.player.id} className="px-2 py-1 rounded bg-white border border-slate-300 font-semibold text-slate-600">(${e.score}) ${e.player.name}</span>`;
                    })}
                  </div>
                </div>
              </div>

              ${swissResult.shiftLogs.length > 0 && html`
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                  <div className="font-bold text-blue-900">Nhật ký Rematch & Shift Rule:</div>
                  ${swissResult.shiftLogs.map(function (log, idx) {
                    return html`<div key=${idx} className="text-blue-800">- ${log}</div>`;
                  })}
                </div>
              `}
            </div>
          </div>
        `}

        <!-- SUBTAB 3: PLAYOFF TOP 8 -->
        ${subTab === 'playoff' && html`
          <div className="ne-card p-5 space-y-4">
            <div>
              <h3 className="font-chakra font-bold text-base text-blue-800 uppercase">
                Giai Đoạn 3: Cây Nhánh Playoff Top 8 (Toàn Bộ Bo9 3-Round - Deuce Ván 9 R3)
              </h3>
              <p className="text-xs text-slate-500">
                ${isBtc ? 'Click vào tên tuyển thủ để mô phỏng đường tới Tân Vương ' + seasonConfig.seasonCode + '.' : 'Sơ đồ nhánh đấu loại trực tiếp Top 8.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="space-y-3">
                <div className="font-chakra font-bold text-blue-700 uppercase border-b border-blue-100 pb-1">Tứ Kết (Ngày 10-11)</div>
                ${playoffBracket.quarters.map(function (m) {
                  const w = playoffWinners[m.id];
                  return html`
                    <div key=${m.id} className="p-2.5 rounded-xl border border-blue-100 bg-blue-50/30 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-500">${m.label} - ${m.format}</div>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p1.id); }} className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold ' + (w === m.p1.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200')}>
                        ${m.p1.seedLabel ? m.p1.seedLabel + ' ' : ''}${m.p1.name}
                      </button>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p2.id); }} className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold ' + (w === m.p2.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200')}>
                        ${m.p2.seedLabel ? m.p2.seedLabel + ' ' : ''}${m.p2.name}
                      </button>
                    </div>
                  `;
                })}
              </div>

              <div className="space-y-3">
                <div className="font-chakra font-bold text-blue-700 uppercase border-b border-blue-100 pb-1">Bán Kết (Ngày 12)</div>
                ${playoffBracket.semis.map(function (m) {
                  const w = playoffWinners[m.id];
                  return html`
                    <div key=${m.id} className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
                      <div className="text-[10px] font-bold text-blue-700">${m.label} - ${m.format}</div>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p1.id); }} className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold ' + (w === m.p1.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200')}>
                        ${m.p1.name}
                      </button>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p2.id); }} className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold ' + (w === m.p2.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200')}>
                        ${m.p2.name}
                      </button>
                    </div>
                  `;
                })}
              </div>

              <div className="space-y-3">
                <div className="font-chakra font-bold text-slate-700 uppercase border-b border-slate-200 pb-1">Tranh Hạng 3 (Ngày 13)</div>
                ${(function () {
                  const m = playoffBracket.bronze;
                  const w = playoffWinners[m.id];
                  return html`
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-500">${m.label} - ${m.format}</div>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p1.id); }} className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold ' + (w === m.p1.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200')}>
                        ${m.p1.name}
                      </button>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p2.id); }} className=${'w-full px-2.5 py-1.5 rounded-lg border text-left font-bold ' + (w === m.p2.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200')}>
                        ${m.p2.name}
                      </button>
                    </div>
                  `;
                })()}
              </div>

              <div className="space-y-3">
                <div className="font-chakra font-bold text-blue-900 uppercase border-b border-blue-200 pb-1">Chung Kết Tổng (Ngày 13)</div>
                ${(function () {
                  const m = playoffBracket.grandFinals;
                  const w = playoffWinners[m.id];
                  return html`
                    <div className="p-3 rounded-xl border-2 border-blue-500 bg-blue-50 space-y-2 shadow-sm">
                      <div className="text-[10px] font-bold text-blue-800">${m.label} - ${m.format}</div>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p1.id); }} className=${'w-full px-2.5 py-2 rounded-lg border text-left font-bold ' + (w === m.p1.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 border-blue-200')}>
                        ${m.p1.name}
                      </button>
                      <button disabled=${!isBtc} onClick=${function () { pickPlayoffWinner(m.id, m.p2.id); }} className=${'w-full px-2.5 py-2 rounded-lg border text-left font-bold ' + (w === m.p2.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 border-blue-200')}>
                        ${m.p2.name}
                      </button>
                      ${playoffBracket.podium.champion && html`
                        <div className="p-2 rounded-lg bg-blue-700 text-white text-center font-chakra font-bold text-sm">
                          TÂN VƯƠNG: ${playoffBracket.podium.champion.name}
                        </div>
                      `}
                    </div>
                  `;
                })()}
              </div>
            </div>
          </div>
        `}

        <!-- SUBTAB 4: ROSTER 32 VĐV (BTC Only) -->
        ${isBtc && subTab === 'roster' && html`
          <div className="ne-card p-5 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-chakra font-bold text-base text-blue-800 uppercase">Chỉnh Sửa Danh Sách 32 Tuyển Thủ</h3>
                <p className="text-slate-500">Mỗi dòng tương ứng 1 tuyển thủ (từ Hạt giống #1 đến #32).</p>
              </div>
              <div className="flex gap-2">
                <button onClick=${function () { onResetDefaultRacers(); setRosterText(global.CLAN_TOURNAMENT_DATA.DEFAULT_RACERS.join('\n')); }} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 font-semibold">
                  Nạp Danh Sách Mẫu
                </button>
                <button onClick=${applyRosterText} className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  Áp Dụng 32 Tuyển Thủ
                </button>
              </div>
            </div>
            <textarea
              rows="12"
              value=${rosterText}
              onInput=${function (e) { setRosterText(e.target.value); }}
              className="w-full p-3 rounded-xl border border-blue-200 font-mono text-xs focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
        `}
      </div>
    `;
  }

  global.CLAN_VIEWS = global.CLAN_VIEWS || {};
  global.CLAN_VIEWS.SimulatorView = SimulatorView;
})(window);
