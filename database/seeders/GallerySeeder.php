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
                'order'        => 1,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Laboratorium E-Logistik',
                'title_en'     => 'E-Logistics Laboratory',
                'caption_id'   => 'Fasilitas laboratorium e-logistik berteknologi tinggi untuk simulasi rantai pasok digital.',
                'caption_en'   => 'High-tech e-logistics lab for digital supply chain simulation.',
                'category'     => 'laboratorium',
                'order'        => 2,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Workshop ASEAN Logistics Summit',
                'title_en'     => 'ASEAN Logistics Summit Workshop',
                'caption_id'   => 'Workshop internasional bersama mitra universitas se-ASEAN tentang tren logistik modern.',
                'caption_en'   => 'International workshop with ASEAN university partners on modern logistics trends.',
                'category'     => 'kegiatan',
                'order'        => 3,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Juara 1 Karya Tulis Ilmiah Nasional',
                'title_en'     => 'National Academic Paper Competition Champions',
                'caption_id'   => 'Tim mahasiswa Teknik Logistik meraih Juara 1 KTI tingkat nasional.',
                'caption_en'   => 'Logistics Engineering student team won 1st place at the national academic paper competition.',
                'category'     => 'prestasi',
                'order'        => 4,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Wisuda Teknik Logistik 2025',
                'title_en'     => 'Logistics Engineering Graduation 2025',
                'caption_id'   => 'Momen wisuda angkatan 2025 Program Studi Teknik Logistik Telkom University.',
                'caption_en'   => 'Graduation ceremony for the 2025 cohort of the Logistics Engineering Program at Telkom University.',
                'category'     => 'umum',
                'order'        => 5,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Laboratorium Simulasi Rantai Pasok',
                'title_en'     => 'Supply Chain Simulation Laboratory',
                'caption_id'   => 'Fasilitas simulasi rantai pasok dengan perangkat lunak Enterprise Resource Planning.',
                'caption_en'   => 'Supply chain simulation facility equipped with Enterprise Resource Planning software.',
                'category'     => 'laboratorium',
                'order'        => 6,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Pertukaran Mahasiswa Program ASEAN',
                'title_en'     => 'ASEAN Student Exchange Program',
                'caption_id'   => 'Mahasiswa Teknik Logistik mengikuti program pertukaran pelajar ke universitas mitra di Asia Tenggara.',
                'caption_en'   => 'Logistics Engineering students participating in the student exchange program at Southeast Asian partner universities.',
                'category'     => 'kegiatan',
                'order'        => 7,
                'is_published' => true,
            ],
            [
                'title_id'     => 'Seminar Nasional Rantai Pasok Digital',
                'title_en'     => 'National Digital Supply Chain Seminar',
                'caption_id'   => 'Seminar nasional menghadirkan pakar logistik dari industri dan akademisi.',
                'caption_en'   => 'National seminar featuring logistics experts from industry and academia.',
                'category'     => 'umum',
                'order'        => 8,
                'is_published' => true,
            ],
        ];

        foreach ($items as $item) {
            Gallery::updateOrCreate(
                ['title_id' => $item['title_id']],
                array_merge($item, ['image' => null])
            );
        }
    }
}
