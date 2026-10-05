"use client";

interface StatCardsPembelianProps {
  totalAmount: number;
  totalCount: number;
  lunasAmount: number;
  lunasCount: number;
  hutangAmount: number;
  hutangCount: number;
  avgAmount: number;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function StatCardsPembelian({
  totalAmount,
  totalCount,
  lunasAmount,
  lunasCount,
  hutangAmount,
  hutangCount,
  avgAmount,
}: StatCardsPembelianProps) {
  const lunasPercent =
    totalAmount > 0 ? ((lunasAmount / totalAmount) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {/* Card 1: Total Pembelian Bulan Ini */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">
            Total Pembelian Bulan Ini
          </span>
          <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="16" height="12" x="1" y="3" rx="2"/>
              <path d="M17 8h4l3 3v4h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(totalAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center gap-0.5 text-[#16A34A] font-semibold">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
              8.4%
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span>{totalCount} faktur tercatat</span>
          </div>
        </div>
      </div>

      {/* Card 2: Faktur Lunas */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">
            Faktur Lunas
          </span>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16A34A]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(lunasAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-100/60 text-[#16A34A] font-semibold text-[11px]">
              {lunasCount} Faktur
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span>{lunasPercent}% dari total</span>
          </div>
        </div>
      </div>

      {/* Card 3: Hutang Dagang (Belum Lunas) */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">
            Hutang Dagang (Belum Lunas)
          </span>
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-[#DC2626]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 22h14"/>
              <path d="M5 2h14"/>
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#DC2626] tracking-tight">
            {formatRp(hutangAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-rose-100/70 text-[#DC2626] font-semibold text-[11px]">
              {hutangCount} Faktur
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="truncate">Jatuh tempo terdekat 10 Okt</span>
          </div>
        </div>
      </div>

      {/* Card 4: Rata-rata Nilai Faktur */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">
            Rata-rata Nilai Faktur
          </span>
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-[#0EA5E9]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
              <line x1="8" x2="16" y1="8" y2="8"/>
              <line x1="8" x2="16" y1="12" y2="12"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(avgAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="text-[#0EA5E9] font-medium">Efisiensi pengadaan optimal</span>
            <span className="text-[#CBD5E1]">•</span>
            <span>{totalCount} transaksi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
