export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#E2E8F0] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-[#131b2e]">Komposisi Pendapatan</h2>
          <span className="text-xs text-[#94A3B8]">Kumulatif 2026</span>
        </div>
        <p className="text-xs text-[#505f76] mb-4">
          Distribusi pemasukan utama kas operasional koperasi
        </p>

        {/* Donut Chart Visualization */}
        <div className="relative flex items-center justify-center my-3">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Ring */}
            <circle cx="80" cy="80" fill="transparent" r="58" stroke="#F1F5F9" strokeWidth="18" />
            {/* Segment 1: Penjualan 58% */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r="58"
              stroke="#2563EB"
              strokeDasharray="211.35 364.4"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeWidth="18"
            />
            {/* Segment 2: Simpanan 28% */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r="58"
              stroke="#10B981"
              strokeDasharray="102.03 364.4"
              strokeDashoffset="-216"
              strokeLinecap="round"
              strokeWidth="18"
            />
            {/* Segment 3: Lain-lain 14% */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r="58"
              stroke="#F59E0B"
              strokeDasharray="51.01 364.4"
              strokeDashoffset="-322"
              strokeLinecap="round"
              strokeWidth="18"
            />
          </svg>

          {/* Centered Total Omset */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold">Total Omset</span>
            <span className="text-xl font-extrabold text-[#131b2e] leading-tight">Rp 35.8M</span>
            <span className="text-[10px] text-[#16A34A] font-semibold">Target 91%</span>
          </div>
        </div>
      </div>

      {/* Legend Cards */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shrink-0" />
            <span className="text-xs sm:text-[13px] text-[#131b2e] font-medium">Penjualan Toko / Jasa</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#131b2e]">58%</span>
            <span className="text-[11px] text-[#94A3B8] ml-1">(Rp 20.76M)</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
            <span className="text-xs sm:text-[13px] text-[#131b2e] font-medium">Simpanan Wajib &amp; Pokok</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#131b2e]">28%</span>
            <span className="text-[11px] text-[#94A3B8] ml-1">(Rp 10.02M)</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
            <span className="text-xs sm:text-[13px] text-[#131b2e] font-medium">Jasa Usaha &amp; Lain-lain</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#131b2e]">14%</span>
            <span className="text-[11px] text-[#94A3B8] ml-1">(Rp 5.02M)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
