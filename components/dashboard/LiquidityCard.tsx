export default function LiquidityCard() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#004ac6]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18"/><path d="M3 10h18"/><path d="m5 6 7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v4"/><path d="M12 14v4"/><path d="M16 14v4"/>
            </svg>
          </div>
          <h3 className="text-sm font-bold text-[#131b2e]">Likuiditas Kas &amp; Bank</h3>
        </div>
        <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" /> Sinkron
        </span>
      </div>

      <div className="space-y-2.5">
        {/* Kas Operasional */}
        <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#505f76]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/>
            </svg>
            <div>
              <div className="text-xs sm:text-[13px] font-semibold text-[#131b2e]">Kas Operasional</div>
              <div className="text-[11px] text-[#94A3B8]">Brankas kantor &amp; kasir</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#131b2e] text-right">
            Rp 18.450.000
          </div>
        </div>

        {/* Bank Mandiri Koperasi */}
        <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#004ac6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18"/><path d="M3 10h18"/><path d="m5 6 7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/>
            </svg>
            <div>
              <div className="text-xs sm:text-[13px] font-semibold text-[#131b2e]">Bank Mandiri Koperasi</div>
              <div className="text-[11px] text-[#94A3B8]">Rekening Giro Utama</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004ac6] text-right">
            Rp 94.200.000
          </div>
        </div>

        {/* Cadangan Dana SHU */}
        <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <div>
              <div className="text-xs sm:text-[13px] font-semibold text-[#131b2e]">Cadangan Dana SHU</div>
              <div className="text-[11px] text-[#94A3B8]">Alokasi RAT akhir tahun</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-bold text-amber-600 text-right">
            Rp 12.800.000
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <span className="text-[#94A3B8]">Total Likuiditas Siap Pakai:</span>
        <span className="font-extrabold text-[#131b2e]">Rp 125.450.000</span>
      </div>
    </div>
  );
}
