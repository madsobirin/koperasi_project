"use client";

interface StatCardsPenjualanProps {
  totalToday: number;
  totalTxCount: number;
  lunasAmount: number;
  lunasCount: number;
  piutangAmount: number;
  piutangCount: number;
  avgAmount: number;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function StatCardsPenjualan({
  totalToday,
  totalTxCount,
  lunasAmount,
  lunasCount,
  piutangAmount,
  piutangCount,
  avgAmount,
}: StatCardsPenjualanProps) {
  const lunasPercent =
    totalToday > 0 ? ((lunasAmount / totalToday) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Total Hari Ini */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between group hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-[#64748B] font-semibold">
            Total Penjualan Hari Ini
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="14" x="2" y="5" rx="2"/>
              <line x1="2" x2="22" y1="10" y2="10"/>
            </svg>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(totalToday)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="inline-flex items-center text-[#16A34A] font-semibold gap-0.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
              14.8%
            </span>
            <span className="text-[#64748B]">{totalTxCount} transaksi tercatat</span>
          </div>
        </div>
        {/* Bottom accent indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563EB]" />
      </div>

      {/* Card 2: Lunas */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between group hover:border-emerald-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-[#64748B] font-semibold">
            Transaksi Lunas
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16A34A] group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(lunasAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="px-2 py-0.5 bg-emerald-100 text-[#16A34A] rounded-full font-bold text-[10px]">
              {lunasCount} Transaksi
            </span>
            <span className="text-[#64748B]">{lunasPercent}% dari total</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#16A34A]" />
      </div>

      {/* Card 3: Piutang / Belum Lunas */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between group hover:border-red-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-[#64748B] font-semibold">
            Piutang Penjualan
          </span>
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#DC2626] group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-[28px] font-bold text-[#DC2626] tracking-tight">
            {formatRp(piutangAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="px-2 py-0.5 bg-red-100 text-[#DC2626] rounded-full font-bold text-[10px]">
              {piutangCount} Transaksi
            </span>
            <span className="text-[#64748B]">Perlu penagihan</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626]" />
      </div>

      {/* Card 4: Rata-rata Nilai Nota */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between group hover:border-sky-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-[#64748B] font-semibold">
            Rata-rata Nilai Nota
          </span>
          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#0EA5E9] group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
              <line x1="8" x2="16" y1="8" y2="8"/>
              <line x1="8" x2="16" y1="12" y2="12"/>
              <line x1="8" x2="13" y1="16" y2="16"/>
            </svg>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(avgAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="text-[#0EA5E9] font-semibold">Tingkat belanja optimal</span>
            <span className="text-[#64748B]">/ nota belanja</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0EA5E9]" />
      </div>
    </div>
  );
}
