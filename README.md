# Jasa Pro — RAB & Invoice Jasa Tenaga Kerja

PWA statis untuk membuat penawaran/RAB, invoice pelunasan, budget pekerjaan, catatan DP, riwayat dokumen, JPG, dan PDF. Seluruh aset berada di satu tingkat tanpa subfolder sehingga dapat langsung diunggah ke GitHub Pages.

## Menjalankan secara lokal

Jangan membuka `index.html` melalui `file://` jika ingin menguji service worker. Jalankan server lokal dari folder hasil ekstrak, misalnya:

```bash
python3 -m http.server 8080
```

Buka `http://localhost:8080`.

## Deploy ke GitHub Pages

1. Buat repositori baru di GitHub, misalnya `jasa-pro`.
2. Ekstrak ZIP, lalu unggah **semua isi ZIP langsung ke root repositori**. Jangan memasukkannya ke dalam subfolder.
3. Pastikan `index.html`, `manifest.webmanifest`, dan `service-worker.js` berada di root.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch **main**, folder **/(root)**, lalu **Save**.
7. Tunggu proses Pages selesai. Alamatnya biasanya `https://NAMA-PENGGUNA.github.io/NAMA-REPOSITORI/`.
8. Buka alamat tersebut melalui HTTPS dan lakukan satu kali muat ulang agar seluruh app shell tersimpan untuk mode offline.

Berkas `.nojekyll` sudah disertakan agar GitHub Pages menyajikan aset apa adanya. Semua URL bersifat relatif sehingga dapat digunakan pada repositori proyek dengan subpath maupun domain kustom.

## Pemeriksaan PWABuilder

1. Setelah GitHub Pages aktif, buka `https://www.pwabuilder.com/`.
2. Masukkan URL publik GitHub Pages lengkap, termasuk garis miring terakhir.
3. Jalankan analisis. Manifest, ikon any/maskable, screenshots, start URL, scope, dan service worker sudah disiapkan.
4. Jika skor lama masih tampil, gunakan opsi analisis ulang setelah propagasi GitHub Pages selesai.
5. Lanjutkan ke pembuatan paket Android/iOS/Windows sesuai kebutuhan.

PWABuilder harus memeriksa URL HTTPS publik; alamat `localhost` atau pratinjau privat tidak dapat dianalisis oleh layanannya.

## Penyimpanan dan cadangan

- Draft, pengaturan, foto, riwayat, dan budget disimpan di perangkat/browser menggunakan IndexedDB, dengan mirror pengaturan tertentu di localStorage.
- Data tidak disinkronkan ke akun atau perangkat lain.
- Gunakan **Pengaturan → Penyimpanan & Cadangan → Cadangkan Data** secara berkala.
- Membersihkan data situs/browser dapat menghapus data aplikasi. Pulihkan melalui berkas cadangan JSON.

## Struktur berkas

- `index.html`: struktur aplikasi.
- `styles.css`, `fonts.css`: tampilan dan font lokal.
- `app.js`: logika RAB, invoice, budget, riwayat, penyimpanan, dan ekspor.
- `logo.js`, `logo-default.png`: logo bawaan.
- `intro.js`, `intro-data.js`: animasi pembuka yang dimuat saat diputar dari Pengaturan.
- `pwa.js`: registrasi service worker dan instalasi aplikasi.
- `service-worker.js`: app shell dan dukungan offline.
- `manifest.webmanifest`: metadata instalasi PWA.
- `html2canvas.min.js`, `jspdf.umd.min.js`, `lottie.min.js`: pustaka lokal.
- `*.woff2`: font lokal.
- `*.png`: ikon dan screenshots manifest.
- `LICENSES.md`: atribusi pustaka dan font.

Tidak ada dependensi npm, proses build, CDN, atau backend yang diperlukan.
