export interface Member {
  id: string;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  status: "Aktif" | "Nonaktif";
  joinedDate: string;
  initials: string;
  depositStatus: string;
}

export interface MemberMaster {
  id: number;
  code: string;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  status: "Aktif" | "Non-Aktif" | "Menunggu Verifikasi";
  date: string;
  email: string;
  nik: string;
  depositStatus?: string;
  totalDeposit?: string;
}

export interface SaleItem {
  nama: string;
  satuan: string;
  qty: number;
  harga: number;
}

export interface SaleTransaction {
  id: string;
  nota: string;
  tanggal: string; // YYYY-MM-DD
  jam: string; // HH:MM
  pelangganNama: string;
  pelangganKode: string; // e.g. "A001" or "NON"
  status: "Lunas" | "Belum Lunas" | "Sebagian";
  metode: "Kas Tunai" | "Kredit Anggota" | "Transfer Bank" | "Potong Simpanan";
  diskon: number;
  items: SaleItem[];
}

export interface PurchaseItem {
  name: string;
  nama?: string;
  qty: number;
  price: number;
  harga?: number;
  satuan?: string;
  subtotal?: number;
}

export interface PurchaseTransaction {
  id: number;
  noNota: string;
  tanggal: string; // "05 Okt 2026, 13:45 WIB"
  tanggalIso: string; // "2026-10-05"
  supplier: string;
  total: number;
  status: "Lunas" | "Belum Lunas" | "Sebagian";
  metode: string;
  jatuhTempo: string;
  keterangan: string;
  items: PurchaseItem[];
  diskon?: number;
}

export interface SavingsTransaction {
  id: number;
  noBukti: string;
  tanggal: string; // "05 Okt 2026"
  jam: string; // "14:15 WIB"
  anggotaNama: string;
  anggotaKode: string;
  initials: string;
  jenis: "Simpanan Wajib" | "Simpanan Pokok" | "Simpanan Sukarela";
  tipe: "Setor" | "Tarik";
  nominal: number;
  keterangan: string;
  metode: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "Penjualan" | "Pembelian" | "Simpanan Wajib" | "Simpanan Sukarela";
  party: string;
  partyDetail: string;
  amount: number;
  status: "Lunas" | "Belum Lunas" | "Selesai";
}

export interface StatItem {
  title: string;
  amount: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

// Data Anggota Konsisten (design.md Section 11 & 24)
export const DUMMY_MEMBERS: Member[] = [
  {
    id: "A001",
    name: "Budi Santoso",
    gender: "Laki-laki",
    status: "Aktif",
    joinedDate: "12 Jan 2024",
    initials: "BS",
    depositStatus: "Simpanan Pokok Lunas",
  },
  {
    id: "A002",
    name: "Siti Rahmawati",
    gender: "Perempuan",
    status: "Aktif",
    joinedDate: "15 Jan 2024",
    initials: "SR",
    depositStatus: "Simpanan Pokok Lunas",
  },
  {
    id: "A123",
    name: "Rini Nuraini",
    gender: "Perempuan",
    status: "Aktif",
    joinedDate: "29 Sep 2026",
    initials: "RN",
    depositStatus: "Simpanan Pokok Lunas",
  },
  {
    id: "A124",
    name: "Agus Priyono",
    gender: "Laki-laki",
    status: "Aktif",
    joinedDate: "02 Okt 2026",
    initials: "AP",
    depositStatus: "Simpanan Pokok Lunas",
  },
  {
    id: "A125",
    name: "Dewi Sartika",
    gender: "Perempuan",
    status: "Aktif",
    joinedDate: "04 Okt 2026",
    initials: "DS",
    depositStatus: "Simpanan Pokok Lunas",
  },
];

// Data Master Anggota Lengkap (design.md & Screen Data Anggota)
export const MASTER_MEMBERS: MemberMaster[] = [
  {
    id: 1,
    code: "A001",
    name: "Budi Santoso",
    gender: "Laki-laki",
    status: "Aktif",
    date: "12 Jan 2024",
    email: "budi.santoso@email.com",
    nik: "3271041988010002",
    depositStatus: "Simpanan Pokok Lunas",
    totalDeposit: "Rp 4.250.000",
  },
  {
    id: 2,
    code: "A002",
    name: "Siti Rahmawati",
    gender: "Perempuan",
    status: "Aktif",
    date: "15 Jan 2024",
    email: "siti.rahma@email.com",
    nik: "3271045989020005",
    depositStatus: "Simpanan Pokok Lunas",
    totalDeposit: "Rp 3.800.000",
  },
  {
    id: 3,
    code: "A003",
    name: "Hendra Wijaya",
    gender: "Laki-laki",
    status: "Aktif",
    date: "03 Feb 2024",
    email: "h.wijaya@email.com",
    nik: "3271042385050001",
    depositStatus: "Simpanan Pokok Lunas",
    totalDeposit: "Rp 5.100.000",
  },
  {
    id: 4,
    code: "A004",
    name: "Dewi Sartika",
    gender: "Perempuan",
    status: "Aktif",
    date: "20 Mar 2024",
    email: "dewi.sartika@email.com",
    nik: "3271046193070008",
    depositStatus: "Simpanan Pokok Lunas",
    totalDeposit: "Rp 2.950.000",
  },
  {
    id: 5,
    code: "A005",
    name: "Agus Priyono",
    gender: "Laki-laki",
    status: "Non-Aktif",
    date: "18 Apr 2024",
    email: "agus.p@email.com",
    nik: "3271041180030004",
    depositStatus: "Simpanan Wajib Tertunggak",
    totalDeposit: "Rp 1.500.000",
  },
  {
    id: 6,
    code: "A006",
    name: "Rini Nuraini",
    gender: "Perempuan",
    status: "Aktif",
    date: "02 Mei 2024",
    email: "rini.nuraini@email.com",
    nik: "3271044492090003",
    depositStatus: "Simpanan Pokok Lunas",
    totalDeposit: "Rp 4.600.000",
  },
  {
    id: 7,
    code: "A007",
    name: "Ahmad Sudrajat",
    gender: "Laki-laki",
    status: "Aktif",
    date: "10 Jun 2024",
    email: "ahmad.sudrajat@email.com",
    nik: "3271041584060009",
    depositStatus: "Simpanan Pokok Lunas",
    totalDeposit: "Rp 3.120.000",
  },
  {
    id: 8,
    code: "A008",
    name: "Maya Indriati",
    gender: "Perempuan",
    status: "Menunggu Verifikasi",
    date: "01 Okt 2026",
    email: "maya.i@email.com",
    nik: "3271046798120007",
    depositStatus: "Menunggu Verifikasi Berkas",
    totalDeposit: "Rp 0",
  },
];

// Data Transaksi Penjualan Lengkap (design.md & Screen Transaksi Penjualan)
export const MASTER_SALES: SaleTransaction[] = [
  {
    id: "1",
    nota: "PJ-20261005-012",
    tanggal: "2026-10-05",
    jam: "14:20",
    pelangganNama: "Budi Santoso",
    pelangganKode: "A001",
    status: "Lunas",
    metode: "Kas Tunai",
    diskon: 0,
    items: [
      { nama: "Beras Premium Ramos 5kg", satuan: "Sak", qty: 2, harga: 72500 },
      { nama: "Minyak Goreng Sania 2L", satuan: "Pouch", qty: 1, harga: 30000 },
    ],
  },
  {
    id: "2",
    nota: "PJ-20261005-011",
    tanggal: "2026-10-05",
    jam: "11:45",
    pelangganNama: "Ahmad Dahlan",
    pelangganKode: "A005",
    status: "Belum Lunas",
    metode: "Kredit Anggota",
    diskon: 0,
    items: [
      { nama: "Gula Pasir Gulavit 1kg", satuan: "Kg", qty: 10, harga: 17500 },
      { nama: "Kopi Kapal Api Special 165g", satuan: "Bungkus", qty: 15, harga: 14000 },
      { nama: "Teh Celup Sariwangi 25s", satuan: "Kotak", qty: 5, harga: 7000 },
    ],
  },
  {
    id: "3",
    nota: "PJ-20261005-010",
    tanggal: "2026-10-05",
    jam: "09:30",
    pelangganNama: "Hendra Wijaya",
    pelangganKode: "A003",
    status: "Sebagian",
    metode: "Transfer Bank",
    diskon: 0,
    items: [
      { nama: "Susu Kental Manis Frisian Flag", satuan: "Kaleng", qty: 20, harga: 12500 },
      { nama: "Tepung Terigu Segitiga Biru 1kg", satuan: "Kg", qty: 8, harga: 12500 },
    ],
  },
  {
    id: "4",
    nota: "PJ-20261004-009",
    tanggal: "2026-10-04",
    jam: "16:15",
    pelangganNama: "Dewi Sartika",
    pelangganKode: "A004",
    status: "Lunas",
    metode: "Potong Simpanan",
    diskon: 5001,
    items: [
      { nama: "Telur Ayam Negeri", satuan: "Kg", qty: 5, harga: 29000 },
      { nama: "Kecap Manis Bango 520ml", satuan: "Pouch", qty: 3, harga: 23333 },
    ],
  },
  {
    id: "5",
    nota: "PJ-20261004-008",
    tanggal: "2026-10-04",
    jam: "13:10",
    pelangganNama: "Siti Rahmawati",
    pelangganKode: "A002",
    status: "Lunas",
    metode: "Kas Tunai",
    diskon: 0,
    items: [
      { nama: "Mie Instan Goreng (Kardus)", satuan: "Karton", qty: 1, harga: 115000 },
      { nama: "Sabun Cuci Sunlight 750ml", satuan: "Pouch", qty: 1, harga: 10000 },
    ],
  },
  {
    id: "6",
    nota: "PJ-20261003-007",
    tanggal: "2026-10-03",
    jam: "10:00",
    pelangganNama: "Toko Mitra Barokah",
    pelangganKode: "NON",
    status: "Lunas",
    metode: "Transfer Bank",
    diskon: 15000,
    items: [
      { nama: "Minyak Goreng Bimoli Jerigen 5L", satuan: "Jerigen", qty: 6, harga: 95000 },
      { nama: "Beras Pandan Wangi 10kg", satuan: "Sak", qty: 2, harga: 147500 },
    ],
  },
];

// Data Transaksi Pembelian Lengkap (design.md & Screen Transaksi Pembelian)
export const MASTER_PURCHASES: PurchaseTransaction[] = [
  {
    id: 1,
    noNota: "PB-20261005-004",
    tanggal: "05 Okt 2026, 13:45 WIB",
    tanggalIso: "2026-10-05",
    supplier: "CV Berkah Abadi (Distributor Sembako)",
    total: 680000,
    status: "Lunas",
    metode: "Kas Tunai",
    jatuhTempo: "-",
    keterangan: "Diterima lengkap gudang A",
    items: [
      { name: "Minyak Goreng Kita 2L (Dus)", qty: 2, price: 175000, subtotal: 350000 },
      { name: "Gula Pasir Kristal Putih 50kg", qty: 1, price: 330000, subtotal: 330000 },
    ],
  },
  {
    id: 2,
    noNota: "PB-20261004-003",
    tanggal: "04 Okt 2026, 10:15 WIB",
    tanggalIso: "2026-10-04",
    supplier: "PT Indomarco Adi Prima (Grosir FMCG)",
    total: 2450000,
    status: "Belum Lunas",
    metode: "Tempo 30 Hari",
    jatuhTempo: "04 Nov 2026",
    keterangan: "Faktur jatuh tempo 30 hari kalender",
    items: [
      { name: "Mie Instan Goreng (Karton)", qty: 15, price: 110000, subtotal: 1650000 },
      { name: "Susu Kental Manis Carnation (Dus)", qty: 2, price: 400000, subtotal: 800000 },
    ],
  },
  {
    id: 3,
    noNota: "PB-20261003-002",
    tanggal: "03 Okt 2026, 15:30 WIB",
    tanggalIso: "2026-10-03",
    supplier: "UD Sumber Pangan Makmur (Beras & Minyak)",
    total: 1850000,
    status: "Sebagian",
    metode: "Transfer Bank (DP 50%)",
    jatuhTempo: "15 Okt 2026",
    keterangan: "Telah dibayar uang muka Rp 925.000",
    items: [
      { name: "Beras Rojolele Delanggu 25kg", qty: 5, price: 370000, subtotal: 1850000 },
    ],
  },
  {
    id: 4,
    noNota: "PB-20261002-001",
    tanggal: "02 Okt 2026, 09:00 WIB",
    tanggalIso: "2026-10-02",
    supplier: "CV Mitra Distribusi Nusantara",
    total: 820000,
    status: "Lunas",
    metode: "Kas Tunai",
    jatuhTempo: "-",
    keterangan: "Pembelian sabun dan deterjen eceran",
    items: [
      { name: "Deterjen Bubuk Daia 800g (Dus)", qty: 4, price: 205000, subtotal: 820000 },
    ],
  },
  {
    id: 5,
    noNota: "PB-20260929-015",
    tanggal: "29 Sep 2026, 14:20 WIB",
    tanggalIso: "2026-09-29",
    supplier: "PT Wings Surya Distribusi",
    total: 1750000,
    status: "Belum Lunas",
    metode: "Tempo 14 Hari",
    jatuhTempo: "13 Okt 2026",
    keterangan: "Barang promo akhir kuartal",
    items: [
      { name: "Pembersih Lantai So Klin 800ml (Dus)", qty: 5, price: 150000, subtotal: 750000 },
      { name: "Pasta Gigi Pepsodent 190g (Dus)", qty: 4, price: 250000, subtotal: 1000000 },
    ],
  },
  {
    id: 6,
    noNota: "PB-20260925-012",
    tanggal: "25 Sep 2026, 11:00 WIB",
    tanggalIso: "2026-09-25",
    supplier: "Perum BULOG Subdivre",
    total: 7300000,
    status: "Lunas",
    metode: "Transfer Bank",
    jatuhTempo: "-",
    keterangan: "Pasokan Beras SPHP Program Kemitraan",
    items: [
      { name: "Beras SPHP 5kg (Kuintal)", qty: 10, price: 530000, subtotal: 5300000 },
      { name: "Minyakita Bantal 1L (Karton)", qty: 10, price: 200000, subtotal: 2000000 },
    ],
  },
];

// Data Mutasi Simpanan Lengkap (design.md & Screen Simpanan Anggota)
export const MASTER_SAVINGS: SavingsTransaction[] = [
  {
    id: 1,
    noBukti: "SP-20261005-021",
    tanggal: "05 Okt 2026",
    jam: "14:15 WIB",
    anggotaNama: "Budi Santoso",
    anggotaKode: "A001",
    initials: "BS",
    jenis: "Simpanan Wajib",
    tipe: "Setor",
    nominal: 50000,
    keterangan: "Setoran Wajib Bulan Oktober 2026",
    metode: "Kas Tunai",
  },
  {
    id: 2,
    noBukti: "SP-20261005-020",
    tanggal: "05 Okt 2026",
    jam: "11:30 WIB",
    anggotaNama: "Maya Indriati",
    anggotaKode: "A008",
    initials: "MI",
    jenis: "Simpanan Pokok",
    tipe: "Setor",
    nominal: 500000,
    keterangan: "Simpanan Pokok Keanggotaan Baru",
    metode: "Transfer Bank",
  },
  {
    id: 3,
    noBukti: "SP-20261004-019",
    tanggal: "04 Okt 2026",
    jam: "16:00 WIB",
    anggotaNama: "Hendra Wijaya",
    anggotaKode: "A003",
    initials: "HW",
    jenis: "Simpanan Sukarela",
    tipe: "Setor",
    nominal: 250000,
    keterangan: "Tabungan Qurban 2027",
    metode: "Kas Tunai",
  },
  {
    id: 4,
    noBukti: "SP-20261004-018",
    tanggal: "04 Okt 2026",
    jam: "10:20 WIB",
    anggotaNama: "Dewi Sartika",
    anggotaKode: "A004",
    initials: "DS",
    jenis: "Simpanan Wajib",
    tipe: "Setor",
    nominal: 50000,
    keterangan: "Setoran Wajib Bulan Oktober 2026",
    metode: "Potong Gaji",
  },
  {
    id: 5,
    noBukti: "SP-20261003-017",
    tanggal: "03 Okt 2026",
    jam: "13:45 WIB",
    anggotaNama: "Ahmad Dahlan",
    anggotaKode: "A005",
    initials: "AD",
    jenis: "Simpanan Sukarela",
    tipe: "Tarik",
    nominal: 300000,
    keterangan: "Penarikan simpanan sukarela untuk belanja toko",
    metode: "Kas Tunai",
  },
  {
    id: 6,
    noBukti: "SP-20261002-016",
    tanggal: "02 Okt 2026",
    jam: "09:15 WIB",
    anggotaNama: "Siti Rahmawati",
    anggotaKode: "A002",
    initials: "SR",
    jenis: "Simpanan Wajib",
    tipe: "Setor",
    nominal: 50000,
    keterangan: "Setoran Wajib Bulan Oktober 2026",
    metode: "Kas Tunai",
  },
];

// Data Transaksi Terbaru Konsisten (design.md Section 8, 12, 13, 14)
export const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "PJ-20261005-012",
    date: "05 Okt 2026, 14:20",
    type: "Penjualan",
    party: "Budi Santoso",
    partyDetail: "No. A001",
    amount: 175000,
    status: "Lunas",
  },
  {
    id: "PB-20261005-004",
    date: "05 Okt 2026, 13:45",
    type: "Pembelian",
    party: "CV Berkah Abadi",
    partyDetail: "Supplier Sembako",
    amount: 680000,
    status: "Lunas",
  },
  {
    id: "SP-20261005-008",
    date: "05 Okt 2026, 11:15",
    type: "Simpanan Wajib",
    party: "Siti Rahmawati",
    partyDetail: "No. A002",
    amount: 50000,
    status: "Selesai",
  },
  {
    id: "PJ-20261005-011",
    date: "05 Okt 2026, 10:30",
    type: "Penjualan",
    party: "Ahmad Dahlan",
    partyDetail: "No. A015",
    amount: 420000,
    status: "Belum Lunas",
  },
  {
    id: "SP-20261005-007",
    date: "05 Okt 2026, 09:10",
    type: "Simpanan Sukarela",
    party: "Hendra Wijaya",
    partyDetail: "No. A043",
    amount: 200000,
    status: "Selesai",
  },
];

// Likuiditas Kas & Bank (design.md Section 17 & 30)
export const DUMMY_LIQUIDITY = {
  kasOperasional: 18450000,
  bankMandiri: 94200000,
  cadanganSHU: 12800000,
  total: 125450000,
};

// Formatter Rupiah konsisten sesuai Section 30: "Rp 12.500.000"
export function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}
