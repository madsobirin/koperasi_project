import Link from "next/link";

interface Transaction {
  id: string;
  time: string;
  type: string;
  typeColor: "blue" | "amber" | "indigo" | "emerald";
  party: string;
  partySub: string;
  amount: string;
  status: string;
  statusColor: "green" | "blue" | "amber";
}

const transactions: Transaction[] = [
  {
    id: "PJ-20261005-012",
    time: "05 Okt, 14:20",
    type: "Penjualan",
    typeColor: "blue",
    party: "Budi Santoso",
    partySub: "No. A001",
    amount: "Rp 175.000",
    status: "Lunas",
    statusColor: "green",
  },
  {
    id: "PB-20261005-004",
    time: "05 Okt, 13:45",
    type: "Pembelian",
    typeColor: "amber",
    party: "CV Berkah Abadi",
    partySub: "Supplier Sembako",
    amount: "Rp 680.000",
    status: "Lunas",
    statusColor: "green",
  },
  {
    id: "SP-20261005-008",
    time: "05 Okt, 11:15",
    type: "Simpanan Wajib",
    typeColor: "indigo",
    party: "Siti Rahmawati",
    partySub: "No. A002",
    amount: "Rp 50.000",
    status: "Selesai",
    statusColor: "blue",
  },
  {
    id: "PJ-20261005-011",
    time: "05 Okt, 10:30",
    type: "Penjualan",
    typeColor: "blue",
    party: "Ahmad Dahlan",
    partySub: "No. A015",
    amount: "Rp 420.000",
    status: "Belum Lunas",
    statusColor: "amber",
  },
  {
    id: "SP-20261005-007",
    time: "05 Okt, 09:10",
    type: "Simp. Sukarela",
    typeColor: "emerald",
    party: "Hendra Wijaya",
    partySub: "No. A043",
    amount: "Rp 200.000",
    status: "Selesai",
    statusColor: "blue",
  },
];

export default function RecentTransactions() {
  return (
    <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-[#E2E8F0] flex flex-col justify-between overflow-hidden">
      <div>
        {/* Table Header */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div>
            <h2 className="text-base font-bold text-[#131b2e]">Transaksi Terbaru</h2>
            <p className="text-xs text-[#94A3B8]">Aktivitas real-time kasir dan penerimaan buku kas</p>
          </div>
          <Link
            href="/dashboard#transaksi"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#004ac6] hover:text-[#1D4ED8] transition-colors"
          >
            <span>Lihat Semua Transaksi</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f3ff] text-[11px] font-bold text-[#505f76] uppercase tracking-wider">
                <th className="py-2.5 px-4">No Nota</th>
                <th className="py-2.5 px-4">Waktu</th>
                <th className="py-2.5 px-4">Jenis</th>
                <th className="py-2.5 px-4">Pihak Terlibat</th>
                <th className="py-2.5 px-4 text-right">Total</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#131b2e]">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-[#f8faff] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#004ac6] text-xs">
                    {t.id}
                  </td>
                  <td className="py-3 px-4 text-[#94A3B8]">{t.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        t.typeColor === "blue"
                          ? "bg-blue-50 text-[#004ac6]"
                          : t.typeColor === "amber"
                          ? "bg-amber-50 text-[#F59E0B]"
                          : t.typeColor === "indigo"
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-emerald-50 text-[#16A34A]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          t.typeColor === "blue"
                            ? "bg-[#004ac6]"
                            : t.typeColor === "amber"
                            ? "bg-[#F59E0B]"
                            : t.typeColor === "indigo"
                            ? "bg-indigo-600"
                            : "bg-[#16A34A]"
                        }`}
                      />
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#131b2e]">{t.party}</div>
                    <div className="text-[11px] text-[#94A3B8]">{t.partySub}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#131b2e]">
                    {t.amount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        t.statusColor === "green"
                          ? "bg-emerald-50 text-[#16A34A]"
                          : t.statusColor === "blue"
                          ? "bg-blue-50 text-[#004ac6]"
                          : "bg-amber-50 text-[#F59E0B]"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 bg-[#f2f3ff] flex items-center justify-between text-xs text-[#505f76] border-t border-[#E2E8F0]">
        <span>Menampilkan 5 dari 29 transaksi hari ini</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-[#eaedff] text-[#131b2e] disabled:opacity-40 cursor-pointer border border-[#E2E8F0]"
            disabled
            aria-label="Halaman sebelumnya"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span className="w-7 h-7 flex items-center justify-center font-bold text-[#004ac6] bg-white rounded border border-[#E2E8F0] shadow-xs">
            1
          </span>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-[#eaedff] text-[#131b2e] cursor-pointer border border-[#E2E8F0]"
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
