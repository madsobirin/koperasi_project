"use client";

import { useState } from "react";
import { PurchaseTransaction } from "@/lib/dummy-data";

interface PembelianModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: PurchaseTransaction) => void;
  initialData?: PurchaseTransaction | null;
  nextSuggestedNota: string;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

const COMMON_SUPPLIERS = [
  "PT Indofood Sukses Makmur",
  "CV Berkah Pangan Nusantara",
  "PT Mayora Indah Tbk",
  "PT Wings Surya",
  "PT Unilever Indonesia Tbk",
  "Distributor Sembako Jaya",
  "UD Sumber Rejeki",
];

interface FormPurchaseItem {
  name: string;
  satuan: string;
  qty: number;
  price: number;
}

interface FormContentProps {
  onClose: () => void;
  onSave: (tx: PurchaseTransaction) => void;
  initialData?: PurchaseTransaction | null;
  nextSuggestedNota: string;
}

function FormContent({
  onClose,
  onSave,
  initialData,
  nextSuggestedNota,
}: FormContentProps) {
  const [noNota, setNoNota] = useState(
    initialData ? initialData.noNota : nextSuggestedNota
  );
  const [tanggal, setTanggal] = useState(
    initialData
      ? initialData.tanggal.split(",")[0]
      : new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
  );
  const [supplier, setSupplier] = useState(
    initialData ? initialData.supplier : COMMON_SUPPLIERS[0]
  );
  const [customSupplier, setCustomSupplier] = useState("");
  const [status, setStatus] = useState<"Lunas" | "Belum Lunas" | "Sebagian">(
    initialData ? initialData.status : "Lunas"
  );
  const [metode, setMetode] = useState<
    "Kas Tunai" | "Transfer Bank" | "Tempo (Hutang Dagang)"
  >(
    initialData
      ? (initialData.metode as "Kas Tunai" | "Transfer Bank" | "Tempo (Hutang Dagang)")
      : "Kas Tunai"
  );
  const [jatuhTempo, setJatuhTempo] = useState(
    initialData ? initialData.jatuhTempo : "-"
  );
  const [keterangan, setKeterangan] = useState(
    initialData ? initialData.keterangan : ""
  );

  const defaultItems: FormPurchaseItem[] = initialData
    ? initialData.items.map((it) => ({
        name: it.name || it.nama || "",
        satuan: it.satuan || "Pcs",
        qty: it.qty || 1,
        price: it.price ?? it.harga ?? 0,
      }))
    : [
        { name: "Beras Premium Ramos 50kg", satuan: "Karung", qty: 5, price: 650000 },
        { name: "Minyak Goreng Sania 2L (Dus)", satuan: "Dus", qty: 10, price: 175000 },
      ];
  const [items, setItems] = useState<FormPurchaseItem[]>(defaultItems);
  const [diskon, setDiskon] = useState<number>(0);

  const isEdit = !!initialData;

  const handleItemChange = (
    index: number,
    field: keyof FormPurchaseItem,
    value: string | number
  ) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { name: "", satuan: "Pcs", qty: 1, price: 0 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, it) => sum + (it.qty || 0) * (it.price || 0),
    0
  );
  const grandTotal = Math.max(0, subtotal - (diskon || 0));

  const finalSupplier =
    supplier === "CUSTOM" ? customSupplier.trim() || "Supplier Umum" : supplier;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noNota.trim() || items.length === 0) return;

    onSave({
      id: initialData ? initialData.id : Date.now(),
      noNota: noNota.toUpperCase().trim(),
      tanggal: tanggal.includes(",") ? tanggal : `${tanggal}, 15:30 WIB`,
      tanggalIso: initialData ? initialData.tanggalIso : new Date().toISOString().split("T")[0],
      supplier: finalSupplier,
      total: grandTotal,
      status,
      metode,
      jatuhTempo: metode === "Tempo (Hutang Dagang)" ? (jatuhTempo !== "-" ? jatuhTempo : "05 Nov 2026") : "-",
      keterangan: keterangan.trim() || "Stok barang masuk gudang koperasi",
      diskon: Number(diskon) || 0,
      items: items.map((it) => ({
        name: it.name.trim() || "Barang Pengadaan",
        nama: it.name.trim() || "Barang Pengadaan",
        satuan: it.satuan || "Pcs",
        qty: Number(it.qty) || 1,
        price: Number(it.price) || 0,
        harga: Number(it.price) || 0,
        subtotal: (Number(it.qty) || 1) * (Number(it.price) || 0),
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
      {/* Scrollable Body */}
      <div className="p-6 overflow-y-auto max-h-[72vh] space-y-4">
        {/* Row 1: Nomor Faktur & Tanggal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Nomor Faktur Pembelian <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={noNota}
              onChange={(e) => setNoNota(e.target.value)}
              placeholder="PB-20261005-001"
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-mono text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Tanggal Transaksi
            </label>
            <input
              type="text"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              placeholder="05 Okt 2026"
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>
        </div>

        {/* Row 2: Supplier Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Distributor / Pemasok (Supplier) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] bg-white"
            >
              {COMMON_SUPPLIERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
              <option value="CUSTOM">+ Ketik Supplier Lain...</option>
            </select>

            {supplier === "CUSTOM" && (
              <input
                type="text"
                required
                value={customSupplier}
                onChange={(e) => setCustomSupplier(e.target.value)}
                placeholder="Nama Supplier Baru..."
                className="h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
              />
            )}
          </div>
        </div>

        {/* Row 3: Status & Metode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Status Pembayaran
            </label>
            <div className="flex gap-2">
              {(["Lunas", "Belum Lunas", "Sebagian"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    status === st
                      ? st === "Lunas"
                        ? "bg-emerald-50 text-[#16A34A] border-emerald-300 ring-2 ring-emerald-100"
                        : st === "Belum Lunas"
                        ? "bg-rose-50 text-[#DC2626] border-rose-300 ring-2 ring-rose-100"
                        : "bg-amber-50 text-[#D97706] border-amber-300 ring-2 ring-amber-100"
                      : "border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Metode Pembayaran
            </label>
            <select
              value={metode}
              onChange={(e) => {
                const val = e.target.value as
                  | "Kas Tunai"
                  | "Transfer Bank"
                  | "Tempo (Hutang Dagang)";
                setMetode(val);
                if (val === "Tempo (Hutang Dagang)" && jatuhTempo === "-") {
                  setJatuhTempo("05 Nov 2026");
                }
              }}
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] bg-white"
            >
              <option value="Kas Tunai">Kas Tunai</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Tempo (Hutang Dagang)">Tempo (Hutang Dagang)</option>
            </select>
          </div>
        </div>

        {/* Row 4: Jatuh Tempo if Tempo */}
        {metode === "Tempo (Hutang Dagang)" && (
          <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-200">
            <label className="block text-xs font-semibold text-[#DC2626] mb-1">
              Tanggal Jatuh Tempo Hutang Dagang
            </label>
            <input
              type="text"
              value={jatuhTempo}
              onChange={(e) => setJatuhTempo(e.target.value)}
              placeholder="05 Nov 2026"
              className="w-full h-8 px-3 rounded-md border border-rose-300 bg-white text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        )}

        {/* Section: Daftar Barang Pembelian */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Item Barang Stok Masuk
            </span>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-xs text-[#2563EB] hover:text-[#1D4ED8] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>+ Tambah Baris Barang</span>
            </button>
          </div>

          <div className="space-y-2">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] items-center"
              >
                <div className="col-span-5 sm:col-span-5">
                  <input
                    type="text"
                    required
                    placeholder="Nama barang / produk"
                    value={it.name}
                    onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                    className="w-full h-8 px-2.5 rounded border border-[#E2E8F0] bg-white text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <input
                    type="number"
                    min={1}
                    required
                    value={it.qty}
                    onChange={(e) =>
                      handleItemChange(idx, "qty", parseInt(e.target.value, 10) || 1)
                    }
                    placeholder="Qty"
                    className="w-full h-8 px-2 rounded border border-[#E2E8F0] bg-white text-xs text-center text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="col-span-4 sm:col-span-4">
                  <input
                    type="number"
                    min={0}
                    step={500}
                    required
                    value={it.price}
                    onChange={(e) =>
                      handleItemChange(idx, "price", parseFloat(e.target.value) || 0)
                    }
                    placeholder="Harga Satuan"
                    className="w-full h-8 px-2.5 rounded border border-[#E2E8F0] bg-white text-xs text-right text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    disabled={items.length <= 1}
                    className="text-[#94A3B8] hover:text-[#DC2626] disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors"
                    title="Hapus baris"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Subtotal & Total */}
        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
          <div className="flex justify-between items-center text-xs text-[#64748B]">
            <span>Subtotal Barang ({items.length} item)</span>
            <span className="font-semibold text-[#0F172A]">{formatRp(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#64748B]">Diskon / Potongan Nota</span>
            <div className="flex items-center gap-1.5 w-36">
              <span className="text-[#94A3B8] text-xs">Rp</span>
              <input
                type="number"
                min={0}
                value={diskon}
                onChange={(e) => setDiskon(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full h-7 px-2 rounded border border-[#E2E8F0] bg-white text-xs text-right text-[#DC2626] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-[#0F172A] pt-2 border-t border-[#E2E8F0]">
            <span>Total Faktur Pembelian</span>
            <span className="text-base text-[#2563EB]">{formatRp(grandTotal)}</span>
          </div>
        </div>

        {/* Row 5: Keterangan */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Keterangan / Catatan Gudang
          </label>
          <input
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Contoh: Pengiriman batch 1, diterima oleh staf logistik gudang utama"
            className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{isEdit ? "Perbarui Faktur" : "Simpan Transaksi"}</span>
        </button>
      </div>
    </form>
  );
}

export default function PembelianModalForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  nextSuggestedNota,
}: PembelianModalFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 border border-[#E2E8F0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                {initialData ? "Edit Transaksi Pembelian" : "Tambah Transaksi Pembelian"}
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                Catat pengadaan persediaan dan faktur supplier koperasi
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] rounded p-1 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Inner Form with key for clean state reset */}
        <FormContent
          key={initialData ? initialData.id : "new"}
          onClose={onClose}
          onSave={onSave}
          initialData={initialData}
          nextSuggestedNota={nextSuggestedNota}
        />
      </div>
    </div>
  );
}
