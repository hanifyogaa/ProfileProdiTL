<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question_id' => 'Apa itu Program Studi S1 Teknik Logistik Telkom University?',
                'question_en' => 'What is the S1 Logistics Engineering Program at Telkom University?',
                'answer_id'   => 'Program S1 Teknik Logistik adalah program studi di bawah Fakultas Rekayasa Industri (FRI) Telkom University yang memadukan rekayasa industri, teknologi informasi, dan manajemen rantai pasok digital — dengan warna keilmuan e-logistik. Program ini menghasilkan lulusan yang mampu merancang, mengoptimalkan, dan mengelola sistem logistik berbasis teknologi.',
                'answer_en'   => 'The S1 Logistics Engineering program is a study program under the Faculty of Industrial Engineering (FRI) at Telkom University that combines industrial engineering, information technology, and digital supply chain management — with an e-logistics specialization. This program produces graduates capable of designing, optimizing, and managing technology-based logistics systems.',
                'category'    => 'umum',
                'order'       => 1,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Berapa total SKS dan berapa lama masa studi Teknik Logistik?',
                'question_en' => 'How many credits are required and how long is the study duration for Logistics Engineering?',
                'answer_id'   => 'Kurikulum Program S1 Teknik Logistik dirancang untuk 145 SKS dalam 8 semester (4 tahun), mencakup mata kuliah wajib, mata kuliah pilihan, dan kegiatan MBKM yang dapat dikonversi hingga 20 SKS.',
                'answer_en'   => 'The S1 Logistics Engineering curriculum is designed for 145 credits over 8 semesters (4 years), covering compulsory courses, elective courses, and MBKM activities convertible for up to 20 credits.',
                'category'    => 'akademik',
                'order'       => 2,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Apa status akreditasi Program Studi Teknik Logistik saat ini?',
                'question_en' => 'What is the current accreditation status of the Logistics Engineering program?',
                'answer_id'   => 'Program Studi Teknik Logistik Telkom University telah meraih predikat Akreditasi "Unggul" dari LAM Teknik (Lembaga Akreditasi Mandiri Teknik) berdasarkan SK No. 0451/SK/LAM-Teknik/IV/2025, yang berlaku hingga tahun 2030. "Unggul" adalah predikat tertinggi dalam sistem akreditasi LAM Teknik.',
                'answer_en'   => 'The Logistics Engineering Program at Telkom University has achieved the "Unggul" (Excellent) accreditation from LAM Teknik (Independent Engineering Accreditation Institute) based on Decree No. 0451/SK/LAM-Teknik/IV/2025, valid through 2030. "Unggul" is the highest accreditation rank in the LAM Teknik system.',
                'category'    => 'umum',
                'order'       => 3,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Apa prospek karir lulusan Teknik Logistik Telkom University?',
                'question_en' => 'What career prospects are available for graduates of Logistics Engineering at Telkom University?',
                'answer_id'   => 'Lulusan Teknik Logistik dapat berkarir di berbagai sektor, antara lain: (1) Profesional Industri — sebagai Supply Chain Analyst, Logistics Manager, atau IT-based Logistics Consultant di perusahaan BUMN maupun swasta; (2) Akademisi & Peneliti — melanjutkan studi S2/S3 atau berkarir sebagai dosen/peneliti; (3) Wirausahawan — mendirikan startup di bidang logistik dan rantai pasok digital. Tingkat keterserapan kerja lulusan selama 3 tahun pertama mencapai >90%.',
                'answer_en'   => 'Logistics Engineering graduates can pursue careers across various sectors: (1) Industry Professionals — as Supply Chain Analysts, Logistics Managers, or IT-based Logistics Consultants in state-owned or private enterprises; (2) Academics & Researchers — pursuing graduate studies or careers as lecturers/researchers; (3) Entrepreneurs — founding startups in logistics and digital supply chains. Graduate employment rate within 3 years exceeds 90%.',
                'category'    => 'karir',
                'order'       => 4,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Program MBKM apa saja yang tersedia di Teknik Logistik?',
                'question_en' => 'What MBKM programs are available in Logistics Engineering?',
                'answer_id'   => 'Program Merdeka Belajar - Kampus Merdeka (MBKM) yang tersedia meliputi: (1) Magang Industri Bersertifikat — penempatan kerja terstruktur selama 6 bulan di perusahaan mitra (HAVI Logistics, Pertamina, Garuda Food, dll.) yang dapat dikonversi hingga 20 SKS; (2) Pertukaran Mahasiswa — studi selama satu semester di universitas mitra nasional maupun internasional dengan konversi SKS penuh.',
                'answer_en'   => 'Available Merdeka Belajar - Kampus Merdeka (MBKM) programs include: (1) Certified Industry Internship — structured 6-month work placement at partner companies (HAVI Logistics, Pertamina, Garuda Food, etc.) convertible for up to 20 credits; (2) Student Exchange — one-semester study at national or international partner universities with full credit conversion.',
                'category'    => 'mbkm',
                'order'       => 5,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Apakah tersedia beasiswa untuk mahasiswa Teknik Logistik?',
                'question_en' => 'Are there scholarships available for Logistics Engineering students?',
                'answer_id'   => 'Ya, tersedia berbagai jalur beasiswa untuk mahasiswa Teknik Logistik, antara lain: KIP-Kuliah (Kartu Indonesia Pintar - Kuliah) dari Kemendikbud, beasiswa prestasi Telkom University, beasiswa dari perusahaan mitra seperti program CSR BUMN, serta beasiswa dari pemerintah daerah. Informasi lengkap dan terkini tersedia di portal Penerimaan Mahasiswa Baru Telkom University.',
                'answer_en'   => 'Yes, various scholarship pathways are available for Logistics Engineering students, including: KIP-Kuliah (Indonesian Smart Card for Higher Education) from the Ministry of Education, Telkom University merit scholarships, scholarships from partner companies through BUMN CSR programs, and regional government scholarships. Complete and up-to-date information is available on the Telkom University New Student Admissions portal.',
                'category'    => 'akademik',
                'order'       => 6,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Bagaimana cara mendaftar ke Program Studi Teknik Logistik Telkom University?',
                'question_en' => 'How do I apply to the Logistics Engineering Program at Telkom University?',
                'answer_id'   => 'Pendaftaran ke Program S1 Teknik Logistik Telkom University dapat dilakukan melalui portal resmi Seleksi Masuk Baru (SMB) di smb.telkomuniversity.ac.id, tersedia melalui berbagai jalur: SNBT (Seleksi Nasional Berbasis Tes), jalur mandiri (Seleksi Mandiri), atau jalur beasiswa. Pastikan memenuhi persyaratan akademik dan mengikuti jadwal penerimaan yang berlaku.',
                'answer_en'   => 'Applications to the S1 Logistics Engineering Program at Telkom University are submitted via the official New Student Selection (SMB) portal at smb.telkomuniversity.ac.id, available through various pathways: SNBT (National Test-Based Selection), independent selection (Seleksi Mandiri), or scholarship pathways. Ensure you meet the academic requirements and follow the current admission schedule.',
                'category'    => 'umum',
                'order'       => 7,
                'is_active'   => true,
            ],
            [
                'question_id' => 'Apakah ada mata kuliah pilihan yang mempelajari teknologi terkini?',
                'question_en' => 'Are there elective courses studying current technologies?',
                'answer_id'   => 'Ya, kurikulum kami menyediakan mata kuliah pilihan seperti E-Commerce Logistics dan Sistem Logistik Halal yang dirancang untuk membekali mahasiswa dengan perkembangan teknologi dan regulasi industri terbaru.',
                'answer_en'   => 'Yes, our curriculum provides elective courses such as E-Commerce Logistics and Halal Logistics Systems designed to equip students with the latest technological developments and industry regulations.',
                'category' => 'akademik',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'question_id' => 'Apa saja fasilitas laboratorium yang dimiliki oleh Teknik Logistik?',
                'question_en' => 'What laboratory facilities does Logistics Engineering have?',
                'answer_id'   => 'Kami memiliki 10 laboratorium spesialis seperti Lab E-Logistik, Lab Otomasi Gudang (dilengkapi robot AGV dan IoT), Lab Simulasi Rantai Pasok, serta Lab Sistem Informasi Logistik.',
                'answer_en'   => 'We have 10 specialized laboratories such as the E-Logistics Lab, Warehouse Automation Lab (equipped with AGVs and IoT), Supply Chain Simulation Lab, and Logistics Information Systems Lab.',
                'category' => 'umum',
                'order' => 9,
                'is_active' => true,
            ],
            [
                'question_id' => 'Apakah mahasiswa tingkat akhir diwajibkan magang?',
                'question_en' => 'Are final year students required to take an internship?',
                'answer_id'   => 'Magang tidak diwajibkan bagi seluruh mahasiswa, namun sangat direkomendasikan melalui program MBKM Magang Industri Bersertifikat selama 6 bulan yang setara dengan konversi hingga 20 SKS.',
                'answer_en'   => 'Internships are not mandatory for all students, but are highly recommended through the 6-month Certified Industry Internship MBKM program, equivalent to up to 20 credits.',
                'category' => 'mbkm',
                'order' => 10,
                'is_active' => true,
            ],
            [
                'question_id' => 'Bagaimana tingkat kepuasan perusahaan pengguna lulusan?',
                'question_en' => 'What is the employer satisfaction level with graduates?',
                'answer_id'   => 'Berdasarkan data tracer study terbaru, tingkat kepuasan industri pengguna lulusan Teknik Logistik mencapai 95%, terutama dalam hal penguasaan IT logistik dan kerjasama tim.',
                'answer_en'   => 'Based on recent tracer study data, the employer satisfaction level for Logistics Engineering graduates reaches 95%, especially in IT logistics mastery and teamwork.',
                'category' => 'karir',
                'order' => 11,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['question_id' => $faq['question_id']],
                $faq
            );
        }
    }
}
