# Aksara Picture Portfolio Website

Website portofolio resmi untuk **Aksara Picture**, penyedia jasa fotografi wisuda, *prewedding*, dan *studio session* yang berbasis di Malang, Surabaya, dan Kediri. Website ini dirancang sebagai *Single Page Application* (SPA) sederhana dengan fokus pada estetika visual, animasi yang halus, dan performa tinggi.

##  Fitur Utama

* **Smooth Navigation & Scrolling:** Menggunakan **Lenis** untuk *smooth scrolling* dan **GSAP** untuk transisi antar bagian halaman yang mulus tanpa *reload*.
* **Dynamic Portfolio System:** Konten portofolio diambil secara *real-time* dari database **Supabase**, memungkinkan pengelolaan proyek (foto/album) tanpa mengubah kode.
* **Responsive Gallery:** Grid portofolio cerdas yang menyesuaikan rasio gambar (*portrait/landscape*) secara otomatis.
* **Interactive UI:** Animasi elemen saat di-scroll (*scroll-triggered animations*) dan modal *fullscreen* untuk detail proyek.
* **Booking Integration:** Formulir pemesanan yang terintegrasi langsung ke WhatsApp Admin.
* **Modern Design:** Tata letak minimalis dan elegan menggunakan **Tailwind CSS**.

##  Teknologi yang Digunakan

Project ini dibangun menggunakan teknologi web modern tanpa framework JavaScript berat (Vanilla JS), namun tetap *powerful*:

* **Frontend Core:** HTML5, JavaScript (ES6+).
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework).
* **Animation:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform) & ScrollTrigger.
* **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/).
* **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL Database & Storage).
* **Icons:** Font Awesome.

##  Prasyarat

Sebelum memulai, pastikan kamu telah menginstal:

* [Node.js](https://nodejs.org/) (v16 atau lebih baru) - diperlukan untuk menjalankan Tailwind CLI.
* Akun [Supabase](https://supabase.com/) (untuk backend portofolio).

##  Instalasi & Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/aksara-portfolio.git](https://github.com/username/aksara-portfolio.git)
    cd aksara-portfolio
    ```

2.  **Install Dependencies**
    Install *devDependencies* (Tailwind CSS) yang terdaftar di `package.json`.
    ```bash
    npm install
    ```

3.  **Konfigurasi Database (Supabase)**
    Project ini membutuhkan tabel berikut di Supabase agar fitur portofolio berfungsi:
    
    * Tabel `projects`:
        * `id` (int8, primary key)
        * `title` (text)
        * `category` (text)
        * `slug` (text, unique)
        * `sort_order` (int)
    
    * Tabel `project_images`:
        * `id` (int8, primary key)
        * `project_id` (foreign key ke projects.id)
        * `image_url` (text)
        * `sort_order` (int)
        * `aspect_ratio` (float) -> *>1 untuk landscape, <1 untuk portrait*

    *Catatan: Ubah `SUPABASE_URL` dan `SUPABASE_KEY` di file `js/script.js` dengan kredensial project kamu sendiri.*

4.  **Jalankan Mode Pengembangan**
    Perintah ini akan menjalankan Tailwind CSS dalam mode *watch* untuk mengompilasi file CSS saat ada perubahan.
    ```bash
    npm run dev
    ```

5.  **Buka Website**
    Buka file `index.html` di browser atau gunakan ekstensi *Live Server* di VS Code untuk pengalaman yang lebih baik.

##  Susunan Project

```text
aksara-portfolio/
├── assets/             # Aset statis (favicon, gambar statis)
├── css/
│   └── style.css       # Output CSS dari Tailwind (jangan diedit langsung)
├── js/
│   ├── script.js       # Logika utama (Supabase, GSAP, Lenis)
│   └── placeholder.webp
├── src/
│   └── input.css       # Source CSS untuk Tailwind (@tailwind directives)
├── index.html          # Halaman utama website
├── package.json        # Dependensi Node.js & Scripts
├── tailwind.config.js  # Konfigurasi Tailwind
└── README.md           # Dokumentasi Project

