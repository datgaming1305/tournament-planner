// Engine mô phỏng giải đấu & tính điểm chuẩn Clan New Era (Season-Agnostic)
(function (global) {
  'use strict';

  function pseudoRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function shuffleWithSeed(array, seed) {
    const arr = array.slice();
    let s = seed || 1;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(pseudoRandom(s++) * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // --- 1. ACTIVE POOL & ROLL MAP ---
  function getActiveMaps(maps, options) {
    const opts = options || {};
    return (maps || []).filter(function (m) {
      if (!m.active) return false;
      if (opts.minStars && m.stars < opts.minStars) return false;
      if (opts.exactStars && m.stars !== opts.exactStars) return false;
      if (opts.excludeIds && opts.excludeIds.indexOf(m.id) !== -1) return false;
      return true;
    });
  }

  function rollRandomMap(maps, options) {
    const pool = getActiveMaps(maps, options);
    if (pool.length === 0) return null;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }

  // --- 2. QUALIFIER PHASE 1 & 2 ---
  function compareGroupStandings(a, b) {
    if (b.points !== a.points) return b.points - a.points;
    if (b.top1 !== a.top1) return b.top1 - a.top1;
    if (b.top2 !== a.top2) return b.top2 - a.top2;
    return a.seed - b.seed;
  }

  function buildGroups(racers, method, seed) {
    const list = (racers || []).slice(0, 32).map(function (name, idx) {
      return {
        id: 'R_' + (idx + 1),
        seed: idx + 1,
        name: (name && name.trim()) ? name.trim() : ('Tuyển thủ #' + (idx + 1)),
        pot: Math.floor(idx / 8) + 1
      };
    });

    while (list.length < 32) {
      const idx = list.length;
      list.push({
        id: 'R_' + (idx + 1),
        seed: idx + 1,
        name: 'Tuyển thủ #' + (idx + 1),
        pot: Math.floor(idx / 8) + 1
      });
    }

    const pot1 = list.slice(0, 8);
    const pot2 = list.slice(8, 16);
    const pot3 = list.slice(16, 24);
    const pot4 = list.slice(24, 32);

    let p1 = pot1, p2 = pot2, p3 = pot3, p4 = pot4;
    if (method === 'pot_draw') {
      p1 = shuffleWithSeed(pot1, seed * 17 + 1);
      p2 = shuffleWithSeed(pot2, seed * 31 + 3);
      p3 = shuffleWithSeed(pot3, seed * 47 + 5);
      p4 = shuffleWithSeed(pot4, seed * 73 + 7);
    } else if (method === 'random') {
      const all = shuffleWithSeed(list, seed * 97 + 11);
      p1 = all.slice(0, 8);
      p2 = all.slice(8, 16);
      p3 = all.slice(16, 24);
      p4 = all.slice(24, 32);
    }

    const groups = [];
    for (let g = 0; g < 8; g++) {
      const letter = String.fromCharCode(65 + g);
      let members;
      if (method === 'snake') {
        members = [pot1[g], pot2[7 - g], pot3[g], pot4[7 - g]];
      } else {
        members = [p1[g], p2[g], p3[g], p4[g]];
      }

      // Mô phỏng điểm 9 map vòng bảng (đảm bảo phản ánh hạt giống + biến động)
      const ranked = members.map(function (player, slotIdx) {
        const baseScore = [87, 72, 63, 44][slotIdx];
        const variance = Math.floor(pseudoRandom(seed * 13 + g * 7 + slotIdx * 19) * 11) - 3;
        const points = Math.max(20, Math.min(104, baseScore + variance));
        const top1 = slotIdx === 0 ? (3 + (g % 3)) : (slotIdx === 1 ? (1 + (g % 2)) : (slotIdx === 2 ? (g % 2) : 0));
        const top2 = slotIdx === 0 ? 3 : (slotIdx === 1 ? 3 : 2);
        return {
          id: player.id,
          seed: player.seed,
          name: player.name,
          pot: player.pot,
          group: letter,
          points: points,
          top1: top1,
          top2: top2
        };
      }).sort(compareGroupStandings);

      // Kiểm tra tiebreak
      for (let i = 0; i < ranked.length; i++) {
        ranked[i].rank = i + 1;
        ranked[i].needsTiebreakRace = false;
        if (i > 0) {
          const prev = ranked[i - 1];
          if (prev.points === ranked[i].points && prev.top1 === ranked[i].top1 && prev.top2 === ranked[i].top2) {
            prev.needsTiebreakRace = true;
            ranked[i].needsTiebreakRace = true;
          }
        }
      }

      groups.push({
        letter: letter,
        name: 'Bảng ' + letter,
        standings: ranked,
        top1: ranked[0],
        top2: ranked[1],
        top3: ranked[2],
        top4: ranked[3]
      });
    }

    return groups;
  }

  function buildPlayInMatches(groups) {
    return groups.map(function (g, idx) {
      return {
        id: 'PI_' + g.letter,
        matchNum: idx + 1,
        group: g.letter,
        p1: g.top2,
        p2: g.top3,
        format: 'Solo Bo7 1-Round'
      };
    });
  }

  // --- 3. 3-TIER SEEDING (5-6-5) & SWISS 5-ROUND ENGINE ---
  function buildSwissPools(groups, playInMatches, playInWinners) {
    const winnersDirect = groups.map(function (g) {
      return Object.assign({}, g.top1, { qualifierType: 'Top 1 Bảng ' + g.letter });
    }).sort(compareGroupStandings);

    const playInAdvancers = playInMatches.map(function (m) {
      const winId = playInWinners && playInWinners[m.id];
      const winner = (winId && winId === m.p2.id) ? m.p2 : m.p1;
      return Object.assign({}, winner, { qualifierType: 'Thắng Play-in Bảng ' + m.group });
    }).sort(compareGroupStandings);

    const pool1 = winnersDirect.slice(0, 5).map(function (p) {
      return Object.assign({}, p, { pool: 1 });
    });
    const pool2Top1 = winnersDirect.slice(5, 8).map(function (p) {
      return Object.assign({}, p, { pool: 2 });
    });
    const pool2PlayIn = playInAdvancers.slice(0, 3).map(function (p) {
      return Object.assign({}, p, { pool: 2 });
    });
    const pool2 = pool2Top1.concat(pool2PlayIn);
    const pool3 = playInAdvancers.slice(3, 8).map(function (p) {
      return Object.assign({}, p, { pool: 3 });
    });

    return {
      pool1: pool1,
      pool2: pool2,
      pool3: pool3,
      all16: pool1.concat(pool2, pool3)
    };
  }

  function hasPlayedBefore(historyMap, idA, idB) {
    if (!idA || !idB) return false;
    const setA = historyMap[idA];
    return setA ? setA.indexOf(idB) !== -1 : false;
  }

  function addMatchHistory(historyMap, idA, idB) {
    if (!historyMap[idA]) historyMap[idA] = [];
    if (!historyMap[idB]) historyMap[idB] = [];
    if (historyMap[idA].indexOf(idB) === -1) historyMap[idA].push(idB);
    if (historyMap[idB].indexOf(idA) === -1) historyMap[idB].push(idA);
  }

  // Ghép cặp một nhóm cùng hiệu số với Rematch Rule & Shift Rule (Backtracking đảm bảo không kẹt rematch)
  function pairPoolWithShiftRule(players, historyMap, seed, options) {
    const opts = options || {};
    const checkSameGroup = Boolean(opts.avoidSameGroup);
    const shuffled = shuffleWithSeed(players, seed);
    const shiftLogs = [];

    function solve(rem, enforceNoRematch, enforceNoSameGroup) {
      if (rem.length === 0) return [];
      if (rem.length === 1) return null;
      const p1 = rem[0];
      for (let i = 1; i < rem.length; i++) {
        const p2 = rem[i];
        if (enforceNoRematch && hasPlayedBefore(historyMap, p1.id, p2.id)) continue;
        if (enforceNoSameGroup && p1.group === p2.group) continue;
        const nextRem = rem.filter(function (_, idx) { return idx !== 0 && idx !== i; });
        const sub = solve(nextRem, enforceNoRematch, enforceNoSameGroup);
        if (sub !== null) {
          return [{ p1: p1, p2: p2, shiftedFrom: i > 1 ? rem[1] : null, isRematchFallback: !enforceNoRematch }].concat(sub);
        }
      }
      return null;
    }

    let pairs = solve(shuffled, true, checkSameGroup);
    if (!pairs && checkSameGroup) {
      pairs = solve(shuffled, true, false);
    }
    if (!pairs) {
      pairs = solve(shuffled, false, false) || [];
    }

    pairs.forEach(function (pair) {
      if (pair.shiftedFrom) {
        shiftLogs.push(
          'Shift Rule: ' + pair.p1.name + ' tránh gặp ' + pair.shiftedFrom.name + ' -> đẩy sang gặp ' + pair.p2.name
        );
      }
      if (pair.isRematchFallback) {
        shiftLogs.push(
          'Lưu ý Rematch: Bắt buộc ghép ' + pair.p1.name + ' vs ' + pair.p2.name + ' do không còn cặp khác'
        );
      }
    });

    return { pairs: pairs, shiftLogs: shiftLogs };
  }

  // Ghép cặp Pool 1 vs Pool 3 tránh cùng bảng
  function pairCrossPools(listA, listB, historyMap, seed) {
    const shuffledB = shuffleWithSeed(listB, seed);
    const shiftLogs = [];

    function backtrack(idx, rem) {
      if (idx === listA.length) return [];
      const p1 = listA[idx];
      for (let i = 0; i < rem.length; i++) {
        const p2 = rem[i];
        if (p1.group !== p2.group && !hasPlayedBefore(historyMap, p1.id, p2.id)) {
          const nextRem = rem.filter(function (_, rIdx) { return rIdx !== i; });
          const res = backtrack(idx + 1, nextRem);
          if (res !== null) return [{ p1: p1, p2: p2, avoidedSameGroup: true }].concat(res);
        }
      }
      return null;
    }

    let matched = backtrack(0, shuffledB);
    if (!matched) {
      matched = listA.map(function (p1, i) {
        const p2 = shuffledB[i];
        if (p1.group === p2.group) {
          shiftLogs.push('Lưu ý: Không thể tránh cùng bảng cho cặp ' + p1.name + ' vs ' + p2.name);
        }
        return { p1: p1, p2: p2, avoidedSameGroup: p1.group !== p2.group };
      });
    }
    return { pairs: matched, shiftLogs: shiftLogs };
  }

  // Mô phỏng toàn bộ cây Swiss 5 Rounds theo matchWinners hiện có
  function simulateSwissBracket(pools, matchWinners, seed) {
    const s = seed || 1;
    const winners = matchWinners || {};
    const historyMap = {};
    const playerState = {};
    const allShiftLogs = [];

    pools.all16.forEach(function (p) {
      playerState[p.id] = Object.assign({}, p, { wins: 0, losses: 0, status: 'active' });
    });

    const advancing = [];
    const eliminated = [];

    function recordOutcome(matchObj) {
      if (!matchObj.p1 || !matchObj.p2) return;
      addMatchHistory(historyMap, matchObj.p1.id, matchObj.p2.id);

      const chosenId = winners[matchObj.id];
      if (!chosenId) {
        matchObj.winnerId = null;
        return;
      }
      const winner = chosenId === matchObj.p2.id ? matchObj.p2 : matchObj.p1;
      const loser = winner.id === matchObj.p1.id ? matchObj.p2 : matchObj.p1;
      matchObj.winnerId = winner.id;

      const ws = playerState[winner.id];
      const ls = playerState[loser.id];
      ws.wins += 1;
      ls.losses += 1;

      if (ws.wins >= 3) {
        ws.status = 'advanced';
        advancing.push({
          seedNum: advancing.length + 1,
          seedLabel: '#' + (advancing.length + 1) + ' (' + ws.wins + '-' + ws.losses + ')',
          record: ws.wins + '-' + ws.losses,
          player: ws
        });
      }
      if (ls.losses >= 3) {
        ls.status = 'eliminated';
        eliminated.push({
          score: ls.wins + '-' + ls.losses,
          player: ls
        });
      }
    }

    function getBucket(w, l) {
      return pools.all16
        .map(function (p) { return playerState[p.id]; })
        .filter(function (st) { return st.status === 'active' && st.wins === w && st.losses === l; });
    }

    // ROUND 1 (0-0): 5 trận Pool 1 vs Pool 3, 3 trận Pool 2 vs Pool 2 - Bo7 1-Round
    const r1Cross = pairCrossPools(pools.pool1, pools.pool3, historyMap, s * 53);
    const r1Pool2 = pairPoolWithShiftRule(pools.pool2, historyMap, s * 29, { avoidSameGroup: true });
    allShiftLogs.push.apply(allShiftLogs, r1Cross.shiftLogs.concat(r1Pool2.shiftLogs));

    const r1Matches = r1Cross.pairs.concat(r1Pool2.pairs).map(function (pair, idx) {
      const m = {
        id: 'SW_R1_M' + (idx + 1),
        round: 1,
        bucket: '0-0',
        format: 'Bo7 1-Round',
        tierTag: idx < 5 ? 'Pool 1 vs Pool 3' : 'Pool 2 vs Pool 2',
        p1: pair.p1,
        p2: pair.p2,
        winnerId: null
      };
      recordOutcome(m);
      return m;
    });

    // ROUND 2 (1-0 & 0-1) - Bo7 1-Round
    const r2HighRes = pairPoolWithShiftRule(getBucket(1, 0), historyMap, s * 61);
    const r2LowRes = pairPoolWithShiftRule(getBucket(0, 1), historyMap, s * 67);
    allShiftLogs.push.apply(allShiftLogs, r2HighRes.shiftLogs.concat(r2LowRes.shiftLogs));

    const r2_10 = r2HighRes.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R2_10_M' + (idx + 1), round: 2, bucket: '1-0', format: 'Bo7 1-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });
    const r2_01 = r2LowRes.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R2_01_M' + (idx + 1), round: 2, bucket: '0-1', format: 'Bo7 1-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });

    // ROUND 3 (2-0 Bo7 3R, 1-1 Bo7 1R, 0-2 Bo7 3R)
    const r3_20Res = pairPoolWithShiftRule(getBucket(2, 0), historyMap, s * 71);
    const r3_11Res = pairPoolWithShiftRule(getBucket(1, 1), historyMap, s * 79);
    const r3_02Res = pairPoolWithShiftRule(getBucket(0, 2), historyMap, s * 83);
    allShiftLogs.push.apply(allShiftLogs, r3_20Res.shiftLogs.concat(r3_11Res.shiftLogs, r3_02Res.shiftLogs));

    const r3_20 = r3_20Res.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R3_20_M' + (idx + 1), round: 3, bucket: '2-0', format: 'Bo7 3-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });
    const r3_11 = r3_11Res.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R3_11_M' + (idx + 1), round: 3, bucket: '1-1', format: 'Bo7 1-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });
    const r3_02 = r3_02Res.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R3_02_M' + (idx + 1), round: 3, bucket: '0-2', format: 'Bo7 3-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });

    // ROUND 4 (2-1 Bo7 3R, 1-2 Bo7 3R)
    const r4_21Res = pairPoolWithShiftRule(getBucket(2, 1), historyMap, s * 89);
    const r4_12Res = pairPoolWithShiftRule(getBucket(1, 2), historyMap, s * 97);
    allShiftLogs.push.apply(allShiftLogs, r4_21Res.shiftLogs.concat(r4_12Res.shiftLogs));

    const r4_21 = r4_21Res.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R4_21_M' + (idx + 1), round: 4, bucket: '2-1', format: 'Bo7 3-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });
    const r4_12 = r4_12Res.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R4_12_M' + (idx + 1), round: 4, bucket: '1-2', format: 'Bo7 3-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });

    // ROUND 5 (2-2 Bo7 3R)
    const r5_22Res = pairPoolWithShiftRule(getBucket(2, 2), historyMap, s * 101);
    allShiftLogs.push.apply(allShiftLogs, r5_22Res.shiftLogs);

    const r5_22 = r5_22Res.pairs.map(function (pair, idx) {
      const m = { id: 'SW_R5_22_M' + (idx + 1), round: 5, bucket: '2-2', format: 'Bo7 3-Round', p1: pair.p1, p2: pair.p2, winnerId: null };
      recordOutcome(m);
      return m;
    });

    return {
      buckets: {
        r1_00: r1Matches,
        r2_10: r2_10,
        r2_01: r2_01,
        r3_20: r3_20,
        r3_11: r3_11,
        r3_02: r3_02,
        r4_21: r4_21,
        r4_12: r4_12,
        r5_22: r5_22
      },
      advancing: advancing,
      eliminated: eliminated,
      shiftLogs: allShiftLogs
    };
  }

  // --- 4. PLAYOFF BRACKET ENGINE (Bo9 3-Round) ---
  function buildPlayoffBracket(advancing, playoffWinners) {
    const winners = playoffWinners || {};
    function getSeed(idx, fallbackLabel) {
      const found = advancing[idx];
      return found ? { id: found.player.id, name: found.player.name, seedLabel: found.seedLabel } : { id: 'TBD_' + idx, name: fallbackLabel, seedLabel: fallbackLabel };
    }

    const qf1 = { id: 'PO_QF1', label: 'Tứ Kết 1', format: 'Bo9 3-Round', p1: getSeed(0, '#1 (3-0)'), p2: getSeed(7, '#8 (3-2)') };
    const qf2 = { id: 'PO_QF2', label: 'Tứ Kết 2', format: 'Bo9 3-Round', p1: getSeed(3, '#4 (3-1)'), p2: getSeed(4, '#5 (3-1)') };
    const qf3 = { id: 'PO_QF3', label: 'Tứ Kết 3', format: 'Bo9 3-Round', p1: getSeed(1, '#2 (3-0)'), p2: getSeed(6, '#7 (3-2)') };
    const qf4 = { id: 'PO_QF4', label: 'Tứ Kết 4', format: 'Bo9 3-Round', p1: getSeed(2, '#3 (3-1)'), p2: getSeed(5, '#6 (3-2)') };

    function resolveMatch(m, fallbackWin, fallbackLose) {
      const wId = winners[m.id];
      if (!wId) {
        return {
          winner: { id: 'TBD_W_' + m.id, name: fallbackWin, seedLabel: '' },
          loser: { id: 'TBD_L_' + m.id, name: fallbackLose, seedLabel: '' }
        };
      }
      const isP2 = wId === m.p2.id;
      return {
        winner: isP2 ? m.p2 : m.p1,
        loser: isP2 ? m.p1 : m.p2
      };
    }

    const rQF1 = resolveMatch(qf1, 'Thắng TK1', 'Thua TK1');
    const rQF2 = resolveMatch(qf2, 'Thắng TK2', 'Thua TK2');
    const rQF3 = resolveMatch(qf3, 'Thắng TK3', 'Thua TK3');
    const rQF4 = resolveMatch(qf4, 'Thắng TK4', 'Thua TK4');

    const sf1 = { id: 'PO_SF1', label: 'Bán Kết 1', format: 'Bo9 3-Round', p1: rQF1.winner, p2: rQF2.winner };
    const sf2 = { id: 'PO_SF2', label: 'Bán Kết 2', format: 'Bo9 3-Round', p1: rQF3.winner, p2: rQF4.winner };

    const rSF1 = resolveMatch(sf1, 'Thắng BK1', 'Thua BK1');
    const rSF2 = resolveMatch(sf2, 'Thắng BK2', 'Thua BK2');

    const bronze = { id: 'PO_3RD', label: 'Tranh Hạng 3', format: 'Bo9 3-Round', p1: rSF1.loser, p2: rSF2.loser };
    const gf = { id: 'PO_GF', label: 'Chung Kết Tổng', format: 'Bo9 3-Round (Deuce R3)', p1: rSF1.winner, p2: rSF2.winner };

    const rBronze = resolveMatch(bronze, 'Hạng 3', 'Hạng 4');
    const rGF = resolveMatch(gf, 'Tân Vương', 'Á Quân');

    return {
      quarters: [qf1, qf2, qf3, qf4],
      semis: [sf1, sf2],
      bronze: bronze,
      grandFinals: gf,
      podium: {
        champion: winners[gf.id] ? rGF.winner : null,
        runnerUp: winners[gf.id] ? rGF.loser : null,
        third: winners[bronze.id] ? rBronze.winner : null,
        fourth: winners[bronze.id] ? rBronze.loser : null
      }
    };
  }

  // --- 5. SCORING & GPR CALCULATORS ---
  function calcGroupRacePoints(isTop1, isKingMap, timeGapSeconds, isDnf) {
    if (isDnf) return 0;
    if (isTop1) return isKingMap ? 12 : 11;
    const gap = Math.max(0, Number(timeGapSeconds) || 0);
    const penalty = Math.floor(gap) + 1;
    return Math.max(0, 11 - penalty);
  }

  function calcGroupPerformanceGpr(totalGroupPoints) {
    return Number(((Number(totalGroupPoints) || 0) * 0.15).toFixed(2));
  }

  function calcSolo1RoundPoints(basePoints, loserWins) {
    const base = Number(basePoints) || 0;
    const lw = Math.max(0, Math.min(3, Number(loserWins) || 0));
    const winnerPts = Number((base * (1 - (lw / 4) * 0.4)).toFixed(2));
    const loserPts = Number((lw * 0.2).toFixed(2));
    return { winnerPts: winnerPts, loserPts: loserPts };
  }

  function calcSolo3RoundPoints(basePoints, roundScore, mapWinDiff) {
    const base = Number(basePoints) || 0;
    let ratio = 0;
    if (roundScore === '2-0') ratio = 1.0;
    else if (roundScore === '2-1') ratio = 0.75;
    else if (roundScore === '1-2') ratio = 0.25;
    else ratio = 0;

    const baseEarned = base * ratio;
    const diffBonus = (Number(mapWinDiff) || 0) * 0.1;
    return {
      baseEarned: Number(baseEarned.toFixed(2)),
      diffBonus: Number(diffBonus.toFixed(2)),
      total: Number((baseEarned + diffBonus).toFixed(2))
    };
  }

  function calcMultiSeasonGpr(seasonN, seasonN1, seasonN2, activeRecordsCount) {
    const sN = (Number(seasonN) || 0) * 1.0;
    const sN1 = (Number(seasonN1) || 0) * 0.5;
    const sN2 = (Number(seasonN2) || 0) * 0.25;
    const rec = (Number(activeRecordsCount) || 0) * 1.0;
    return {
      sN: Number(sN.toFixed(2)),
      sN1: Number(sN1.toFixed(2)),
      sN2: Number(sN2.toFixed(2)),
      rec: Number(rec.toFixed(2)),
      total: Number((sN + sN1 + sN2 + rec).toFixed(2))
    };
  }

  // --- 0. TIME PARSER & FORMATTER (ĐỒNG BỘ FORMAT POINTCOUNT: m:ss:cc hoặc mmsscc) ---
  function parseTime(val) {
    if (val === null || val === undefined) return null;
    const str = String(val).trim();
    if (!str || str.toUpperCase() === 'X') return null;

    if (str.indexOf(':') !== -1 || str.indexOf('.') !== -1) {
      let m = 0, s = 0, cStr = '0';
      const parts = str.replace(',', '.').split(/[:.]/);
      if (parts.length === 3) {
        m = Number(parts[0]);
        s = Number(parts[1]);
        cStr = parts[2];
      } else if (parts.length === 2) {
        s = Number(parts[0]);
        cStr = parts[1];
      } else {
        return null;
      }
      if (isNaN(m) || isNaN(s) || isNaN(Number(cStr))) return null;

      let cMultiplier = 10;
      if (cStr.length === 3) cMultiplier = 1;
      else if (cStr.length === 2) cMultiplier = 10;
      else if (cStr.length === 1) cMultiplier = 100;

      return (m * 60000) + (s * 1000) + (Number(cStr) * cMultiplier);
    }

    const digits = str.replace(/\D/g, '');
    if (!digits) return null;
    let m = 0, s = 0, c = 0;
    if (digits.length >= 5) {
      c = Number(digits.slice(-2));
      s = Number(digits.slice(-4, -2));
      m = Number(digits.slice(0, -4));
    } else if (digits.length >= 3) {
      c = Number(digits.slice(-2));
      s = Number(digits.slice(0, -2));
    } else {
      c = Number(digits);
    }
    return (m * 60000) + (s * 1000) + (c * 10);
  }

  function formatTimeDisplay(val) {
    if (val === null || val === undefined) return '';
    const str = String(val).trim();
    if (!str) return '';
    if (str.toUpperCase() === 'X') return 'X';
    const ms = parseTime(str);
    if (ms === null) return str;
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const c = Math.floor((ms % 1000) / 10);
    return m + ':' + String(s).padStart(2, '0') + ':' + String(c).padStart(2, '0');
  }

  // Khảo sát Tân binh (5 ván thực chiến, hỗ trợ nhập thời gian format m:ss:cc / mmsscc / X=DNF)
  function calcRookieTrialScore(races) {
    let timePoints = 0;
    let beatCaptainWins = 0;

    (races || []).forEach(function (r) {
      const rawStr = (r.timeStr !== undefined ? String(r.timeStr).trim() : '');
      const isDnf = Boolean(r.dnf) || rawStr.toUpperCase() === 'X';
      if (!isDnf) {
        const actualMs = parseTime(rawStr);
        const targetMs = Number(r.targetMs) || parseTime(r.targetTime) || 0;
        if (actualMs !== null && targetMs > 0) {
          const diffSec = (actualMs - targetMs) / 1000;
          if (diffSec <= 0) {
            timePoints += Number(r.basePoints) || 0;
          } else {
            // Chậm 0.01-0.99s trừ 1đ, 1.00-1.99s trừ 2đ...
            const penalty = Math.floor(diffSec) + 1;
            timePoints += Math.max(0, (Number(r.basePoints) || 0) - penalty);
          }
        }
      }
      if (r.beatCaptain) beatCaptainWins += 1;
    });

    const matchBonus = beatCaptainWins + (beatCaptainWins >= 3 ? 3 : 0);
    const totalSurveyScore = Number((timePoints + matchBonus).toFixed(2));
    const initialGpr = Number(Math.min(15, totalSurveyScore * 0.25).toFixed(2));

    let tier = 'Tier C';
    let tierDesc = 'Tân binh cọ xát - Hạt giống tập sự';
    if (totalSurveyScore >= 45) {
      tier = 'Tier A';
      tierDesc = 'Tân binh xuất sắc - Hạt giống tiềm năng';
    } else if (totalSurveyScore >= 30) {
      tier = 'Tier B';
      tierDesc = 'Thành viên chính thức - Hạt giống tiêu chuẩn';
    }

    return {
      timePoints: Number(timePoints.toFixed(2)),
      beatCaptainWins: beatCaptainWins,
      matchBonus: matchBonus,
      totalSurveyScore: totalSurveyScore,
      initialGpr: initialGpr,
      tier: tier,
      tierDesc: tierDesc
    };
  }

  global.CLAN_TOURNAMENT_ENGINE = {
    parseTime,
    formatTimeDisplay,
    shuffleWithSeed,
    getActiveMaps,
    rollRandomMap,
    buildGroups,
    buildPlayInMatches,
    buildSwissPools,
    simulateSwissBracket,
    buildPlayoffBracket,
    calcGroupRacePoints,
    calcGroupPerformanceGpr,
    calcSolo1RoundPoints,
    calcSolo3RoundPoints,
    calcMultiSeasonGpr,
    calcRookieTrialScore
  };
})(typeof window !== 'undefined' ? window : globalThis);
