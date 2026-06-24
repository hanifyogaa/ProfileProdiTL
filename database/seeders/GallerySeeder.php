<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title_id'     => 'Kunjungan Industri PT HAVI Logistics',
                'title_en'     => 'Industry Visit to PT HAVI Logistics',
                'caption_id'   => 'Mahasiswa Teknik Logistik mengunjungi fasilitas distribusi PT HAVI Logistics.',
                'caption_en'   => 'Logistics Engineering students visited the distribution facility of PT HAVI Logistics.',
                'category'     => 'kegiatan',
                'image'        => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
                'order'        => 1,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Laboratorium E-Logistik',
                'title_en'     => 'E-Logistics Laboratory',
                'caption_id'   => 'Fasilitas laboratorium e-logistik berteknologi tinggi untuk simulasi rantai pasok digital.',
                'caption_en'   => 'High-tech e-logistics lab for digital supply chain simulation.',
                'category'     => 'laboratorium',
                'image'        => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
                'order'        => 2,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Workshop ASEAN Logistics Summit',
                'title_en'     => 'ASEAN Logistics Summit Workshop',
                'caption_id'   => 'Workshop internasional bersama mitra universitas se-ASEAN tentang tren logistik modern.',
                'caption_en'   => 'International workshop with ASEAN university partners on modern logistics trends.',
                'category'     => 'kegiatan',
                'image'        => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
                'order'        => 3,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Juara 1 Karya Tulis Ilmiah Nasional',
                'title_en'     => 'National Academic Paper Competition Champions',
                'caption_id'   => 'Tim mahasiswa Teknik Logistik meraih Juara 1 KTI tingkat nasional.',
                'caption_en'   => 'Logistics Engineering student team won 1st place at the national academic paper competition.',
                'category'     => 'prestasi',
                'image'        => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
                'order'        => 4,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Wisuda Teknik Logistik 2025',
                'title_en'     => 'Logistics Engineering Graduation 2025',
                'caption_id'   => 'Momen wisuda angkatan 2025 Program Studi Teknik Logistik Telkom University.',
                'caption_en'   => 'Graduation ceremony for the 2025 cohort of the Logistics Engineering Program at Telkom University.',
                'category'     => 'umum',
                'image'        => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
                'order'        => 5,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Laboratorium Simulasi Rantai Pasok',
                'title_en'     => 'Supply Chain Simulation Laboratory',
                'caption_id'   => 'Fasilitas simulasi rantai pasok dengan perangkat lunak Enterprise Resource Planning.',
                'caption_en'   => 'Supply chain simulation facility equipped with Enterprise Resource Planning software.',
                'category'     => 'laboratorium',
                'image'        => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop',
                'order'        => 6,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Pertukaran Mahasiswa Program ASEAN',
                'title_en'     => 'ASEAN Student Exchange Program',
                'caption_id'   => 'Mahasiswa Teknik Logistik mengikuti program pertukaran pelajar ke universitas mitra di Asia Tenggara.',
                'caption_en'   => 'Logistics Engineering students participating in the student exchange program at Southeast Asian partner universities.',
                'category'     => 'kegiatan',
                'image'        => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
                'order'        => 7,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Seminar Nasional Rantai Pasok Digital',
                'title_en'     => 'National Digital Supply Chain Seminar',
                'caption_id'   => 'Seminar nasional menghadirkan pakar logistik dari industri dan akademisi.',
                'caption_en'   => 'National seminar featuring logistics experts from industry and academia.',
                'category'     => 'umum',
                'image'        => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
                'order'        => 8,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Laboratorium Otomasi Gudang',
                'title_en'     => 'Warehouse Automation Laboratory',
                'caption_id'   => 'Eksperimen robotika pergudangan (AGV) dan internet of things (IoT) oleh mahasiswa.',
                'caption_en'   => 'Warehouse robotics (AGV) and internet of things (IoT) experiments by students.',
                'category'     => 'laboratorium',
                'image'        => 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600&auto=format&fit=crop',
                'order'        => 9,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Juara 2 Hackathon Logistik Digital',
                'title_en'     => '2nd Place Digital Logistics Hackathon',
                'caption_id'   => 'Tim mahasiswa memenangkan kompetisi perancangan aplikasi pelacakan cargo IoT.',
                'caption_en'   => 'Student team won the IoT cargo tracking application design competition.',
                'category'     => 'prestasi',
                'image'        => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
                'order'        => 10,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Kunjungan Lapangan Dry Port Cikarang',
                'title_en'     => 'Dry Port Cikarang Field Visit',
                'caption_id'   => 'Pengenalan operasional dry port dan pengurusan bea cukai petikemas.',
                'caption_en'   => 'Introduction to dry port operations and container customs clearance.',
                'category'     => 'kegiatan',
                'image'        => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop',
                'order'        => 11,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Penerimaan Mahasiswa Baru Angkatan 2025',
                'title_en'     => 'Admissions Ceremony for Class of 2025',
                'caption_id'   => 'Sidang senat terbuka menyambut mahasiswa baru Teknik Logistik Universitas Telkom.',
                'caption_en'   => 'Open senate session welcoming new Logistics Engineering students of Telkom University.',
                'category'     => 'umum',
                'image'        => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
                'order'        => 12,
                'is_published' => true,
            ],
        ];

        foreach ($items as $item) {
            Gallery::updateOrCreate(
                ['title_id' => $item['title_id']],
                $item
            );
        }
    }
}
