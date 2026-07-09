# 🌿 ORAHA Ecotourism Web

Selamat datang di repositori resmi **ORAHA Ecotourism**!

Website ini merupakan platform ekowisata dan pariwisata berkelanjutan yang dikembangkan secara khusus untuk mempromosikan dan mendukung kelestarian Taman Nasional Komodo. ORAHA menyediakan informasi destinasi wisata yang mendalam, paket perjalanan eksklusif, peta interaktif, serta sistem pemesanan tiket yang modern dan terintegrasi.

---

## ✨ Fitur Utama

- 🌍 **Multi-language Support**: Terintegrasi penuh dengan dua bahasa (Indonesia & Inggris) menggunakan Context API tanpa memuat ulang halaman.
- 🗺️ **Interactive Destination Map**: Peta interaktif area kepulauan dengan animasi titik pin presisi yang pas di atas pulau serta _tooltip_ detail destinasi yang interaktif.
- 💳 **Tour Booking System**: Sistem formulir pemesanan paket wisata dengan UI/UX modern, dilengkapi simulasi alur pembayaran via Virtual Account (BCA), E-Wallet (GoPay/OVO/DANA), dan QRIS.
- 📱 **100% Responsive Design**: Tata letak dan penataan gambar latar belakang (_background_) yang dioptimalkan secara sempurna untuk segala ukuran layar (Mobile, Tablet, Desktop) tanpa terpotong.
- ⚡ **High Performance & Animations**: Performa memuat halaman yang sangat cepat berkat SSR Next.js, dibalut dengan animasi transisi yang mulus menggunakan GSAP (GreenSock) dan CSS modern.

---

## 🛠️ Teknologi & Library (Tech Stack)

Proyek ini dibangun menggunakan teknologi web modern. Berikut adalah daftar library utama yang digunakan:

- **Framework Utama**: [Next.js](https://nextjs.org/) (React 18)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Animasi Kompleks**: [GSAP (GreenSock)](https://gsap.com/) & ScrollTrigger
- **Aset Visual (Bendera)**: `react-country-flag`
- **State Management**: React Hooks & Context API

---

## ⚙️ Persyaratan Sistem (Prerequisites)

Sebelum melakukan instalasi, pastikan komputer/laptop Anda sudah terpasang perangkat lunak berikut:

1. **Node.js** (Versi 18.0.0 atau yang lebih baru disarankan) - [Download di sini](https://nodejs.org/)
2. **npm** (Package manager bawaan Node.js) atau **yarn** / **pnpm**.
3. **Git** (Untuk meng-clone repositori) - [Download di sini](https://git-scm.com/)

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan website ORAHA di komputer lokal Anda:

### 1. Clone Repositori

Buka terminal/Command Prompt Anda, lalu jalankan perintah berikut untuk mengunduh kode sumber:

```bash
git clone [https://github.com/username-anda/oraha-ecotourism.git](https://github.com/username-anda/oraha-ecotourism.git)
cd oraha-ecotourism
```

### 2. Instalasi Dependencies

Jalankan perintah berikut untuk menginstal semua dependencies yang diperlukan:

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di dalam folder `src` dan tambahkan kunci dan nilai environment variables Anda. Misalnya:

```env
npm run dev
```

### 4. Buka di Browser

Buka browser favorit Anda (Chrome, Safari, Edge, Firefox) dan kunjungi tautan berikut:
http://localhost:3000

### 📂 Struktur Folder Proyek

Untuk memudahkan navigasi dalam pengembangan, berikut adalah struktur folder utama dari proyek ORAHA:

oraha-ecotourism/
├── public/ # Folder untuk semua aset statis (gambar, ikon, logo)
│ ├── Destinasi/ # Gambar untuk detail destinasi wisata
│ ├── Faq/ # Gambar latar belakang (background) komponen FAQ
│ ├── Home/ # Aset gambar halaman utama dan Logo ORAHA
│ ├── Paket/ # Gambar cover untuk kartu paket wisata
│ └── Peta/ # Gambar latar belakang denah kepulauan Peta
├── src/
│ ├── app/ # Tata letak utama dan routing Next.js (App Router)
│ ├── components/ # Komponen UI Reusable (Navbar, Peta, PaketWisata, Testimoni, dll)
│ ├── context/ # Global State Management (LanguageContext.tsx untuk dwibahasa)
│ └── data/ # Penyimpanan Data Tekstual
│ └── dictionary.ts # KUMPULAN TEKS KONTEN (Pusat Terjemahan ID & EN)
│ └── destinasi.ts # Kumpulan destinasi wisata
├── package.json # Daftar konfigurasi library, dependencies, dan script npm
├── tailwind.config.ts # Kustomisasi tema, warna, dan breakpoint Tailwind CSS
└── README.md # Dokumentasi proyek yang sedang Anda baca ini

### 📜 Lisensi

Hak Cipta © 2026 ORAHA Ecotourism.
Proyek ini dibuat untuk tujuan edukasi, pengembangan pariwisata berkelanjutan, dan perlindungan berbasis komunitas di kawasan Taman Nasional Komodo. Semua aset visual yang digunakan merupakan hak milik dari masing-masing kreator aslinya.
