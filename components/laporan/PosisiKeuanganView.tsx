"use client";

import { useState } from "react";
import Link from "next/link";

interface ToastState {
  title: string;
  desc: string;
}

export default function PosisiKeuanganView() {
  const [selectedPeriod, setSelectedPeriod] = useState("2026-10-31");
  const [showComparative, setShowComparative] = useState(true);
  const [formatView, setFormatView] = useState<"skontro" | "stafel">("skontro");
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (title: string, desc: string) => {
    setToast({ title, desc });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    showToast(
      "Ekspor Excel Selesai",
      "Neraca_Komparatif_Okt2026.xlsx telah diunduh dengan rumus pembukuan lengkap."
    );
  };

  const handleExportPdf = () => {
    showToast(
      "Menghasilkan Dokumen PDF",
      "Laporan Posisi Keuangan resmi berstempel digital sedang dikompilasi (PDF/A Standard)."
    );
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 bg-white text-[#0F172A] p-4 rounded-xl shadow-xl flex items-start gap-3.5 max-w-sm border border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#16A34A] shrink-0 mt-0.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold text-[#0F172A] leading-tight">
              {toast.title}
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">{toast.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Document Header Bar & Controls */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold tracking-wide uppercase">
                SAK ETAP Pasal 17 &amp; 30
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></span>
              <span className="text-xs text-[#64748B] font-medium">
                Buku Kas Periode Fiskal 2026
              </span>
            </div>
            <h1 className="text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight mt-1">
              Laporan Posisi Keuangan (Neraca)
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="h-[38px] px-3.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs sm:text-[13px] font-semibold flex items-center gap-2 border border-[#E2E8F0] shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width="12" height="8" x="6" y="14" />
              </svg>
              <span>Cetak Laporan</span>
            </button>
            <button
              type="button"
              onClick={handleExportExcel}
              className="h-[38px] px-3.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs sm:text-[13px] font-semibold flex items-center gap-2 border border-[#E2E8F0] shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Ekspor Excel</span>
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              className="h-[38px] px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Unduh PDF Resmi</span>
            </button>
          </div>
        </div>

        {/* Filter & Format Toolbar */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Cut-Off Date Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="period-select" className="text-xs text-[#64748B] font-medium shrink-0">
                Cut-Off Laporan:
              </label>
              <div className="relative">
                <select
                  id="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="h-[38px] pl-3 pr-8 rounded-lg bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] text-xs sm:text-[13px] font-medium appearance-none focus:outline-hidden focus:border-[#2563EB] cursor-pointer"
                >
                  <option value="2026-10-31">Per 31 Oktober 2026 (Audit Bulanan)</option>
                  <option value="2026-09-30">Per 30 September 2026 (Triwulan III)</option>
                  <option value="2025-12-31">Per 31 Desember 2025 (Tutup Buku Tahunan)</option>
                </select>
                <svg
                  className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div className="h-6 w-px bg-[#E2E8F0] hidden sm:block"></div>

            {/* Comparative Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showComparative}
                onChange={(e) => setShowComparative(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] accent-[#2563EB] cursor-pointer"
              />
              <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                Sandingkan Data Komparatif (Des 2025)
              </span>
            </label>
          </div>

          {/* Layout Toggle: Skontro vs Stafel */}
          <div className="flex items-center gap-1.5 self-start lg:self-auto bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] text-[#94A3B8] px-2 font-medium">Bentuk Neraca:</span>
            <button
              type="button"
              onClick={() => setFormatView("skontro")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                formatView === "skontro"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="7" height="18" x="3" y="3" rx="1" />
                <rect width="7" height="18" x="14" y="3" rx="1" />
              </svg>
              <span>Skontro (2 Kolom)</span>
            </button>
            <button
              type="button"
              onClick={() => setFormatView("stafel")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                formatView === "stafel"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>Stafel (Vertikal)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview Cards (4 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Total Aset */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-blue-50/70 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                Total Aset (Aktiva)
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18" />
                  <path d="M3 10h18" />
                  <path d="m5 6 7-3 7 3" />
                  <path d="M4 10v11" />
                  <path d="M20 10v11" />
                </svg>
              </div>
            </div>
            <div className="text-[24px] font-bold text-[#0F172A] mt-2.5">
              Rp 249.500.000
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#16A34A]">
              ↑ 8.4%
            </span>
            <span className="text-[11px] text-[#94A3B8]">vs Des 2025 (Rp 230.1M)</span>
          </div>
        </div>

        {/* Card 2: Total Kewajiban */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-amber-500/10 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                Total Kewajiban (Hutang)
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-[#B45309]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>
            <div className="text-[24px] font-bold text-[#0F172A] mt-2.5">
              Rp 17.300.000
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800">
              Likuiditas 14.3x
            </span>
            <span className="text-[11px] text-[#94A3B8]">Rasio lancar sangat aman</span>
          </div>
        </div>

        {/* Card 3: Ekuitas Mandiri */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                Total Ekuitas Mandiri
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1D4ED8]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            <div className="text-[24px] font-bold text-[#0F172A] mt-2.5">
              Rp 232.200.000
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
            <span className="text-[11px] text-[#64748B]">
              Porsi 93.1% modal mandiri anggota
            </span>
          </div>
        </div>

        {/* Card 4: Status Keseimbangan */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between relative overflow-hidden bg-linear-to-br from-white via-white to-emerald-50/40">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                Status Keseimbangan
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#16A34A]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2.5">
              <span className="text-[22px] font-bold text-[#16A34A]">SEIMBANG (KLOP)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="text-[11px] text-[#64748B]">Aset = Kewajiban + Modal</span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Selisih: Rp 0
            </span>
          </div>
        </div>
      </div>

      {/* Formal Accounting Document Container (Clean White Sheet) */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 mb-8 relative">
        {/* Printable Formal Letterhead / Kop Resmi Dokumen */}
        <div className="flex flex-col items-center text-center pb-8 mb-8 border-b border-[#E2E8F0] relative">
          <div className="w-14 h-14 mb-3 rounded-full bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-[#2563EB] shadow-xs">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18" />
              <path d="M3 10h18" />
              <path d="m5 6 7-3 7 3" />
              <path d="M4 10v11" />
              <path d="M20 10v11" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            KOPERASI KONSUMEN SEJAHTERA BERSAMA
          </h2>
          <div className="text-base sm:text-lg text-[#2563EB] font-bold tracking-wide mt-1 uppercase">
            LAPORAN POSISI KEUANGAN (NERACA)
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">
            Per 31 Oktober 2026 &amp; 31 Desember 2025
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            <span className="text-[11px] text-[#64748B] font-medium">
              Standar Akuntansi Keuangan Entitas Tanpa Akuntabilitas Publik (SAK ETAP) • Disajikan dalam Rupiah (IDR)
            </span>
          </div>
        </div>

        {/* VIEW 1: SKONTRO (TWO-COLUMN T-ACCOUNT FORMAT) */}
        {formatView === "skontro" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" id="view-skontro">
            {/* SISI KIRI: ASET / AKTIVA */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-3 bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2.5 rounded-lg mb-4">
                <span className="text-sm font-bold text-[#0F172A] tracking-tight uppercase">
                  1. ASET (AKTIVA)
                </span>
                {showComparative && (
                  <span className="text-[11px] text-[#94A3B8] uppercase font-bold text-right">
                    Okt 2026 / Des 2025
                  </span>
                )}
              </div>

              {/* A. ASET LANCAR */}
              <div className="mb-6">
                <div className="text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-2 px-2">
                  A. Aset Lancar
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Kas &amp; Setara Kas
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Kas Toko, Giro BRI, Rek Bank Mandiri
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 159.000.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          142.500.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Piutang Usaha &amp; Anggota
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Penjualan tempo minimarket &amp; pinjaman
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 55.350.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          48.200.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Persediaan Barang Dagang
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Metode FIFO rata-rata tertimbang
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 29.800.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          36.150.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Aset Lancar Lainnya
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Sewa dibayar dimuka &amp; perlengkapan
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 3.450.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          1.800.000
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtotal Aset Lancar */}
                  <div className="flex items-center justify-between py-2.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mt-2">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-bold">
                      Sub Total Aset Lancar
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] font-bold text-[#0F172A]">
                        Rp 247.600.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#94A3B8]">
                          228.650.000
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* B. ASET TETAP */}
              <div className="mb-6">
                <div className="text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-2 px-2">
                  B. Aset Tetap (Nilai Perolehan &amp; Akumulasi)
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                      Peralatan Toko &amp; Komputer POS
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 18.500.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          14.000.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <span className="text-xs sm:text-[13px] text-[#DC2626] font-medium pl-2">
                      Akumulasi Penyusutan Peralatan
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#DC2626] font-medium">
                        (Rp 3.850.000)
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#DC2626]/80">
                          (2.550.000)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                      Bangunan Usaha Kantor &amp; Gudang
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 55.000.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          55.000.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <span className="text-xs sm:text-[13px] text-[#DC2626] font-medium pl-2">
                      Akumulasi Penyusutan Bangunan
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#DC2626] font-medium">
                        (Rp 67.750.000)
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#DC2626]/80">
                          (65.000.000)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                      Aset Tetap Lainnya
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 0
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          0
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtotal Aset Tetap */}
                  <div className="flex items-center justify-between py-2.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mt-2">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-bold">
                      Sub Total Nilai Buku Aset Tetap
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] font-bold text-[#0F172A]">
                        Rp 1.900.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#94A3B8]">
                          1.450.000
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* TOTAL ASET (FOOTER SISI KIRI) */}
              <div className="mt-auto pt-4">
                <div className="p-4 rounded-xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-between shadow-xs">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#2563EB] font-bold uppercase tracking-wider">
                      TOTAL KESELURUHAN
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A]">
                      TOTAL ASET (AKTIVA)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#2563EB]">
                      Rp 249.500.000
                    </div>
                    {showComparative && (
                      <div className="text-[11px] text-[#94A3B8] font-mono mt-0.5">
                        Des 2025: Rp 230.100.000
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SISI KANAN: KEWAJIBAN & EKUITAS / PASIVA */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-3 bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2.5 rounded-lg mb-4">
                <span className="text-sm font-bold text-[#0F172A] tracking-tight uppercase">
                  2. KEWAJIBAN &amp; EKUITAS (PASIVA)
                </span>
                {showComparative && (
                  <span className="text-[11px] text-[#94A3B8] uppercase font-bold text-right">
                    Okt 2026 / Des 2025
                  </span>
                )}
              </div>

              {/* A. KEWAJIBAN JANGKA PENDEK */}
              <div className="mb-6">
                <div className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-2 px-2">
                  A. Kewajiban Jangka Pendek (Hutang)
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Hutang Usaha Supplier Dagang
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Faktur supplier sembako &amp; konsinyasi
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 14.850.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          16.200.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Hutang Beban Operasional &amp; Listrik
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Akrual gaji staf &amp; utilitas berjalan
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 2.450.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          2.100.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Hutang Titipan Dana Sosial / Lainnya
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Penyisihan kas titipan anggota
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 0
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          0
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtotal Kewajiban */}
                  <div className="flex items-center justify-between py-2.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mt-2">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-bold">
                      Total Kewajiban
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] font-bold text-[#B45309]">
                        Rp 17.300.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#94A3B8]">
                          18.300.000
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* B. EKUITAS (MODAL SENDIRI KOPERASI) */}
              <div className="mb-6">
                <div className="text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-2 px-2">
                  B. Ekuitas (Modal Sendiri Koperasi)
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Simpanan Pokok Anggota
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        125 anggota terdaftar × Rp 500.000
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 62.500.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          55.000.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Simpanan Wajib Anggota
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Iuran rutin terakumulasi bulanan
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 61.400.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          51.200.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Simpanan Sukarela Anggota
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Penyertaan modal khusus berbunga
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 24.750.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          21.500.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Cadangan Modal Koperasi
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        Alokasi SHU periode sebelumnya
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Rp 28.500.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          24.500.000
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] text-[#0F172A] font-medium">
                        Sisa Hasil Usaha (SHU) Berjalan
                      </span>
                      <span className="text-[11px] text-[#16A34A] font-medium">
                        Surplus neto s.d. 31 Oktober 2026
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] font-bold text-[#16A34A]">
                        Rp 55.050.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] text-[#94A3B8]">
                          59.600.000
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtotal Ekuitas */}
                  <div className="flex items-center justify-between py-2.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mt-2">
                    <span className="text-xs sm:text-[13px] text-[#0F172A] font-bold">
                      Total Ekuitas
                    </span>
                    <div className="flex items-center gap-6 text-right">
                      <span className="font-mono text-xs sm:text-[13px] font-bold text-[#0F172A]">
                        Rp 232.200.000
                      </span>
                      {showComparative && (
                        <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#94A3B8]">
                          211.800.000
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* TOTAL KEWAJIBAN & EKUITAS (FOOTER SISI KANAN) */}
              <div className="mt-auto pt-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between shadow-xs">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#16A34A] font-bold uppercase tracking-wider">
                      TOTAL PASIVA
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0F172A]">
                      KEWAJIBAN &amp; EKUITAS
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#16A34A]">
                      Rp 249.500.000
                    </div>
                    {showComparative && (
                      <div className="text-[11px] text-[#94A3B8] font-mono mt-0.5">
                        Des 2025: Rp 230.100.000
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STAFEL (VERTICAL CONTINUOUS RUNNER FORMAT) */}
        {formatView === "stafel" && (
          <div className="flex flex-col space-y-8" id="view-stafel">
            {/* Bagian 1: Aset Lengkap */}
            <div>
              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mb-4">
                <span className="text-sm font-bold text-[#0F172A] uppercase">1. ASET</span>
                {showComparative && (
                  <span className="text-[11px] text-[#94A3B8] uppercase font-bold text-right">
                    Okt 2026 / Des 2025
                  </span>
                )}
              </div>

              {/* Aset Lancar Table */}
              <div className="space-y-1 mb-6">
                <div className="text-xs text-[#2563EB] font-bold px-3 py-1 bg-[#F8FAFC] rounded uppercase tracking-wider">
                  Aset Lancar
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Kas dan Setara Kas</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 159.000.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 142.500.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Piutang Usaha &amp; Anggota</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 55.350.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 48.200.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Persediaan Barang Dagang Minimarket</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 29.800.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 36.150.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Aset Lancar Lainnya</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 3.450.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 1.800.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#F8FAFC] border border-[#E2E8F0] font-bold text-[#0F172A] rounded text-xs sm:text-[13px]">
                  <span>Jumlah Aset Lancar</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span>Rp 247.600.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 228.650.000</span>}
                  </div>
                </div>
              </div>

              {/* Aset Tetap Table */}
              <div className="space-y-1">
                <div className="text-xs text-[#2563EB] font-bold px-3 py-1 bg-[#F8FAFC] rounded uppercase tracking-wider">
                  Aset Tetap
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Peralatan Toko &amp; Komputer POS</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 18.500.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 14.000.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#DC2626]">Akumulasi Penyusutan Peralatan</span>
                  <div className="flex gap-8 text-right font-mono text-[#DC2626]">
                    <span>(Rp 3.850.000)</span>
                    {showComparative && <span className="text-[#DC2626]/80">(Rp 2.550.000)</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Bangunan Kantor &amp; Gudang</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 55.000.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 55.000.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#DC2626]">Akumulasi Penyusutan Bangunan</span>
                  <div className="flex gap-8 text-right font-mono text-[#DC2626]">
                    <span>(Rp 67.750.000)</span>
                    {showComparative && <span className="text-[#DC2626]/80">(Rp 65.000.000)</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#F8FAFC] border border-[#E2E8F0] font-bold text-[#0F172A] rounded text-xs sm:text-[13px]">
                  <span>Jumlah Nilai Buku Aset Tetap</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span>Rp 1.900.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 1.450.000</span>}
                  </div>
                </div>
              </div>

              {/* Total Aset Runner */}
              <div className="flex justify-between items-center p-4 bg-[#EFF6FF] border border-blue-100 text-[#0F172A] font-bold rounded-xl mt-4">
                <span className="text-sm sm:text-base text-[#2563EB] uppercase">TOTAL ASET</span>
                <div className="flex gap-8 text-right font-mono">
                  <span className="text-base sm:text-lg text-[#2563EB]">Rp 249.500.000</span>
                  {showComparative && (
                    <span className="text-[#94A3B8] font-medium text-xs sm:text-sm">
                      Rp 230.100.000
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bagian 2: Kewajiban Lengkap */}
            <div>
              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mb-4">
                <span className="text-sm font-bold text-[#0F172A] uppercase">2. KEWAJIBAN</span>
                {showComparative && (
                  <span className="text-[11px] text-[#94A3B8] uppercase font-bold text-right">
                    Okt 2026 / Des 2025
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Hutang Usaha Supplier Dagang</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 14.850.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 16.200.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Hutang Beban Listrik &amp; Operasional</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 2.450.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 2.100.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#F8FAFC] border border-[#E2E8F0] font-bold text-[#B45309] rounded text-xs sm:text-[13px]">
                  <span>JUMLAH KEWAJIBAN</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span>Rp 17.300.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 18.300.000</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian 3: Ekuitas Lengkap */}
            <div>
              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg mb-4">
                <span className="text-sm font-bold text-[#0F172A] uppercase">3. EKUITAS</span>
                {showComparative && (
                  <span className="text-[11px] text-[#94A3B8] uppercase font-bold text-right">
                    Okt 2026 / Des 2025
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Simpanan Pokok Anggota</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 62.500.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 55.000.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Simpanan Wajib Anggota</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 61.400.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 51.200.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Simpanan Sukarela Anggota</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 24.750.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 21.500.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Cadangan Modal Koperasi</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#0F172A] font-medium">Rp 28.500.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 24.500.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-4 hover:bg-[#F8FAFC] rounded transition-colors">
                  <span className="text-xs sm:text-[13px] text-[#0F172A]">Sisa Hasil Usaha (SHU) Berjalan</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span className="text-[#16A34A] font-bold">Rp 55.050.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 59.600.000</span>}
                  </div>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#F8FAFC] border border-[#E2E8F0] font-bold text-[#0F172A] rounded text-xs sm:text-[13px]">
                  <span>JUMLAH EKUITAS</span>
                  <div className="flex gap-8 text-right font-mono">
                    <span>Rp 232.200.000</span>
                    {showComparative && <span className="text-[#94A3B8]">Rp 211.800.000</span>}
                  </div>
                </div>
              </div>

              {/* Total Pasiva Runner */}
              <div className="flex justify-between items-center p-4 bg-emerald-50 border border-emerald-200 text-[#0F172A] font-bold rounded-xl mt-6">
                <span className="text-sm sm:text-base text-[#16A34A] uppercase">TOTAL KEWAJIBAN &amp; EKUITAS</span>
                <div className="flex gap-8 text-right font-mono">
                  <span className="text-base sm:text-lg text-[#16A34A]">Rp 249.500.000</span>
                  {showComparative && (
                    <span className="text-[#94A3B8] font-medium text-xs sm:text-sm">
                      Rp 230.100.000
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formal Legal Audit Notes Section (CALK Linkage) */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0]">
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-[#0F172A]">
              <svg className="w-4 h-4 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span className="text-xs sm:text-[13px] font-bold">
                Catatan atas Posisi Keuangan (Catatan Kebijakan Akuntansi):
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#64748B] pl-1 leading-relaxed">
              <li>
                Penyajian laporan keuangan mengacu pada Standar Akuntansi Keuangan Entitas Tanpa Akuntabilitas Publik (SAK ETAP) Bab 17 dan Bab 30 tentang Pelaporan Entitas Koperasi.
              </li>
              <li>
                Aset Tetap dicatat berdasarkan harga perolehan dikurangi akumulasi penyusutan menggunakan metode garis lurus tanpa nilai residu.
              </li>
              <li>
                Simpanan Pokok dan Wajib diakui sebagai Ekuitas sesuai dengan ketentuan UU No. 25 Tahun 1992 tentang Perkoperasian.
              </li>
              <li>
                Laporan ini telah disinkronkan langsung dengan Neraca Saldo dan Buku Besar per tanggal cut-off 31 Oktober 2026.
              </li>
            </ul>
          </div>
        </div>

        {/* Formal Document Signatures & Verification Stamp */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Pembuat Dokumen: Akuntan / Admin */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-[#94A3B8]">Disusun &amp; Diperiksa Oleh:</span>
              <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] mt-1">
                Bagian Pembukuan &amp; Akuntansi
              </span>
              <div className="h-20 flex items-center justify-center">
                <span className="text-xs text-[#16A34A] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5 shadow-2xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Terverifikasi Sistem</span>
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                Budi Pratama, S.Ak.
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Administrator &amp; Akuntan Koperasi
              </div>
            </div>

            {/* Cooperative Legal Emblem / Digital Seal */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center text-[#2563EB] mb-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
                TERVALIDASI RESMI
              </span>
              <span className="text-[10px] text-[#94A3B8] mt-0.5">
                Sistem Tata Kelola Koperasi Digital
              </span>
              <span className="text-[10px] text-[#64748B] font-mono mt-1 font-semibold">
                HASH: KS-2026-10-BAL-9942
              </span>
            </div>

            {/* Pengesahan: Ketua Pengurus */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-[#94A3B8]">Mengetahui &amp; Mengesahkan:</span>
              <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] mt-1">
                Ketua Pengurus Koperasi
              </span>
              <div className="h-20 flex items-center justify-center">
                <span className="text-xs text-[#2563EB] bg-[#EFF6FF] border border-blue-100 px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5 shadow-2xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m18 2 4 4-14 14H4v-4L18 2z" />
                  </svg>
                  <span>Tanda Tangan Digital</span>
                </span>
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                Drs. H. Mulyadi Saputra
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                Ketua Koperasi Konsumen Sejahtera
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
