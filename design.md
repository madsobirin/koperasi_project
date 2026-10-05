# Design Specification --- Sistem Informasi Koperasi

## 1. Tujuan Design

Design ini menjadi acuan implementasi frontend untuk aplikasi koperasi
yang menangani:

-   Transaksi penjualan
-   Transaksi pembelian
-   Simpanan anggota
-   Buku besar
-   Neraca saldo
-   Laporan Posisi Keuangan (Neraca)
-   Laporan Perhitungan Hasil Usaha (SHU)
-   Laporan Perubahan Ekuitas
-   Laporan Arus Kas
-   Catatan atas Laporan Keuangan (CALK)
-   Manajemen anggota
-   Dashboard administrasi

**Tahap awal:** frontend/prototype terlebih dahulu menggunakan data
dummy. Backend, database, authentication sebenarnya, dan integrasi
akuntansi belum diperlukan pada tahap prototype.

------------------------------------------------------------------------

# 2. Arah Visual

Gunakan gaya **modern enterprise dashboard** yang terlihat profesional
tetapi tetap sederhana untuk pengguna koperasi.

### Karakter visual

-   Clean
-   Profesional
-   Terstruktur
-   Banyak menggunakan card dan table
-   Tidak terlalu banyak dekorasi
-   Fokus pada data
-   Mudah dibaca ketika digunakan dalam pekerjaan administrasi
-   Responsive untuk desktop, tablet, dan mobile

### Referensi visual

Gunakan gambar desain yang diberikan sebagai referensi utama untuk:

-   Struktur sidebar
-   Dashboard
-   Layout tabel
-   Card statistik
-   Form transaksi
-   Halaman laporan
-   Hierarki typography
-   Warna
-   Spacing
-   Struktur navigasi

------------------------------------------------------------------------

# 3. Layout Global

## Desktop

Gunakan dua area utama:

``` text
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Header                                            │
│         ├───────────────────────────────────────────────────┤
│         │                                                   │
│         │              Main Content                         │
│         │                                                   │
│         │                                                   │
│         │                                                   │
└─────────────────────────────────────────────────────────────┘
```

### Sidebar

Sidebar berada di sebelah kiri.

Lebar:

-   Expanded: sekitar 240--260px
-   Collapsed: sekitar 64--72px

Isi sidebar:

``` text
Logo Koperasi

Dashboard

Anggota

Transaksi
  ├── Penjualan
  └── Pembelian

Simpanan

Akuntansi
  ├── Buku Besar
  └── Neraca Saldo

Laporan
  ├── Posisi Keuangan
  ├── Perhitungan Hasil Usaha
  ├── Perubahan Ekuitas
  ├── Arus Kas
  └── CALK

Pengaturan
```

Sidebar menggunakan icon + label.

Menu aktif menggunakan background biru dan text putih.

------------------------------------------------------------------------

# 4. Header

Header berada di bagian atas content.

Isi:

-   Breadcrumb / nama halaman
-   Search jika diperlukan
-   Notification
-   Profile user
-   Role user

Contoh:

``` text
Dashboard                              🔔   Admin
                                      Administrator
```

Header menggunakan background putih dengan border bawah tipis.

------------------------------------------------------------------------

# 5. Design Tokens

## Primary Color

Gunakan biru sebagai warna utama.

``` text
Primary       #2563EB
Primary Dark  #1D4ED8
Primary Light #EFF6FF
```

## Neutral

``` text
Background    #F8FAFC
Surface       #FFFFFF
Border        #E2E8F0
Text Primary  #0F172A
Text Secondary#64748B
Text Muted    #94A3B8
```

## Semantic

``` text
Success       #16A34A
Warning       #F59E0B
Danger        #DC2626
Info          #0EA5E9
```

Gunakan warna semantic hanya untuk status, notifikasi, atau informasi
penting.

------------------------------------------------------------------------

# 6. Typography

Gunakan font modern seperti:

-   Inter
-   Geist
-   Plus Jakarta Sans

Rekomendasi:

``` text
Page Title       24–28px / 700
Section Title    18–20px / 600
Card Title       14–16px / 600
Body             14px / 400
Table            13–14px
Caption          12px
```

Hindari penggunaan terlalu banyak ukuran font.

------------------------------------------------------------------------

# 7. Border Radius & Shadow

Gunakan radius modern:

``` text
Card       10–12px
Input      8px
Button     8px
Badge      9999px
```

Shadow dibuat sangat halus.

Prioritaskan border daripada shadow berat.

------------------------------------------------------------------------

# 8. Dashboard

Dashboard merupakan halaman utama setelah login.

## Greeting

Contoh:

``` text
Dashboard

Selamat datang kembali, Admin.
Berikut ringkasan aktivitas koperasi hari ini.
```

## Date Filter

Sediakan filter periode:

``` text
[ 05 Oktober 2026 ]
```

atau:

``` text
[ Hari ini ▼ ]
```

------------------------------------------------------------------------

## Statistik Utama

Tampilkan 4 card.

``` text
┌─────────────────┐
│ Penjualan       │
│ Rp 2.350.000    │
│ ↑ 12.5%         │
└─────────────────┘

┌─────────────────┐
│ Pembelian       │
│ Rp 1.520.000    │
│ ↓ 4.2%          │
└─────────────────┘

┌─────────────────┐
│ Simpanan        │
│ Rp 750.000      │
│ 5 transaksi     │
└─────────────────┘

┌─────────────────┐
│ Total Anggota   │
│ 125 orang       │
└─────────────────┘
```

Nilai menggunakan dummy data pada prototype.

------------------------------------------------------------------------

# 9. Dashboard Charts

Gunakan dua visual utama.

## Grafik Penjualan & Pembelian

Line chart atau bar chart.

``` text
Penjualan
Pembelian

Sen  Sel  Rab  Kam  Jum  Sab  Min
```

Tujuan:

Menampilkan aktivitas transaksi berdasarkan periode.

## Komposisi Pendapatan

Gunakan donut chart.

Kategori contoh:

-   Penjualan
-   Simpanan
-   Pendapatan lain-lain

------------------------------------------------------------------------

# 10. Login

Halaman login menggunakan layout dua sisi atau centered card.

``` text
┌──────────────────────┬──────────────────────┐
│                      │                      │
│ Branding Koperasi    │    Masuk Sistem      │
│                      │                      │
│ Deskripsi singkat    │ Username             │
│                      │ Password             │
│                      │                      │
│                      │ [ Masuk ]            │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

Input:

-   Username
-   Password
-   Remember me
-   Lupa password

Pada prototype login tidak perlu autentikasi sebenarnya.

------------------------------------------------------------------------

# 11. Data Anggota

Halaman anggota menggunakan tabel.

Header:

``` text
Data Anggota
Kelola data anggota koperasi

[ + Tambah Anggota ]
```

Filter:

-   Search
-   Status
-   Periode

Table:

  ------------------------------------------------------------------------------
  No         No Anggota Nama        Jenis       Status     Tanggal    Aksi
                                    Kelamin                Daftar     
  ---------- ---------- ----------- ----------- ---------- ---------- ----------
  1          A001       Budi        Laki-laki   Aktif      12 Jan     Edit /
                        Santoso                            2024       Hapus

  2          A002       Siti        Perempuan   Aktif      15 Jan     Edit /
                        Rahmawati                          2024       Hapus
  ------------------------------------------------------------------------------

Status menggunakan badge.

------------------------------------------------------------------------

# 12. Transaksi Penjualan

Halaman:

``` text
Transaksi Penjualan

Pencatatan transaksi penjualan barang/jasa

[ + Transaksi Baru ]
```

Filter:

-   Range tanggal
-   Search nomor transaksi
-   Search pelanggan
-   Status

Table:

  No   Tanggal   No Nota   Pelanggan     Total Status   Aksi
  ---- --------- --------- ----------- ------- -------- ------

Status:

-   Lunas
-   Belum Lunas
-   Sebagian

------------------------------------------------------------------------

# 13. Transaksi Pembelian

Struktur sama dengan penjualan.

Field utama:

-   Tanggal
-   Nomor transaksi
-   Supplier
-   Barang
-   Jumlah
-   Harga
-   Total
-   Status pembayaran

Table:

  No   Tanggal   No Nota   Supplier     Total Status   Aksi
  ---- --------- --------- ---------- ------- -------- ------

------------------------------------------------------------------------

# 14. Simpanan Anggota

Halaman untuk mencatat simpanan anggota.

Jenis simpanan:

-   Simpanan Pokok
-   Simpanan Wajib
-   Simpanan Sukarela

Table:

  ----------------------------------------------------------------------------
  No        Tanggal   Anggota   Jenis           Nominal Keterangan   Aksi
                                Simpanan                             
  --------- --------- --------- ---------- ------------ ------------ ---------

  ----------------------------------------------------------------------------

Tambahkan tombol:

``` text
[ + Transaksi Simpanan ]
```

------------------------------------------------------------------------

# 15. Buku Besar

Buku besar menampilkan transaksi berdasarkan akun.

Filter:

-   Periode
-   Akun
-   Search

Table:

  Tanggal   No Bukti   Keterangan     Debit   Kredit   Saldo
  --------- ---------- ------------ ------- -------- -------

Gunakan format angka rupiah.

Saldo akhir dibuat lebih menonjol.

------------------------------------------------------------------------

# 16. Neraca Saldo

Halaman menampilkan saldo seluruh akun dalam periode tertentu.

Header:

``` text
Neraca Saldo
Saldo semua akun per periode

Periode: Oktober 2026
```

Table:

  Kode   Nama Akun     Debit   Kredit   Saldo
  ------ ----------- ------- -------- -------

Bagian total:

``` text
TOTAL DEBIT       Rp 24.500.000
TOTAL KREDIT      Rp 24.500.000
```

Debit dan kredit harus terlihat seimbang pada dummy data.

------------------------------------------------------------------------

# 17. Laporan Posisi Keuangan

Gunakan layout laporan profesional.

Judul:

``` text
KOPERASI SEJAHTERA

LAPORAN POSISI KEUANGAN
Per 31 Oktober 2026
```

Sediakan:

``` text
[ Export PDF ] [ Cetak ]
```

Struktur:

## Aset

### Aset Lancar

-   Kas
-   Piutang Anggota
-   Persediaan
-   Aset lancar lainnya

### Aset Tetap

-   Peralatan
-   Akumulasi penyusutan
-   Aset tetap lainnya

## Kewajiban

-   Hutang Usaha
-   Hutang lain-lain

## Ekuitas

-   Simpanan Pokok
-   Simpanan Wajib
-   SHU Tahun Berjalan

Total:

``` text
TOTAL ASET

TOTAL KEWAJIBAN & EKUITAS
```

------------------------------------------------------------------------

# 18. Laporan Perhitungan Hasil Usaha / SHU

Judul:

``` text
LAPORAN PERHITUNGAN HASIL USAHA
Periode Oktober 2026
```

Struktur:

``` text
Pendapatan
  Penjualan
  Pendapatan Simpanan
  Pendapatan Lain-lain

Total Pendapatan

Beban
  Beban Pokok Penjualan
  Beban Operasional
  Beban Administrasi

Total Beban

SHU / Sisa Hasil Usaha
```

SHU menjadi angka paling menonjol di bagian bawah.

Gunakan highlight success untuk hasil positif.

------------------------------------------------------------------------

# 19. Laporan Perubahan Ekuitas

Judul:

``` text
LAPORAN PERUBAHAN EKUITAS
Periode Oktober 2026
```

Table:

  Keterangan                     Jumlah
  --------------------- ---------------
  Saldo Awal Ekuitas      Rp 22.000.000
  Penambahan Simpanan     Rp 10.500.000
  Pembagian SHU            Rp 1.000.000
  SHU Tahun Berjalan       Rp 3.500.000
  Saldo Akhir Ekuitas     Rp 31.500.000

------------------------------------------------------------------------

# 20. Laporan Arus Kas

Gunakan tiga kategori aktivitas.

## Aktivitas Operasi

-   Penerimaan penjualan
-   Penerimaan simpanan
-   Pembayaran pembelian
-   Pembayaran beban operasional

## Aktivitas Investasi

-   Pembelian aset
-   Penjualan aset

## Aktivitas Pendanaan

-   Simpanan anggota
-   Pengambilan simpanan

Bagian bawah:

``` text
Arus Kas Bersih
Kas Awal
Kas Akhir
```

------------------------------------------------------------------------

# 21. CALK

CALK dibuat seperti dokumen laporan formal.

Header:

``` text
CATATAN ATAS LAPORAN KEUANGAN
KOPERASI SEJAHTERA
Per 31 Oktober 2026
```

Section:

1.  Umum
2.  Kebijakan Akuntansi
3.  Penjelasan Pos-Pos Laporan Keuangan
4.  Informasi Lain-lain

Gunakan card putih dengan typography dokumen.

CALK tidak perlu dibuat terlalu seperti dashboard.

Fokus pada keterbacaan dokumen.

------------------------------------------------------------------------

# 22. Form Transaksi

Form transaksi menggunakan modal atau halaman detail.

Contoh:

``` text
Tambah Transaksi Penjualan

Tanggal             [ 05/10/2026 ]
Nomor Nota          [ PJ001        ]
Pelanggan           [ Pilih...     ]

Detail Barang
────────────────────────────────────
Barang              Qty     Harga
Produk A             2      50.000
Produk B             1      75.000

Subtotal                     175.000
Diskon                         0
Total                        175.000

[ Batal ] [ Simpan Transaksi ]
```

Pada prototype, tombol simpan hanya memanipulasi dummy state/local
state.

------------------------------------------------------------------------

# 23. Component yang Harus Dibuat

Gunakan component reusable.

``` text
Layout
├── Sidebar
├── Header
├── Breadcrumb
└── PageContainer

UI
├── Button
├── Input
├── Select
├── DatePicker
├── Modal
├── Card
├── Badge
├── Dropdown
├── Toast
└── ConfirmDialog

Data
├── DataTable
├── Pagination
├── SearchBar
├── FilterBar
└── EmptyState

Dashboard
├── StatisticCard
├── RevenueChart
└── ActivityChart

Accounting
├── LedgerTable
├── TrialBalanceTable
└── FinancialReport
```

------------------------------------------------------------------------

# 24. Dummy Data

Semua halaman prototype menggunakan dummy data terstruktur.

Contoh:

``` ts
const members = [
  {
    id: "A001",
    name: "Budi Santoso",
    status: "active",
  },
  {
    id: "A002",
    name: "Siti Rahmawati",
    status: "active",
  },
];
```

Jangan menggunakan data acak yang berubah setiap render.

Data dummy harus konsisten antar halaman.

------------------------------------------------------------------------

# 25. Interaksi Prototype

Walaupun belum menggunakan backend, prototype harus terasa seperti
aplikasi nyata.

Minimal interaction:

-   Sidebar navigation
-   Search
-   Filter
-   Pagination
-   Open modal
-   Close modal
-   Add dummy data
-   Edit dummy data
-   Delete dengan confirmation
-   Tab/filter laporan
-   Date filter
-   Dropdown
-   Toast notification
-   Print preview
-   Export button sebagai placeholder

------------------------------------------------------------------------

# 26. Responsive

## Desktop

Prioritas utama karena sistem koperasi kemungkinan banyak digunakan
melalui komputer.

## Tablet

Sidebar dapat collapse.

Table tetap dapat di-scroll horizontal.

## Mobile

Sidebar berubah menjadi drawer.

Card statistik menjadi 1--2 kolom.

Table menggunakan horizontal scroll.

Form menjadi satu kolom.

------------------------------------------------------------------------

# 27. Empty State

Jika tidak ada data:

``` text
Belum ada transaksi

Belum terdapat transaksi pada periode ini.

[ + Tambah Transaksi ]
```

Jangan menampilkan tabel kosong tanpa penjelasan.

------------------------------------------------------------------------

# 28. Loading State

Gunakan skeleton.

Contoh:

``` text
████████████
████████████████
████████
```

Hindari spinner di seluruh halaman jika hanya sebagian data yang
loading.

------------------------------------------------------------------------

# 29. Error State

Contoh:

``` text
Data gagal dimuat

Terjadi kesalahan ketika mengambil data.

[ Coba Lagi ]
```

------------------------------------------------------------------------

# 30. UX untuk Data Keuangan

Karena aplikasi berhubungan dengan keuangan:

-   Angka harus mudah dibaca.
-   Format Rupiah konsisten.
-   Jangan terlalu banyak warna.
-   Debit dan kredit harus jelas.
-   Total harus dibuat menonjol.
-   Jangan menggunakan warna merah hanya sebagai dekorasi.
-   Data laporan harus memiliki hierarki visual yang jelas.
-   Tombol destructive seperti hapus harus membutuhkan konfirmasi.

Format:

``` text
Rp 12.500.000
```

Bukan:

``` text
12500000
```

------------------------------------------------------------------------

# 31. Struktur Halaman

``` text
/
├── login
│
└── dashboard
    ├── anggota
    ├── transaksi
    │   ├── penjualan
    │   └── pembelian
    │
    ├── simpanan
    │
    ├── akuntansi
    │   ├── buku-besar
    │   └── neraca-saldo
    │
    ├── laporan
    │   ├── posisi-keuangan
    │   ├── shu
    │   ├── perubahan-ekuitas
    │   ├── arus-kas
    │   └── calk
    │
    └── pengaturan
```

------------------------------------------------------------------------

# 32. Prioritas Implementasi Prototype

Implementasi jangan langsung dimulai dari seluruh laporan.

Urutan yang direkomendasikan:

### Phase 1 --- Foundation

1.  Layout
2.  Sidebar
3.  Header
4.  Typography
5.  Color system
6.  Reusable components

### Phase 2 --- Core Screens

1.  Login
2.  Dashboard
3.  Anggota
4.  Penjualan
5.  Pembelian
6.  Simpanan

### Phase 3 --- Accounting

1.  Buku Besar
2.  Neraca Saldo

### Phase 4 --- Reports

1.  Posisi Keuangan
2.  SHU
3.  Perubahan Ekuitas
4.  Arus Kas
5.  CALK

### Phase 5 --- UX Polish

1.  Responsive
2.  Loading
3.  Empty state
4.  Error state
5.  Modal
6.  Toast
7.  Confirmation
8.  Print/export placeholder

------------------------------------------------------------------------

# 33. Batasan Prototype

Prototype ini **bukan sistem produksi**.

Tidak perlu:

-   Database production
-   API production
-   Authentication backend
-   Authorization backend
-   Prisma
-   PostgreSQL/MySQL
-   Perhitungan akuntansi backend
-   Audit trail production
-   Payment gateway
-   Deployment production

Fokus utama:

> **Membuat client dapat melihat, mencoba, dan memahami bentuk sistem
> sebelum development backend dimulai.**

------------------------------------------------------------------------

# 34. Definition of Done --- Prototype

Prototype dianggap selesai apabila client dapat:

1.  Login secara dummy.
2.  Melihat dashboard.
3.  Melihat daftar anggota.
4.  Membuka transaksi penjualan.
5.  Membuka transaksi pembelian.
6.  Membuka simpanan anggota.
7.  Melihat buku besar.
8.  Melihat neraca saldo.
9.  Melihat laporan posisi keuangan.
10. Melihat laporan SHU.
11. Melihat perubahan ekuitas.
12. Melihat arus kas.
13. Membaca CALK.
14. Berpindah halaman melalui sidebar.
15. Mencoba search/filter.
16. Membuka form transaksi.
17. Melihat data dummy yang konsisten.
18. Melihat tampilan responsive.

------------------------------------------------------------------------

# 35. Prinsip Utama

> **Build the interface first, validate the workflow, then build the
> backend.**

Tujuan prototype bukan membuat sistem palsu yang lengkap, tetapi membuat
**representasi visual dan alur kerja yang cukup nyata agar client dapat
memberikan feedback sebelum development backend dimulai.**

Semua keputusan backend dan database dapat dilakukan setelah alur
frontend disetujui client.
