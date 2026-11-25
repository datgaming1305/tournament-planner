// Tab 3: Quản lý & Tra cứu Kho Map (Top 5 thành tích) / Xe & Pet (Sắp xếp theo tần suất sử dụng)
(function (global) {
  'use strict';

  function GarageMapsView(props) {
    const html = htm.bind(React.createElement);
    const { useState, useMemo } = React;
    const { isBtc, cars, setCars, pets, setPets, maps, setMaps } = props;
    const Engine = global.CLAN_TOURNAMENT_ENGINE;

    const [subTab, setSubTab] = useState('maps'); // 'maps' | 'cars' | 'pets'
    const [search, setSearch] = useState('');
    const [starFilter, setStarFilter] = useState('all'); // 'all' | 3 | 4 | 5
    const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'disabled'
    const [sortMode, setSortMode] = useState('usage_desc'); // 'usage_desc' | 'default' | 'alpha'
    const [selectedMapTop5, setSelectedMapTop5] = useState(null);

    // Form thêm mới
    const [newName, setNewName] = useState('');
    const [newImg, setNewImg] = useState('');
    const [newMapStars, setNewMapStars] = useState(5);

    // Inline Edit state
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editImg, setEditImg] = useState('');
    const [editStars, setEditStars] = useState(5);

    // Roll Map Utility (BTC)
    const [rollStarMode, setRollStarMode] = useState('all');
    const [bannedIds, setBannedIds] = useState([]);
    const [rolledMap, setRolledMap] = useState(null);

    const activeMapsCount = maps.filter(function (m) { return m.active; }).length;
    const activeCarsCount = cars.filter(function (c) { return c.active; }).length;
    const activePetsCount = (pets || []).filter(function (p) { return p.active; }).length;

    const filteredMaps = useMemo(function () {
      const q = search.trim().toLowerCase();
      return maps.filter(function (m) {
        if (!isBtc && !m.active) return false;
        if (q && m.name.toLowerCase().indexOf(q) === -1) return false;
        if (starFilter !== 'all' && m.stars !== Number(starFilter)) return false;
        if (isBtc && statusFilter === 'active' && !m.active) return false;
        if (isBtc && statusFilter === 'disabled' && m.active) return false;
        return true;
      });
    }, [maps, search, starFilter, statusFilter, isBtc]);

    function sortByUsageOrName(list) {
      const copy = list.slice();
      if (sortMode === 'usage_desc') {
        copy.sort(function (a, b) {
          const diff = (b.usageCount || 0) - (a.usageCount || 0);
          if (diff !== 0) return diff;
          return a.name.localeCompare(b.name, 'vi');
        });
      } else if (sortMode === 'alpha') {
        copy.sort(function (a, b) {
          return a.name.localeCompare(b.name, 'vi');
        });
      }
      return copy;
    }

    const filteredCars = useMemo(function () {
      const q = search.trim().toLowerCase();
      const base = cars.filter(function (c) {
        if (!isBtc && !c.active) return false;
        if (q && c.name.toLowerCase().indexOf(q) === -1) return false;
        if (isBtc && statusFilter === 'active' && !c.active) return false;
        if (isBtc && statusFilter === 'disabled' && c.active) return false;
        return true;
      });
      return sortByUsageOrName(base);
    }, [cars, search, statusFilter, isBtc, sortMode]);

    const filteredPets = useMemo(function () {
      const q = search.trim().toLowerCase();
      const base = (pets || []).filter(function (p) {
        if (!isBtc && !p.active) return false;
        if (q && p.name.toLowerCase().indexOf(q) === -1) return false;
        if (isBtc && statusFilter === 'active' && !p.active) return false;
        if (isBtc && statusFilter === 'disabled' && p.active) return false;
        return true;
      });
      return sortByUsageOrName(base);
    }, [pets, search, statusFilter, isBtc, sortMode]);

    function toggleItemActive(list, setter, id) {
      setter(list.map(function (item) {
        return item.id === id ? Object.assign({}, item, { active: !item.active }) : item;
      }));
    }

    function handleAddItem(e) {
      e.preventDefault();
      const name = newName.trim();
      if (!name) return;
      const img = newImg.trim();

      if (subTab === 'maps') {
        const st = Number(newMapStars);
        const starLabel = st === 5 ? '5★+' : (st + '★');
        setMaps([{ id: 'map_custom_' + Date.now(), name: name, stars: st, starLabel: starLabel, active: true, img: img, top5: [] }].concat(maps));
      } else if (subTab === 'cars') {
        setCars([{ id: 'car_custom_' + Date.now(), name: name, active: true, note: 'Thêm thủ công', img: img, usageCount: 0 }].concat(cars));
      } else {
        setPets([{ id: 'pet_custom_' + Date.now(), name: name, active: true, img: img, usageCount: 0 }].concat(pets || []));
      }
      setNewName('');
      setNewImg('');
    }

    function startEdit(item) {
      setEditingId(item.id);
      setEditName(item.name);
      setEditImg(item.img || '');
      if (item.stars) setEditStars(item.stars);
    }

    function saveEdit(id) {
      const name = editName.trim();
      if (!name) return;
      const img = editImg.trim();

      if (subTab === 'maps') {
        const st = Number(editStars);
        const starLabel = st === 5 ? '5★+' : (st + '★');
        setMaps(maps.map(function (m) {
          return m.id === id ? Object.assign({}, m, { name: name, stars: st, starLabel: starLabel, img: img }) : m;
        }));
      } else if (subTab === 'cars') {
        setCars(cars.map(function (c) {
          return c.id === id ? Object.assign({}, c, { name: name, img: img }) : c;
        }));
      } else {
        setPets((pets || []).map(function (p) {
          return p.id === id ? Object.assign({}, p, { name: name, img: img }) : p;
        }));
      }
      setEditingId(null);
    }

    function handleRollMap() {
      const opts = { excludeIds: bannedIds };
      if (rollStarMode !== 'all') opts.exactStars = Number(rollStarMode);
      const picked = Engine.rollRandomMap(maps, opts);
      setRolledMap(picked || { name: 'Không còn Map Active hợp lệ!', starLabel: '-' });
    }

    function toggleBanForRoll(id) {
      if (bannedIds.indexOf(id) !== -1) {
        setBannedIds(bannedIds.filter(function (x) { return x !== id; }));
      } else {
        setBannedIds(bannedIds.concat([id]));
      }
    }

    return html`
      <div className="space-y-6">
        <!-- Header & Sub-tabs -->
        <div className="ne-card p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-chakra font-bold text-lg text-slate-900 uppercase">
              Kho Bản Đồ, Xe & Thú Cưng Thi Đấu
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ${isBtc
                ? 'Chế độ BTC: Có thể Thêm, Sửa tên/ảnh và Bật/Tắt trạng thái Active. Map có kèm Top 5 thành tích; Xe & Pet sắp xếp theo tần suất sử dụng.'
                : 'Tra cứu bản đồ (kèm Top 5 thành tích kỷ lục), danh sách Xe & Pet sắp xếp theo độ phổ biến từ cao đến thấp.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 bg-blue-50 p-1 rounded-xl border border-blue-200 text-xs font-bold">
            <button
              onClick=${function () { setSubTab('maps'); setEditingId(null); setSearch(''); }}
              className=${'px-3.5 py-1.5 rounded-lg transition-all ' + (subTab === 'maps' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-700 hover:bg-blue-100')}
            >
              Kho Map (${activeMapsCount}${isBtc ? '/' + maps.length : ''})
            </button>
            <button
              onClick=${function () { setSubTab('cars'); setEditingId(null); setSearch(''); }}
              className=${'px-3.5 py-1.5 rounded-lg transition-all ' + (subTab === 'cars' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-700 hover:bg-blue-100')}
            >
              Kho Xe (${activeCarsCount}${isBtc ? '/' + cars.length : ''})
            </button>
            <button
              onClick=${function () { setSubTab('pets'); setEditingId(null); setSearch(''); }}
              className=${'px-3.5 py-1.5 rounded-lg transition-all ' + (subTab === 'pets' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-700 hover:bg-blue-100')}
            >
              Kho Pet (${activePetsCount}${isBtc ? '/' + (pets || []).length : ''})
            </button>
          </div>
        </div>

        <!-- Roll Map Tool (BTC Only, Maps tab) -->
        ${isBtc && subTab === 'maps' && html`
          <div className="ne-card-blue p-4 flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="space-y-1">
              <div className="font-chakra font-bold text-sm text-blue-900 uppercase">
                Công Cụ Roll Map Ngẫu Nhiên (BTC - Chỉ Roll Trong Active Map Pool)
              </div>
              <div className="text-xs text-slate-600">
                Chọn Map 1 mở màn hoặc Roll Map 9 Deuce từ Pool 5★+ (tự động bỏ qua map đã tắt & map đã Ban).
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value=${rollStarMode}
                onChange=${function (e) { setRollStarMode(e.target.value); }}
                className="px-3 py-2 rounded-lg border border-blue-200 bg-white font-semibold text-slate-800"
              >
                <option value="all">Tất cả Map Active</option>
                <option value="3">Chỉ Map 3★</option>
                <option value="4">Chỉ Map 4★</option>
                <option value="5">Chỉ Map 5★+ (Deuce R3 / Map 8-9)</option>
              </select>
              <button
                onClick=${handleRollMap}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all"
              >
                Roll Map Ngẫu Nhiên
              </button>
              ${bannedIds.length > 0 && html`
                <button
                  onClick=${function () { setBannedIds([]); }}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 font-semibold"
                >
                  Xóa ${bannedIds.length} Map Đang Ban
                </button>
              `}
            </div>
            ${rolledMap && html`
              <div className="w-full pt-3 mt-1 border-t border-blue-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  ${rolledMap.img && html`<img src=${rolledMap.img} alt=${rolledMap.name} className="w-16 h-10 object-cover rounded-lg border border-blue-300" />`}
                  <span className="text-xs font-bold text-blue-700 uppercase">Kết quả Roll:</span>
                  <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-chakra font-bold text-sm">
                    [${rolledMap.starLabel}] ${rolledMap.name}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Đã loại trừ map bị tắt & ${bannedIds.length} map Ban</span>
              </div>
            `}
          </div>
        `}

        <!-- Filter & Add Bar -->
        <div className="ne-card p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder=${subTab === 'maps' ? 'Tìm tên bản đồ...' : (subTab === 'cars' ? 'Tìm tên xe...' : 'Tìm tên pet...')}
                value=${search}
                onInput=${function (e) { setSearch(e.target.value); }}
                className="px-3 py-2 rounded-lg border border-slate-300 text-xs w-full sm:w-64 focus:outline-none focus:border-blue-500"
              />
              ${subTab === 'maps' && html`
                <select
                  value=${starFilter}
                  onChange=${function (e) { setStarFilter(e.target.value); }}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                >
                  <option value="all">Mọi độ khó</option>
                  <option value="3">3 Sao</option>
                  <option value="4">4 Sao</option>
                  <option value="5">5 Sao+</option>
                </select>
              `}
              ${(subTab === 'cars' || subTab === 'pets') && html`
                <select
                  value=${sortMode}
                  onChange=${function (e) { setSortMode(e.target.value); }}
                  className="px-3 py-2 rounded-lg border border-blue-200 text-xs bg-blue-50 text-blue-800 font-bold"
                >
                  <option value="usage_desc">Sắp xếp: Dùng nhiều -> ít</option>
                  <option value="default">Thứ tự danh sách gốc</option>
                  <option value="alpha">Tên A - Z</option>
                </select>
              `}
              ${isBtc && html`
                <select
                  value=${statusFilter}
                  onChange=${function (e) { setStatusFilter(e.target.value); }}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                >
                  <option value="all">Mọi trạng thái</option>
                  <option value="active">Đang mở (Active)</option>
                  <option value="disabled">Đã vô hiệu hóa</option>
                </select>
              `}
            </div>

            <!-- Add Form (BTC Only) -->
            ${isBtc && html`
              <form onSubmit=${handleAddItem} className="flex flex-wrap items-center gap-2 text-xs no-print">
                <input
                  type="text"
                  placeholder=${subTab === 'maps' ? 'Tên Map mới...' : (subTab === 'cars' ? 'Tên Xe mới...' : 'Tên Pet mới...')}
                  value=${newName}
                  onInput=${function (e) { setNewName(e.target.value); }}
                  className="px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-500 w-36 sm:w-44"
                />
                <input
                  type="text"
                  placeholder="Link ảnh (tùy chọn)..."
                  value=${newImg}
                  onInput=${function (e) { setNewImg(e.target.value); }}
                  className="px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-500 w-36 sm:w-44"
                />
                ${subTab === 'maps' && html`
                  <select
                    value=${newMapStars}
                    onChange=${function (e) { setNewMapStars(e.target.value); }}
                    className="px-2.5 py-2 rounded-lg border border-blue-200 bg-white font-semibold"
                  >
                    <option value="3">3★</option>
                    <option value="4">4★</option>
                    <option value="5">5★+</option>
                  </select>
                `}
                <button type="submit" className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  + Thêm
                </button>
              </form>
            `}
          </div>

          <!-- MAP LIST -->
          ${subTab === 'maps' && html`
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              ${filteredMaps.map(function (m, idx) {
                const isEditing = isBtc && editingId === m.id;
                const isBanned = bannedIds.indexOf(m.id) !== -1;
                const top1Rec = m.top5 && m.top5[0];
                const starBadge = m.stars === 3
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : (m.stars === 4 ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-blue-100 text-blue-800 border-blue-300');

                return html`
                  <div
                    key=${m.id}
                    className=${'p-2.5 rounded-xl border flex flex-col gap-2 text-xs transition-all ' + (m.active ? 'bg-white border-slate-200 hover:border-blue-300' : 'bg-slate-100 border-slate-200 opacity-65')}
                  >
                    ${isEditing ? html`
                      <div className="flex flex-col gap-1.5">
                        <div className="flex gap-1.5">
                          <input type="text" value=${editName} onInput=${function (e) { setEditName(e.target.value); }} placeholder="Tên Map" className="px-2 py-1 rounded border border-blue-400 text-xs flex-1 min-w-0" />
                          <select value=${editStars} onChange=${function (e) { setEditStars(e.target.value); }} className="px-1.5 py-1 rounded border border-blue-400 text-xs bg-white">
                            <option value="3">3★</option>
                            <option value="4">4★</option>
                            <option value="5">5★+</option>
                          </select>
                        </div>
                        <div className="flex gap-1.5">
                          <input type="text" value=${editImg} onInput=${function (e) { setEditImg(e.target.value); }} placeholder="URL ảnh Map..." className="px-2 py-1 rounded border border-blue-400 text-[11px] flex-1 min-w-0" />
                          <button onClick=${function () { saveEdit(m.id); }} className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">Lưu</button>
                          <button onClick=${function () { setEditingId(null); }} className="px-2 py-1 rounded bg-slate-200 text-slate-700">Hủy</button>
                        </div>
                      </div>
                    ` : html`
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-16 h-11 rounded-lg bg-blue-50 border border-blue-100 overflow-hidden shrink-0 flex items-center justify-center">
                            ${m.img
                              ? html`<img src=${m.img} alt=${m.name} loading="lazy" className="w-full h-full object-cover" />`
                              : html`<span className="text-[10px] font-bold text-blue-400">${m.starLabel}</span>`}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className=${'px-1.5 py-0.2 rounded border text-[10px] font-bold shrink-0 ' + starBadge}>${m.starLabel}</span>
                              <span className="text-[10px] font-mono text-slate-400">#${idx + 1}</span>
                            </div>
                            <div className=${'font-bold truncate mt-0.5 ' + (m.active ? 'text-slate-900' : 'line-through text-slate-500')} title=${m.name}>
                              ${m.name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 no-print">
                          ${m.top5 && m.top5.length > 0 && html`
                            <button
                              onClick=${function () { setSelectedMapTop5(m); }}
                              className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 text-[10px] font-bold transition-all"
                              title="Xem Top 5 thành tích bản đồ"
                            >
                              Top 5
                            </button>
                          `}
                          ${isBtc && html`
                            <button
                              onClick=${function () { toggleBanForRoll(m.id); }}
                              className=${'px-1.5 py-1 rounded text-[10px] font-bold border ' + (isBanned ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-rose-50 hover:text-rose-600')}
                            >
                              ${isBanned ? 'Banned' : 'Ban'}
                            </button>
                            <button onClick=${function () { startEdit(m); }} className="px-2 py-1 rounded bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 text-[10px] font-semibold">
                              Sửa
                            </button>
                            <button
                              onClick=${function () { toggleItemActive(maps, setMaps, m.id); }}
                              className=${'px-2 py-1 rounded text-[10px] font-bold border ' + (m.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-700 border-slate-300')}
                            >
                              ${m.active ? 'Active' : 'Tắt'}
                            </button>
                          `}
                        </div>
                      </div>
                      ${top1Rec && html`
                        <div className="px-2 py-1 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center justify-between text-[11px] text-slate-600">
                          <span>Kỷ lục #1: <strong className="text-slate-900">${top1Rec.player}</strong> (${top1Rec.car || '-'})</span>
                          <span className="font-mono font-bold text-blue-700">${top1Rec.timeStr}</span>
                        </div>
                      `}
                    `}
                  </div>
                `;
              })}
            </div>
          `}

          <!-- CAR LIST & PET LIST -->
          ${(subTab === 'cars' || subTab === 'pets') && html`
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              ${(subTab === 'cars' ? filteredCars : filteredPets).map(function (item, idx) {
                const isEditing = isBtc && editingId === item.id;
                const listRef = subTab === 'cars' ? cars : pets;
                const setterRef = subTab === 'cars' ? setCars : setPets;
                const count = item.usageCount || 0;

                return html`
                  <div
                    key=${item.id}
                    className=${'p-2.5 rounded-xl border flex items-center justify-between gap-2.5 text-xs transition-all ' + (item.active ? 'bg-white border-slate-200 hover:border-blue-300' : 'bg-slate-100 border-slate-200 opacity-65')}
                  >
                    ${isEditing ? html`
                      <div className="flex flex-col gap-1.5 flex-1">
                        <input type="text" value=${editName} onInput=${function (e) { setEditName(e.target.value); }} placeholder="Tên..." className="px-2 py-1 rounded border border-blue-400 text-xs" />
                        <div className="flex gap-1.5">
                          <input type="text" value=${editImg} onInput=${function (e) { setEditImg(e.target.value); }} placeholder="URL ảnh..." className="px-2 py-1 rounded border border-blue-400 text-[11px] flex-1 min-w-0" />
                          <button onClick=${function () { saveEdit(item.id); }} className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">Lưu</button>
                          <button onClick=${function () { setEditingId(null); }} className="px-2 py-1 rounded bg-slate-200 text-slate-700">Hủy</button>
                        </div>
                      </div>
                    ` : html`
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-slate-50 border border-blue-100 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                          ${item.img
                            ? html`<img src=${item.img} alt=${item.name} loading="lazy" className="w-full h-full object-contain" />`
                            : html`<span className="text-[10px] font-bold text-slate-400">#${idx + 1}</span>`}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-400">#${idx + 1}</span>
                            <span className=${'px-1.5 py-0.2 rounded text-[10px] font-bold border ' + (count > 0 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-200')}>
                              ${count} lượt dùng
                            </span>
                          </div>
                          <div className=${'font-bold truncate mt-0.5 ' + (item.active ? 'text-slate-900' : 'line-through text-slate-500')} title=${item.name}>
                            ${item.name}
                          </div>
                        </div>
                      </div>
                      ${isBtc && html`
                        <div className="flex items-center gap-1 shrink-0 no-print">
                          <button onClick=${function () { startEdit(item); }} className="px-2 py-1 rounded bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 text-[10px] font-semibold">
                            Sửa
                          </button>
                          <button
                            onClick=${function () { toggleItemActive(listRef, setterRef, item.id); }}
                            className=${'px-2 py-1 rounded text-[10px] font-bold border ' + (item.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-700 border-slate-300')}
                          >
                            ${item.active ? 'Active' : 'Tắt'}
                          </button>
                        </div>
                      `}
                    `}
                  </div>
                `;
              })}
            </div>
          `}
        </div>

        <!-- Modal Xem Top 5 Thành Tích Bản Đồ -->
        ${selectedMapTop5 && html`
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4" onClick=${function () { setSelectedMapTop5(null); }}>
            <div className="bg-white rounded-2xl border border-blue-200 max-w-xl w-full p-5 space-y-4 shadow-2xl" onClick=${function (e) { e.stopPropagation(); }}>
              <div className="flex items-center justify-between gap-3 border-b border-blue-100 pb-3">
                <div className="flex items-center gap-3">
                  ${selectedMapTop5.img && html`<img src=${selectedMapTop5.img} alt=${selectedMapTop5.name} className="w-16 h-10 object-cover rounded-lg border border-blue-200" />`}
                  <div>
                    <div className="text-[11px] font-bold text-blue-600 uppercase">${selectedMapTop5.starLabel} - Top 5 Thành Tích</div>
                    <h3 className="font-chakra font-bold text-lg text-slate-900">${selectedMapTop5.name}</h3>
                  </div>
                </div>
                <button onClick=${function () { setSelectedMapTop5(null); }} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700">
                  Đóng
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
                      <th className="p-2 font-bold text-center w-12">#</th>
                      <th className="p-2 font-bold">Tuyển Thủ</th>
                      <th className="p-2 font-bold">Thời Gian</th>
                      <th className="p-2 font-bold">Xe</th>
                      <th className="p-2 font-bold">Pet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    ${(selectedMapTop5.top5 || []).map(function (rec, rIdx) {
                      return html`
                        <tr key=${rIdx} className=${rIdx === 0 ? 'bg-amber-50/70' : 'hover:bg-blue-50/30'}>
                          <td className="p-2 text-center font-chakra font-bold text-blue-700">#${rIdx + 1}</td>
                          <td className="p-2 font-bold text-slate-900">${rec.player}</td>
                          <td className="p-2 font-mono font-bold text-blue-700">${rec.timeStr}</td>
                          <td className="p-2 text-slate-700">${rec.car || '-'}</td>
                          <td className="p-2 text-slate-600">${rec.pet || '-'}</td>
                        </tr>
                      `;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  global.CLAN_VIEWS = global.CLAN_VIEWS || {};
  global.CLAN_VIEWS.GarageMapsView = GarageMapsView;
})(window);
