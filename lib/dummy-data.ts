export interface Member {
  id: string;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  status: "Aktif" | "Nonaktif";
  joinedDate: string;
  initials: string;
  depositStatus: string;
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
