"use client";

import { useState } from "react";

export default function SalesChart() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#E2E8F0] flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Aktivitas Penjualan &amp; Pembelian</h2>
            <p className="text-xs text-[#64748B]">Fluktuasi omset dan pengeluaran barang sepekan terakhir</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg p-0.5 bg-[#F1F5F9] border border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setPeriod("weekly")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  period === "weekly"
                    ? "bg-white text-[#2563EB] shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Mingguan
              </button>
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  period === "monthly"
                    ? "bg-white text-[#2563EB] shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Bulanan
              </button>
            </div>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-4 text-xs mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#2563EB]" />
            <span className="text-[#64748B] font-medium">Penjualan (Rp)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
            <span className="text-[#64748B] font-medium">Pembelian (Rp)</span>
          </div>
        </div>

        {/* Inline SVG Multi-Bar Chart */}
        <div className="w-full h-56 pt-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 200">
            <defs>
              <linearGradient id="salesBarGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="purchaseBarGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Horizontal Guide Lines */}
            <line stroke="#F1F5F9" strokeDasharray="3 3" strokeWidth="1" x1="35" x2="520" y1="20" y2="20" />
            <text className="fill-slate-400 text-[10px]" textAnchor="end" x="30" y="24">3M</text>
            <line stroke="#F1F5F9" strokeDasharray="3 3" strokeWidth="1" x1="35" x2="520" y1="65" y2="65" />
            <text className="fill-slate-400 text-[10px]" textAnchor="end" x="30" y="69">2M</text>
            <line stroke="#F1F5F9" strokeDasharray="3 3" strokeWidth="1" x1="35" x2="520" y1="110" y2="110" />
            <text className="fill-slate-400 text-[10px]" textAnchor="end" x="30" y="114">1M</text>
            <line stroke="#E2E8F0" strokeWidth="1" x1="35" x2="520" y1="155" y2="155" />
            <text className="fill-slate-400 text-[10px]" textAnchor="end" x="30" y="159">0</text>

            {/* Monday */}
            <g className="transition-opacity hover:opacity-80 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="80" rx="3" width="16" x="58" y="75" />
              <rect fill="url(#purchaseBarGrad)" height="50" rx="3" width="16" x="76" y="105" />
              <text className="fill-slate-500 text-[11px] font-medium" textAnchor="middle" x="75" y="174">Sen</text>
            </g>

            {/* Tuesday */}
            <g className="transition-opacity hover:opacity-80 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="100" rx="3" width="16" x="126" y="55" />
              <rect fill="url(#purchaseBarGrad)" height="65" rx="3" width="16" x="144" y="90" />
              <text className="fill-slate-500 text-[11px] font-medium" textAnchor="middle" x="143" y="174">Sel</text>
            </g>

            {/* Wednesday */}
            <g className="transition-opacity hover:opacity-80 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="70" rx="3" width="16" x="194" y="85" />
              <rect fill="url(#purchaseBarGrad)" height="40" rx="3" width="16" x="212" y="115" />
              <text className="fill-slate-500 text-[11px] font-medium" textAnchor="middle" x="211" y="174">Rab</text>
            </g>

            {/* Thursday */}
            <g className="transition-opacity hover:opacity-80 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="113" rx="3" width="16" x="262" y="42" />
              <rect fill="url(#purchaseBarGrad)" height="85" rx="3" width="16" x="280" y="70" />
              <text className="fill-slate-500 text-[11px] font-medium" textAnchor="middle" x="279" y="174">Kam</text>
            </g>

            {/* Friday */}
            <g className="transition-opacity hover:opacity-80 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="120" rx="3" width="16" x="330" y="35" />
              <rect fill="url(#purchaseBarGrad)" height="75" rx="3" width="16" x="348" y="80" />
              <text className="fill-slate-500 text-[11px] font-medium" textAnchor="middle" x="347" y="174">Jum</text>
            </g>

            {/* Saturday */}
            <g className="transition-opacity hover:opacity-80 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="127" rx="3" width="16" x="398" y="28" />
              <rect fill="url(#purchaseBarGrad)" height="57" rx="3" width="16" x="416" y="98" />
              <text className="fill-slate-500 text-[11px] font-medium" textAnchor="middle" x="415" y="174">Sab</text>
            </g>

            {/* Sunday (Today) */}
            <g className="transition-opacity hover:opacity-90 cursor-pointer">
              <rect fill="url(#salesBarGrad)" height="107" rx="3" width="16" x="466" y="48" />
              <rect fill="url(#purchaseBarGrad)" height="67" rx="3" width="16" x="484" y="88" />
              <circle cx="474" cy="48" fill="#1D4ED8" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <text className="fill-[#2563EB] text-[11px] font-bold" textAnchor="middle" x="483" y="174">Min</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-4 pt-3 flex items-center justify-between text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <span className="text-[#64748B]">
            Rata-rata penjualan harian: <strong className="text-[#0F172A] font-semibold">Rp 1.840.000</strong>
          </span>
        </div>
        <span className="text-[#16A34A] font-semibold flex items-center gap-0.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          Performa Optimal
        </span>
      </div>
    </div>
  );
}
