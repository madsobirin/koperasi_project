"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCards from "@/components/dashboard/StatCards";
import SalesChart from "@/components/dashboard/SalesChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import LiquidityCard from "@/components/dashboard/LiquidityCard";
import RecentMembers from "@/components/dashboard/RecentMembers";

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Hari ini: 05 Oktober 2026");
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [isTrxOpen, setIsTrxOpen] = useState(false);

  const periodRef = useRef<HTMLDivElement>(null);
  const trxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (periodRef.current && !periodRef.current.contains(event.target as Node)) {
        setIsPeriodOpen(false);
      }
      if (trxRef.current && !trxRef.current.contains(event.target as Node)) {
        setIsTrxOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#131b2e] font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="w-full pt-20 px-6 sm:px-8 py-8 bg-[#F8FAFC] flex-1">
          <div className="flex flex-col w-full max-w-[1400px] mx-auto">
            
            {/* Greeting & Action Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl lg:text-[28px] font-bold text-[#131b2e] tracking-tight">
                    Dashboard
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#004ac6] border border-blue-100">
                    Tahun Buku 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#505f76]">
                  Selamat datang kembali, <strong className="text-[#131b2e] font-semibold">Budi Pratama</strong>. Berikut ringkasan aktivitas keuangan dan operasional koperasi hari ini.
                </p>
              </div>

              {/* Quick Actions & Date Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Period Selector Dropdown */}
                <div className="relative inline-block text-left" ref={periodRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPeriodOpen(!isPeriodOpen);
                      setIsTrxOpen(false);
                    }}
                    className="h-9 px-3.5 bg-white text-[#131b2e] text-xs sm:text-[13px] font-semibold rounded-lg border border-[#E2E8F0] shadow-xs hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                    </svg>
                    <span>{selectedPeriod}</span>
                    <svg className="w-3.5 h-3.5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  {isPeriodOpen && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 p-1.5 space-y-1 animate-in fade-in duration-100">
                      {[
                        "Hari ini: 05 Oktober 2026",
                        "7 Hari Terakhir",
                        "Bulan Ini (Oktober 2026)",
                        "Kuartal IV - 2026",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSelectedPeriod(item);
                            setIsPeriodOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            selectedPeriod === item
                              ? "bg-[#EFF6FF] text-[#004ac6] font-semibold"
                              : "text-[#505f76] hover:bg-[#F8FAFC] hover:text-[#131b2e]"
                          }`}
                        >
                          <span>{item}</span>
                          {selectedPeriod === item && (
                            <svg className="w-3.5 h-3.5 text-[#004ac6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Print Button */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="h-9 px-3.5 bg-white text-[#131b2e] hover:bg-[#F8FAFC] text-xs sm:text-[13px] font-semibold rounded-lg border border-[#E2E8F0] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#505f76]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
                  </svg>
                  <span className="hidden sm:inline">Cetak Ringkasan</span>
                </button>

                {/* Transaksi Baru Dropdown */}
                <div className="relative inline-block text-left" ref={trxRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTrxOpen(!isTrxOpen);
                      setIsPeriodOpen(false);
                    }}
                    className="h-9 px-4 bg-[#004ac6] text-white hover:bg-[#1D4ED8] text-xs sm:text-[13px] font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>
                    </svg>
                    <span>Transaksi Baru</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  {isTrxOpen && (
                    <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 p-2 space-y-1 animate-in fade-in duration-100">
                      <button
                        type="button"
                        onClick={() => setIsTrxOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f2f3ff] text-[#131b2e] text-xs transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-[#004ac6] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-[#131b2e]">Penjualan Kasir</div>
                          <div className="text-[10px] text-[#94A3B8]">Barang &amp; jasa toko</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsTrxOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f2f3ff] text-[#131b2e] text-xs transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center text-[#F59E0B] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="16" height="12" x="1" y="3" rx="2"/><path d="M17 8h4l3 3v4h-7V8z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-[#131b2e]">Faktur Pembelian</div>
                          <div className="text-[10px] text-[#94A3B8]">Pasokan stok supplier</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsTrxOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f2f3ff] text-[#131b2e] text-xs transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center text-[#16A34A] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-16 0V6"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-[#131b2e]">Setor Simpanan</div>
                          <div className="text-[10px] text-[#94A3B8]">Pokok, wajib &amp; sukarela</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Statistics Cards */}
            <StatCards />

            {/* Visual Charts Split (7:5) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
              <div className="lg:col-span-7">
                <SalesChart />
              </div>
              <div className="lg:col-span-5">
                <RevenueChart />
              </div>
            </div>

            {/* Operational Panel: Recent Transactions Table & Balance + Members */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <RecentTransactions />
              <div className="lg:col-span-4 flex flex-col gap-5">
                <LiquidityCard />
                <RecentMembers />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
