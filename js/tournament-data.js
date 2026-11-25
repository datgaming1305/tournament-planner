// Dữ liệu chuẩn hóa đa mùa giải - Clan New Era (ZingSpeed Mobile)
(function (global) {
  'use strict';

  const DEFAULT_SEASON_CONFIG = {
    "seasonCode": "NES27",
    "seasonName": "NEW ERA SPRING 27",
    "slogan": "BEYOND THE HORIZON",
    "dateRange": "13 Ngày Thi Đấu Chính Thức (Từ [DD/MM] đến [DD/MM/2026])",
    "organizer": "Ban Tổ Chức & Ban Trọng Tài Clan NEW ERA",
    "platform": "Online 100% trên máy chủ chính thức ZingSpeed Mobile",
    "playerCount": 32,
    "totalDays": 13,
    "locationTags": [
        "ZING SPEED MOBILE",
        "HÀ NỘI",
        "ĐÀ NẴNG",
        "TP. HỒ CHÍ MINH"
    ],
    "grandHallChannel": "New Era • Grand Hall",
    "hotlineFacebook": "https://www.facebook.com/imtoanvo",
    "fanpageUrl": "https://www.facebook.com/newerasocialclub",
    "youtubeUrl": "https://www.youtube.com/@newerazsm",
    "tiktokUrl": "https://www.tiktok.com/@newera.zsm"
};

  const DEFAULT_RACERS = [
    "Hoshi",
    "Tangyezi",
    "Lả",
    "K",
    "Jongminh",
    "qanh",
    "Nex",
    "Ein",
    "Ruz",
    "CHIN",
    "Khang",
    "NBK",
    "Wuyhg",
    "Ei",
    "King",
    "Noway",
    "Orange",
    "Kin",
    "Vargina",
    "Zan",
    "Ding",
    "Merrin",
    "Dlaww",
    "Vincent",
    "antuyenn",
    "Fonggg",
    "QKIT",
    "Harlow",
    "Shark",
    "Tdattt",
    "luboiboi",
    "Benz"
];

  // 46 Xe duy nhất (đã xóa 1 xe trùng L-Song Sinh Chiến Diệu) + tần suất sử dụng thực tế
  const DEFAULT_CARS = [
    {
        "id": "car_1",
        "name": "Aston Martin",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/90BFLc5m/aston-martin.png",
        "usageCount": 38
    },
    {
        "id": "car_2",
        "name": "S-Breaker Vinh Dự",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/g27cSM53/s-breaker-vinh-du.png",
        "usageCount": 51
    },
    {
        "id": "car_3",
        "name": "Vẹt Thần Ánh Sáng",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/nzBLQv3H/vet-than-anh-sang.png",
        "usageCount": 2
    },
    {
        "id": "car_4",
        "name": "Aurora",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/gjKkgGF9/aurora.png",
        "usageCount": 2
    },
    {
        "id": "car_5",
        "name": "Thánh Ca Băng Hỏa",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/9fvMMxYM/thanh-ca-bang-hoa.png",
        "usageCount": 31
    },
    {
        "id": "car_6",
        "name": "Cảnh Sắc Rực Rỡ",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/wMkTw98x/canh-sac-ruc-ro.png",
        "usageCount": 0
    },
    {
        "id": "car_7",
        "name": "Sky Walker - Phá Giới",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/s2ZjtYdn/sky-walker-pha-gioi.png",
        "usageCount": 7
    },
    {
        "id": "car_8",
        "name": "Bugatti BOLIDE",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/T1cYtTMR/bugatti-bolide.png",
        "usageCount": 0
    },
    {
        "id": "car_9",
        "name": "Thợ Săn Phi Tốc",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/B6Hv1xm4/tho-san-phi-toc.png",
        "usageCount": 2
    },
    {
        "id": "car_10",
        "name": "Xích Luyện",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/760LTgKV/xich-luyen.png",
        "usageCount": 6
    },
    {
        "id": "car_11",
        "name": "Reno Sao Kim Cương",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/FH6FWPq3/reno-sao-kim-cuong.png",
        "usageCount": 1
    },
    {
        "id": "car_12",
        "name": "Ngọc Sáng Khói Mây",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/wjrxfWP7/ngoc-sang-khoi-may.png",
        "usageCount": 0
    },
    {
        "id": "car_13",
        "name": "Vực Thẳm Nước Sâu",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/mDCrFQmC/vuc-tham-nuoc-sau.png",
        "usageCount": 0
    },
    {
        "id": "car_14",
        "name": "Lưỡi Gươm Sấm Sét",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/13X5KxW1/luoi-guom-sam-set.png",
        "usageCount": 0
    },
    {
        "id": "car_15",
        "name": "Chú Gấu Bắc Cực Dễ Thương",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/MZ0T6mcP/chu-gau-bac-cuc-de-thuong.png",
        "usageCount": 0
    },
    {
        "id": "car_16",
        "name": "AE86",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/L5S8knW3/ae86.png",
        "usageCount": 1
    },
    {
        "id": "car_17",
        "name": "Mực Nhuộm Thanh Hoa",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/jS1qg89q/muc-nhuom-thanh-hoa.png",
        "usageCount": 0
    },
    {
        "id": "car_18",
        "name": "Maserati MC20 Cielo",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/kgGXyrjD/maserati-mc20-cielo.png",
        "usageCount": 2
    },
    {
        "id": "car_19",
        "name": "Giáo Phán Xét",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/2jd6k7bk/giao-phan-xet.png",
        "usageCount": 2
    },
    {
        "id": "car_20",
        "name": "Vua Tốc Độ",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/rmxptSfF/vua-toc-do.png",
        "usageCount": 0
    },
    {
        "id": "car_21",
        "name": "Sao Lấp Lánh",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/mrFL0Yfm/sao-lap-lanh.png",
        "usageCount": 0
    },
    {
        "id": "car_22",
        "name": "Ánh Sao Ban Mai",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/qqGM1pf5/anh-sao-ban-mai.png",
        "usageCount": 0
    },
    {
        "id": "car_23",
        "name": "Khải Huyền",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/gkY0nL8J/khai-huyen.png",
        "usageCount": 0
    },
    {
        "id": "car_24",
        "name": "Xích Diệm Khải Huyền",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/3RmwDgtp/xich-diem-khai-huyen.png",
        "usageCount": 0
    },
    {
        "id": "car_25",
        "name": "Night Rider",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/MpLZPs4T/night-rider.png",
        "usageCount": 0
    },
    {
        "id": "car_26",
        "name": "L-Song Sinh Chiến Diệu",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/zGvXkmxx/l-song-sinh-chien-dieu.png",
        "usageCount": 1
    },
    {
        "id": "car_27",
        "name": "Cực Âm Chiến Ca",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/zvkXxqZf/cuc-am-chien-ca.png",
        "usageCount": 0
    },
    {
        "id": "car_28",
        "name": "T-Vịt",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/hGHjjC1G/t-vit.png",
        "usageCount": 0
    },
    {
        "id": "car_29",
        "name": "T-Cá Heo",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/d0z11WjV/t-ca-heo.png",
        "usageCount": 6
    },
    {
        "id": "car_30",
        "name": "L-Qing",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/Pr25ZfQZ/l-qing.png",
        "usageCount": 21
    },
    {
        "id": "car_31",
        "name": "Ngôi Sao Vũ Trụ",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/P57f36cv/ngoi-sao-vu-tru.png",
        "usageCount": 6
    },
    {
        "id": "car_32",
        "name": "Bài Hát Tình Yêu",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/BbCQmJ94/bai-hat-tinh-yeu.png",
        "usageCount": 10
    },
    {
        "id": "car_33",
        "name": "Sentinel",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/25BkPQRw/sentinel.png",
        "usageCount": 1
    },
    {
        "id": "car_35",
        "name": "L-Sói Trắng",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/02cym504/l-soi-trang.png",
        "usageCount": 0
    },
    {
        "id": "car_36",
        "name": "Koenigsegg",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/SNyKJYCS/koenigsegg.png",
        "usageCount": 5
    },
    {
        "id": "car_37",
        "name": "Lamborghini RAC",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/8zcPb8Zw/legend-asc.png",
        "usageCount": 0
    },
    {
        "id": "car_38",
        "name": "McLaren 600LT",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/T3s27kST/mclaren-600lt.png",
        "usageCount": 0
    },
    {
        "id": "car_39",
        "name": "Thần Sáng Tạo",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/MGhTTsmK/than-sang-tao.png",
        "usageCount": 0
    },
    {
        "id": "car_40",
        "name": "Z-SPX",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/Y9YSm1dR/z-spx.png",
        "usageCount": 1
    },
    {
        "id": "car_41",
        "name": "Hỏa Thần",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/vHQmcxfG/hoa-than.png",
        "usageCount": 0
    },
    {
        "id": "car_42",
        "name": "Eternal Nightbringer",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/9XPMmY4N/eternal-nightbringer.png",
        "usageCount": 2
    },
    {
        "id": "car_43",
        "name": "Reno Ngọc Bích Thần Long",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/8zYkKy3W/reno-ngoc-bich-than-long.png",
        "usageCount": 14
    },
    {
        "id": "car_44",
        "name": "Âm Thanh Trời Cao",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/vTyZ7cK0/am-thanh-troi-cao.png",
        "usageCount": 0
    },
    {
        "id": "car_45",
        "name": "Sơn Hải Bá Hạ",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/GpsLZFw5/son-hai-ba-ha.png",
        "usageCount": 0
    },
    {
        "id": "car_46",
        "name": "Theo Dấu Tinh Hà",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/d1r0T85v/theo-dau-tinh-ha.png",
        "usageCount": 0
    },
    {
        "id": "car_47",
        "name": "S-Ghost Rực Rỡ",
        "active": true,
        "note": "",
        "img": "https://i.postimg.cc/g06zfVF3/s-ghost-ruc-ro.png",
        "usageCount": 0
    }
];

  // 67 Pet + tần suất sử dụng thực tế
  const DEFAULT_PETS = [
    {
        "id": "tieu_hac_vo_thuong",
        "name": "Tiểu Hắc Vô Thường",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200403/1b3085c4f05e381d0e057fdd8b6a07d9.png",
        "usageCount": 0
    },
    {
        "id": "nu_oa",
        "name": "Nữ Oa",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210521/16215892426891.png",
        "usageCount": 5
    },
    {
        "id": "mac_ta",
        "name": "Mạc Tà",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200825/b59e71fec5172ad2b36b8be473563073.png",
        "usageCount": 0
    },
    {
        "id": "tham_lang",
        "name": "Tham Lang",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200709/1a029bbc25ad2961b9fbbff6265dfc83.png",
        "usageCount": 0
    },
    {
        "id": "loi_chan_tu",
        "name": "Lôi Chấn Tử",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190428/cc7a15c0e36d06bcf11a3f84e2695355.png",
        "usageCount": 0
    },
    {
        "id": "na_tra",
        "name": "Na Tra",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200116/929ead5c8b6ee4c82b034f1e29b8c37f.png",
        "usageCount": 0
    },
    {
        "id": "bach_long_ma",
        "name": "Bạch Long Mã",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190926/46f8cb9b5bf8bc92b266cab1a0d292d4.png",
        "usageCount": 0
    },
    {
        "id": "thao_thiet",
        "name": "Thao Thiết",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210521/16215891159019.png",
        "usageCount": 0
    },
    {
        "id": "cam_mao_thu",
        "name": "Cẩm Mao Thử",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200507/386e1942de8ee6b748984bc074cc4d8d.png",
        "usageCount": 0
    },
    {
        "id": "ao_anh_rong_chien",
        "name": "Ảo Ảnh Rồng Chiến",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190326/2a2beb72a31b1f79d43b550585e2afc7.png",
        "usageCount": 0
    },
    {
        "id": "nguu_ma_vuong",
        "name": "Ngưu Ma Vương",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20181113/a0aa65fb4d37f0a3e0a8a7f152bd97b1.png",
        "usageCount": 0
    },
    {
        "id": "thanh_loan",
        "name": "Thanh Loan",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190531/9b7dfe88c064beda67ab5506b746daeb.png",
        "usageCount": 0
    },
    {
        "id": "ngoi_sao_uoc_mong",
        "name": "Ngôi Sao Ước Mộng",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210729/16275410064281.png",
        "usageCount": 3
    },
    {
        "id": "tat_phuong",
        "name": "Tất Phương",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200925/a2c8ab827f406d63519fd684f6ddf9a3.png",
        "usageCount": 0
    },
    {
        "id": "chiton_sieu",
        "name": "Chiton-Siêu",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20201204/35b54108d9fbbc01d504c57082fa62e5.png",
        "usageCount": 0
    },
    {
        "id": "su_tu_tuyet_vuc",
        "name": "Sư Tử Tuyết Vực",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190930/2b7f8d582f7aac4dbcccccd9e72c166c.png",
        "usageCount": 0
    },
    {
        "id": "hac_tien_linh",
        "name": "Hạc Tiên Linh",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190716/69017c2358a5ac4b1ae11ef5a8dd63da.png",
        "usageCount": 0
    },
    {
        "id": "than_cong_bao",
        "name": "Thân Công Báo",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20181217/ac355e0ecd424d9e19d7b5f108bbf136.png",
        "usageCount": 0
    },
    {
        "id": "nu_vuong_tuoc_diem",
        "name": "Nữ Vương Tước Diễm",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20211209/16390150778334.png",
        "usageCount": 18
    },
    {
        "id": "ma_vuong_thien_su",
        "name": "Ma Vương Thiên Sư",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210924/16324765754649.png",
        "usageCount": 13
    },
    {
        "id": "ngoc_ti_than_ho",
        "name": "Ngọc Tỉ Thần Hổ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20220126/16431827436224.png",
        "usageCount": 84
    },
    {
        "id": "thuy_trach_tuong_lan",
        "name": "Thụy Trạch Tường Lân",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20220711/16575053339904.png",
        "usageCount": 0
    },
    {
        "id": "de_vuong_hon_su",
        "name": "Đế Vương Hồn Sư",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20230113/16736109699213.png",
        "usageCount": 0
    },
    {
        "id": "rong_thieng_ngu_thuat",
        "name": "Rồng Thiêng Ngự Thuật",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20230801/16908834637468.png",
        "usageCount": 0
    },
    {
        "id": "xich_diem_ma_long",
        "name": "Xích Diệm Ma Long",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20230522/16847263001764.png",
        "usageCount": 0
    },
    {
        "id": "ngu_thien_long_than",
        "name": "Ngự Thiên Long Thần",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240117/17055028167991.png",
        "usageCount": 0
    },
    {
        "id": "cerberus",
        "name": "Cerberus",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20181107/e03308d97440a9245202229f26c4646c.png",
        "usageCount": 0
    },
    {
        "id": "ca_loi_tung_tang",
        "name": "Cá Lội Tung Tăng",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240429/17144044901850.png",
        "usageCount": 0
    },
    {
        "id": "than_rung_ram",
        "name": "Thần Rừng Rậm",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20181107/e03308d97440a9245202229f26c4646c.png",
        "usageCount": 12
    },
    {
        "id": "hon_dinh_hai",
        "name": "Hồn Định Hải",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240802/17225293544511.png",
        "usageCount": 0
    },
    {
        "id": "than_huyen_hoa",
        "name": "Thần Huyền Hỏa",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20241129/17328106742594.png",
        "usageCount": 49
    },
    {
        "id": "giap_vang_kieu_hanh",
        "name": "Giáp Vàng Kiêu Hãnh",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240802/17225286984311.png",
        "usageCount": 2
    },
    {
        "id": "gam_gu",
        "name": "Gầm Gừ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20231228/17037770402268.png",
        "usageCount": 1
    },
    {
        "id": "da_tinh_hon",
        "name": "Dạ Tinh Hồn",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20230504/16831944306375.png",
        "usageCount": 0
    },
    {
        "id": "bong_hinh_lam_u",
        "name": "Bóng Hình Lam U",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20251031/17618422903251.png",
        "usageCount": 0
    },
    {
        "id": "su_gia_ma_thuat",
        "name": "Sứ Giả Ma Thuật",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20250902/17567800776148.png",
        "usageCount": 0
    },
    {
        "id": "nha_thiet_ke_meow",
        "name": "Nhà Thiết Kế Meow",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20230901/16935554976132.png",
        "usageCount": 3
    },
    {
        "id": "meo_sao_ma_thuat",
        "name": "Mèo Sao Ma Thuật",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20221229/16723064506388.png",
        "usageCount": 0
    },
    {
        "id": "dao_yeu",
        "name": "Đào Yêu",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200330/1a55be01ff20ae38b8637854da09f2db.png",
        "usageCount": 0
    },
    {
        "id": "linh_hon_lua_do",
        "name": "Linh Hồn Lửa Đỏ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20211221/16400755697978.png",
        "usageCount": 8
    },
    {
        "id": "trau_khoe",
        "name": "Trâu Khoẻ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210521/16215892305256.png",
        "usageCount": 0
    },
    {
        "id": "huou_tin_hieu",
        "name": "Hươu Tín Hiệu",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20220923/16639008215579.png",
        "usageCount": 0
    },
    {
        "id": "gau_meo",
        "name": "Gấu Mèo",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210521/16215889682383.png",
        "usageCount": 0
    },
    {
        "id": "cuu_may",
        "name": "Cừu Máy",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210705/16254657895732.png",
        "usageCount": 0
    },
    {
        "id": "cho_poodle",
        "name": "Chó Poodle",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20241115/17316025408180.png",
        "usageCount": 0
    },
    {
        "id": "de_vui_ve",
        "name": "Dê Vui Vẻ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240105/17043880414476.png",
        "usageCount": 0
    },
    {
        "id": "thu_rong_du",
        "name": "Thú Rồng Dữ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20221027/16668523941832.png",
        "usageCount": 0
    },
    {
        "id": "ca_chep_nho",
        "name": "Cá Chép Nhỏ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20220923/16639010159742.png",
        "usageCount": 0
    },
    {
        "id": "thien_su_tinh_nhan",
        "name": "Thiên Sứ Tình Nhân",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20260326/17745067935104.png",
        "usageCount": 0
    },
    {
        "id": "xac_uop_nho",
        "name": "Xác Ướp Nhỏ",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200420/cb9a8272a9b2ee209059c1dd97c634fe.png",
        "usageCount": 0
    },
    {
        "id": "nguoi_may_tuong_lai",
        "name": "Người Máy Tương Lai",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190412/351ea8410bc61aad30ffa0b146f6109a.png",
        "usageCount": 0
    },
    {
        "id": "dai_dai_vuong",
        "name": "Đại Đại Vương",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20191105/2c442472abfb9aaacfde1efa8db9b776.png",
        "usageCount": 3
    },
    {
        "id": "vua_nui_rung",
        "name": "Vua Núi Rừng",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200707/2204d7478b70ee9dbf13f8e06984621c.png",
        "usageCount": 0
    },
    {
        "id": "dai_tien_duong_luc",
        "name": "Đại Tiên Dương Lực",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20190715/5384592fd3bfc09080eb230364b76c0b.png",
        "usageCount": 0
    },
    {
        "id": "san_sang_lam_viec",
        "name": "Sẵn Sàng Làm Việc",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240411/17128452836535.png",
        "usageCount": 0
    },
    {
        "id": "thien_binh_thien_tuong",
        "name": "Thiên Binh Thiên Tướng",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210918/16319532959479.png",
        "usageCount": 0
    },
    {
        "id": "chim_cu_thu_cam",
        "name": "Chim Cú Thụ Cầm",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20210521/16215888934341.png",
        "usageCount": 0
    },
    {
        "id": "binh_tom",
        "name": "Binh Tôm",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20200831/a767aba4bbe9fd124786fa3bda8e29ec.png",
        "usageCount": 0
    },
    {
        "id": "canh_cut_hotgirl",
        "name": "Cánh Cụt Hotgirl",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20181107/e03308d97440a9245202229f26c4646c.png",
        "usageCount": 0
    },
    {
        "id": "su_gia_suong_mu",
        "name": "Sứ Giả Sương Mù",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20250603/17489650864583.png",
        "usageCount": 4
    },
    {
        "id": "chim_ung_nghich_thien",
        "name": "Chim Ưng Nghịch Thiên",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images//image/20181112/dfbcd4cb0c38549ab1146e6ba14351b4.png",
        "usageCount": 1
    },
    {
        "id": "gau_an_bong_truc",
        "name": "Gấu Ẩn Bóng Trúc",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20250427/17457624654753.png",
        "usageCount": 0
    },
    {
        "id": "linh_hon_thuy_trieu",
        "name": "Linh Hồn Thuỷ Triều",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20250402/17435829743507.png",
        "usageCount": 6
    },
    {
        "id": "lien_xa_tien_tu",
        "name": "Liên Xà Tiên Tử",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20250103/17358391873670.png",
        "usageCount": 0
    },
    {
        "id": "cau_vang_chien_do",
        "name": "Cậu Vàng Chiến Đo",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20240427/17142186428030.png",
        "usageCount": 3
    },
    {
        "id": "tien_trong_tranh",
        "name": "Tiên Trong Tranh",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20211110/16365364161411.png",
        "usageCount": 0
    },
    {
        "id": "lulu_canh_sao",
        "name": "Lulu Cánh Sao",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20250213/17394597864363.png",
        "usageCount": 1
    }
];

  // 44 Map (14 Map 3★, 16 Map 4★, 14 Map 5★+) + Top 5 thành tích thực tế từ kho kỷ lục Clan
  const DEFAULT_MAPS = [
    {
        "id": "map_3_1",
        "name": "Thành Phố 11",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps///image/20171211/31_8827468.jpg",
        "top5": [
            {
                "player": "Jongminh",
                "timeStr": "1:52:40",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:52:43",
                "car": "L-Qing",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:52:92",
                "car": "L-Qing",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Ruz",
                "timeStr": "1:53:15",
                "car": "Ngôi Sao Vũ Trụ",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:53:15",
                "car": "L-Qing",
                "pet": "Ma Vương Thiên Sư"
            }
        ]
    },
    {
        "id": "map_3_2",
        "name": "Ngư Trường",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20181011/b1b25310d6f371cf1a1d607a585e8d82.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:47:87",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:47:88",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:48:11",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:48:14",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:48:17",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            }
        ]
    },
    {
        "id": "map_3_3",
        "name": "TROY-Xưởng Nung Chảy",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20190717/54ec6a4988a53867f527e2be8cb0f92b.jpg",
        "top5": [
            {
                "player": "Ruz",
                "timeStr": "1:24:75",
                "car": "Xích Luyện",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:24:81",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ruz",
                "timeStr": "1:25:06",
                "car": "Xích Luyện",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:25:15",
                "car": "Ngôi Sao Vũ Trụ",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:25:41",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_3_4",
        "name": "Quý Châu Lộ",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20200921/25267e48557d7452e401e470886dc721.jpg",
        "top5": [
            {
                "player": "K",
                "timeStr": "1:14:78",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:14:88",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:16:18",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Ein",
                "timeStr": "1:16:59",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:17:07",
                "car": "Reno Sao Kim Cương",
                "pet": "Thần Rừng Rậm"
            }
        ]
    },
    {
        "id": "map_3_5",
        "name": "Trụ Sở Chính Alpha",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps///image/20210108/c4234de94254c7118bcd8c15517b42a6.jpg",
        "top5": [
            {
                "player": "Tangyezi",
                "timeStr": "1:36:31",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:36:56",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:36:64",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:37:01",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:37:83",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_3_6",
        "name": "Quyết chiến! Đôi Mắt Miền Biển",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20210823/16296862647665.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:25:46",
                "car": "Bài Hát Tình Yêu",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:26:06",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:26:57",
                "car": "Bài Hát Tình Yêu",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:27:08",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:27:18",
                "car": "Bài Hát Tình Yêu",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_3_7",
        "name": "Thiên Cung Tầm Mộng",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/images/image/20220516/16526827657994.png",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:21:33",
                "car": "Sky Walker - Phá Giới",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "CHIN",
                "timeStr": "1:21:91",
                "car": "Chiến Thần Sinh Đôi",
                "pet": "Cậu Vàng Chiến Đo"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:21:98",
                "car": "Sky Walker - Phá Giới",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ein",
                "timeStr": "1:22:10",
                "car": "Vẹt Thần Ánh Sáng",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:22:14",
                "car": "Ngôi Sao Vũ Trụ",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_3_8",
        "name": "Căn Cứ Siêu Huyền",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20221123/16692118937198.png",
        "top5": [
            {
                "player": "Tangyezi",
                "timeStr": "1:28:13",
                "car": "Chiến Thần Sinh Đôi",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:28:79",
                "car": "L-Song Sinh Chiến Diệu",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:29:33",
                "car": "Chiến Thần Sinh Đôi",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:29:76",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "Lả",
                "timeStr": "1:30:01",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Thần Rừng Rậm"
            }
        ]
    },
    {
        "id": "map_3_9",
        "name": "Hồ Long Tinh",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20230724/16901915868769.png",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:43:36",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:43:83",
                "car": "Thợ Săn Phi Tốc",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:45:10",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "CHIN",
                "timeStr": "1:45:82",
                "car": "Eternal Nightbringer",
                "pet": "Cậu Vàng Chiến Đo"
            },
            {
                "player": "Lả",
                "timeStr": "1:45:99",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            }
        ]
    },
    {
        "id": "map_3_10",
        "name": "Vành Đai Troy",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20230724/16901918219353.png",
        "top5": [
            {
                "player": "Jongminh",
                "timeStr": "1:37:92",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ein",
                "timeStr": "1:38:34",
                "car": "Xích Luyện",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Nex",
                "timeStr": "1:38:51",
                "car": "T-Cá Heo",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "K",
                "timeStr": "1:38:52",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ruz",
                "timeStr": "1:40:34",
                "car": "Xích Luyện",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_3_11",
        "name": "Tuyệt Cảnh Giang Sơn",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20230919/16951270513077.png",
        "top5": [
            {
                "player": "K",
                "timeStr": "1:34:50",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:35:25",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:35:82",
                "car": "Bài Hát Tình Yêu",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:35:89",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:36:31",
                "car": "Bài Hát Tình Yêu",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_3_12",
        "name": "Bóng Hình Eden",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20231121/17005788209567.png",
        "top5": [
            {
                "player": "Tangyezi",
                "timeStr": "1:47:55",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:48:59",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:48:91",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:49:39",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:50:04",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            }
        ]
    },
    {
        "id": "map_3_13",
        "name": "Vụ Sơn Ngũ Hành",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20240725/17218374934897.png",
        "top5": [
            {
                "player": "Lả",
                "timeStr": "1:34:59",
                "car": "L-Qing",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:34:86",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:35:29",
                "car": "L-Qing",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:35:97",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Khang",
                "timeStr": "1:37:36",
                "car": "L-Qing",
                "pet": "Lulu Cánh Sao"
            }
        ]
    },
    {
        "id": "map_3_14",
        "name": "Bờ Biển Lãng Mạn",
        "stars": 3,
        "starLabel": "3★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20250721/17530812968308.png",
        "top5": [
            {
                "player": "Jongminh",
                "timeStr": "1:19:71",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:20:74",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:21:36",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Wuyhg",
                "timeStr": "1:22:01",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Thuỷ Triều"
            },
            {
                "player": "Nex",
                "timeStr": "1:22:02",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_4_1",
        "name": "Tây Hồ",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20180424/4ceb12a7da81fc78485cd451738f1ddf.jpg",
        "top5": [
            {
                "player": "Ruz",
                "timeStr": "1:17:04",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ruz",
                "timeStr": "1:17:43",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:17:85",
                "car": "Ngôi Sao Vũ Trụ",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "CHIN",
                "timeStr": "1:20:63",
                "car": "L-Qing",
                "pet": "Cậu Vàng Chiến Đo"
            },
            {
                "player": "Ruz",
                "timeStr": "1:21:34",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_2",
        "name": "Trường Thành",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20180326/ed0633a8e49bc3058e8eda3219440918.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:10:70",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:11:06",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:12:49",
                "car": "S-Breaker Vinh Dự",
                "pet": "Sứ Giả Sương Mù"
            },
            {
                "player": "Ein",
                "timeStr": "1:13:17",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:14:46",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_3",
        "name": "Đại Lộ 1",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20180119/a4d8882662a3508ced77be491fd925ff.jpg",
        "top5": [
            {
                "player": "K",
                "timeStr": "1:09:62",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:09:76",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ein",
                "timeStr": "1:10:12",
                "car": "Xích Luyện",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:11:11",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:13:30",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_4",
        "name": "TROY-Sân Thử Nghiệm Số 0",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20190717/07b7aec16c1011992fb28c12a399092f.jpg",
        "top5": [
            {
                "player": "Jongminh",
                "timeStr": "1:32:76",
                "car": "Bài Hát Tình Yêu",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:33:34",
                "car": "Bài Hát Tình Yêu",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Ruz",
                "timeStr": "1:34:12",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:35:46",
                "car": "Bài Hát Tình Yêu",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:36:66",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_4_5",
        "name": "Lâu Đài Thiên Nga Mới",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20200522/3e351719616aa614a2063233c6976f35.jpg",
        "top5": [
            {
                "player": "CHIN",
                "timeStr": "1:33:68",
                "car": "Eternal Nightbringer",
                "pet": "Linh Hồn Lửa Đỏ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:33:88",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:34:17",
                "car": "Bài Hát Tình Yêu",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "qanh",
                "timeStr": "1:34:38",
                "car": "AE86",
                "pet": "Linh Hồn Lửa Đỏ"
            },
            {
                "player": "K",
                "timeStr": "1:34:53",
                "car": "Maserati MC20 Cielo",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_6",
        "name": "Thiên Hộ Miêu Trại",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20200921/3265566121a19cae1d3546619b686fb0.jpg",
        "top5": [
            {
                "player": "Tangyezi",
                "timeStr": "1:17:21",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ei",
                "timeStr": "1:22:18",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_7",
        "name": "Sân Bay Cuồng Phong",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20210312/16155457318502.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:25:28",
                "car": "Sky Walker - Phá Giới",
                "pet": "Nhà Thiết Kế Meow"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:28:57",
                "car": "Sky Walker - Phá Giới",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "K",
                "timeStr": "1:29:36",
                "car": "Sky Walker - Phá Giới",
                "pet": "Nhà Thiết Kế Meow"
            },
            {
                "player": "K",
                "timeStr": "1:29:99",
                "car": "Sky Walker - Phá Giới",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Nex",
                "timeStr": "1:31:31",
                "car": "L-Qing",
                "pet": "Ma Vương Thiên Sư"
            }
        ]
    },
    {
        "id": "map_4_8",
        "name": "Quyết chiến! Đỉnh Núi Tuyết",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20210715/16263281507258.jpg",
        "top5": [
            {
                "player": "Lả",
                "timeStr": "1:22:74",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "CHIN",
                "timeStr": "1:22:90",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Lửa Đỏ"
            },
            {
                "player": "Ruz",
                "timeStr": "1:23:40",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Zan",
                "timeStr": "1:24:90",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Sứ Giả Sương Mù"
            },
            {
                "player": "King",
                "timeStr": "1:26:74",
                "car": "S-Breaker Vinh Dự",
                "pet": "Chim Ưng Nghịch Thiên"
            }
        ]
    },
    {
        "id": "map_4_9",
        "name": "Mơ Về Cổ Thục",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20210915/16316995903827.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:20:61",
                "car": "Bài Hát Tình Yêu",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:20:73",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ei",
                "timeStr": "1:24:83",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Thuỷ Triều"
            },
            {
                "player": "QKIT",
                "timeStr": "1:25:98",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Khang",
                "timeStr": "1:26:37",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Thuỷ Triều"
            }
        ]
    },
    {
        "id": "map_4_10",
        "name": "Z Space",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20220516/16526869593306.png",
        "top5": [
            {
                "player": "Ruz",
                "timeStr": "1:06:89",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "qanh",
                "timeStr": "1:06:97",
                "car": "Aston Martin",
                "pet": "Nữ Oa"
            },
            {
                "player": "qanh",
                "timeStr": "1:07:10",
                "car": "Aston Martin",
                "pet": "Nữ Oa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:07:82",
                "car": "Sentinel",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:07:90",
                "car": "L-Qing",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_11",
        "name": "Cổ Đô Thiên Chiếu",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20221011/16654598587252.png",
        "top5": [
            {
                "player": "Lả",
                "timeStr": "1:09:80",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Lả",
                "timeStr": "1:11:65",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:11:65",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ein",
                "timeStr": "1:11:70",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ding",
                "timeStr": "1:13:29",
                "car": "Aston Martin",
                "pet": "Gầm Gừ"
            }
        ]
    },
    {
        "id": "map_4_12",
        "name": "Tiệc Rượu Bên Suối",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20231221/17031734536016.png",
        "top5": [
            {
                "player": "K",
                "timeStr": "1:49:58",
                "car": "L-Qing",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:50:30",
                "car": "L-Qing",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:50:43",
                "car": "L-Qing",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:51:15",
                "car": "L-Qing",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:52:18",
                "car": "L-Qing",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_13",
        "name": "Đua Thuyền Đoan Ngọ",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20240526/17167362763162.png",
        "top5": [
            {
                "player": "Jongminh",
                "timeStr": "1:43:22",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Nex",
                "timeStr": "1:43:25",
                "car": "T-Cá Heo",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:43:46",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:43:46",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Ruz",
                "timeStr": "1:43:59",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_4_14",
        "name": "Đỉnh Titan",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20241126/17326359998189.png",
        "top5": [
            {
                "player": "Ruz",
                "timeStr": "1:33:74",
                "car": "Thợ Săn Phi Tốc",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:34:46",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Ein",
                "timeStr": "1:34:70",
                "car": "Xích Luyện",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:34:86",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:34:97",
                "car": "Reno Ngọc Bích Thần Long",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_15",
        "name": "Mây Cuộn Cổng Trời",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20250919/17582127372131.png",
        "top5": [
            {
                "player": "qanh",
                "timeStr": "1:25:94",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Đại Đại Vương"
            },
            {
                "player": "Lả",
                "timeStr": "1:26:41",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:27:13",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:27:47",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:27:55",
                "car": "Aurora",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_4_16",
        "name": "Vực Thẳm Trái Tim",
        "stars": 4,
        "starLabel": "4★",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20251118/17634577032615.png",
        "top5": [
            {
                "player": "Ruz",
                "timeStr": "1:17:70",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:17:89",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:19:02",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:19:20",
                "car": "Sky Walker - Phá Giới",
                "pet": "Nữ Vương Tước Diễm"
            }
        ]
    },
    {
        "id": "map_5_1",
        "name": "Căn Cứ Sao Hỏa",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20250325/17428875469403.png",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:19:26",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:19:59",
                "car": "Giáo Phán Xét",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:21:31",
                "car": "Aston Martin",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Lả",
                "timeStr": "1:22:50",
                "car": "Ngôi Sao Vũ Trụ",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:22:52",
                "car": "Giáo Phán Xét",
                "pet": "Nữ Vương Tước Diễm"
            }
        ]
    },
    {
        "id": "map_5_2",
        "name": "Núi Mùa Thu",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20171211/52_9429115.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:15:61",
                "car": "S-Breaker Vinh Dự",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "CHIN",
                "timeStr": "1:15:73",
                "car": "L-Qing",
                "pet": "Linh Hồn Lửa Đỏ"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:15:97",
                "car": "Aston Martin",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "qanh",
                "timeStr": "1:16:03",
                "car": "L-Qing",
                "pet": "Nữ Oa"
            },
            {
                "player": "Kin",
                "timeStr": "1:16:63",
                "car": "Aston Martin",
                "pet": "Nữ Vương Tước Diễm"
            }
        ]
    },
    {
        "id": "map_5_3",
        "name": "Mỏ Khoáng Hoang Dã",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20171211/51_9300156.jpg",
        "top5": [
            {
                "player": "Lả",
                "timeStr": "1:02:55",
                "car": "S-Breaker Vinh Dự",
                "pet": "Sứ Giả Sương Mù"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:02:83",
                "car": "S-Breaker Vinh Dự",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:03:05",
                "car": "Aston Martin",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "K",
                "timeStr": "1:03:88",
                "car": "S-Breaker Vinh Dự",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "CHIN",
                "timeStr": "1:04:01",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Thuỷ Triều"
            }
        ]
    },
    {
        "id": "map_5_4",
        "name": "Mạc Cao Quật",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20180904/e4e67d4825b6cc7ecf1a5a3491488314.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:32:20",
                "car": "Koenigsegg",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:32:39",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngôi Sao Ước Mộng"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:34:18",
                "car": "Koenigsegg",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:35:65",
                "car": "Aurora",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "K",
                "timeStr": "1:37:07",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngọc Tỉ Thần Hổ"
            }
        ]
    },
    {
        "id": "map_5_5",
        "name": "Atlantis",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20171211/54_976883.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:39:34",
                "car": "T-Cá Heo",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:40:55",
                "car": "T-Cá Heo",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Lả",
                "timeStr": "1:40:86",
                "car": "T-Cá Heo",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:41:37",
                "car": "T-Cá Heo",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:41:67",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Giáp Vàng Kiêu Hãnh"
            }
        ]
    },
    {
        "id": "map_5_6",
        "name": "Chuyến Đi Huyền Thoại",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20171211/53_9496680.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:12:17",
                "car": "S-Breaker Vinh Dự",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:12:23",
                "car": "S-Breaker Vinh Dự",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Noway",
                "timeStr": "1:12:26",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Thuỷ Triều"
            },
            {
                "player": "CHIN",
                "timeStr": "1:12:53",
                "car": "S-Breaker Vinh Dự",
                "pet": "Linh Hồn Thuỷ Triều"
            },
            {
                "player": "K",
                "timeStr": "1:13:39",
                "car": "S-Breaker Vinh Dự",
                "pet": "Nữ Vương Tước Diễm"
            }
        ]
    },
    {
        "id": "map_5_7",
        "name": "Công Trường Phố Cổ",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20220324/16481195029550.png",
        "top5": [
            {
                "player": "Tangyezi",
                "timeStr": "1:39:00",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Ruz",
                "timeStr": "1:39:30",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:40:00",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ngôi Sao Ước Mộng"
            },
            {
                "player": "K",
                "timeStr": "1:40:22",
                "car": "Aston Martin",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Vargina",
                "timeStr": "1:41:42",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_5_8",
        "name": "Thành Lá Đỏ",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20230111/16734277903891.png",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:12:81",
                "car": "Vẹt Thần Ánh Sáng",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:13:14",
                "car": "S-Breaker Vinh Dự",
                "pet": "Sứ Giả Sương Mù"
            },
            {
                "player": "qanh",
                "timeStr": "1:13:46",
                "car": "Aston Martin",
                "pet": "Nữ Oa"
            },
            {
                "player": "K",
                "timeStr": "1:13:81",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Nhà Thiết Kế Meow"
            },
            {
                "player": "qanh",
                "timeStr": "1:13:92",
                "car": "Aston Martin",
                "pet": "Nữ Oa"
            }
        ]
    },
    {
        "id": "map_5_9",
        "name": "Vực Sâu Băng Giá",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20240326/17114615429011.png",
        "top5": [
            {
                "player": "Ruz",
                "timeStr": "1:30:96",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "K",
                "timeStr": "1:31:26",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:31:60",
                "car": "S-Breaker Vinh Dự",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:31:74",
                "car": "L-Qing",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "qanh",
                "timeStr": "1:32:03",
                "car": "L-Qing",
                "pet": "Linh Hồn Lửa Đỏ"
            }
        ]
    },
    {
        "id": "map_5_10",
        "name": "Atlantis (Ngược)",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20171211/55_9801857.jpg",
        "top5": [
            {
                "player": "Tangyezi",
                "timeStr": "1:37:98",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:39:26",
                "car": "Thánh Ca Băng Hỏa",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Nex",
                "timeStr": "1:41:88",
                "car": "Ngôi Sao Vũ Trụ",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "K",
                "timeStr": "1:42:35",
                "car": "Maserati MC20 Cielo",
                "pet": "Giáp Vàng Kiêu Hãnh"
            }
        ]
    },
    {
        "id": "map_5_11",
        "name": "Sơn Hải Họa Cảnh",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20250113/17367779105688.png",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:43:18",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "qanh",
                "timeStr": "1:44:90",
                "car": "Aston Martin",
                "pet": "Đại Đại Vương"
            },
            {
                "player": "Lả",
                "timeStr": "1:45:01",
                "car": "L-Qing",
                "pet": "Thần Rừng Rậm"
            },
            {
                "player": "qanh",
                "timeStr": "1:45:13",
                "car": "Aston Martin",
                "pet": "Đại Đại Vương"
            },
            {
                "player": "Jongminh",
                "timeStr": "1:45:55",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_5_12",
        "name": "Sân Bay Siêu Tốc",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20190108/1e2681225a98cd914a54fc0765478dd3.jpg",
        "top5": [
            {
                "player": "Nex",
                "timeStr": "1:34:03",
                "car": "Aston Martin",
                "pet": "Ma Vương Thiên Sư"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:35:33",
                "car": "Koenigsegg",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:36:56",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "K",
                "timeStr": "1:36:59",
                "car": "S-Breaker Vinh Dự",
                "pet": "Ngọc Tỉ Thần Hổ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:37:50",
                "car": "Koenigsegg",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    },
    {
        "id": "map_5_13",
        "name": "Hẻm Núi Lớn",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps/image/20171211/61_9394613.jpg",
        "top5": [
            {
                "player": "Hoshi",
                "timeStr": "1:14:12",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:14:32",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:14:56",
                "car": "Aston Martin",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:14:86",
                "car": "Aston Martin",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "CHIN",
                "timeStr": "1:14:90",
                "car": "Aston Martin",
                "pet": "Linh Hồn Lửa Đỏ"
            }
        ]
    },
    {
        "id": "map_5_14",
        "name": "Scotland Yard",
        "stars": 5,
        "starLabel": "5★+",
        "active": true,
        "img": "https://game.gtimg.cn/images/speedm/zlkdatasys/data/maps//image/20211115/16369731693212.png",
        "top5": [
            {
                "player": "K",
                "timeStr": "1:48:52",
                "car": "L-Qing",
                "pet": "Nữ Vương Tước Diễm"
            },
            {
                "player": "CHIN",
                "timeStr": "1:50:23",
                "car": "Z-SPX",
                "pet": "Linh Hồn Lửa Đỏ"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:50:33",
                "car": "Koenigsegg",
                "pet": "Thần Huyền Hỏa"
            },
            {
                "player": "Tangyezi",
                "timeStr": "1:50:52",
                "car": "Aston Martin",
                "pet": "Ngôi Sao Ước Mộng"
            },
            {
                "player": "Hoshi",
                "timeStr": "1:50:74",
                "car": "Legend ASC",
                "pet": "Thần Huyền Hỏa"
            }
        ]
    }
];

  // 32/32 Tuyển thủ mùa NEAC26 đầy đủ từ 8 bảng A-H + Kỷ lục Map Active
  const DEFAULT_GLOBAL_RANKING = [
    {
        "id": "gr_1",
        "handle": "Hoshi",
        "neac26Rank": "Quán Quân NEAC26 (Bảng D - 93đ)",
        "neac26Pos": 100,
        "neac26Solo": 20,
        "neac26GroupBonus": 13.95,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 15
    },
    {
        "id": "gr_2",
        "handle": "Tangyezi",
        "neac26Rank": "Á Quân NEAC26 (Bảng H - 81đ)",
        "neac26Pos": 75,
        "neac26Solo": 15,
        "neac26GroupBonus": 12.15,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 6
    },
    {
        "id": "gr_3",
        "handle": "Lả",
        "neac26Rank": "Hạng 3 NEAC26 (Bảng E - 95đ)",
        "neac26Pos": 60,
        "neac26Solo": 15,
        "neac26GroupBonus": 14.25,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 4
    },
    {
        "id": "gr_4",
        "handle": "K",
        "neac26Rank": "Hạng 4 NEAC26 (Bảng A - 97đ)",
        "neac26Pos": 50,
        "neac26Solo": 10,
        "neac26GroupBonus": 14.55,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 5
    },
    {
        "id": "gr_5",
        "handle": "Jongminh",
        "neac26Rank": "Top 8 NEAC26 (Bảng D - 81đ)",
        "neac26Pos": 35,
        "neac26Solo": 5,
        "neac26GroupBonus": 12.15,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 5
    },
    {
        "id": "gr_6",
        "handle": "qanh",
        "neac26Rank": "Top 8 NEAC26 (Bảng H - 80đ)",
        "neac26Pos": 35,
        "neac26Solo": 5,
        "neac26GroupBonus": 12,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 1
    },
    {
        "id": "gr_7",
        "handle": "Nex",
        "neac26Rank": "Top 8 NEAC26 (Bảng A - 74đ)",
        "neac26Pos": 35,
        "neac26Solo": 5,
        "neac26GroupBonus": 11.1,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 1
    },
    {
        "id": "gr_8",
        "handle": "Ein",
        "neac26Rank": "Top 8 NEAC26 (Bảng E - 67đ)",
        "neac26Pos": 35,
        "neac26Solo": 5,
        "neac26GroupBonus": 10.05,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_9",
        "handle": "Ruz",
        "neac26Rank": "Top 16 NEAC26 (Bảng C - 90đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 13.5,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 6
    },
    {
        "id": "gr_10",
        "handle": "CHIN",
        "neac26Rank": "Top 16 NEAC26 (Bảng C - 86đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 12.9,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 1
    },
    {
        "id": "gr_11",
        "handle": "Khang",
        "neac26Rank": "Top 16 NEAC26 (Bảng G - 89đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 13.35,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_12",
        "handle": "NBK",
        "neac26Rank": "Top 16 NEAC26 (Bảng F - 87đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 13.05,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_13",
        "handle": "Wuyhg",
        "neac26Rank": "Top 16 NEAC26 (Bảng B - 82đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 12.3,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_14",
        "handle": "Ei",
        "neac26Rank": "Top 16 NEAC26 (Bảng G - 82đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 12.3,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_15",
        "handle": "King",
        "neac26Rank": "Top 16 NEAC26 (Bảng F - 76đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 11.4,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_16",
        "handle": "Noway",
        "neac26Rank": "Top 16 NEAC26 (Bảng B - 74đ)",
        "neac26Pos": 20,
        "neac26Solo": 0,
        "neac26GroupBonus": 11.1,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_17",
        "handle": "Orange",
        "neac26Rank": "Hạng 3 Bảng F NEAC26 (73đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 10.95,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_18",
        "handle": "Kin",
        "neac26Rank": "Hạng 3 Bảng B NEAC26 (71đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 10.65,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_19",
        "handle": "Vargina",
        "neac26Rank": "Hạng 3 Bảng H NEAC26 (67đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 10.05,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_20",
        "handle": "Zan",
        "neac26Rank": "Hạng 3 Bảng C NEAC26 (65đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 9.75,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_21",
        "handle": "Ding",
        "neac26Rank": "Hạng 3 Bảng E NEAC26 (49đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 7.35,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_22",
        "handle": "Merrin",
        "neac26Rank": "Hạng 3 Bảng G NEAC26 (48đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 7.2,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_23",
        "handle": "Dlaww",
        "neac26Rank": "Hạng 3 Bảng A NEAC26 (36đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 5.4,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_24",
        "handle": "Vincent",
        "neac26Rank": "Hạng 3 Bảng D NEAC26 (35đ)",
        "neac26Pos": 10,
        "neac26Solo": 0,
        "neac26GroupBonus": 5.25,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_25",
        "handle": "antuyenn",
        "neac26Rank": "Hạng 4 Bảng F NEAC26 (66đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 9.9,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_26",
        "handle": "Fonggg",
        "neac26Rank": "Hạng 4 Bảng B NEAC26 (65đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 9.75,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_27",
        "handle": "QKIT",
        "neac26Rank": "Hạng 4 Bảng G NEAC26 (45đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 6.75,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_28",
        "handle": "Harlow",
        "neac26Rank": "Hạng 4 Bảng C NEAC26 (32đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 4.8,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_29",
        "handle": "Shark",
        "neac26Rank": "Hạng 4 Bảng A NEAC26 (28đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 4.2,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_30",
        "handle": "Tdattt",
        "neac26Rank": "Hạng 4 Bảng D NEAC26 (25đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 3.75,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_31",
        "handle": "luboiboi",
        "neac26Rank": "Hạng 4 Bảng H NEAC26 (17đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 2.55,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    },
    {
        "id": "gr_32",
        "handle": "Benz",
        "neac26Rank": "Hạng 4 Bảng E NEAC26 (9đ)",
        "neac26Pos": 5,
        "neac26Solo": 0,
        "neac26GroupBonus": 1.35,
        "seasonNPoints": 0,
        "seasonN2Points": 0,
        "activeRecords": 0
    }
];

  const SCHEDULE_13_DAYS = [
    {
        "day": 1,
        "phase": "qualifier",
        "phaseLabel": "Giai đoạn 1: Qualifier",
        "title": "Phase 1 - Đua Bảng 4 Người (8 Bảng)",
        "format": "Đua 9 map tích điểm/bảng",
        "detail": "32 tuyển thủ chia 8 bảng (A-H). Dùng 9 xe khác nhau trên 9 map. Top 1 vào thẳng Swiss; Top 2 & Top 3 vào Play-in; Top 4 bị loại."
    },
    {
        "day": 2,
        "phase": "qualifier",
        "phaseLabel": "Giai đoạn 1: Qualifier",
        "title": "Phase 2 - Play-in Solo Bo7",
        "format": "8 Trận Solo Bo7 1-Round",
        "detail": "Top 2 vs Top 3 của mỗi bảng đối đầu chạm 4 ván thắng. 1 Xe 1 Map. 8 người thắng giành vé vào Swiss Stage."
    },
    {
        "day": 3,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 1 (Nhóm 0-0)",
        "format": "8 Trận Solo Bo7 1-Round",
        "detail": "Bốc thăm 3-Tier (5 trận Pool 1 vs Pool 3; 3 trận Pool 2 vs Pool 2). Áp dụng Shift Rule tránh cùng bảng."
    },
    {
        "day": 4,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 2 (1-0 & 0-1)",
        "format": "8 Trận Solo Bo7 1-Round",
        "detail": "4 trận nhánh thắng (1-0) + 4 trận nhánh thua (0-1). Áp dụng Rematch Rule & Shift Rule không tái đấu."
    },
    {
        "day": 5,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 3A",
        "format": "4 Trận 1-1 (Bo7 1R) + 1 Trận 2-0 (Bo7 3R)",
        "detail": "Nhánh 1-1 giữ thể thức Bo7 1-Round; trận đầu tiên của nhánh tranh vé sớm 2-0 nâng lên Bo7 3-Round."
    },
    {
        "day": 6,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 3B",
        "format": "1 Trận 2-0 + 2 Trận 0-2 (Bo7 3-Round)",
        "detail": "Xác định 2 hạt giống #1, #2 (3-0) vào Tứ kết và 2 tuyển thủ đầu tiên bị loại (0-3)."
    },
    {
        "day": 7,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 4A (Nhánh 2-1)",
        "format": "3 Trận Solo Bo7 3-Round",
        "detail": "3 trận tranh vé vào Tứ kết (hạt giống #3, #4, #5 đạt 3-1). Người thua xuống nhánh 2-2."
    },
    {
        "day": 8,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 4B (Nhánh 1-2)",
        "format": "3 Trận Solo Bo7 3-Round",
        "detail": "3 trận sinh tử chống bị loại. Người thua (1-3) dừng bước; người thắng lên nhánh 2-2."
    },
    {
        "day": 9,
        "phase": "swiss",
        "phaseLabel": "Giai đoạn 2: Swiss Stage",
        "title": "Swiss Stage - Vòng 5 (Super Deciders 2-2)",
        "format": "3 Trận Solo Bo7 3-Round",
        "detail": "3 trận quyết định cuối cùng. Người thắng (3-2) lấy 3 vé #6, #7, #8 vào Playoff; người thua (2-3) bị loại."
    },
    {
        "day": 10,
        "phase": "playoff",
        "phaseLabel": "Giai đoạn 3: Playoff",
        "title": "Tứ Kết - Ngày 1 (QF1 & QF2)",
        "format": "2 Trận Solo Bo9 3-Round",
        "detail": "Thắng 2/3 Round (R1-R2 chạm 5; R3 chạm 5 hoặc Deuce 4-4 tới trần 8-7)."
    },
    {
        "day": 11,
        "phase": "playoff",
        "phaseLabel": "Giai đoạn 3: Playoff",
        "title": "Tứ Kết - Ngày 2 (QF3 & QF4)",
        "format": "2 Trận Solo Bo9 3-Round",
        "detail": "Hoàn tất 4 cặp Tứ kết để xác định Top 4 bước vào Bán kết."
    },
    {
        "day": 12,
        "phase": "playoff",
        "phaseLabel": "Giai đoạn 3: Playoff",
        "title": "Bán Kết (SF1 & SF2)",
        "format": "2 Trận Solo Bo9 3-Round",
        "detail": "2 trận Bán kết phân định cặp đấu Chung Kết Tổng và Tranh Hạng 3."
    },
    {
        "day": 13,
        "phase": "playoff",
        "phaseLabel": "Giai đoạn 3: Playoff",
        "title": "FINALS DAY (Hạng 3 & Chung Kết Tổng)",
        "format": "2 Trận Solo Bo9 3-Round",
        "detail": "Trận 1: Tranh Hạng 3. Trận 2: Chung Kết Tổng tìm ra Tân Vương mùa giải."
    }
];

  const POSITION_POINTS_NEW = [
    {
        "rank": "Quán Quân",
        "title": "Vô địch Giải Đấu",
        "points": 100,
        "stage": "Thắng Chung Kết Tổng Bo9 Playoff"
    },
    {
        "rank": "Á Quân",
        "title": "Hạng Nhì Giải Đấu",
        "points": 75,
        "stage": "Thua Chung Kết Tổng Bo9 Playoff"
    },
    {
        "rank": "Hạng 3",
        "title": "Quý Quân",
        "points": 60,
        "stage": "Thắng Trận Tranh Hạng 3 Bo9 Playoff"
    },
    {
        "rank": "Hạng 4",
        "title": "Hạng Tư Chung Cuộc",
        "points": 50,
        "stage": "Thua Trận Tranh Hạng 3 Bo9 Playoff"
    },
    {
        "rank": "Hạng 5 - 8",
        "title": "Top 8 Tuyển Thủ Xuất Sắc",
        "points": 35,
        "stage": "Dừng bước tại Tứ Kết Playoff Bo9"
    },
    {
        "rank": "Hạng 9 - 11",
        "title": "Dừng bước Swiss Vòng 5",
        "points": 26,
        "stage": "Thua trận sinh tử Vòng 5 (Hiệu số 2-3)"
    },
    {
        "rank": "Hạng 12 - 14",
        "title": "Dừng bước Swiss Vòng 4",
        "points": 20,
        "stage": "Thua trận sinh tử Vòng 4 (Hiệu số 1-3)"
    },
    {
        "rank": "Hạng 15 - 16",
        "title": "Dừng bước Swiss Vòng 3",
        "points": 15,
        "stage": "Thua trận sinh tử Vòng 3 (Hiệu số 0-3)"
    },
    {
        "rank": "Hạng 17 - 24",
        "title": "Top 2 & Top 3 Vòng Bảng",
        "points": 10,
        "stage": "Dừng bước tại Qualifier Phase 2 (Play-in Solo Bo7)"
    },
    {
        "rank": "Hạng 25 - 32",
        "title": "Top 4 Vòng Bảng",
        "points": 5,
        "stage": "Dừng bước tại Qualifier Phase 1 (Top 4 Vòng Bảng)"
    }
];

  const POSITION_POINTS_LEGACY_NEAC26 = [
    {
        "rank": "Quán Quân",
        "title": "Vô địch NEAC26 (Hoshi)",
        "points": 100,
        "stage": "Thắng Chung Kết Solo (4 trận thắng: +20đ)"
    },
    {
        "rank": "Á Quân",
        "title": "Hạng Nhì NEAC26 (Tangyezi)",
        "points": 75,
        "stage": "Thua Chung Kết Solo (3 trận thắng: +15đ)"
    },
    {
        "rank": "Hạng 3",
        "title": "Quý Quân NEAC26 (Lả)",
        "points": 60,
        "stage": "Thắng Tranh Hạng 3 trước K (3 trận thắng: +15đ)"
    },
    {
        "rank": "Hạng 4",
        "title": "Hạng Tư NEAC26 (K)",
        "points": 50,
        "stage": "Thua Tranh Hạng 3 trước Lả (2 trận thắng: +10đ)"
    },
    {
        "rank": "Hạng 5 - 8",
        "title": "Top 8 (Jongminh, qanh, Nex, Ein)",
        "points": 35,
        "stage": "Dừng bước tại Tứ Kết (mỗi người 1 trận thắng: +5đ)"
    },
    {
        "rank": "Hạng 9 - 16",
        "title": "Top 16 (Ruz, Khang, NBK, CHIN...)",
        "points": 20,
        "stage": "Dừng bước tại Vòng 1/8 Top 16 (0 trận thắng: 0đ)"
    },
    {
        "rank": "Hạng 17 - 24",
        "title": "Hạng 3 Vòng Bảng (Orange, Kin, Ding...)",
        "points": 10,
        "stage": "Dừng bước tại Vòng Bảng (Xếp Hạng 3 trong bảng)"
    },
    {
        "rank": "Hạng 25 - 32",
        "title": "Hạng 4 Vòng Bảng (antuyenn, Benz...)",
        "points": 5,
        "stage": "Dừng bước tại Vòng Bảng (Xếp Hạng 4 trong bảng)"
    }
];

  const ROOKIE_TRIAL_MAPS = [
    {
        "id": "rt_1",
        "slot": "Ván 1",
        "name": "Vành Đai Troy",
        "stars": 3,
        "starLabel": "3 Sao (3★)",
        "targetTime": "1:36:99",
        "targetMs": 96990,
        "basePoints": 9,
        "optional4Star": false
    },
    {
        "id": "rt_2",
        "slot": "Ván 2 & 3 (Chọn 2/3)",
        "name": "Đỉnh Titan",
        "stars": 4,
        "starLabel": "4 Sao (4★)",
        "targetTime": "1:33:99",
        "targetMs": 93990,
        "basePoints": 10,
        "optional4Star": true
    },
    {
        "id": "rt_3",
        "slot": "Ván 2 & 3 (Chọn 2/3)",
        "name": "Đại Lộ 1",
        "stars": 4,
        "starLabel": "4 Sao (4★)",
        "targetTime": "1:08:99",
        "targetMs": 68990,
        "basePoints": 10,
        "optional4Star": true
    },
    {
        "id": "rt_4",
        "slot": "Ván 2 & 3 (Chọn 2/3)",
        "name": "Z-Space",
        "stars": 4,
        "starLabel": "4 Sao (4★)",
        "targetTime": "1:06:99",
        "targetMs": 66990,
        "basePoints": 10,
        "optional4Star": true
    },
    {
        "id": "rt_5",
        "slot": "Ván 4",
        "name": "Thành Lá Đỏ",
        "stars": 5,
        "starLabel": "5 Sao (5★)",
        "targetTime": "1:11:99",
        "targetMs": 71990,
        "basePoints": 11,
        "optional4Star": false
    },
    {
        "id": "rt_6",
        "slot": "Ván 5",
        "name": "Sơn Hải Họa Cảnh",
        "stars": 7,
        "starLabel": "7 Sao (7★)",
        "targetTime": "1:46:99",
        "targetMs": 106990,
        "basePoints": 12,
        "optional4Star": false
    }
];

  const SOLO_3R_BASE_TABLE = [
    {
        "stage": "Swiss Sinh Tử & Tranh Vé (2-0, 0-2, 2-1, 1-2, 2-2)",
        "format": "Bo7 3-Round (chạm 4)",
        "base": 5,
        "w20": 5,
        "w21": 3.75,
        "l12": 1.25
    },
    {
        "stage": "Tứ Kết Playoff",
        "format": "Bo9 3-Round (chạm 5)",
        "base": 6,
        "w20": 6,
        "w21": 4.5,
        "l12": 1.5
    },
    {
        "stage": "Bán Kết Playoff",
        "format": "Bo9 3-Round (chạm 5)",
        "base": 8,
        "w20": 8,
        "w21": 6,
        "l12": 2
    },
    {
        "stage": "Chung Kết & Tranh Hạng 3",
        "format": "Bo9 3-Round (chạm 5)",
        "base": 10,
        "w20": 10,
        "w21": 7.5,
        "l12": 2.5
    }
];

  global.CLAN_TOURNAMENT_DATA = {
    DEFAULT_SEASON_CONFIG,
    DEFAULT_RACERS,
    DEFAULT_CARS,
    DEFAULT_PETS,
    DEFAULT_MAPS,
    DEFAULT_GLOBAL_RANKING,
    SCHEDULE_13_DAYS,
    POSITION_POINTS_NEW,
    POSITION_POINTS_LEGACY_NEAC26,
    ROOKIE_TRIAL_MAPS,
    SOLO_3R_BASE_TABLE
  };
})(typeof window !== 'undefined' ? window : globalThis);
