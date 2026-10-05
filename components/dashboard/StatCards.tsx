export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Penjualan */}
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-[13px] text-[#505f76] font-medium">Penjualan Hari Ini</span>
          <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#004ac6] group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#131b2e] mb-2">Rp 2.350.000</div>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </svg>
            +12.5% dibanding kemarin
          </span>
          <span className="text-[11px] text-[#94A3B8]">18 transaksi sukses</span>
        </div>
      </div>

      {/* Card 2: Pembelian */}
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-[13px] text-[#505f76] font-medium">Pembelian Stok</span>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#F59E0B] group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="16" height="12" x="1" y="3" rx="2"/><path d="M17 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#131b2e] mb-2">Rp 1.520.000</div>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-red-50 text-[#DC2626] font-semibold">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
            </svg>
            -4.2% dibanding kemarin
          </span>
          <span className="text-[11px] text-[#94A3B8]">6 faktur masuk</span>
        </div>
      </div>

      {/* Card 3: Simpanan */}
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-[13px] text-[#505f76] font-medium">Simpanan Masuk</span>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#16A34A] group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-16 0V6"/>
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#131b2e] mb-2">Rp 750.000</div>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#004ac6] font-semibold">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/>
            </svg>
            5 transaksi baru
          </span>
          <span className="text-[11px] text-[#94A3B8]">Pekan: Rp 4.250.000</span>
        </div>
      </div>

      {/* Card 4: Total Anggota */}
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-[13px] text-[#505f76] font-medium">Total Anggota</span>
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#131b2e] mb-2">
          125 <span className="text-sm font-normal text-[#505f76]">orang</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#004ac6] font-semibold">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
            +3 anggota baru
          </span>
          <span className="text-[11px] text-[#94A3B8]">118 Aktif • 7 Pasif</span>
        </div>
      </div>
    </div>
  );
}
