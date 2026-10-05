"use client";

import { useState } from "react";
import { SaleTransaction, SaleItem } from "@/lib/dummy-data";

interface PenjualanModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: SaleTransaction) => void;
  initialData?: SaleTransaction | null;
  nextSuggestedNota: string;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

interface FormContentProps {
  onClose: () => void;
  onSave: (tx: SaleTransaction) => void;
  initialData?: SaleTransaction | null;
  nextSuggestedNota: string;
}

function FormContent({
  onClose,
  onSave,
  initialData,
  nextSuggestedNota,
}: FormContentProps) {
  const [nota, setNota] = useState(initialData ? initialData.nota : nextSuggestedNota);
  const [tanggal, setTanggal] = useState(
    initialData ? initialData.tanggal : new Date().toISOString().split("T")[0]
  );
  const [jam] = useState(
    initialData
      ? initialData.jam
      : new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  );

  // Selected buyer: format "PelangganNama|PelangganKode"
  const defaultBuyer = initialData
    ? `${initialData.pelangganNama}|${initialData.pelangganKode}`
    : "Budi Santoso|A001";
  const [buyerSelection, setBuyerSelection] = useState(defaultBuyer);

  const [status, setStatus] = useState<"Lunas" | "Belum Lunas" | "Sebagian">(
    initialData ? initialData.status : "Lunas"
  );
  const [metode, setMetode] = useState<
    "Kas Tunai" | "Kredit Anggota" | "Transfer Bank" | "Potong Simpanan"
  >(initialData ? initialData.metode : "Kas Tunai");

  const [diskon, setDiskon] = useState<number>(initialData ? initialData.diskon : 0);

  const defaultItems: SaleItem[] = initialData
    ? initialData.items
    : [
        { nama: "Beras Premium Ramos 5kg", satuan: "Sak", qty: 1, harga: 72500 },
        { nama: "Minyak Goreng Sania 2L", satuan: "Pouch", qty: 2, harga: 30000 },
      ];
  const [items, setItems] = useState<SaleItem[]>(defaultItems);

  const isEdit = !!initialData;

  // Handle item change
  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
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
      { nama: "", satuan: "Pcs", qty: 1, harga: 0 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + (it.qty || 0) * (it.harga || 0), 0);
  const grandTotal = Math.max(0, subtotal - (diskon || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nota.trim() || items.length === 0) return;

    const [pelangganNama, pelangganKode] = buyerSelection.split("|");

    onSave({
      id: initialData ? initialData.id : String(Date.now()),
      nota: nota.toUpperCase().trim(),
      tanggal,
      jam,
      pelangganNama: pelangganNama || "Pelanggan Umum",
      pelangganKode: pelangganKode || "NON",
      status,
      metode,
      diskon: Number(diskon) || 0,
      items: items.filter((it) => it.nama.trim() !== ""),
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 border border-[#E2E8F0]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">
              {isEdit ? "Edit Transaksi Penjualan" : "Transaksi Penjualan Baru"}
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              Formulir pencatatan penjualan sembako &amp; barang toko koperasi
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
        {/* Row 1: Informasi Nota */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tanggal */}
          <div className="space-y-1">
            <label className="font-semibold text-[#64748B]">Tanggal Transaksi *</label>
            <input
              type="date"
              required
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>

          {/* No Nota */}
          <div className="space-y-1">
            <label className="font-semibold text-[#64748B]">Nomor Nota *</label>
            <input
              type="text"
              required
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="PJ-20261005-013"
              className="w-full h-[38px] px-3 font-mono font-bold uppercase rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>

          {/* Pelanggan */}
          <div className="space-y-1">
            <label className="font-semibold text-[#64748B]">Pelanggan / Anggota *</label>
            <select
              value={buyerSelection}
              onChange={(e) => setBuyerSelection(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer"
            >
              <optgroup label="Anggota Terdaftar">
                <option value="Budi Santoso|A001">Budi Santoso (A001)</option>
                <option value="Siti Rahmawati|A002">Siti Rahmawati (A002)</option>
                <option value="Hendra Wijaya|A003">Hendra Wijaya (A003)</option>
                <option value="Dewi Sartika|A004">Dewi Sartika (A004)</option>
                <option value="Ahmad Dahlan|A005">Ahmad Dahlan (A005)</option>
                <option value="Rini Nuraini|A006">Rini Nuraini (A006)</option>
                <option value="Ahmad Sudrajat|A007">Ahmad Sudrajat (A007)</option>
              </optgroup>
              <optgroup label="Pelanggan Umum">
                <option value="Toko Mitra Barokah|NON">Toko Mitra Barokah (Umum)</option>
                <option value="Pelanggan Tunai Toko|NON">Pelanggan Tunai Toko (Umum)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Row 2: Status & Metode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          {/* Status Pembayaran */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#64748B] block">Status Pembayaran</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Lunas"
                  checked={status === "Lunas"}
                  onChange={() => setStatus("Lunas")}
                  className="text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-[#0F172A]">Lunas</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Sebagian"
                  checked={status === "Sebagian"}
                  onChange={() => setStatus("Sebagian")}
                  className="text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-[#0F172A]">Sebagian</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Belum Lunas"
                  checked={status === "Belum Lunas"}
                  onChange={() => setStatus("Belum Lunas")}
                  className="text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-[#0F172A]">Belum Lunas</span>
              </label>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="space-y-1">
            <label className="font-semibold text-[#64748B] block">Metode Pembayaran</label>
            <select
              value={metode}
              onChange={(e) =>
                setMetode(
                  e.target.value as
                    | "Kas Tunai"
                    | "Kredit Anggota"
                    | "Transfer Bank"
                    | "Potong Simpanan"
                )
              }
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer"
            >
              <option value="Kas Tunai">Kas Tunai</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Kredit Anggota">Kredit Anggota (Piutang)</option>
              <option value="Potong Simpanan">Potong Simpanan Sukarela</option>
            </select>
          </div>
        </div>

        {/* Row 3: Daftar Item Barang Repeater */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">Daftar Barang Belanja</span>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" x2="12" y1="5" y2="19"/>
                <line x1="5" x2="19" y1="12" y2="12"/>
              </svg>
              <span>+ Tambah Baris Barang</span>
            </button>
          </div>

          <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
                <tr>
                  <th className="py-2 px-3">Nama Produk / Sembako</th>
                  <th className="py-2 px-2 w-24">Satuan</th>
                  <th className="py-2 px-2 w-20 text-center">Qty</th>
                  <th className="py-2 px-3 w-32 text-right">Harga (Rp)</th>
                  <th className="py-2 px-3 w-32 text-right">Subtotal</th>
                  <th className="py-2 px-2 w-10 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]">
                    <td className="p-2">
                      <input
                        type="text"
                        required
                        value={item.nama}
                        onChange={(e) => handleItemChange(idx, "nama", e.target.value)}
                        placeholder="Misal: Beras 5kg"
                        className="w-full h-8 px-2 rounded border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        value={item.satuan}
                        onChange={(e) => handleItemChange(idx, "satuan", e.target.value)}
                        className="w-full h-8 px-1.5 rounded border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      >
                        <option value="Sak">Sak</option>
                        <option value="Pouch">Pouch</option>
                        <option value="Kg">Kg</option>
                        <option value="Karton">Karton</option>
                        <option value="Bungkus">Bungkus</option>
                        <option value="Kotak">Kotak</option>
                        <option value="Kaleng">Kaleng</option>
                        <option value="Jerigen">Jerigen</option>
                        <option value="Pcs">Pcs</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="1"
                        required
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(idx, "qty", parseInt(e.target.value, 10) || 1)
                        }
                        className="w-full h-8 px-1.5 text-center rounded border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        step="500"
                        required
                        value={item.harga}
                        onChange={(e) =>
                          handleItemChange(idx, "harga", parseFloat(e.target.value) || 0)
                        }
                        className="w-full h-8 px-2 text-right rounded border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </td>
                    <td className="p-2 text-right font-bold text-[#0F172A]">
                      {formatRp(item.qty * item.harga)}
                    </td>
                    <td className="p-2 text-center">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-[#94A3B8] hover:text-[#DC2626] p-1 rounded cursor-pointer"
                          title="Hapus Baris"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 4: Diskon & Grand Total Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#64748B]">Diskon Potongan (Rp):</span>
            <input
              type="number"
              min="0"
              step="1000"
              value={diskon}
              onChange={(e) => setDiskon(parseFloat(e.target.value) || 0)}
              className="w-32 h-8 px-2 text-right rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="text-right">
            <span className="text-xs text-[#64748B] mr-2">Grand Total:</span>
            <span className="text-lg font-bold text-[#2563EB]">
              {formatRp(grandTotal)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            <span>Simpan Transaksi</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function PenjualanModalForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  nextSuggestedNota,
}: PenjualanModalFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <FormContent
        key={initialData ? initialData.id : "new-tx"}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
        nextSuggestedNota={nextSuggestedNota}
      />
    </div>
  );
}
