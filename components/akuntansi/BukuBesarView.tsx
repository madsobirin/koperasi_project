"use client";

import { useState, useMemo } from "react";

interface LedgerRecord {
  id: string;
  date: string;
  time: string;
  code: string;
  memo: string;
  debit: number | null;
  kredit: number | null;
  saldo: number;
  type: "system" | "simpanan" | "pembelian" | "penjualan" | "transfer";
}

interface AccountInfo {
  code: string;
  name: string;
  type: string;
  desc: string;
  normal: "Debit (+)" | "Kredit (+)";
  saldoAwal: number;
  records: LedgerRecord[];
}

const INITIAL_ACCOUNTS: Record<string, AccountInfo> = {
  "1-1001": {
    code: "1-1001",
    name: "Kas Operasional Toko",
    type: "Aset Lancar",
    desc: "Kas kecil tunai untuk kasir harian minimarket toko koperasi",
    normal: "Debit (+)",
    saldoAwal: 18450000,
    records: [
      {
        id: "1",
        date: "01 Okt 2026",
        time: "00:00",
        code: "JU-20261001-000",
        memo: "Saldo Awal Buku Kas per 1 Oktober 2026",
        debit: null,
        kredit: null,
        saldo: 18450000,
        type: "system",
      },
      {
        id: "2",
        date: "01 Okt 2026",
        time: "08:30",
        code: "SP-20261001-014",
        memo: "Setoran Simpanan Wajib - Agus Priyono (A005)",
        debit: 50000,
        kredit: null,
        saldo: 18500000,
        type: "simpanan",
      },
      {
        id: "3",
        date: "02 Okt 2026",
        time: "10:15",
        code: "PB-20261002-001",
        memo: "Pembayaran Tunai Pembelian Barang Toko (CV Mitra Distribusi)",
        debit: null,
        kredit: 820000,
        saldo: 17680000,
        type: "pembelian",
      },
      {
        id: "4",
        date: "03 Okt 2026",
        time: "14:00",
        code: "PJ-20261003-007",
        memo: "Penjualan Tunai Sembako Toko Mitra Barokah",
        debit: 850000,
        kredit: null,
        saldo: 18530000,
        type: "penjualan",
      },
      {
        id: "5",
        date: "04 Okt 2026",
        time: "09:10",
        code: "SP-20261004-018",
        memo: "Setoran Simpanan Wajib - Siti Rahmawati (A002)",
        debit: 50000,
        kredit: null,
        saldo: 18580000,
        type: "simpanan",
      },
      {
        id: "6",
        date: "05 Okt 2026",
        time: "08:15",
        code: "SP-20261005-020",
        memo: "Setoran Simpanan Pokok Anggota Baru - Maya Indriati (A008)",
        debit: 500000,
        kredit: null,
        saldo: 19080000,
        type: "simpanan",
      },
      {
        id: "7",
        date: "05 Okt 2026",
        time: "11:00",
        code: "PB-20261005-004",
        memo: "Pembayaran Tunai Faktur Pembelian CV Berkah Abadi",
        debit: null,
        kredit: 680000,
        saldo: 18400000,
        type: "pembelian",
      },
      {
        id: "8",
        date: "05 Okt 2026",
        time: "13:45",
        code: "PJ-20261005-012",
        memo: "Penerimaan Kas Penjualan Barang Konsumsi Anggota (Budi Santoso)",
        debit: 175000,
        kredit: null,
        saldo: 18575000,
        type: "penjualan",
      },
      {
        id: "9",
        date: "05 Okt 2026",
        time: "15:20",
        code: "JU-20261005-045",
        memo: "Penarikan Kas Bank Mandiri untuk Pengisian Kas Operasional Toko",
        debit: 3804999,
        kredit: null,
        saldo: 22379999,
        type: "transfer",
      },
    ],
  },
  "1-1002": {
    code: "1-1002",
    name: "Kas Bank Mandiri Koperasi",
    type: "Aset Lancar",
    desc: "Rekening Giro Utama Koperasi Sejahtera No. 137-00-198822-1",
    normal: "Debit (+)",
    saldoAwal: 64200000,
    records: [
      {
        id: "1",
        date: "01 Okt 2026",
        time: "00:00",
        code: "JU-20261001-000",
        memo: "Saldo Awal Bank Mandiri per 1 Oktober 2026",
        debit: null,
        kredit: null,
        saldo: 64200000,
        type: "system",
      },
      {
        id: "2",
        date: "02 Okt 2026",
        time: "11:30",
        code: "SP-20261002-005",
        memo: "Transfer Simpanan Sukarela Anggota via QRIS",
        debit: 2500000,
        kredit: null,
        saldo: 66700000,
        type: "simpanan",
      },
      {
        id: "3",
        date: "04 Okt 2026",
        time: "16:00",
        code: "PJ-20261004-022",
        memo: "Penerimaan Pembayaran Non-Tunai EDC Toko",
        debit: 10000000,
        kredit: null,
        saldo: 76700000,
        type: "penjualan",
      },
      {
        id: "4",
        date: "05 Okt 2026",
        time: "15:20",
        code: "JU-20261005-045",
        memo: "Pengeluaran Kas ke Kasir Toko Operasional",
        debit: null,
        kredit: 3804999,
        saldo: 72895001,
        type: "transfer",
      },
    ],
  },
  "3-1001": {
    code: "3-1001",
    name: "Simpanan Pokok Anggota",
    type: "Ekuitas Koperasi",
    desc: "Modal pokok anggota terdaftar (non-tarik tunai sebelum keluar keanggotaan)",
    normal: "Kredit (+)",
    saldoAwal: 45000000,
    records: [
      {
        id: "1",
        date: "01 Okt 2026",
        time: "00:00",
        code: "JU-20261001-000",
        memo: "Saldo Awal Simpanan Pokok per 1 Oktober 2026",
        debit: null,
        kredit: null,
        saldo: 45000000,
        type: "system",
      },
      {
        id: "2",
        date: "05 Okt 2026",
        time: "08:15",
        code: "SP-20261005-020",
        memo: "Setoran Simpanan Pokok Anggota Baru - Maya Indriati (A008)",
        debit: null,
        kredit: 500000,
        saldo: 45500000,
        type: "simpanan",
      },
    ],
  },
};

const formatRupiah = (num: number) => {
  return "Rp " + num.toLocaleString("id-ID");
};

const formatNumber = (num: number | null) => {
  if (num === null) return "-";
  return num.toLocaleString("id-ID");
};

export default function BukuBesarView() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [selectedAccountKey, setSelectedAccountKey] = useState("1-1001");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("01 Okt 2026 - 31 Okt 2026");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State Modal
  const [formDate, setFormDate] = useState("2026-10-06");
  const [formRefNo, setFormRefNo] = useState("JU-20261006-001");
  const [formMemo, setFormMemo] = useState("");
  const [formPosition, setFormPosition] = useState<"debit" | "kredit">("debit");
  const [formNominal, setFormNominal] = useState("");

  const currentAccount = accounts[selectedAccountKey] || accounts["1-1001"];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Kalkulasi Dinamis
  const filteredRecords = useMemo(() => {
    return currentAccount.records.filter((rec) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return rec.code.toLowerCase().includes(q) || rec.memo.toLowerCase().includes(q);
    });
  }, [currentAccount, searchQuery]);

  const { totalDebit, totalKredit, countDebit, countKredit, finalSaldo } = useMemo(() => {
    let tDebit = 0;
    let tKredit = 0;
    let cDebit = 0;
    let cKredit = 0;

    currentAccount.records.forEach((r) => {
      if (r.debit) {
        tDebit += r.debit;
        cDebit++;
      }
      if (r.kredit) {
        tKredit += r.kredit;
        cKredit++;
      }
    });

    const isDebitNormal = currentAccount.normal === "Debit (+)";
    const calcFinal = isDebitNormal
      ? currentAccount.saldoAwal + tDebit - tKredit
      : currentAccount.saldoAwal + tKredit - tDebit;

    return {
      totalDebit: tDebit,
      totalKredit: tKredit,
      countDebit: cDebit,
      countKredit: cKredit,
      finalSaldo: calcFinal,
    };
  }, [currentAccount]);

  const handleOpenModal = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFormRefNo(`JU-20261006-${randomNum}`);
    setFormMemo("");
    setFormNominal("");
    setFormPosition("debit");
    setIsModalOpen(true);
  };

  const handlePostJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInt(formNominal, 10);
    if (!nominal || nominal <= 0) return;

    const isDebit = formPosition === "debit";
    const debitVal = isDebit ? nominal : null;
    const kreditVal = !isDebit ? nominal : null;

    const lastSaldo = currentAccount.records[currentAccount.records.length - 1]?.saldo || currentAccount.saldoAwal;
    const newSaldo =
      currentAccount.normal === "Debit (+)"
        ? lastSaldo + (debitVal || 0) - (kreditVal || 0)
        : lastSaldo + (kreditVal || 0) - (debitVal || 0);

    const newRecord: LedgerRecord = {
      id: String(Date.now()),
      date: "06 Okt 2026",
      time: "Baru",
      code: formRefNo,
      memo: formMemo,
      debit: debitVal,
      kredit: kreditVal,
      saldo: newSaldo,
      type: "transfer",
    };

    setAccounts((prev) => ({
      ...prev,
      [selectedAccountKey]: {
        ...prev[selectedAccountKey],
        records: [...prev[selectedAccountKey].records, newRecord],
      },
    }));

    setIsModalOpen(false);
    showToast(`Transaksi ${formRefNo} berhasil diposting ke Buku Besar!`);
  };

  const handleExportExcel = () => {
    showToast("Memproses Ekspor Excel... File data buku besar siap diunduh.");
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-200 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-[#0F172A] text-white text-xs sm:text-sm font-medium border border-[#334155]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span>Koperasi</span>
            <span>/</span>
            <span className="text-[#64748B] font-medium">Akuntansi</span>
            <span>/</span>
            <span className="text-[#2563EB] font-semibold">Buku Besar</span>
          </div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Buku Besar
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Rekapitulasi mutasi transaksi debit, kredit, dan pergerakan saldo per akun buku besar koperasi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => window.print()}
            className="h-9 px-3.5 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-lg text-xs sm:text-[13px] font-semibold hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
            </svg>
            <span>Cetak Buku Besar</span>
          </button>

          <button
            type="button"
            onClick={handleExportExcel}
            className="h-9 px-3.5 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-lg text-xs sm:text-[13px] font-semibold hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/>
            </svg>
            <span>Ekspor Excel</span>
          </button>

          <button
            type="button"
            onClick={handleOpenModal}
            className="h-9 px-4 bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-lg text-xs sm:text-[13px] font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>Posting Jurnal Baru</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Strip */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 mb-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Akun Selector */}
          <div className="md:col-span-5 flex flex-col gap-1">
            <label htmlFor="account-select" className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18"/><path d="M3 10h18"/><path d="m5 6 7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/>
              </svg>
              <span>Pilih Rekening Akun (COA)</span>
            </label>
            <div className="relative">
              <select
                id="account-select"
                value={selectedAccountKey}
                onChange={(e) => {
                  setSelectedAccountKey(e.target.value);
                  showToast(`Menampilkan Buku Besar: ${accounts[e.target.value]?.name || e.target.value}`);
                }}
                className="w-full h-9 pl-3 pr-8 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] font-semibold focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all appearance-none cursor-pointer"
              >
                <option value="1-1001">[1-1001] Kas Operasional Toko</option>
                <option value="1-1002">[1-1002] Kas Bank Mandiri Koperasi</option>
                <option value="1-1020">[1-1020] Piutang Anggota</option>
                <option value="1-1030">[1-1030] Persediaan Barang Dagang Sembako</option>
                <option value="2-1001">[2-1001] Hutang Usaha / Supplier</option>
                <option value="3-1001">[3-1001] Simpanan Pokok Anggota</option>
                <option value="3-1002">[3-1002] Simpanan Wajib Anggota</option>
                <option value="3-1003">[3-1003] Simpanan Sukarela Anggota</option>
                <option value="4-1001">[4-1001] Pendapatan Penjualan Toko</option>
                <option value="5-1001">[5-1001] Beban Pokok Penjualan (HPP)</option>
                <option value="5-1002">[5-1002] Beban Operasional &amp; Listrik</option>
              </select>
              <svg className="w-4 h-4 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Periode Picker */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label htmlFor="period-select" className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>Periode Pembukuan</span>
            </label>
            <div className="relative">
              <select
                id="period-select"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all appearance-none cursor-pointer"
              >
                <option>01 Okt 2026 - 31 Okt 2026</option>
                <option>September 2026</option>
                <option>Triwulan III (Jul - Sep 2026)</option>
                <option>Tahun Berjalan 2026</option>
              </select>
              <svg className="w-4 h-4 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Live Search Filter */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label htmlFor="search-input" className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              <span>Filter Cepat Baris</span>
            </label>
            <div className="relative">
              <svg className="w-4 h-4 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor bukti / memo..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
              />
            </div>
          </div>

          {/* Reset Filter Button */}
          <div className="md:col-span-1 flex flex-col justify-end pt-1 md:pt-5">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedAccountKey("1-1001");
                showToast("Filter pencarian telah direset.");
              }}
              title="Reset Filter"
              className="h-9 w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] rounded-lg flex items-center justify-center border border-[#E2E8F0] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Accounting Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Saldo Awal */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
              Saldo Awal (01 Okt)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#EFF6FF] text-[#2563EB] font-semibold border border-blue-100">
              Posisi: {currentAccount.normal.includes("Debit") ? "Debit" : "Kredit"}
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              {formatRupiah(currentAccount.saldoAwal)}
            </div>
            <div className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Saldo terbawa dari Sept 2026</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Mutasi Debit */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
              Total Mutasi Debit
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-[#16A34A] font-semibold flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
              <span>Masuk</span>
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#16A34A] tracking-tight">
              + {formatRupiah(totalDebit)}
            </div>
            <div className="text-xs text-[#94A3B8] mt-1">
              {countDebit} transaksi posting debit
            </div>
          </div>
        </div>

        {/* Card 3: Total Mutasi Kredit */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
              Total Mutasi Kredit
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-50 text-[#F59E0B] font-semibold flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
              <span>Keluar</span>
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              - {formatRupiah(totalKredit)}
            </div>
            <div className="text-xs text-[#94A3B8] mt-1">
              {countKredit} transaksi pengeluaran
            </div>
          </div>
        </div>

        {/* Card 4: Saldo Akhir (Highlight Enterprise) */}
        <div className="bg-[#2563EB] text-white rounded-xl p-4 sm:p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-blue-100 uppercase tracking-wider font-bold">
              Saldo Akhir Per 05 Okt
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/20 text-white font-semibold border border-white/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Seimbang / Valid</span>
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {formatRupiah(finalSaldo)}
            </div>
            <div className="text-xs text-blue-100 mt-1 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Terekonsiliasi Kas Fisik Toko</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Account Profile Badge Strip */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 mb-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-white to-[#F8FAFC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-16 0V6"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                {currentAccount.code} • {currentAccount.name}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-[#EFF6FF] text-[#2563EB] font-semibold border border-blue-100">
                {currentAccount.type}
              </span>
            </div>
            <span className="text-xs text-[#94A3B8]">{currentAccount.desc}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#64748B] divide-x divide-[#E2E8F0] pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
          <div className="flex flex-col">
            <span className="text-[#94A3B8]">Saldo Normal:</span>
            <span className="font-semibold text-[#0F172A]">{currentAccount.normal}</span>
          </div>
          <div className="pl-4 flex flex-col">
            <span className="text-[#94A3B8]">Mata Uang:</span>
            <span className="font-semibold text-[#0F172A]">IDR (Rupiah)</span>
          </div>
          <div className="pl-4 flex flex-col">
            <span className="text-[#94A3B8]">Status Akun:</span>
            <span className="font-semibold text-[#16A34A] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Aktif
            </span>
          </div>
        </div>
      </div>

      {/* General Ledger Data Table Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden flex flex-col">
        {/* Visual Ledger Toolbar */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-2 font-medium">
            <svg className="w-4 h-4 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/>
            </svg>
            <span>Mutasi Jurnal Akun Buku Kas</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#0F172A] font-semibold">{filteredRecords.length} Baris Transaksi Terdaftar</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#94A3B8] hidden sm:inline">Format: Standar SAK ETAP Koperasi RI</span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-[#2563EB] hover:underline font-semibold cursor-pointer"
            >
              Tampilkan Semua
            </button>
          </div>
        </div>

        {/* Table Responsive Scroller */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-2.5 px-4 w-40">Tanggal &amp; Waktu</th>
                <th className="py-2.5 px-4 w-36">No Bukti</th>
                <th className="py-2.5 px-4">Keterangan Memo Transaksi</th>
                <th className="py-2.5 px-4 text-right w-36">Debit (Rp)</th>
                <th className="py-2.5 px-4 text-right w-36">Kredit (Rp)</th>
                <th className="py-2.5 px-4 text-right w-44">Saldo Berjalan (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs text-[#0F172A]">
              {filteredRecords.map((r) => {
                const isDebit = r.debit !== null;
                const isKredit = r.kredit !== null;

                return (
                  <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 text-[#94A3B8] whitespace-nowrap">
                      {r.date} <span className="text-[11px] text-[#94A3B8]">{r.time}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        onClick={() => showToast(`Rincian Bukti: [${r.code}] ${r.memo}`)}
                        className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[11px] font-medium cursor-pointer transition-colors ${
                          r.type === "simpanan"
                            ? "bg-blue-50 text-[#1D4ED8] hover:bg-blue-100"
                            : r.type === "pembelian"
                            ? "bg-amber-50 text-[#F59E0B] hover:bg-amber-100"
                            : r.type === "penjualan"
                            ? "bg-emerald-50 text-[#16A34A] hover:bg-emerald-100"
                            : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]"
                        }`}
                      >
                        {r.code}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        {r.type !== "system" && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isDebit ? "bg-[#16A34A]" : "bg-[#F59E0B]"
                            }`}
                          />
                        )}
                        <span className={r.type === "system" ? "font-semibold" : ""}>{r.memo}</span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-right font-mono ${isDebit ? "text-[#16A34A] font-semibold" : "text-[#94A3B8]"}`}>
                      {formatNumber(r.debit)}
                    </td>
                    <td className={`py-3 px-4 text-right font-mono ${isKredit ? "text-[#DC2626] font-semibold" : "text-[#94A3B8]"}`}>
                      {formatNumber(r.kredit)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#0F172A]">
                      {r.saldo.toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Accounting Formal Total Footer */}
            <tfoot className="bg-[#F8FAFC] border-t-2 border-[#E2E8F0] text-xs">
              <tr className="border-b-2 border-[#0F172A]">
                <td colSpan={3} className="py-3.5 px-4 text-[#0F172A] font-bold text-right tracking-wider uppercase">
                  TOTAL MUTASI &amp; SALDO AKHIR
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-[#16A34A]">
                  {formatRupiah(totalDebit)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-[#0F172A]">
                  {formatRupiah(totalKredit)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#2563EB] text-sm">
                  {formatRupiah(finalSaldo)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span>Menampilkan</span>
            <select className="h-7 px-2 rounded border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none">
              <option>25 per halaman</option>
              <option>50 per halaman</option>
              <option>Semua (Okt 2026)</option>
            </select>
            <span>dari {filteredRecords.length} total posting transaksi</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="px-2.5 py-1 rounded border border-[#E2E8F0] text-xs text-[#94A3B8] disabled:opacity-50 cursor-pointer"
            >
              Sebelumnya
            </button>
            <span className="px-3 py-1 rounded bg-[#2563EB] text-white text-xs font-semibold">1</span>
            <button
              type="button"
              className="px-2.5 py-1 rounded border border-[#E2E8F0] text-xs text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>

      {/* Audit Reconciliation & Internal Control Stamp */}
      <div className="mt-6 p-4 rounded-xl border border-[#E2E8F0] bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A]">Validasi Integritas Pembukuan Terverifikasi</h4>
            <p className="text-xs text-[#64748B]">
              Debit &amp; Kredit pada akun [{currentAccount.code}] telah sesuai dengan Jurnal Umum Koperasi Sejahtera. Status audit:{" "}
              <strong className="text-[#16A34A] font-semibold">Lolos Uji Rekonsiliasi Otomatis</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-[#94A3B8] shrink-0">
          <span>Petugas Pemeriksa: <strong className="text-[#0F172A]">Budi Pratama</strong> (Admin)</span>
          <span>•</span>
          <span>Sinkronisasi Terakhir: Hari ini, 15:30 WIB</span>
        </div>
      </div>

      {/* Modal: Posting Jurnal Baru (Voucher Popup) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-white border-b border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Posting Jurnal / Transaksi Memo</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostJournal} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] mb-1">Tanggal Transaksi</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] mb-1">Nomor Referensi / Bukti</label>
                  <input
                    type="text"
                    value={formRefNo}
                    onChange={(e) => setFormRefNo(e.target.value)}
                    required
                    placeholder="JU-20261006-001"
                    className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1">Akun Terkait</label>
                <input
                  type="text"
                  readOnly
                  value={`[${currentAccount.code}] ${currentAccount.name}`}
                  className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] text-xs font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1">Keterangan Memo</label>
                <textarea
                  rows={2}
                  required
                  value={formMemo}
                  onChange={(e) => setFormMemo(e.target.value)}
                  placeholder="Contoh: Penerimaan tambahan modal kas operasional..."
                  className="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] mb-1">Posisi Akun</label>
                  <select
                    value={formPosition}
                    onChange={(e) => setFormPosition(e.target.value as "debit" | "kredit")}
                    className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs font-medium focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="debit">Debit (Penerimaan Kas)</option>
                    <option value="kredit">Kredit (Pengeluaran Kas)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] mb-1">Nominal (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">Rp</span>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={1000}
                      value={formNominal}
                      onChange={(e) => setFormNominal(e.target.value)}
                      placeholder="500000"
                      className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-9 px-4 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                  </svg>
                  <span>Simpan Posting</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
