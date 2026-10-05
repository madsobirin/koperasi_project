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
