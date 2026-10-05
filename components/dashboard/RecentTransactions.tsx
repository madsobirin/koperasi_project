import Link from "next/link";
import { DUMMY_TRANSACTIONS, formatRupiah } from "@/lib/dummy-data";

export default function RecentTransactions() {
  return (
    <div className="lg:col-span-8 bg-white rounded-xl shadow-xs border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
      <div>
        {/* Table Header */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Transaksi Terbaru</h2>
            <p className="text-xs text-[#64748B]">Aktivitas real-time kasir dan penerimaan buku kas</p>
          </div>
          <Link
            href="/dashboard/transaksi/penjualan"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <span>Lihat Semua Transaksi</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-y border-[#E2E8F0]">
                <th className="py-2.5 px-4">No Nota</th>
                <th className="py-2.5 px-4">Waktu</th>
                <th className="py-2.5 px-4">Jenis</th>
                <th className="py-2.5 px-4">Pihak Terlibat</th>
                <th className="py-2.5 px-4 text-right">Total</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs text-[#0F172A]">
              {DUMMY_TRANSACTIONS.map((t) => {
                const isPenjualan = t.type === "Penjualan";
                const isPembelian = t.type === "Pembelian";
                const isWajib = t.type === "Simpanan Wajib";

                return (
                  <tr key={t.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#2563EB] text-xs">
                      {t.id}
                    </td>
                    <td className="py-3 px-4 text-[#94A3B8]">{t.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          isPenjualan
                            ? "bg-blue-50 text-[#2563EB]"
                            : isPembelian
                            ? "bg-amber-50 text-[#F59E0B]"
                            : isWajib
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-emerald-50 text-[#16A34A]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPenjualan
                              ? "bg-[#2563EB]"
                              : isPembelian
                              ? "bg-[#F59E0B]"
                              : isWajib
                              ? "bg-indigo-600"
                              : "bg-[#16A34A]"
                          }`}
                        />
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0F172A]">{t.party}</div>
                      <div className="text-[11px] text-[#94A3B8]">{t.partyDetail}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#0F172A]">
                      {formatRupiah(t.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          t.status === "Lunas"
                            ? "bg-emerald-50 text-[#16A34A]"
                            : t.status === "Selesai"
                            ? "bg-blue-50 text-[#2563EB]"
                            : "bg-amber-50 text-[#F59E0B]"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 bg-[#F8FAFC] flex items-center justify-between text-xs text-[#64748B] border-t border-[#E2E8F0]">
        <span>Menampilkan 5 dari 29 transaksi hari ini</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-[#F1F5F9] text-[#0F172A] disabled:opacity-40 cursor-pointer border border-[#E2E8F0]"
            disabled
            aria-label="Halaman sebelumnya"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span className="w-7 h-7 flex items-center justify-center font-bold text-[#2563EB] bg-white rounded border border-[#E2E8F0] shadow-xs">
            1
          </span>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-[#F1F5F9] text-[#0F172A] cursor-pointer border border-[#E2E8F0]"
            aria-label="Halaman berikutnya"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
