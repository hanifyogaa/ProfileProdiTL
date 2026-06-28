# Panduan Admin CMS — Website Teknik Logistik

Panduan ini untuk admin konten yang mengelola isi website (bukan developer).

## Login

| Item | Isi |
|---|---|
| URL Login | `https://dsctelu.id/login` |
| Email | _isi sesuai akun yang diberikan_ |
| Password | _isi sesuai akun yang diberikan_ |

Setelah login, dashboard admin ada di `https://dsctelu.id/admin`.

> Domain saat ini: **dsctelu.id**. Ke depannya pihak kampus mungkin juga mengakses lewat **ble.telkomuniversity.ac.id** — kalau itu terjadi, login dan dashboard tetap bisa diakses lewat domain mana pun yang mengarah ke server yang sama, cukup ganti bagian domain di atas.

> Simpan email & password di tempat aman. Jangan dibagikan ke orang lain.

## Menu yang bisa Tambah, Edit, dan Hapus data

| Menu | Alamat | Isi yang dikelola |
|---|---|---|
| **Berita** | `/admin/news` | Judul, ringkasan, isi berita, kategori, foto utama, status draft/terbit, tandai sebagai berita unggulan |
| **Dosen** | `/admin/lecturers` | Nama, jabatan, NIDN/NIP, biodata, foto, link Google Scholar/Sinta/Scopus, status aktif |
| **Mata Kuliah** | `/admin/courses` | Kode mata kuliah, nama mata kuliah, semester, jenis (wajib/pilihan), jumlah SKS, tandai mata kuliah unggulan |
| **Agenda/Kegiatan** | `/admin/activities` | Judul, isi kegiatan, jenis (kunjungan/workshop/kuliah tamu), tanggal, lokasi, foto sampul |
| **Prestasi** | `/admin/achievements` | Nama prestasi, atas nama siapa, tingkat (nasional/internasional), kategori, tanggal |
| **Laboratorium** | `/admin/labs` | Nama lab, bidang fokus, deskripsi, foto |
| **Kemitraan** | `/admin/partners` | Nama partner, jenis (industri/akademik), logo, link website, deskripsi |
| **Statistik** | `/admin/stats` | Nama data, tahun, nilai, satuan, label |
| **Galeri** | `/admin/galleries` | Judul foto, keterangan, kategori (umum/kegiatan/laboratorium/prestasi), publikasikan/sembunyikan |
| **FAQ** | `/admin/faqs` | Pertanyaan, jawaban, kategori (umum/akademik/karir/MBKM) |
| **Riset/Penelitian** | `/admin/researches` | Judul, kategori, tahun, deskripsi, foto, tim peneliti |
| **Pengabdian Masyarakat** | `/admin/community-services` | Judul, kategori, tahun, lokasi, partner, deskripsi, tim |
| **PLO (Program Learning Outcomes)** | `/admin/plos` | Kode PLO, deskripsi (ID/EN), urutan tampil. Ditampilkan di halaman `/kurikulum/capaian-pembelajaran` |

Setiap menu di atas bisa:
- **Tambah data baru** (tombol "Tambah" / "Create")
- **Edit data yang sudah ada**
- **Hapus data**

## CLO (Course Learning Outcomes) per Mata Kuliah

CLO tidak punya menu sendiri — CLO diisi langsung di dalam halaman edit mata kuliah (`/admin/courses/{id}/edit`), karena CLO selalu menjadi bagian dari satu mata kuliah tertentu.

1. Buka **Mata Kuliah** (`/admin/courses`) → klik **edit** pada mata kuliah yang dimaksud.
2. Scroll ke bagian **"Course Learning Outcomes (CLO)"** di bawah form.
3. Klik **"Tambah CLO"** → isi kode CLO (misal `CLO-1`), deskripsi ID & EN, lalu centang PLO mana yang didukung oleh CLO ini (bisa lebih dari satu).
4. Klik **"Perbarui Matkul"** untuk menyimpan.

> Buat PLO-nya dulu lewat menu **PLO** di atas sebelum memetakan CLO — kalau belum ada PLO sama sekali, pilihan PLO tidak akan muncul di form CLO.

## Menu yang hanya bisa Edit (tidak bisa tambah/hapus)

Semua bagian di bawah ini diatur lewat **satu halaman**: `/admin/settings`. Halaman ini punya beberapa tab di sisi kiri — setiap tab punya slot tetap (admin hanya mengisi/mengubah isinya, tidak bisa menambah tab baru).

| Tab | Halaman publik yang terpengaruh | Isi yang dikelola |
|---|---|---|
| **Hero Banner** | Beranda (`/`) | Teks utama, sub-judul, gambar hero, tombol CTA utama & kedua |
| **Keunggulan** | Beranda (`/`) | Judul & deskripsi keunggulan prodi, poin-poin keunggulan |
| **Sambutan Kaprodi** | Beranda (`/`), Profil (`/profil`) | Nama Kaprodi, kutipan sambutan, foto |
| **Profil Prodi** | Profil (`/profil`) | Gambar hero, visi, misi, sejarah, statistik (jumlah mahasiswa/dosen/alumni), badge & deskripsi akreditasi IABEE dan BAN-PT |
| **Kurikulum** | Kurikulum (`/kurikulum`) | Gambar hero, total SKS, jumlah semester, deskripsi profil lulusan, file PDF buku kurikulum, gambar prasyarat MK, link dokumen PEO, testimoni alumni |
| **Link Portal** | Dropdown navigasi Akademik | Link kalender akademik, pedoman akademik, kode etik, ijazah/transkrip, tugas akhir, registrasi MK, tur kampus 360° |
| **Info & Kontak** | Kontak (`/kontak`), seluruh website (footer) | Gambar hero halaman kontak, nama situs, alamat kampus, email & telepon kontak, link Instagram/LINE/TikTok, lencana akreditasi BAN-PT |
| **Kemahasiswaan** | Kemahasiswaan (`/kemahasiswaan`) | Nama organisasi (HIMA), deskripsi, visi, Instagram, daftar divisi & bidang kerja |
| **Prospek Karier** | Beranda (`/`) | Daftar jalur karier lulusan (judul & deskripsi tiap jalur) |
| **Akreditasi** | Akreditasi (`/profil/akreditasi`) | Nama lembaga akreditasi, status, deskripsi, daftar SK/keputusan akreditasi |
| **Struktur Organisasi** | Struktur Organisasi (`/profil/struktur-organisasi`) | Deskripsi, gambar bagan organisasi, daftar pengurus (nama, jabatan, email) |
| **Statistik & Tracer Study** | Statistik (`/statistik`) | Gambar hero, keterangan grafik, data tingkat keterserapan kerja per tahun (untuk grafik tracer study) |
| **MBKM** | MBKM (`/mbkm`) | Gambar hero, daftar skema program MBKM (judul, deskripsi, konversi SKS per skema) |

## Belum bisa diubah lewat admin (perlu hubungi developer)

- **Dokumen akademik** (kalender akademik, pedoman akademik, kode etik) — halaman ini menampilkan link dari tab "Link Portal" di atas, tapi kalau ingin ganti jadi file PDF yang di-upload langsung (bukan link luar), itu perlu bantuan developer.

## Menambah Admin Baru

Tidak ada halaman registrasi publik (sengaja, untuk keamanan) — tapi sekarang ada menu **"Pengguna Admin"** (grup "Lainnya" di sidebar, alamat `/admin/users`) untuk mengelola ini sendiri tanpa perlu developer:

1. Buka `/admin/users` → klik **"Tambah Pengguna"**.
2. Isi nama, email, dan password awal untuk orang tersebut.
3. Centang **"Jadikan admin"** kalau orang tersebut perlu akses penuh ke `/admin`. Kalau tidak dicentang, akun dibuat tapi belum bisa masuk ke admin sampai status-nya diubah nanti.
4. Klik **"Buat Pengguna"** — akun langsung aktif, sampaikan email & password ke orangnya lewat jalur aman (bukan chat publik). Mereka bisa mengganti password sendiri setelah login.

Untuk mencabut atau memberi akses admin ke akun yang sudah ada, di halaman `/admin/users` klik **"Jadikan Admin"** / **"Cabut Akses Admin"** di baris akun yang dimaksud. Anda tidak bisa mengubah status admin akun Anda sendiri (untuk mencegah Anda tidak sengaja terkunci dari admin) — kalau perlu, minta admin lain melakukannya.

> Saat ini belum ada cara menghapus akun langsung dari admin — kalau perlu, sampaikan ke developer.

## Tips Pengisian Konten

- Isi semua field versi **Bahasa Indonesia dan Inggris** kalau tersedia — jangan dikosongkan salah satu, karena website punya tombol ganti bahasa.
- Untuk foto/gambar, gunakan ukuran file yang wajar (di bawah 2MB) agar halaman tetap cepat dibuka.
- Setelah simpan data, cek tampilan di halaman publik website untuk memastikan tampil dengan benar.

## Catatan

Panduan ini mencakup **semua** konten yang bisa diedit dari admin per saat ini dibuat. Kalau halaman publik menampilkan sesuatu yang tidak tercantum di panduan ini dan ternyata memang perlu diedit rutin, itu tandanya field tersebut belum ada jalur admin-nya — sampaikan ke developer supaya bisa ditambahkan, mengikuti pola yang sama seperti tab-tab yang sudah ada.
