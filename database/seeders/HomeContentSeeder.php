<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Activity;
use App\Models\Course;
use App\Models\Lab;
use App\Models\News;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Stat;
use Illuminate\Database\Seeder;

class HomeContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedStats();
        $this->seedCourses();
        $this->seedActivities();
        $this->seedNews();
        $this->seedAchievements();
        $this->seedLabs();
        $this->seedPartners();
    }

    private function seedSettings(): void
    {
        Setting::updateOrCreate(['key' => 'hero'], ['value' => [
            'eyebrow' => [
                'id' => 'Fakultas Rekayasa Industri · Telkom University',
                'en' => 'Faculty of Industrial Engineering · Telkom University',
            ],
            'title' => [
                'id' => 'Teknik Logistik berbasis IT, dirancang untuk masa depan rantai pasok.',
                'en' => 'IT-based Logistics Engineering, built for the future of supply chains.',
            ],
            'subtitle' => [
                'id' => 'Program Studi S1 Teknik Logistik dengan warna keilmuan e-logistik — memadukan rekayasa industri, teknologi informasi, dan manajemen rantai pasok digital.',
                'en' => 'An undergraduate Logistics Engineering program with an e-logistics focus — combining industrial engineering, information technology, and digital supply chain management.',
            ],
            'image' => null,
            'primary_cta' => ['label' => ['id' => 'Daftar Sekarang', 'en' => 'Apply Now'], 'href' => 'https://smb.telkomuniversity.ac.id/'],
            'secondary_cta' => ['label' => ['id' => 'Jelajahi Program', 'en' => 'Explore the Program'], 'href' => '/profil'],
        ]]);

        Setting::updateOrCreate(['key' => 'distinctiveness'], ['value' => [
            'heading' => ['id' => 'Apa yang membuat kami berbeda', 'en' => 'What makes us different'],
            'body' => [
                'id' => 'Keunggulan kami adalah warna keilmuan e-logistik — dipilih karena dukungan PT Telkom Indonesia sebagai BUMN platform telekomunikasi. Kami mengembangkan sistem logistik masa kini dan masa depan: dari rantai pasok digital, analitik data, hingga otomasi gudang.',
                'en' => 'Our edge is an e-logistics specialization — chosen thanks to PT Telkom Indonesia, the state-owned telecommunications platform. We build the logistics systems of today and tomorrow: digital supply chains, data analytics, and warehouse automation.',
            ],
            'points' => [
                [
                    'title' => ['id' => 'Digital Supply Chain', 'en' => 'Digital Supply Chain'],
                    'description' => [
                        'id' => 'Merancang rantai pasok yang terhubung dan transparan dari hulu ke hilir.',
                        'en' => 'Designing connected, transparent supply chains from upstream to downstream.',
                    ],
                ],
                [
                    'title' => ['id' => 'Logistics Analytics', 'en' => 'Logistics Analytics'],
                    'description' => [
                        'id' => 'Mengolah data logistik menjadi keputusan operasional yang lebih tepat.',
                        'en' => 'Turning logistics data into sharper operational decisions.',
                    ],
                ],
                [
                    'title' => ['id' => 'Automation & Systems', 'en' => 'Automation & Systems'],
                    'description' => [
                        'id' => 'Membangun otomasi gudang dan sistem informasi logistik berbasis IT.',
                        'en' => 'Building warehouse automation and IT-based logistics information systems.',
                    ],
                ],
            ],
            'link_href' => '/profil',
        ]]);

        Setting::updateOrCreate(['key' => 'greeting'], ['value' => [
            'name' => null,
            'photo' => null,
            'quote' => [
                'id' => 'Selamat datang di Program Studi S1 Teknik Logistik Universitas Telkom. Kurikulum kami dirancang 145 SKS dalam delapan semester, memadukan matematika dan ilmu dasar, pendidikan umum, dan topik keteknikan logistik.',
                'en' => 'Welcome to the S1 Logistics Engineering Study Program at Telkom University. Our curriculum is designed as 145 credits across eight semesters, combining mathematics and basic sciences, general education, and logistics engineering topics.',
            ],
            'attribution' => ['id' => 'Kepala Program Studi', 'en' => 'Head of Program'],
            'link_href' => '/profil',
        ]]);

        Setting::updateOrCreate(['key' => 'prospects'], ['value' => [
            'heading' => ['id' => 'Prospek Karier', 'en' => 'Career Prospects'],
            'tracks' => [
                [
                    'title' => ['id' => 'Tenaga Profesional', 'en' => 'Industry Professional'],
                    'description' => [
                        'id' => 'Analis, engineer, atau manajer logistik berbasis IT di perusahaan dan BUMN.',
                        'en' => 'IT-based logistics analyst, engineer, or manager at companies and state-owned enterprises.',
                    ],
                ],
                [
                    'title' => ['id' => 'Akademisi & Peneliti', 'en' => 'Academic & Researcher'],
                    'description' => [
                        'id' => 'Melanjutkan studi lanjut dan riset di bidang rekayasa logistik dan rantai pasok digital.',
                        'en' => 'Pursuing further study and research in logistics engineering and digital supply chains.',
                    ],
                ],
                [
                    'title' => ['id' => 'Wirausahawan', 'en' => 'Entrepreneur'],
                    'description' => [
                        'id' => 'Membangun usaha sendiri di bidang logistik dan teknologi rantai pasok.',
                        'en' => 'Building independent ventures in logistics and supply chain technology.',
                    ],
                ],
            ],
        ]]);

        Setting::updateOrCreate(['key' => 'curriculum_summary'], ['value' => [
            'total_sks' => 145,
            'semesters' => 8,
            'pdf_url' => null,
        ]]);

        Setting::updateOrCreate(['key' => 'tracer_stats'], ['value' => [
            'caption' => [
                'id' => 'Ilustrasi tren keterserapan lulusan — data menunggu konfirmasi.',
                'en' => 'Illustrative graduate employment trend — data pending confirmation.',
            ],
            'series' => [
                ['year' => 2022, 'employment_rate' => 78],
                ['year' => 2023, 'employment_rate' => 83],
                ['year' => 2024, 'employment_rate' => 88],
                ['year' => 2025, 'employment_rate' => 90],
            ],
        ]]);

        Setting::updateOrCreate(['key' => 'site_meta'], ['value' => [
            'name' => 'Teknik Logistik · Digital Supply Chain',
            'address' => 'Fakultas Rekayasa Industri, Telkom University',
            'accreditation_badge' => null,
        ]]);

        Setting::updateOrCreate(['key' => 'socials'], ['value' => [
            'instagram' => 'https://instagram.com/disca.telkomuniv',
            'line' => null,
            'tiktok' => null,
        ]]);

        Setting::updateOrCreate(['key' => 'contact'], ['value' => [
            'email' => null,
            'phone' => null,
        ]]);

        Setting::updateOrCreate(['key' => 'about_content'], ['value' => [
            'visi' => [
                'id' => 'Menjadi Program Studi S1 Teknik Logistik yang unggul, inovatif, dan bertaraf internasional dalam pengembangan ilmu pengetahuan dan teknologi di bidang logistik berbasis digital pada tahun 2028.',
                'en' => 'To become an excellent, innovative, and internationally standardized undergraduate Logistics Engineering program in the development of science and technology in the field of digital-based logistics by 2028.',
            ],
            'misi' => [
                [
                    'id' => 'Menyelenggarakan pendidikan S1 Teknik Logistik yang berkualitas dan relevan dengan kebutuhan industri logistik nasional dan internasional.',
                    'en' => 'To organize quality S1 Logistics Engineering education relevant to the needs of national and international logistics industries.',
                ],
                [
                    'id' => 'Mengembangkan riset inovatif di bidang sistem logistik digital, analitik rantai pasok, dan otomasi untuk memajukan ilmu pengetahuan dan teknologi logistik.',
                    'en' => 'To develop innovative research in digital logistics systems, supply chain analytics, and automation to advance logistics science and technology.',
                ],
                [
                    'id' => 'Melaksanakan pengabdian kepada masyarakat dengan menerapkan ilmu Teknik Logistik untuk meningkatkan efisiensi dan daya saing logistik nasional.',
                    'en' => 'To conduct community service by applying Logistics Engineering knowledge to improve the efficiency and competitiveness of national logistics.',
                ],
            ],
            'history' => [
                'id' => 'Program Studi S1 Teknik Logistik Universitas Telkom didirikan di bawah naungan Fakultas Rekayasa Industri (FRI). Dengan dukungan PT Telkom Indonesia sebagai BUMN platform telekomunikasi, program studi ini mengembangkan kekhasan keilmuan e-logistik yang memadukan rekayasa industri, teknologi informasi, dan manajemen rantai pasok digital. Sejak berdirinya, program ini konsisten mencetak lulusan yang terserap di berbagai sektor industri logistik nasional maupun internasional, dan telah meraih predikat Akreditasi "Unggul" dari LAM Teknik.',
                'en' => 'The S1 Logistics Engineering Program at Telkom University was established under the Faculty of Industrial Engineering (FRI). With the support of PT Telkom Indonesia, a state-owned telecommunications platform company, this program develops a distinctive e-logistics specialization that integrates industrial engineering, information technology, and digital supply chain management. Since its founding, the program has consistently produced graduates absorbed across various national and international logistics industry sectors, and has earned the "Unggul" (Excellent) accreditation from LAM Teknik.',
            ],
        ]]);

        Setting::updateOrCreate(['key' => 'accreditation'], ['value' => [
            'body_name' => 'LAM Teknik',
            'status' => [
                'id' => 'Terakreditasi: UNGGUL',
                'en' => 'Accreditation Rank: UNGGUL (Excellent)',
            ],
            'description' => [
                'id' => '"Unggul" adalah predikat akreditasi tertinggi yang diberikan oleh Lembaga Akreditasi Mandiri Teknik (LAM Teknik) kepada program studi yang memenuhi standar kualitas pendidikan tinggi secara komprehensif.',
                'en' => '"Unggul" is the highest accreditation rank awarded by the Independent Engineering Accreditation Institute (LAM Teknik) to study programs that comprehensively meet higher education quality standards.',
            ],
            'decrees' => [
                [
                    'title' => [
                        'id' => 'SK Akreditasi LAM Teknik 2025',
                        'en' => 'LAM Teknik Accreditation Decree (2025)',
                    ],
                    'number' => 'No: 0451/SK/LAM-Teknik/IV/2025',
                    'description' => [
                        'id' => 'Menetapkan predikat Akreditasi "Unggul" untuk Program Studi S1 Teknik Logistik, berlaku selama 5 tahun hingga tahun 2030.',
                        'en' => 'Establishes the "Unggul" accreditation rank for the S1 Logistics Engineering Program, valid for 5 years through 2030.',
                    ],
                ],
            ],
        ]]);

        Setting::updateOrCreate(['key' => 'research_areas'], ['value' => [
            'areas' => [
                [
                    'icon' => 'code',
                    'title' => [
                        'id' => 'Sistem Logistik Digital',
                        'en' => 'Digital Logistics Systems',
                    ],
                    'description' => [
                        'id' => 'Pengembangan arsitektur sistem informasi logistik, Warehouse Management System (WMS), dan platform e-logistik yang terintegrasi dengan teknologi IoT dan AI.',
                        'en' => 'Development of logistics information system architectures, Warehouse Management Systems (WMS), and e-logistics platforms integrated with IoT and AI technologies.',
                    ],
                ],
                [
                    'icon' => 'compass',
                    'title' => [
                        'id' => 'Model Riset Operasional',
                        'en' => 'Operations Research Modeling',
                    ],
                    'description' => [
                        'id' => 'Pemodelan matematika dan simulasi untuk optimasi jaringan distribusi, manajemen inventori, dan perencanaan kapasitas rantai pasok.',
                        'en' => 'Mathematical modeling and simulation for optimizing distribution networks, inventory management, and supply chain capacity planning.',
                    ],
                ],
                [
                    'icon' => 'heart',
                    'title' => [
                        'id' => 'Pengabdian & Inovasi Masyarakat',
                        'en' => 'Community Service & Innovation',
                    ],
                    'description' => [
                        'id' => 'Implementasi keilmuan logistik untuk meningkatkan efisiensi UMKM dan rantai pasok lokal, serta pengembangan solusi logistik sosial berbasis teknologi.',
                        'en' => 'Applying logistics knowledge to improve SME efficiency and local supply chains, and developing technology-based social logistics solutions.',
                    ],
                ],
            ],
        ]]);

        Setting::updateOrCreate(['key' => 'mbkm_content'], ['value' => [
            'description' => [
                'id' => 'Program Merdeka Belajar - Kampus Merdeka (MBKM) memfasilitasi mahasiswa Teknik Logistik untuk mendapatkan pengalaman belajar di luar kampus yang dapat dikonversi menjadi SKS. Tersedia dua skema utama yang dirancang untuk mempercepat kesiapan kerja dan memperluas wawasan global mahasiswa.',
                'en' => 'The Merdeka Belajar - Kampus Merdeka (MBKM) program enables Logistics Engineering students to gain learning experiences outside campus that can be converted into credits. Two main schemes are available, designed to accelerate career readiness and broaden students\' global perspectives.',
            ],
            'programs' => [
                [
                    'title' => [
                        'id' => 'Magang Industri Bersertifikat',
                        'en' => 'Certified Industry Internships',
                    ],
                    'description' => [
                        'id' => 'Penempatan magang terstruktur selama 6 bulan di perusahaan mitra industri unggulan — BUMN logistik, perusahaan manufaktur, atau perusahaan teknologi rantai pasok. Dapat dikonversi hingga 20 SKS dengan pendampingan akademik penuh.',
                        'en' => 'Structured 6-month internship placement at leading industry partner companies — logistics state enterprises, manufacturing companies, or supply chain technology companies. Convertible for up to 20 credits with full academic mentoring.',
                    ],
                ],
                [
                    'title' => [
                        'id' => 'Pertukaran Mahasiswa',
                        'en' => 'Student Exchange',
                    ],
                    'description' => [
                        'id' => 'Kesempatan studi satu semester di universitas mitra nasional maupun internasional di kawasan Asia Tenggara dan Asia Timur. Program ini memperkaya perspektif mahasiswa tentang praktik logistik global dengan konversi SKS penuh.',
                        'en' => 'Opportunity to study for one semester at national or international partner universities in Southeast and East Asia. This program enriches students\' perspectives on global logistics practices with full credit conversion.',
                    ],
                ],
            ],
        ]]);
    }

    private function seedStats(): void
    {
        $rows = [
            ['metric' => 'accreditation', 'value' => 'Unggul', 'label_id' => 'Akreditasi', 'label_en' => 'Accreditation', 'order' => 1],
            ['metric' => 'sks', 'value' => '145', 'label_id' => 'SKS · 8 Semester', 'label_en' => 'Credits · 8 Semesters', 'order' => 2],
            ['metric' => 'partners', 'value' => '30+', 'label_id' => 'Mitra Industri', 'label_en' => 'Industry Partners', 'order' => 3],
            ['metric' => 'employment', 'value' => '90%+', 'label_id' => 'Lulusan Terserap < 6 Bulan', 'label_en' => 'Graduates Employed < 6 Months', 'order' => 4],
        ];

        foreach ($rows as $row) {
            Stat::updateOrCreate(['metric' => $row['metric']], $row);
        }
    }

    private function seedCourses(): void
    {
        $rows = [
            ['code' => 'TLO401', 'name_id' => 'Digital Supply Chain', 'name_en' => 'Digital Supply Chain', 'sks' => 3, 'semester' => 5, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'TLO402', 'name_id' => 'Pemodelan Sistem Logistik', 'name_en' => 'Logistics Systems Modeling', 'sks' => 3, 'semester' => 6, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'TLO403', 'name_id' => 'Pergudangan & Inventori', 'name_en' => 'Warehouse & Inventory', 'sks' => 3, 'semester' => 6, 'type' => 'wajib', 'is_signature' => true],
        ];

        foreach ($rows as $row) {
            Course::updateOrCreate(['code' => $row['code']], $row);
        }
    }

    private function seedActivities(): void
    {
        $rows = [
            [
                'title_id' => 'Kunjungan Industri PT HAVI Logistics',
                'title_en' => 'Industry Visit to PT HAVI Logistics',
                'slug' => 'kunjungan-industri-havi-logistics',
                'type' => 'visit',
                'date' => '2026-03-12',
            ],
            [
                'title_id' => 'Workshop ASEAN Logistics Business Readiness',
                'title_en' => 'ASEAN Logistics Business Readiness Workshop',
                'slug' => 'workshop-asean-logistics-business-readiness',
                'type' => 'workshop',
                'date' => '2026-04-02',
            ],
            [
                'title_id' => 'Kunjungan PT Pertamina RU V Balikpapan',
                'title_en' => 'Visit to PT Pertamina RU V Balikpapan',
                'slug' => 'kunjungan-pertamina-ru-v-balikpapan',
                'type' => 'visit',
                'date' => '2026-04-21',
            ],
            [
                'title_id' => 'Kunjungan PT Garuda Food',
                'title_en' => 'Visit to PT Garuda Food',
                'slug' => 'kunjungan-garuda-food',
                'type' => 'visit',
                'date' => '2026-05-15',
            ],
        ];

        foreach ($rows as $row) {
            Activity::updateOrCreate(['slug' => $row['slug']], $row + ['is_featured' => true]);
        }
    }

    private function seedNews(): void
    {
        $rows = [
            [
                'title_id' => 'Pembukaan Pendaftaran Mahasiswa Baru 2026/2027',
                'title_en' => 'New Student Admissions Open for 2026/2027',
                'slug' => 'pendaftaran-mahasiswa-baru-2026-2027',
                'excerpt_id' => 'Konten contoh — akan diperbarui admin.',
                'excerpt_en' => 'Sample content — to be updated by admin.',
                'category' => 'Pengumuman',
            ],
            [
                'title_id' => 'Seminar Nasional Rantai Pasok Digital',
                'title_en' => 'National Seminar on Digital Supply Chains',
                'slug' => 'seminar-nasional-rantai-pasok-digital',
                'excerpt_id' => 'Konten contoh — akan diperbarui admin.',
                'excerpt_en' => 'Sample content — to be updated by admin.',
                'category' => 'Kegiatan',
            ],
            [
                'title_id' => 'Update Kurikulum 145 SKS',
                'title_en' => '145-Credit Curriculum Update',
                'slug' => 'update-kurikulum-145-sks',
                'excerpt_id' => 'Konten contoh — akan diperbarui admin.',
                'excerpt_en' => 'Sample content — to be updated by admin.',
                'category' => 'Akademik',
            ],
        ];

        foreach ($rows as $row) {
            News::updateOrCreate(['slug' => $row['slug']], $row + [
                'status' => 'published',
                'published_at' => now(),
            ]);
        }
    }

    private function seedAchievements(): void
    {
        $rows = [
            ['title_id' => 'Juara 1 Lomba Karya Tulis Ilmiah Logistik', 'title_en' => '1st Place, National Logistics Paper Competition', 'level' => 'national', 'date' => '2025-09-10', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Finalis ASEAN Supply Chain Case Competition', 'title_en' => 'Finalist, ASEAN Supply Chain Case Competition', 'level' => 'international', 'date' => '2025-11-05', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Juara 2 Hackathon Logistik Digital', 'title_en' => '2nd Place, Digital Logistics Hackathon', 'level' => 'national', 'date' => '2026-01-20', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Best Paper Award - Seminar Rantai Pasok', 'title_en' => 'Best Paper Award - Supply Chain Seminar', 'level' => 'national', 'date' => '2026-02-14', 'holder' => 'Dosen Teknik Logistik'],
            ['title_id' => 'Delegasi Studi Banding Logistik ASEAN', 'title_en' => 'ASEAN Logistics Study Visit Delegate', 'level' => 'international', 'date' => '2026-03-18', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Juara 3 Kompetisi Rancang Gudang Otomatis', 'title_en' => '3rd Place, Automated Warehouse Design Competition', 'level' => 'national', 'date' => '2026-05-02', 'holder' => 'Mahasiswa Teknik Logistik'],
        ];

        foreach ($rows as $i => $row) {
            Achievement::updateOrCreate(
                ['title_id' => $row['title_id']],
                $row + ['order' => $i + 1]
            );
        }
    }

    private function seedLabs(): void
    {
        $rows = [
            ['name' => 'Laboratorium E-Logistik', 'focus' => 'Digital Supply Chain'],
            ['name' => 'Laboratorium Simulasi Rantai Pasok', 'focus' => 'Logistics Analytics'],
            ['name' => 'Laboratorium Sistem Informasi Logistik', 'focus' => 'Logistics Analytics'],
            ['name' => 'Laboratorium Otomasi Gudang', 'focus' => 'Automation & Systems'],
        ];

        foreach ($rows as $i => $row) {
            Lab::updateOrCreate(['name' => $row['name']], $row + ['order' => $i + 1]);
        }
    }

    private function seedPartners(): void
    {
        $rows = [
            ['name' => 'HAVI Logistics', 'type' => 'industry'],
            ['name' => 'Garuda Food', 'type' => 'industry'],
            ['name' => 'Pertamina', 'type' => 'industry'],
        ];

        foreach ($rows as $i => $row) {
            Partner::updateOrCreate(['name' => $row['name']], $row + ['order' => $i + 1]);
        }
    }
}
