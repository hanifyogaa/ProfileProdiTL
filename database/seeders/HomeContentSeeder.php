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
use App\Models\Research;
use App\Models\CommunityService;
use App\Models\Lecturer;
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
        $this->seedResearches();
        $this->seedCommunityServices();
        $this->seedLecturers();
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
            'name' => 'Dr. Femi Yulianti, S.Si., M.T., CPLM., ESLog.',
            'photo' => '/images/dosen/Femi Yulianti.png',
            'quote' => [
                'id' => 'Logistik bukan sekadar memindahkan barang dari satu tempat ke tempat lain. Logistik adalah tentang merancang sistem yang lebih cerdas, lebih efisien, lebih tangguh, dan lebih berkelanjutan untuk menciptakan nilai bagi masyarakat.',
                'en' => 'Logistics is not just about moving goods from one place to another. It is about designing smarter, more efficient, more resilient, and more sustainable systems to create value for society.',
            ],
            'attribution' => ['id' => 'Ketua Program Studi S1 Teknik Logistik', 'en' => 'Head of S1 Logistics Engineering Study Program'],
            'link_href' => '/profil',
            'full_message' => [
                'id' => "Selamat Datang di Program Studi S1 Teknik Logistik (Digital Supply Chain), Telkom University.\n\nCoba perhatikan sejenak benda-benda di sekitar kamu hari ini—makanan yang kamu makan, pakaian yang kamu kenakan, ponsel yang kamu pegang. Semua melewati perjalanan panjang: direncanakan, diproduksi, disimpan, didistribusikan, dan sampai ke tanganmu tepat waktu. Di balik semua itu ada sistem logistik dan rantai pasok yang terus berevolusi, kini semakin cerdas dengan kehadiran kecerdasan buatan (AI), Internet of Things (IoT), analitik data, simulasi sistem, dan blockchain.\n\nProgram Studi S1 Teknik Logistik (Digital Supply Chain) Telkom University hadir untuk mempersiapkan kamu menjadi bagian dari transformasi tersebut—bukan sekadar memahami konsep, tetapi mampu merancang solusi nyata yang inovatif, efisien, dan berkelanjutan untuk industri maupun masyarakat.\n\nMelalui kurikulum berbasis Outcome-Based Education (OBE) yang disusun bersama dunia industri, mahasiswa memperoleh pengalaman belajar yang mengintegrasikan ilmu rekayasa, analitik data, optimasi, simulasi sistem, teknologi informasi, serta praktik profesional. Pembelajaran tidak hanya berlangsung di ruang kelas, tetapi juga melalui laboratorium, proyek berbasis industri, penelitian, kompetisi, sertifikasi profesional, program Merdeka Belajar Kampus Merdeka (MBKM), serta berbagai kolaborasi dengan mitra nasional maupun internasional.\n\nMengapa Memilih Program Studi S1 Teknik Logistik?\nKami menawarkan pengalaman belajar yang relevan dengan kebutuhan industri masa depan, meliputi:\n• Digital Supply Chain dan Logistics 4.0\n• Artificial Intelligence dan Data Analytics untuk pengambilan keputusan logistik\n• Supply Chain Optimization menggunakan pendekatan riset operasi dan pemodelan matematika\n• Simulasi sistem logistik menggunakan perangkat lunak industri\n• Warehouse Management System (WMS), Enterprise Resource Planning (ERP), dan teknologi logistik digital\n• Project Based Learning dan studi kasus nyata dari industri\n• Kesempatan mengikuti program MBKM, magang, penelitian, dan kompetisi nasional maupun internasional\n\nMempersiapkan Karier Masa Depan\n• Logistics Engineer, yang mampu merancang, mengembangkan, dan mengoptimalkan sistem logistik serta rantai pasok berbasis data dan teknologi digital.\n• Researcher/ Academician, yang mampu melakukan penelitian dan menghasilkan inovasi untuk menjawab berbagai tantangan di bidang logistik dan rantai pasok.\n• Technopreneur, yang mampu menciptakan solusi dan peluang usaha berbasis teknologi digital di bidang logistik.\n\nLulusan memiliki peluang berkarier sebagai Supply Chain Analyst, Logistics Engineer, Operations Manager, Procurement Specialist, Warehouse Manager, Transportation Planner, Data Analyst, Business Consultant, hingga Entrepreneur di berbagai sektor industri.\n\nBelajar, Berkembang, dan Memberikan Dampak\nSaya percaya, pendidikan yang baik tidak hanya menghasilkan lulusan yang siap bekerja tetapi individu yang mampu menjadi agen perubahan. Oleh karena itu, kami mendorong setiap mahasiswa untuk aktif dalam penelitian, pengabdian kepada masyarakat, organisasi kemahasiswaan, kompetisi, sertifikasi profesi, serta kolaborasi lintas disiplin agar memiliki kompetensi teknis, kemampuan kepemimpinan, komunikasi, dan jiwa kewirausahaan.\n\nKami mengundang kamu untuk menjadi bagian dari Program Studi S1 Teknik Logistik dan bersama-sama membangun masa depan logistik yang lebih cerdas, tangguh, dan berkelanjutan.",
                'en' => "Welcome to the Bachelor of Logistics Engineering (Digital Supply Chain) Study Program, Telkom University.\n\nTake a moment to look at the objects around you today—the food you eat, the clothes you wear, the phone you hold. Everything goes through a long journey: planned, produced, stored, distributed, and delivered to you on time. Behind all of this is a logistics and supply chain system that continues to evolve, now becoming smarter with the presence of Artificial Intelligence (AI), Internet of Things (IoT), data analytics, system simulation, and blockchain.\n\nThe S1 Logistics Engineering (Digital Supply Chain) Study Program at Telkom University is here to prepare you to be part of this transformation—not just to understand the concepts, but to be able to design real solutions that are innovative, efficient, and sustainable for industry and society.\n\nThrough an Outcome-Based Education (OBE) curriculum developed with the industrial sector, students gain learning experiences that integrate engineering, data analytics, optimization, system simulation, information technology, and professional practice. Learning takes place not only in classrooms but also through laboratories, industry-based projects, research, competitions, professional certifications, the Merdeka Belajar Kampus Merdeka (MBKM) program, and various collaborations with national and international partners.\n\nWhy Choose the Logistics Engineering Study Program?\nWe offer a learning experience relevant to future industry needs, including:\n• Digital Supply Chain and Logistics 4.0\n• Artificial Intelligence and Data Analytics for logistics decision-making\n• Supply Chain Optimization using operations research and mathematical modeling approaches\n• Logistics system simulation using industrial software\n• Warehouse Management System (WMS), Enterprise Resource Planning (ERP), and digital logistics technologies\n• Project-Based Learning and real industry case studies\n• Opportunities to participate in the MBKM program, internships, research, and national or international competitions\n\nPreparing for Future Careers\n• Logistics Engineer, capable of designing, developing, and optimizing logistics and supply chain systems based on data and digital technology.\n• Researcher/Academician, capable of conducting research and producing innovations to address various challenges in logistics and supply chain.\n• Technopreneur, capable of creating solutions and business opportunities based on digital technology in logistics.\n\nGraduates have career opportunities as Supply Chain Analysts, Logistics Engineers, Operations Managers, Procurement Specialists, Warehouse Managers, Transportation Planners, Data Analysts, Business Consultants, and Entrepreneurs in various industrial sectors.\n\nLearn, Grow, and Make an Impact\nI believe that a good education does not only produce work-ready graduates but also individuals capable of becoming agents of change. Therefore, we encourage every student to be active in research, community service, student organizations, competitions, professional certification, and cross-disciplinary collaboration to develop technical competence, leadership, communication skills, and an entrepreneurial spirit.\n\nWe invite you to be part of the Logistics Engineering Study Program and together build a smarter, more resilient, and more sustainable future of logistics."
            ]
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
            'pdf_url' => '/panduan/buku-kurikulum-tl.pdf',
            'peo_url' => '/panduan/buku-kurikulum-tl.pdf',
            'plo_url' => '/panduan/buku-kurikulum-tl.pdf',
            'profil_lulusan' => [
                'id' => 'Profil lulusan Program Studi S1 Teknik Logistik Telkom University terdiri atas tiga profil utama: (1) Logistics Engineer atau Supply Chain Engineer: Profesional bidang logistik yang mampu meningkatkan kinerja sistem logistik secara efektif dan efisien berbasis data dan teknologi digital. (2) Peneliti atau Akademisi: Problem solver yang mampu melakukan investigasi secara sistematis, adaptif terhadap perkembangan TIK, dan berkomitmen pada pembelajaran sepanjang hayat. (3) Technopreneur: Lulusan yang mampu menunjukkan kreativitas dan berinovasi menciptakan nilai ekonomi baik sebagai wirausaha maupun intrapreneur.',
                'en' => 'The graduate profiles of the S1 Logistics Engineering program at Telkom University consist of three main roles: (1) Logistics or Supply Chain Engineer: Logistics professionals capable of improving logistics system performance effectively and efficiently based on data and digital technology. (2) Researcher or Academician: Problem solvers capable of conducting systematic investigations, adapting to ICT developments, and committing to lifelong learning. (3) Technopreneur: Graduates capable of showing creativity and innovating to create economic value either as an entrepreneur or intrapreneur.',
            ],
            'peo' => [
                'id' => "Program Educational Objectives (PEO) Program Studi S1 Teknik Logistik Telkom University menyasar tiga pencapaian lulusan:

1. PEO-1 (Professional Career): Menghasilkan lulusan yang berkarier sebagai profesional di bidang logistik atau rantai pasok yang mampu meningkatkan kinerja sistem logistik secara efektif dan efisien berbasis data dan teknologi digital.
2. PEO-2 (Lifelong Learning & Problem Solving): Menghasilkan lulusan yang mampu melakukan investigasi secara sistematis sebagai problem solver, adaptif terhadap perkembangan TIK, serta berkomitmen terhadap pembelajaran sepanjang hayat.
3. PEO-3 (Innovation & Entrepreneurship): Menghasilkan lulusan yang mampu menunjukkan kreativitas dan inovasi dalam menciptakan nilai ekonomi pada sistem logistik/rantai pasok, baik sebagai wirausaha maupun intrapreneur.",
                'en' => "Program Educational Objectives (PEO) of the S1 Logistics Engineering Program at Telkom University target three achievements:

1. PEO-1 (Professional Career): Producing graduates who pursue professional careers in logistics or supply chain, capable of improving logistics system performance effectively and efficiently based on data and digital technology.
2. PEO-2 (Lifelong Learning & Problem Solving): Producing graduates capable of systematic investigation as problem solvers, adaptive to ICT developments, and committed to lifelong learning.
3. PEO-3 (Innovation & Entrepreneurship): Producing graduates capable of showing creativity and innovation to create economic value in logistics/supply chain systems, both as entrepreneurs or intrapreneurs.",
            ],
            'plo' => [
                'id' => "Capaian Pembelajaran Lulusan (CPL/PLO) Program Studi S1 Teknik Logistik Telkom University terdiri dari 10 kompetensi utama:

1. PLO-1: Kemampuan menguasai dan menerapkan pengetahuan matematika, sains, TIK, dan rekayasa di bidang logistik.
2. PLO-2: Kemampuan merancang sistem logistik/rantai pasok dengan batasan multi-aspek (ekonomi, hukum, lingkungan).
3. PLO-3: Kemampuan merancang eksperimen dan menganalisis data untuk mendukung pengambilan keputusan.
4. PLO-4: Kemampuan mengidentifikasi dan menyelesaikan masalah kompleks menggunakan piranti teknik modern.
5. PLO-5: Kemampuan berkomunikasi secara efektif baik lisan maupun tulisan.
6. PLO-6: Kemampuan merencanakan, menyelesaikan, dan mengevaluasi tugas di bawah batasan tertentu.
7. PLO-7: Kemampuan menunjukkan kinerja mandiri dan kerja sama tim dalam kelompok lintas disiplin.
8. PLO-8: Kemampuan bertanggung jawab sosial, menjalankan etika profesi, dan berkomitmen pada lifelong learning.
9. PLO-9: Kemampuan berpikir logis, kritis, sistematis, dan inovatif dengan menjunjung tinggi nilai kemanusiaan.
10. PLO-10: Kemampuan memanfaatkan kreativitas untuk mengembangkan kewirausahaan logistik berbasis TIK.",
                'en' => "Program Learning Outcomes (PLO) of the S1 Logistics Engineering Program at Telkom University consist of 10 core competencies:

1. PLO-1: Ability to master and apply mathematics, science, ICT, and engineering knowledge in logistics.
2. PLO-2: Ability to design logistics/supply chain systems with multi-aspect constraints (economic, legal, environmental).
3. PLO-3: Ability to design experiments and analyze data to support decision-making processes.
4. PLO-4: Ability to identify and solve complex problems using modern engineering tools.
5. PLO-5: Ability to communicate effectively in both oral and written forms.
6. PLO-6: Ability to plan, complete, and evaluate tasks under specified constraints.
7. PLO-7: Ability to demonstrate independent performance and teamwork in cross-disciplinary groups.
8. PLO-8: Ability to take social responsibility, practice professional ethics, and commit to lifelong learning.
9. PLO-9: Ability to think logically, critically, systematically, and innovatively with high respect for humanity.
10. PLO-10: Ability to utilize creativity to develop ICT-based logistics entrepreneurship.",
            ],
            'prerequisite_image' => null,
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
            'instagram' => 'https://instagram.com/dsc.telkomuniversity',
            'line' => null,
            'tiktok' => null,
        ]]);

        Setting::updateOrCreate(['key' => 'contact'], ['value' => [
            'email' => 'logistics@telkomuniversity.ac.id',
            'phone' => 'https://wa.me/6285135022891',
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
                'id' => 'Program Studi S1 Teknik Logistik Universitas Telkom didirikan di bawah naungan Fakultas Rekayasa Industri (FRI). Dengan dukungan PT Telkom Indonesia sebagai BUMN platform telekomunikasi, program studi ini mengembangkan kekhasan keilmuan e-logistik yang memadukan rekayasa industri, teknologi informasi, dan manajemen rantai pasok digital. Sejak berdirinya, program ini konsisten mencetak lulusan yang terserap di berbagai sektor industri logistik nasional maupun internasional, dan telah mendapatkan akreditasi "B" dari BAN-PT.',
                'en' => 'The S1 Logistics Engineering Program at Telkom University was established under the Faculty of Industrial Engineering (FRI). With the support of PT Telkom Indonesia, a state-owned telecommunications platform company, this program develops a distinctive e-logistics specialization that integrates industrial engineering, information technology, and digital supply chain management. Since its founding, the program has consistently produced graduates absorbed across various national and international logistics industry sectors, and has been accredited with a "B" rating by BAN-PT.',
            ],
        ]]);

        Setting::updateOrCreate(['key' => 'accreditation'], ['value' => [
            'body_name' => 'BAN-PT',
            'status' => [
                'id' => 'Terakreditasi: B',
                'en' => 'Accreditation Rank: B',
            ],
            'description' => [
                'id' => 'Program Studi S1 Teknik Logistik Telkom University telah mendapatkan akreditasi dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) dengan peringkat B.',
                'en' => 'The S1 Logistics Engineering Study Program at Telkom University has been accredited by the National Accreditation Board for Higher Education (BAN-PT) with a B rating.',
            ],
            'decrees' => [
                [
                    'title' => [
                        'id' => 'SK Pendirian Program Studi',
                        'en' => 'Study Program Establishment Decree',
                    ],
                    'number' => '1195/KPT/I/2018',
                    'date' => '28/12/2018',
                    'grade' => '–',
                    'description' => [
                        'id' => 'Surat keputusan pendirian Program Studi S1 Teknik Logistik oleh Kementerian Riset, Teknologi dan Pendidikan Tinggi.',
                        'en' => 'Decree establishing the S1 Logistics Engineering Study Program by the Ministry of Research, Technology and Higher Education.',
                    ],
                ],
                [
                    'title' => [
                        'id' => 'SK Akreditasi BAN-PT — Peringkat Baik',
                        'en' => 'BAN-PT Accreditation Decree — Good Standing',
                    ],
                    'number' => '1915/SK/BAN-PT/Ak-PKP/S/IV/2021',
                    'date' => '13/04/2021',
                    'grade' => 'Baik',
                    'description' => [
                        'id' => 'Menetapkan predikat Akreditasi "Baik" untuk Program Studi S1 Teknik Logistik Telkom University oleh BAN-PT.',
                        'en' => 'Established the "Baik" (Good) accreditation rank for the S1 Logistics Engineering Study Program at Telkom University by BAN-PT.',
                    ],
                ],
                [
                    'title' => [
                        'id' => 'SK Akreditasi BAN-PT — Peringkat B',
                        'en' => 'BAN-PT Accreditation Decree — Rank B',
                    ],
                    'number' => '10735/SK/BAN-PT/Akred/S/IX/2021',
                    'date' => '08/09/2021',
                    'grade' => 'B',
                    'description' => [
                        'id' => 'Menetapkan predikat Akreditasi "B" untuk Program Studi S1 Teknik Logistik Telkom University oleh BAN-PT.',
                        'en' => 'Established the "B" accreditation rank for the S1 Logistics Engineering Study Program at Telkom University by BAN-PT.',
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

        Setting::updateOrCreate(['key' => 'org_structure'], ['value' => [
            'description' => [
                'id' => 'Program Studi S1 Teknik Logistik Universitas Telkom dikelola oleh pengurus program studi yang berdedikasi tinggi untuk memastikan kualitas akademik, kemahasiswaan, riset, dan kerjasama industri berjalan dengan standar internasional.',
                'en' => 'The S1 Logistics Engineering Study Program at Telkom University is managed by a highly dedicated team of staff to ensure that academic quality, student affairs, research, and industry partnerships meet international standards.',
            ],
            'chart_image' => null,
            'members' => [
                [
                    'name' => 'Dr. Femi Yulianti, S.Si., M.T., CPLM., ESLog.',
                    'role' => [
                        'id' => 'Kepala Program Studi S1 DSC',
                        'en' => 'Head of Study Program S1 DSC',
                    ],
                    'email' => 'femiyulianti@telkomuniversity.ac.id',
                ],
                [
                    'name' => 'Dr. Akbar, M.T.',
                    'role' => [
                        'id' => 'Sekretaris Program Studi (Sekprodi) & Pembina Lab E-Logistik',
                        'en' => 'Program Secretary & E-Logistics Lab Head',
                    ],
                    'email' => 'akbar@proditl.ac.id',
                ],
                [
                    'name' => 'Rian Pradana, M.T.',
                    'role' => [
                        'id' => 'Koordinator Kemahasiswaan & Pembina Lab Otomasi Gudang',
                        'en' => 'Student Affairs Coordinator & Warehouse Automation Lab Head',
                    ],
                    'email' => 'rian.pradana@proditl.ac.id',
                ],
                [
                    'name' => 'Lestari Handayani, M.Sc.',
                    'role' => [
                        'id' => 'Koordinator Akademik & Pembina Lab Simulasi',
                        'en' => 'Academic Coordinator & Simulation Lab Head',
                    ],
                    'email' => 'lestari@proditl.ac.id',
                ],
                [
                    'name' => 'Budi Prasetyo, M.T.',
                    'role' => [
                        'id' => 'Koordinator Riset & PKM',
                        'en' => 'Research & Community Service Coordinator',
                    ],
                    'email' => 'budi.prasetyo@proditl.ac.id',
                ],
                [
                    'name' => 'Siti Aminah, M.T.',
                    'role' => [
                        'id' => 'Koordinator Kerjasama',
                        'en' => 'Partnership Coordinator',
                    ],
                    'email' => 'siti.aminah@proditl.ac.id',
                ],
            ],
        ]]);
    }

    private function seedStats(): void
    {
        $rows = [
            ['metric' => 'accreditation', 'value' => 'B', 'label_id' => 'Akreditasi', 'label_en' => 'Accreditation', 'order' => 1],
            ['metric' => 'sks', 'value' => '145', 'label_id' => 'SKS · 8 Semester', 'label_en' => 'Credits · 8 Semesters', 'order' => 2],
            ['metric' => 'partners', 'value' => '30', 'label_id' => 'Mitra Industri', 'label_en' => 'Industry Partners', 'order' => 3],
            ['metric' => 'employment', 'value' => '92%', 'label_id' => 'Lulusan Terserap < 6 Bulan', 'label_en' => 'Graduates Employed < 6 Months', 'order' => 4],
            ['metric' => 'active_students', 'value' => '1,250+', 'label_id' => 'Mahasiswa Aktif', 'label_en' => 'Active Students', 'order' => 5],
            ['metric' => 'alumni', 'value' => '850+', 'label_id' => 'Alumni Tersebar', 'label_en' => 'Alumni Network', 'order' => 6],
            ['metric' => 'lecturer_count', 'value' => '24', 'label_id' => 'Dosen Tetap', 'label_en' => 'Full-time Faculty', 'order' => 7],
            ['metric' => 'research_count', 'value' => '45+', 'label_id' => 'Riset & Pengabdian Selesai', 'label_en' => 'Researches Completed', 'order' => 8],
            ['metric' => 'certified_students', 'value' => '180+', 'label_id' => 'Sertifikasi Kompetensi', 'label_en' => 'Professional Certifications', 'order' => 9],
            ['metric' => 'study_duration', 'value' => '3.8 Thn', 'label_id' => 'Rata-rata Kelulusan', 'label_en' => 'Average Study Duration', 'order' => 10],
        ];

        foreach ($rows as $row) {
            Stat::updateOrCreate(['metric' => $row['metric']], $row);
        }
    }

        private function seedCourses(): void
    {
        $rows = [
            // Semester 1
            ['code' => 'BCK1AAB3', 'name_id' => 'Algoritma dan Pemrograman Komputer dan Praktikum', 'name_en' => 'Algorithm and Computer Programming, and Practicum', 'sks' => 3, 'semester' => 1, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK1BAB4', 'name_id' => 'Fisika Dasar 1', 'name_en' => 'Basic Physics I', 'sks' => 4, 'semester' => 1, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'UCK1FDB1', 'name_id' => 'Internalisasi Budaya dan Pembentukan Karakter', 'name_en' => 'Culture Internalization and Character Building', 'sks' => 1, 'semester' => 1, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1CAB4', 'name_id' => 'Kalkulus 1', 'name_en' => 'Calculus I', 'sks' => 4, 'semester' => 1, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1DAB2', 'name_id' => 'Kimia Dasar 1', 'name_en' => 'Basic Chemistry I', 'sks' => 2, 'semester' => 1, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1EAB2', 'name_id' => 'Literasi Teknologi Informasi dan Komunikasi', 'name_en' => 'Information and Communication Technology Literacy', 'sks' => 2, 'semester' => 1, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1FAB2', 'name_id' => 'Pengantar Logistik dan Rantai Pasok', 'name_en' => 'Introduction to Logistics and Supply Chain', 'sks' => 2, 'semester' => 1, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK1GAB1', 'name_id' => 'Praktikum Fisika Dasar 1', 'name_en' => 'Practicum of Basic Physics I', 'sks' => 1, 'semester' => 1, 'type' => 'wajib', 'is_signature' => false],

            // Semester 2
            ['code' => 'BCK1HAB4', 'name_id' => 'Fisika Dasar 2', 'name_en' => 'Basic Physics II', 'sks' => 4, 'semester' => 2, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1IAB4', 'name_id' => 'Kalkulus 2', 'name_en' => 'Calculus II', 'sks' => 4, 'semester' => 2, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1JAB2', 'name_id' => 'Kimia Dasar 2', 'name_en' => 'Basic Chemistry II', 'sks' => 2, 'semester' => 2, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1KAB3', 'name_id' => 'Matriks dan Ruang Vektor', 'name_en' => 'Matrix and Vector Spaces', 'sks' => 3, 'semester' => 2, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1LAB3', 'name_id' => 'Menggambar Teknik dan Praktikum', 'name_en' => 'Technical Drawing and Practicum', 'sks' => 3, 'semester' => 2, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK1MAB2', 'name_id' => 'Teori Probabilitas', 'name_en' => 'Probability Theory', 'sks' => 2, 'semester' => 2, 'type' => 'wajib', 'is_signature' => false],

            // Semester 3
            ['code' => 'BCK2AAB3', 'name_id' => 'Analisis Biaya dan Tekno-Ekonomi', 'name_en' => 'Cost Analysis and Techno-Economics', 'sks' => 3, 'semester' => 3, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2BAB3', 'name_id' => 'Analitik Data Logistik dan Praktikum', 'name_en' => 'Logistics Data Analytics, and Practicum', 'sks' => 3, 'semester' => 3, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK2CAB3', 'name_id' => 'Kalkulus 3', 'name_en' => 'Calculus III', 'sks' => 3, 'semester' => 3, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2DAB2', 'name_id' => 'Pemodelan Sistem Logistik', 'name_en' => 'Logistics Systems Modeling', 'sks' => 2, 'semester' => 3, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2EAB3', 'name_id' => 'Perencanaan dan Pengendalian Sistem Logistik, dan Praktikum', 'name_en' => 'Planning and Control of Logistics Systems, and Practicum', 'sks' => 3, 'semester' => 3, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK2FAB3', 'name_id' => 'Riset Operasi 1', 'name_en' => 'Operation Research I', 'sks' => 3, 'semester' => 3, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2GAB2', 'name_id' => 'Statistika Bisnis Logistik', 'name_en' => 'Statistics of Logistic Business', 'sks' => 2, 'semester' => 3, 'type' => 'wajib', 'is_signature' => false],

            // Semester 4
            ['code' => 'BCK2HAB3', 'name_id' => 'Analitik Data Logistik Lanjut dan Praktikum', 'name_en' => 'Advanced Logistics Data Analytics and Practicum', 'sks' => 3, 'semester' => 4, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2IAB2', 'name_id' => 'Pemodelan dan Rekayasa Proses Bisnis Digital', 'name_en' => 'Digital Business Process Modeling and Engineering', 'sks' => 2, 'semester' => 4, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2JAB3', 'name_id' => 'Riset Operasi 2', 'name_en' => 'Operation Research II', 'sks' => 3, 'semester' => 4, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2KAB3', 'name_id' => 'Simulasi Diskrit Sistem Logistik dan Praktikum', 'name_en' => 'Discrete Simulation of Logistics System, and Practicum', 'sks' => 3, 'semester' => 4, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2LAB2', 'name_id' => 'Sistem Pengadaan', 'name_en' => 'Procurement System', 'sks' => 2, 'semester' => 4, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK2MAB3', 'name_id' => 'Sistem Persediaan', 'name_en' => 'Inventory System', 'sks' => 3, 'semester' => 4, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK2NAB3', 'name_id' => 'Sistem Transportasi', 'name_en' => 'Transportation System', 'sks' => 3, 'semester' => 4, 'type' => 'wajib', 'is_signature' => true],

            // Semester 5
            ['code' => 'UAKXACB2', 'name_id' => 'Agama Islam', 'name_en' => 'Islamic Religion', 'sks' => 2, 'semester' => 5, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'UCKXADB2', 'name_id' => 'Bahasa Inggris', 'name_en' => 'English', 'sks' => 2, 'semester' => 5, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3AAB3', 'name_id' => 'E-Logistics dan Praktikum', 'name_en' => 'E-Logistics, and Practicum', 'sks' => 3, 'semester' => 5, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'UBKXACB2', 'name_id' => 'Kewarganegaraan', 'name_en' => 'Civics', 'sks' => 2, 'semester' => 5, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3BAB2', 'name_id' => 'Logistik Kargo dan Penyedia Jasa Logistik', 'name_en' => 'Cargo Logistics and Logistics Service Provider', 'sks' => 2, 'semester' => 5, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3CAB3', 'name_id' => 'Perancangan Sistem Informasi Logistik, Basis Data dan Praktikum', 'name_en' => 'Design of Logistics Information System, Database, and Practicum', 'sks' => 3, 'semester' => 5, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK3DAB3', 'name_id' => 'Pergudangan dan Penanganan Material, dan Praktikum', 'name_en' => 'Warehousing and Material Handling, and Practicum', 'sks' => 3, 'semester' => 5, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK3EAB3', 'name_id' => 'Rekayasa Kualitas Sistem Logistik', 'name_en' => 'Quality Engineering of Logistics System', 'sks' => 3, 'semester' => 5, 'type' => 'wajib', 'is_signature' => false],

            // Semester 6
            ['code' => 'UBKXCCB2', 'name_id' => 'Bahasa Indonesia', 'name_en' => 'Bahasa Indonesia', 'sks' => 2, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3FAB2', 'name_id' => 'Enterprise Resource Planning', 'name_en' => 'Enterprise Resource Planning', 'sks' => 2, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3GAB2', 'name_id' => 'Infrastruktur dan Fasilitas Logistik', 'name_en' => 'Logistics Infrastructure and Facilities', 'sks' => 2, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'UCKXBDB2', 'name_id' => 'Kewirausahaan', 'name_en' => 'Entrepreneurship', 'sks' => 2, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3HAB2', 'name_id' => 'Manajemen dan Organisasi Perusahaan Logistik', 'name_en' => 'Logistics Company Management and Organization', 'sks' => 2, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'UBKXBCB2', 'name_id' => 'Pancasila', 'name_en' => 'Pancasila', 'sks' => 2, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK3IAB3', 'name_id' => 'Pengelolaan Rantai Pasok Digital', 'name_en' => 'Digital Supply Chain Management', 'sks' => 3, 'semester' => 6, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BCK3JAB3', 'name_id' => 'Pengembangan Bisnis Logistik', 'name_en' => 'Logistics Business Development', 'sks' => 3, 'semester' => 6, 'type' => 'wajib', 'is_signature' => false],

            // Semester 7
            ['code' => 'BZK4AAC4', 'name_id' => 'Capstone Design and Project', 'name_en' => 'Capstone Design and Project', 'sks' => 4, 'semester' => 7, 'type' => 'wajib', 'is_signature' => true],
            ['code' => 'BZK4CAB2', 'name_id' => 'Kerja Praktek dan Pengabdian Masyarakat', 'name_en' => 'Work Practice and Community Service', 'sks' => 2, 'semester' => 7, 'type' => 'wajib', 'is_signature' => false],
            ['code' => 'BCK4IAB2', 'name_id' => 'Penyusunan Proposal Ilmiah', 'name_en' => 'Scientific Proposal Preparation', 'sks' => 2, 'semester' => 7, 'type' => 'wajib', 'is_signature' => false],

            // Electives offered in Semester 7
            ['code' => 'BCK4DBB3', 'name_id' => 'Logistik Lean Six Sigma', 'name_en' => 'Lean Six Sigma Logistics', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4EBB3', 'name_id' => 'Logistik Perkotaan', 'name_en' => 'Urban Logistics', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4FBB3', 'name_id' => 'Logistik Produksi', 'name_en' => 'Production Logistics', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4GBB3', 'name_id' => 'Logistik Reverse', 'name_en' => 'Reverse Logistics', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4HBB3', 'name_id' => 'Optimasi Logistik Berbasis Metode Heuristik', 'name_en' => 'Heuristic-Based Logistics Optimization', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4JBB3', 'name_id' => 'Simulasi Berbasis Agen', 'name_en' => 'Agent-Based Simulation', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4KBB3', 'name_id' => 'Sistem Logistik Berbasis Blockchain', 'name_en' => 'Blockchain-Based Logistics System', 'sks' => 3, 'semester' => 7, 'type' => 'pilihan', 'is_signature' => false],

            // Semester 8
            ['code' => 'BZK4BAA4', 'name_id' => 'Tugas Akhir', 'name_en' => 'Final Project', 'sks' => 4, 'semester' => 8, 'type' => 'wajib', 'is_signature' => false],

            // Electives offered in Semester 8
            ['code' => 'BCK4LBB2', 'name_id' => 'Analisis Keputusan Multi Kriteria dalam Rantai Pasok', 'name_en' => 'Supply Chain Multi-Criteria Decision Analysis', 'sks' => 2, 'semester' => 8, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4MBB3', 'name_id' => 'Analitik Data Besar', 'name_en' => 'Big Data Analytics', 'sks' => 3, 'semester' => 8, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4NBB3', 'name_id' => 'Sistem Logistik Berkelanjutan', 'name_en' => 'Sustainable Logistics System', 'sks' => 3, 'semester' => 8, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4OBB3', 'name_id' => 'Sistem Persediaan Lanjut', 'name_en' => 'Advanced Inventory System', 'sks' => 3, 'semester' => 8, 'type' => 'pilihan', 'is_signature' => false],
            ['code' => 'BCK4PBB2', 'name_id' => 'Visualisasi Data Logistik', 'name_en' => 'Logistics Data Visualization', 'sks' => 2, 'semester' => 8, 'type' => 'pilihan', 'is_signature' => false],
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
                'body_id' => 'Mahasiswa Teknik Logistik melakukan kunjungan langsung ke pusat distribusi PT HAVI Logistics untuk memahami penerapan sistem cold chain logistics secara real-time.',
                'body_en' => 'Logistics Engineering students conducted a direct site visit to PT HAVI Logistics distribution center to study real-time cold chain logistics applications.',
                'type' => 'visit',
                'date' => '2026-03-12',
                'location' => 'Bekasi, Jawa Barat',
                'cover' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Workshop ASEAN Logistics Business Readiness',
                'title_en' => 'ASEAN Logistics Business Readiness Workshop',
                'slug' => 'workshop-asean-logistics-business-readiness',
                'body_id' => 'Workshop interaktif membahas kesiapan bisnis logistik di era integrasi ekonomi ASEAN, menghadirkan pembicara ahli dari Asosiasi Logistik Indonesia.',
                'body_en' => 'An interactive workshop discussing logistics business readiness in the ASEAN economic integration era, presenting expert speakers from the Indonesian Logistics Association.',
                'type' => 'workshop',
                'date' => '2026-04-02',
                'location' => 'Bandung, Gedung FRI',
                'cover' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kunjungan PT Pertamina RU V Balikpapan',
                'title_en' => 'Visit to PT Pertamina RU V Balikpapan',
                'slug' => 'kunjungan-pertamina-ru-v-balikpapan',
                'body_id' => 'Studi lapangan mengenai manajemen distribusi energi nasional dan sistem keselamatan kerja di kilang minyak RU V Balikpapan.',
                'body_en' => 'A field study on national energy distribution management and occupational safety systems at the RU V Balikpapan oil refinery.',
                'type' => 'visit',
                'date' => '2026-04-21',
                'location' => 'Balikpapan, Kalimantan Timur',
                'cover' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kunjungan PT Garuda Food',
                'title_en' => 'Visit to PT Garuda Food',
                'slug' => 'kunjungan-garuda-food',
                'body_id' => 'Melihat langsung proses otomatisasi pergudangan FMCG dan sistem informasi rantai pasok terintegrasi dari hulu ke hilir.',
                'body_en' => 'Observing directly the FMCG warehousing automation process and integrated supply chain information systems from upstream to downstream.',
                'type' => 'visit',
                'date' => '2026-05-15',
                'location' => 'Sumedang, Jawa Barat',
                'cover' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kuliah Umum Green Logistics & Sustainability',
                'title_en' => 'Public Lecture on Green Logistics & Sustainability',
                'slug' => 'kuliah-umum-green-logistics',
                'body_id' => 'Kuliah umum yang membahas strategi pengurangan jejak karbon di sektor transportasi logistik dan implementasi armada ramah lingkungan.',
                'body_en' => 'A public lecture highlighting carbon footprint reduction strategies in logistics transportation and green fleet implementation.',
                'type' => 'lecture',
                'date' => '2026-06-10',
                'location' => 'Virtual Zoom Meeting',
                'cover' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Workshop Warehouse Automation with IoT',
                'title_en' => 'Workshop on Warehouse Automation with IoT',
                'slug' => 'workshop-warehouse-automation-iot',
                'body_id' => 'Pelatihan praktis pemrograman mikrokontroler dan sensor RFID untuk pelacakan aset gudang secara digital bagi mahasiswa tingkat akhir.',
                'body_en' => 'Practical training on microcontroller programming and RFID sensors for digital asset tracking in warehouses for senior students.',
                'type' => 'workshop',
                'date' => '2026-07-05',
                'location' => 'Lab Otomasi Gudang',
                'cover' => 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kunjungan PT Pos Indonesia Logistics Hub',
                'title_en' => 'Visit to PT Pos Indonesia Logistics Hub',
                'slug' => 'kunjungan-pos-indonesia-logistics-hub',
                'body_id' => 'Mempelajari sistem penyortiran paket otomatis (automatic sorting) dan manajemen kurir terintegrasi di pusat logistik nasional Pos Indonesia.',
                'body_en' => 'Studying automatic parcel sorting systems and integrated courier management at Pos Indonesia national logistics hub.',
                'type' => 'visit',
                'date' => '2026-08-18',
                'location' => 'Jakarta Timur, DKI Jakarta',
                'cover' => 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kuliah Umum Global Supply Chain Dynamics',
                'title_en' => 'Public Lecture on Global Supply Chain Dynamics',
                'slug' => 'kuliah-umum-global-supply-chain',
                'body_id' => 'Kuliah umum oleh dosen tamu dari National University of Singapore (NUS) mengenai disrupsi rute perdagangan maritim global.',
                'body_en' => 'Public lecture by a guest lecturer from NUS regarding global maritime trade route disruptions.',
                'type' => 'lecture',
                'date' => '2026-09-02',
                'location' => 'Gedung Selaru Lt. 4',
                'cover' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Workshop Simulation Modeling using Arena',
                'title_en' => 'Workshop on Simulation Modeling using Arena',
                'slug' => 'workshop-simulation-modeling-arena',
                'body_id' => 'Pelatihan pemodelan simulasi antrean truk pelabuhan dan bottleneck operasional menggunakan software Arena.',
                'body_en' => 'Simulation modeling training for port truck queues and operational bottlenecks using Arena software.',
                'type' => 'workshop',
                'date' => '2026-10-15',
                'location' => 'Lab Simulasi Rantai Pasok',
                'cover' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kunjungan Industri Cikarang Dry Port',
                'title_en' => 'Industry Visit to Cikarang Dry Port',
                'slug' => 'kunjungan-cikarang-dry-port',
                'body_id' => 'Studi lapangan mengenai proses kepabeanan (customs clearance) dan integrasi moda transportasi kereta-truk di Cikarang Dry Port.',
                'body_en' => 'Field study on customs clearance processes and rail-to-truck multi-modal transport integration at Cikarang Dry Port.',
                'type' => 'visit',
                'date' => '2026-11-10',
                'location' => 'Cikarang, Bekasi',
                'cover' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Workshop Digital Freight Forwarding',
                'title_en' => 'Workshop on Digital Freight Forwarding',
                'slug' => 'workshop-digital-freight-forwarding',
                'body_id' => 'Pengenalan sistem pemesanan kontainer dan manajemen dokumen ekspor-impor digital bagi pelaku bisnis logistik muda.',
                'body_en' => 'Introduction to container booking systems and digital export-import document management for young logistics business players.',
                'type' => 'workshop',
                'date' => '2026-12-05',
                'location' => 'Bandung, Aula FRI',
                'cover' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
            ],
            [
                'title_id' => 'Kuliah Umum Supply Chain Risk Management',
                'title_en' => 'Public Lecture on Supply Chain Risk Management',
                'slug' => 'kuliah-umum-supply-chain-risk',
                'body_id' => 'Menganalisis ketangguhan rantai pasok dalam menghadapi bencana alam dan fluktuasi harga komoditas global.',
                'body_en' => 'Analyzing supply chain resilience in facing natural disasters and global commodity price fluctuations.',
                'type' => 'lecture',
                'date' => '2027-01-14',
                'location' => 'Virtual Zoom Meeting',
                'cover' => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop',
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
                'excerpt_id' => 'Penerimaan mahasiswa baru program studi S1 Teknik Logistik Telkom University jalur rapor dan ujian tulis resmi dibuka.',
                'excerpt_en' => 'New student registration for the S1 Logistics Engineering program at Telkom University via report card and written test is officially open.',
                'body_id' => 'Pendaftaran mahasiswa baru Universitas Telkom tahun ajaran 2026/2027 kini telah dibuka secara resmi. Program Studi S1 Teknik Logistik dengan kurikulum berorientasi e-logistik siap mendidik generasi profesional rantai pasok masa depan. Jalur pendaftaran yang tersedia meliputi Jalur Prestasi Akademik (Rapor), Ujian Tulis, dan Beasiswa Keagamaan.',
                'body_en' => 'Telkom University new student admissions for the 2026/2027 academic year have officially opened. The S1 Logistics Engineering program with its e-logistics oriented curriculum is ready to train the next generation of supply chain professionals. Registration pathways include the Academic Achievement Pathway (Report Card), Written Test, and Religious Scholarships.',
                'category' => 'Pengumuman',
                'featured_image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['target_audience' => 'Siswa SMA/SMK/MA sederajat', 'deadline' => '2026-08-31'],
            ],
            [
                'title_id' => 'Seminar Nasional Rantai Pasok Digital 2026',
                'title_en' => 'National Seminar on Digital Supply Chains 2026',
                'slug' => 'seminar-nasional-rantai-pasok-digital-2026',
                'excerpt_id' => 'Seminar nasional membahas integrasi teknologi blockchain, IoT, dan AI dalam transformasi logistik nasional.',
                'excerpt_en' => 'National seminar discussing blockchain, IoT, and AI integration in national logistics transformation.',
                'body_id' => 'Mengangkat tema transformasi logistik digital terintegrasi, seminar nasional yang diselenggarakan Himpunan Mahasiswa Teknik Logistik berhasil mendatangkan 500+ peserta. Pemateri dari Kemenhub, BUMN Logistik, dan akademisi mendiskusikan integrasi blockchain, sensor pintar IoT, dan kecerdasan buatan (AI) di sektor logistik Indonesia.',
                'body_en' => 'Focusing on integrated digital logistics transformation, the national seminar organized by the Logistics Engineering Student Association successfully attracted 500+ participants. Speakers from the Ministry of Transportation, Logistics SOEs, and academics discussed the integration of blockchain, IoT smart sensors, and artificial intelligence (AI) in Indonesia\'s logistics sector.',
                'category' => 'Kegiatan / Event',
                'featured_image' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['event_type' => 'Seminar & Talkshow', 'location' => 'Gedung Damar Auditorium', 'speaker' => 'Dr. Ir. Budi Karya, M.T.'],
            ],
            [
                'title_id' => 'Update Kurikulum 145 SKS Terintegrasi Sertifikasi',
                'title_en' => '145-Credit Curriculum Update Integrated with Certification',
                'slug' => 'update-kurikulum-145-sks-sertifikasi',
                'excerpt_id' => 'Struktur kurikulum baru mempercepat masa kelulusan dan terintegrasi dengan sertifikasi profesi logistik internasional.',
                'excerpt_en' => 'The new curriculum structure accelerates graduation and integrates with international logistics professional certifications.',
                'body_id' => 'Program studi menyempurnakan kurikulum 145 SKS untuk memperkuat kompetensi e-logistik mahasiswa. Kurikulum ini didesain agar mahasiswa dapat lulus dalam waktu 3.5 tahun hingga 4 tahun, dengan mata kuliah yang selaras dengan sertifikasi profesi SAP, Supply Chain Professional, dan keahlian pergudangan bersertifikat BNSP.',
                'body_en' => 'The study program has refined the 145-credit curriculum to strengthen student competencies in e-logistics. This curriculum is designed for graduation in 3.5 to 4 years, aligning courses with professional certifications from SAP, Certified Supply Chain Professional, and BNSP warehousing competencies.',
                'category' => 'Akademik',
                'featured_image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['semester' => 'Ganjil 2026/2027', 'academic_year' => '2026/2027'],
            ],
            [
                'title_id' => 'Kunjungan Industri ke Cikarang Dry Port 2026',
                'title_en' => 'Industry Visit to Cikarang Dry Port 2026',
                'slug' => 'kunjungan-industri-cikarang-dry-port-2026',
                'excerpt_id' => 'Mahasiswa Teknik Logistik angkatan 2024 mengunjungi Cikarang Dry Port untuk mempelajari proses integrasi moda kereta-truk.',
                'excerpt_en' => 'Logistics Engineering students of 2024 visited Cikarang Dry Port to study rail-to-truck multi-modal integration.',
                'body_id' => 'Sebanyak 80 mahasiswa aktif berpartisipasi dalam kunjungan ke Cikarang Dry Port. Mahasiswa mempelajari secara langsung tata cara ekspor-impor kontainer, pergudangan bea cukai, serta sistem operasional dry port pertama di Indonesia yang menghubungkan pelabuhan Tanjung Priok dengan jaringan rel kereta api.',
                'body_en' => 'A total of 80 active students participated in the visit to Cikarang Dry Port. Students studied container export-import procedures, customs bonded warehousing, and the operational system of the first dry port in Indonesia connecting Tanjung Priok port with the national rail network.',
                'category' => 'Kunjungan Industri',
                'featured_image' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['company_name' => 'PT Cikarang Dry Port', 'location' => 'Cikarang, Bekasi', 'participant_count' => '80 Mahasiswa'],
            ],
            [
                'title_id' => 'Mahasiswa TL Raih Juara 1 Nasional Logistics Case Competition',
                'title_en' => 'TL Students Win 1st Place at National Logistics Case Competition',
                'slug' => 'juara-1-nasional-logistics-case-competition',
                'excerpt_id' => 'Tim Nawasena dari Teknik Logistik Telkom University menyabet juara pertama dalam pemecahan kasus rantai pasok industri ritel.',
                'excerpt_en' => 'Team Nawasena from Logistics Engineering Telkom University clinched first place in solving a retail industry supply chain case.',
                'body_id' => 'Prestasi membanggakan diukir oleh Tim Nawasena yang beranggotakan tiga mahasiswa Teknik Logistik angkatan 2023. Mereka mengalahkan 45 tim universitas ternama se-Indonesia dalam ajang National Logistics Case Competition dengan membawakan usulan solusi minimasi ongkos kirim berbasis algoritma routing dinamis.',
                'body_en' => 'An outstanding achievement was recorded by Team Nawasena, consisting of three Logistics Engineering students from the 2023 cohort. They defeated 45 teams from top universities across Indonesia in the National Logistics Case Competition by proposing a delivery cost minimization solution based on dynamic routing algorithms.',
                'category' => 'Prestasi Mahasiswa',
                'featured_image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['team_name' => 'Tim Nawasena', 'competition' => 'National Logistics Case Competition 2026', 'rank' => 'Juara 1'],
            ],
            [
                'title_id' => 'Riset Smart Warehouse Kolaborasi Industri Lolos Pendanaan Hibah',
                'title_en' => 'Collaborative Smart Warehouse Research Wins Grant Funding',
                'slug' => 'riset-smart-warehouse-pendanaan-hibah',
                'excerpt_id' => 'Proyek riset otomasi gudang berbasis AGV dan sensor berat IoT lolos pendanaan program hibah penelitian Dikti 2026.',
                'excerpt_en' => 'The AGV and IoT scale-based warehouse automation research project won research grant funding from Dikti 2026.',
                'body_id' => 'Tim Dosen Peneliti Teknik Logistik yang dipimpin oleh Dr. Akbar berhasil memenangkan pendanaan hibah nasional. Riset ini mengembangkan purwarupa Automated Guided Vehicle (AGV) berbiaya rendah dan sensor berat IoT terintegrasi untuk mengotomatiskan pencatatan stok barang di gudang UMKM lokal guna menghindari kehilangan aset.',
                'body_en' => 'A team of Logistics Engineering Research Lecturers led by Dr. Akbar successfully won national grant funding. This research develops a low-cost Automated Guided Vehicle (AGV) prototype and integrated IoT weight sensors to automate stock recording in local MSME warehouses to avoid asset loss.',
                'category' => 'Riset & Penelitian',
                'featured_image' => 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['principal_investigator' => 'Dr. Akbar', 'funding_source' => 'DIKTI DRTPM 2026', 'grant_amount' => 'Rp 150,000,000'],
            ],
            [
                'title_id' => 'Pemberdayaan UMKM Sentra Rajutan Melalui Digitalisasi Logistik Gudang',
                'title_en' => 'Empowering Knitting MSMEs through Warehouse Logistics Digitization',
                'slug' => 'pemberdayaan-umkm-digitalisasi-logistik',
                'excerpt_id' => 'Dosen dan mahasiswa Teknik Logistik mengedukasi digitalisasi inventori gudang rajut di Binong Jati.',
                'excerpt_en' => 'Lecturers and students of Logistics Engineering educated knitting inventory warehouse digitization in Binong Jati.',
                'body_id' => 'Sebagai wujud pengabdian masyarakat, tim dosen Teknik Logistik menyelenggarakan lokakarya penggunaan sistem manajemen gudang berbasis web sederhana untuk para pengrajin rajut Binong Jati Bandung. Sistem ini membantu pencatatan benang dan pesanan secara akurat guna menekan keterlambatan pengiriman.',
                'body_en' => 'As a form of community service, the Logistics Engineering lecturer team organized a workshop on using a simple web-based warehouse management system for Binong Jati Bandung knitters. This system helps log yarn and orders accurately to minimize shipping delays.',
                'category' => 'Pengabdian Masyarakat',
                'featured_image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['location' => 'Binong Jati, Bandung', 'partner' => 'Koperasi Sentra Rujut Binong Jati', 'theme' => 'Digitalisasi Gudang UMKM'],
            ],
            [
                'title_id' => 'Himpunan Mahasiswa TL Sukses Selenggarakan Logistics Festival 2026',
                'title_en' => 'Logistics Student Association Hosts Logistics Festival 2026',
                'slug' => 'logistics-festival-2026-sukses',
                'excerpt_id' => 'Logfest 2026 dimeriahkan dengan kompetisi paper nasional, talkshow profesional rantai pasok, dan pameran teknologi.',
                'excerpt_en' => 'Logfest 2026 featured a national paper competition, supply chain professional talkshows, and a tech exhibition.',
                'body_id' => 'Ajang tahunan Logistics Festival (Logfest) kembali digelar dengan meriah oleh HMTL FRI Telkom University. Mengusung tema "Logistics in AI Era", kegiatan ini menghadirkan pembicara dari berbagai platform startup e-logistik nasional dan dimeriahkan oleh pameran inovasi purwarupa gudang pintar karya mahasiswa.',
                'body_en' => 'The annual Logistics Festival (Logfest) was successfully held by HMTL FRI Telkom University. Carrying the theme "Logistics in AI Era", this event featured speakers from various national e-logistics startups and was highlighted by a student-built smart warehouse prototype innovation exhibition.',
                'category' => 'Kemahasiswaan',
                'featured_image' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['organizer' => 'Himpunan Mahasiswa Teknik Logistik (HMTL)', 'activity_type' => 'Logistics Festival', 'participant_count' => '400+ Peserta'],
            ],
            [
                'title_id' => 'Kerjasama Internasional Baru dengan Chulalongkorn University Thailand',
                'title_en' => 'New International Partnership with Chulalongkorn University Thailand',
                'slug' => 'kerjasama-chulalongkorn-university-thailand',
                'excerpt_id' => 'MoU disepakati untuk program pertukaran mahasiswa, kolaborasi riset logistik perkotaan, dan join-lecture.',
                'excerpt_en' => 'MoU signed for student exchange programs, collaborative urban logistics research, and joint lectures.',
                'body_id' => 'Program Studi S1 Teknik Logistik menandatangani kerja sama strategis dengan Departemen Teknik Industri & Logistik Chulalongkorn University, Thailand. Kesepakatan ini membuka peluang bagi mahasiswa untuk melakukan program credit-transfer satu semester mulai tahun ajaran depan, serta kolaborasi riset tentang logistik perkotaan.',
                'body_en' => 'The S1 Logistics Engineering Program has signed a strategic partnership with the Department of Industrial Engineering & Logistics at Chulalongkorn University, Thailand. The agreement opens credit-transfer opportunities for students for one semester starting next academic year, alongside collaborative research on urban logistics.',
                'category' => 'Umum',
                'featured_image' => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['partner_name' => 'Chulalongkorn University', 'cooperation_scope' => 'Student Exchange & Research Collab'],
            ],
            [
                'title_id' => 'Pengumuman Jadwal Ujian Akhir Semester Genap 2025/2026',
                'title_en' => 'End of Semester Examination Schedule Announcement for Even 2025/2026',
                'slug' => 'jadwal-uas-genap-2025-2026',
                'excerpt_id' => 'Pelaksanaan UAS Genap dijadwalkan secara luring pada tanggal 22 Juni hingga 3 Juli 2026. Harap mahasiswa mempersiapkan administrasi.',
                'excerpt_en' => 'Even Semester Exam is scheduled offline from June 22 to July 3, 2026. Students are requested to prepare administration.',
                'body_id' => 'Diberitahukan kepada seluruh mahasiswa Program Studi Teknik Logistik bahwa Ujian Akhir Semester (UAS) Genap Tahun Ajaran 2025/2026 akan dilaksanakan secara luring/offline di ruang kelas Gedung FRI. Seluruh mahasiswa diwajibkan memenuhi syarat kehadiran minimal 75% untuk dapat mengikuti ujian.',
                'body_en' => 'All students of the Logistics Engineering Program are notified that the Even Semester Examination for Academic Year 2025/2026 will be held offline in FRI classroom buildings. All students are required to meet the minimum attendance threshold of 75% to take the exams.',
                'category' => 'Pengumuman',
                'featured_image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['target_audience' => 'Seluruh Mahasiswa Aktif', 'academic_year' => 'Genap 2025/2026', 'start_date' => '2026-06-22'],
            ],
            [
                'title_id' => 'Workshop Pengisian Portal Akademik Mahasiswa Baru Angkatan 2026',
                'title_en' => 'Academic Portal Setup Workshop for Freshmen Class of 2026',
                'slug' => 'workshop-portal-akademik-maba-2026',
                'excerpt_id' => 'Panduan pengisian kartu rencana studi digital (KRS) dan pengenalan dosen wali bagi mahasiswa baru.',
                'excerpt_en' => 'Guide to digital study plan (KRS) registration and advisor introduction for incoming freshmen.',
                'body_id' => 'Untuk menyambut mahasiswa baru angkatan 2026, fakultas menyelenggarakan workshop bimbingan akademik dan tata cara penyusunan kartu rencana studi (KRS) online melalui portal i-Gracias. Mahasiswa juga akan diperkenalkan dengan dosen wali masing-masing yang akan membimbing selama studi.',
                'body_en' => 'To welcome the freshmen class of 2026, the faculty is organizing an academic advising workshop and online study plan (KRS) setup tutorial via the i-Gracias portal. Students will also be introduced to their respective academic advisors.',
                'category' => 'Akademik',
                'featured_image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['semester' => 'Semester 1', 'target_audiens' => 'Mahasiswa Baru 2026', 'location' => 'FRI Lab Komputer 3'],
            ],
            [
                'title_id' => 'Penelitian Kolaboratif Industri Bidang Cold Chain Logistics dengan BUMN',
                'title_en' => 'Collaborative Cold Chain Logistics Research with SOEs',
                'slug' => 'penelitian-kolaboratif-cold-chain-logistics-bumn',
                'excerpt_id' => 'Riset bersama mengembangkan algoritma pemantauan suhu kontainer pangan dan obat secara nirkabel selama transportasi laut.',
                'excerpt_en' => 'Joint research developing temperature monitoring algorithms for food and medicine containers during sea transit.',
                'body_id' => 'Teknik Logistik bekerja sama dengan salah satu BUMN logistik laut mengembangkan sistem sensor suhu kontainer yang terhubung ke satelit. Kolaborasi ini bertujuan untuk memastikan kualitas komoditas pangan dan obat-obatan tetap terjaga selama proses distribusi antarpulau di Indonesia.',
                'body_en' => 'Logistics Engineering is cooperating with a maritime logistics SOE to develop container temperature sensor networks connected to satellites. This collaboration aims to ensure food and pharmaceutical product quality is preserved during inter-island distribution in Indonesia.',
                'category' => 'Riset & Penelitian',
                'featured_image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
                'metadata' => ['principal_investigator' => 'Rian Pradana, M.T.', 'funding_source' => 'Sinergi Penelitian BUMN', 'year' => '2026'],
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
            ['title_id' => 'Juara 1 Lomba Karya Tulis Ilmiah Logistik Nasional', 'title_en' => '1st Place, National Logistics Paper Competition', 'level' => 'national', 'date' => '2025-09-10', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Finalis ASEAN Supply Chain Case Competition', 'title_en' => 'Finalist, ASEAN Supply Chain Case Competition', 'level' => 'international', 'date' => '2025-11-05', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Juara 2 Hackathon Logistik Digital Indonesia', 'title_en' => '2nd Place, Indonesia Digital Logistics Hackathon', 'level' => 'national', 'date' => '2026-01-20', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Best Paper Award - Seminar Rantai Pasok ASEAN', 'title_en' => 'Best Paper Award - ASEAN Supply Chain Seminar', 'level' => 'international', 'date' => '2026-02-14', 'holder' => 'Dosen Teknik Logistik'],
            ['title_id' => 'Delegasi Studi Banding Logistik ASEAN ke Singapura', 'title_en' => 'Singapore ASEAN Logistics Study Visit Delegate', 'level' => 'international', 'date' => '2026-03-18', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Juara 3 Kompetisi Rancang Gudang Otomatis Nasional', 'title_en' => '3rd Place, Automated Warehouse Design Competition', 'level' => 'national', 'date' => '2026-05-02', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Juara 1 Indonesia Supply Chain Innovation Challenge', 'title_en' => '1st Place, Indonesia Supply Chain Innovation Challenge', 'level' => 'national', 'date' => '2026-05-25', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Gold Medal - International Invention and Innovation Exhibition (ITEX)', 'title_en' => 'Gold Medal - International Invention & Innovation Exhibition (ITEX)', 'level' => 'international', 'date' => '2026-06-02', 'holder' => 'Tim Dosen & Mahasiswa'],
            ['title_id' => 'Juara 2 National Warehouse Optimization Design Competition', 'title_en' => '2nd Place, National Warehouse Optimization Design Competition', 'level' => 'national', 'date' => '2026-06-15', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Best Presenter - Global Conference on Logistics and SCM Tokyo', 'title_en' => 'Best Presenter - Global Conference on Logistics and SCM Tokyo', 'level' => 'international', 'date' => '2026-06-20', 'holder' => 'Dosen Teknik Logistik'],
            ['title_id' => 'Juara 3 Paper Competition Logistics Student Union', 'title_en' => '3rd Place, Paper Competition Logistics Student Union', 'level' => 'national', 'date' => '2026-06-22', 'holder' => 'Mahasiswa Teknik Logistik'],
            ['title_id' => 'Juara 1 Business Plan Competition SCM Category', 'title_en' => '1st Place, Business Plan Competition SCM Category', 'level' => 'national', 'date' => '2026-06-24', 'holder' => 'Mahasiswa Teknik Logistik'],
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
            ['name' => 'Laboratorium E-Logistik', 'focus' => 'Digital Supply Chain', 'description_id' => 'Berfokus pada pengembangan sistem manajemen rantai pasok elektronik, sistem informasi logistik, e-procurement, dan e-marketplace logistik.', 'description_en' => 'Focuses on electronic supply chain management, logistics information systems, e-procurement, and logistics e-marketplaces.', 'photo' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Simulasi Rantai Pasok', 'focus' => 'Logistics Analytics', 'description_id' => 'Fasilitas simulasi antrean, pemodelan sistem dinamik, dan optimasi jaringan distribusi skala besar menggunakan software mutakhir.', 'description_en' => 'Simulation facilities for queueing, system dynamics modeling, and large-scale distribution network optimization using modern software.', 'photo' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Sistem Informasi Logistik', 'focus' => 'Logistics Analytics', 'description_id' => 'Melatih mahasiswa merancang basis data logistik, ERP, sistem penjejakan (tracking), dan integrasi API layanan logistik.', 'description_en' => 'Trains students to design logistics databases, ERP, tracking systems, and API integrations with logistics services.', 'photo' => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Otomasi Gudang', 'focus' => 'Automation & Systems', 'description_id' => 'Eksperimen robotika pergudangan (AGV), internet of things (IoT) sensor berat, barcode scanner otomatis, dan sistem konveyor.', 'description_en' => 'Experiments in warehouse robotics (AGV), weight-sensing IoT, automatic barcode scanners, and conveyor belt systems.', 'photo' => 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Transportasi & Distribusi', 'focus' => 'Digital Supply Chain', 'description_id' => 'Mengkaji manajemen armada, konsolidasi barang, perencanaan rute dinamis, penentuan tarif, dan logistik maritim.', 'description_en' => 'Studies fleet management, cargo consolidation, dynamic routing, tariff determination, and maritime logistics.', 'photo' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Optimasi & Riset Operasional', 'focus' => 'Logistics Analytics', 'description_id' => 'Penyelesaian masalah penugasan, pemograman linier, program integer, dan optimasi non-linier untuk rantai pasok.', 'description_en' => 'Solving assignment problems, linear programming, integer programming, and non-linear optimization for supply chains.', 'photo' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Rantai Pasok Halal', 'focus' => 'Automation & Systems', 'description_id' => 'Mempelajari prinsip logistik syariah, ketertelusuran produk halal, kepatuhan audit halal, serta jaminan sanitasi gudang.', 'description_en' => 'Studies sharia logistics principles, halal product traceability, halal audit compliance, and warehouse sanitation assurance.', 'photo' => 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Logistik Kemanusiaan', 'focus' => 'Digital Supply Chain', 'description_id' => 'Pengembangan model distribusi bantuan bencana, evakuasi, penempatan posko, dan rantai pasok respons darurat.', 'description_en' => 'Development of disaster aid distribution models, evacuations, shelter positioning, and emergency response supply chains.', 'photo' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Manajemen Inventori', 'focus' => 'Logistics Analytics', 'description_id' => 'Pengujian metode perkiraan permintaan (forecasting), EOQ, safety stock, reorder point, dan manajemen SKU kompleks.', 'description_en' => 'Testing demand forecasting methods, EOQ, safety stock, reorder points, and complex SKU management.', 'photo' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop'],
            ['name' => 'Laboratorium Rantai Pasok Berkelanjutan', 'focus' => 'Automation & Systems', 'description_id' => 'Riset logistik balik (reverse logistics), daur ulang material, sirkular ekonomi, dan optimalisasi pengemasan ramah lingkungan.', 'description_en' => 'Research in reverse logistics, material recycling, circular economy, and eco-friendly packaging optimization.', 'photo' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'],
        ];

        foreach ($rows as $i => $row) {
            Lab::updateOrCreate(['name' => $row['name']], $row + ['order' => $i + 1]);
        }
    }

    private function seedPartners(): void
    {
        // Clear existing partners first to avoid stale data
        Partner::query()->delete();

        $rows = [
            ['name' => 'LSP-LI',                              'logo' => '/images/partners/lspli.png',                  'url' => 'https://lsp-lingkunganindonesia.com/',              'description' => 'Penyelenggaraan Sertifikasi Warehouse Supervisor'],
            ['name' => 'Asosiasi Logistik Indonesia (ALI)',   'logo' => '/images/partners/ali.jpg',                    'url' => 'https://asosiasilogistikindonesia.or.id/',          'description' => 'Penyelenggaraan Sertifikasi European Senior Logistician'],
            ['name' => 'Ninja Express',                       'logo' => '/images/partners/ninjaexpress.png',           'url' => 'https://www.ninjaxpress.co/id-id',                  'description' => 'Program Logistics Talk Series: Achieving Success Various Job Fields Experienced'],
            ['name' => 'PT Star Karlo Indonesia',             'logo' => '/images/partners/karlo.png',                  'url' => 'https://www.karlo.id/',                             'description' => 'Program Magang, Kuliah Umum, dan Review Lab'],
            ['name' => 'Truku',                               'logo' => '/images/partners/truku.png',                  'url' => 'https://truku.id/',                                 'description' => 'Program Sharing from the Expert "Improving Road Safety for Better Logistics in Indonesia"'],
            ['name' => 'Phillips Seafood',                    'logo' => null,                                          'url' => null,                                                'description' => 'Program Logistics Talk Series Vol. 7 How to Manage your Material Flow: Inbound, Internal, and Outbound Logistics'],
            ['name' => 'PT Eroco Petronesia (BMW Group)',     'logo' => null,                                          'url' => 'https://www.erocopetronesia.com/',                  'description' => 'Program Magang Mahasiswa'],
            ['name' => 'Bababos',                             'logo' => '/images/partners/bababos.png',                'url' => 'https://www.bababos.com/',                          'description' => 'Kuliah Umum Vol.1 "Organizational Transformation in the Logistics Industry in the Era of Industry 4.0"'],
            ['name' => 'PT Pertamina Hulu Indonesia',         'logo' => '/images/partners/pertamina-hulu.png',         'url' => 'https://phi.pertamina.com/',                        'description' => 'Program Logistics Talk Series: Peranan Market Intelligence & Assessment untuk Proses Pengadaan yang Efektif dan Efisien'],
            ['name' => 'PT Sumber Alfaria Trijaya',           'logo' => '/images/partners/alfamart.png',               'url' => 'https://www.alfamart.co.id/',                       'description' => 'Program Magang Mahasiswa'],
            ['name' => 'PT Industri Susu Alam Murni',         'logo' => '/images/partners/susu-alam-murni.png',        'url' => 'https://isam.co.id/id/',                            'description' => 'Program Magang'],
            ['name' => 'Scomi Oil Tools',                     'logo' => '/images/partners/logoFinalScomi.png',         'url' => 'https://scomigroup.com.my/oilfield-2/',             'description' => 'Program Magang'],
            ['name' => 'Garuda Indonesia',                    'logo' => '/images/partners/garuda-indonesia.jpg',       'url' => 'https://www.garuda-indonesia.com/id/id/',           'description' => 'Program Magang Mahasiswa'],
            ['name' => 'Adorable Project',                    'logo' => '/images/partners/adorable-project.jpg',       'url' => 'https://adorableprojects.store/',                   'description' => 'Program Magang dan Kuliah Umum'],
            ['name' => 'PT Krakatau Jasa Logistik',           'logo' => '/images/partners/kraktau-jasa-logistik.png', 'url' => 'https://krakataujasalogistik.co.id/',               'description' => 'Program Magang'],
            ['name' => 'PT Samudera Agencies Indonesia',      'logo' => '/images/partners/samudera-indonesia.png',    'url' => 'https://www.samudera.id/sai',                       'description' => 'Program Magang Mahasiswa'],
            ['name' => 'PT BGR Logistik Indonesia',           'logo' => '/images/partners/bgr-logistik.png',          'url' => 'https://www.bgrlogistik.id/id',                     'description' => 'Program Magang'],
            ['name' => 'PT Cipta Krida Bahari',               'logo' => '/images/partners/cipta-krida-bahari.png',    'url' => 'https://www.ckb.co.id/',                            'description' => 'Program Magang Mahasiswa'],
            ['name' => 'ISCEA',                               'logo' => '/images/partners/iscea.jpg',                 'url' => 'https://www.iscea.org/',                            'description' => 'Program Logistics Talk Series x ISCEA: Empowering Growth: Global Supply Chain Strategies & Career Elevation with ISCEA'],
            ['name' => 'Zhoukou Vocational and Technical College', 'logo' => '/images/partners/zkvtc.png',            'url' => 'https://www.zkvtc.edu.cn/',                         'description' => 'Pelatihan Smart Warehouse dan Distribution Operation'],
            ['name' => 'PT Els Hayati Teknologi',             'logo' => '/images/partners/els-hayati-companieshouse.png', 'url' => 'https://companieshouse.id/els-hayati-teknologi', 'description' => 'Program Magang Mahasiswa'],
            ['name' => 'PKT Logistics Group',                 'logo' => null,                                          'url' => null,                                                'description' => "Program 'Logistics Industry Competency Certification Course'"],
            ['name' => 'Orang Tua Group',                     'logo' => '/images/partners/ot-orangtua',               'url' => 'https://www.ot.id/',                                'description' => 'Program Logistics Talk Series: Hard and Soft Skill Competencies in Logistics Industry: HR Perspectives'],
            ['name' => 'Plastic Industries Sdn. Bhd.',        'logo' => '/images/partners/plastics-industry.png',     'url' => 'https://www.jimzhengplastic.com/',                  'description' => 'Program Logistics Talk Series: Catch Your Dream: Study and Build a Career in Logistics Field Abroad'],
            ['name' => 'Infia Group',                         'logo' => '/images/partners/infia',                     'url' => 'https://infiacorp.com/',                            'description' => 'Program Logistics Talk Series: Peluang dan Prospek kerja Teknik Logistik "Logistics: Today, Tomorrow, the Future"'],
            ['name' => 'PT Amman Mineral Nusa Tenggara',      'logo' => '/images/partners/amman.png',                 'url' => 'https://www.amman.co.id/',                          'description' => 'Program Logistics Talk Series: Measuring Port Capacity as a Baseline for Effective Maritime Logistics'],
            ['name' => 'Segari',                              'logo' => null,                                          'url' => null,                                                'description' => 'Program Logistics Talk Series: Streamlining Procurement and Warehouse Synergy: Turning Pain Points into Strategic Advantage'],
            ['name' => 'Softskills Academy',                  'logo' => null,                                          'url' => null,                                                'description' => 'Program Logistics Talk Series: Mind in Balance: Mengubah Stres Jadi Kekuatan'],
            ['name' => 'PLN',                                 'logo' => null,                                          'url' => null,                                                'description' => 'Program Logistics Talk Series: How To Manage Your Material Flow: Inbound, Internal and Outbond Logistics Activities'],
            ['name' => 'PT Krakatau Bandar Samudera',         'logo' => null,                                          'url' => null,                                                'description' => 'Perancangan Penjadwalan Truck'],
        ];

        foreach ($rows as $i => $row) {
            Partner::create($row + ['type' => 'industry', 'order' => $i + 1]);
        }
    }

    private function seedResearches(): void
    {
        $rows = [
            [
                'title_id' => 'Optimasi Rantai Pasok Digital untuk UMKM Sektor Pangan',
                'title_en' => 'Digital Supply Chain Optimization for Food Sector MSMEs',
                'category' => 'Digital Logistics',
                'year' => 2025,
                'description_id' => 'Penelitian ini mengembangkan model integrasi rantai pasok digital untuk membantu UMKM makanan mengelola persediaan secara real-time menggunakan platform mobile. Hasil penelitian menunjukkan penurunan biaya logistik hingga 18%.',
                'description_en' => 'This research develops a digital supply chain integration model to help food MSMEs manage inventory in real-time using a mobile platform. The results show a reduction in logistics costs by up to 18%.',
                'team' => 'Dr. Akbar, Rian Pradana, Tim Mahasiswa S1',
                'image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
                'order' => 1,
            ],
            [
                'title_id' => 'Penerapan Internet of Things (IoT) pada Warehouse Management System',
                'title_en' => 'Implementation of Internet of Things (IoT) in Warehouse Management Systems',
                'category' => 'Operations Research',
                'year' => 2026,
                'description_id' => 'Mengimplementasikan sensor RFID dan IoT untuk memantau pergerakan barang dan suhu ruang secara otomatis di dalam gudang penyimpanan modern. Model ini diujicobakan pada gudang logistik dingin.',
                'description_en' => 'Implementing RFID sensors and IoT to automatically monitor goods movement and ambient temperature in a modern warehouse. This model was trialed in a cold chain logistics facility.',
                'team' => 'Rian Pradana, Tim Lab Otomasi Gudang',
                'image' => 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600&auto=format&fit=crop',
                'order' => 2,
            ],
            [
                'title_id' => 'Model Rute Kendaraan Listrik untuk Distribusi Perkotaan Ramah Lingkungan',
                'title_en' => 'Electric Vehicle Routing Model for Green Urban Distribution',
                'category' => 'Digital Logistics',
                'year' => 2025,
                'description_id' => 'Mengembangkan model optimasi rute kendaraan listrik (EV) untuk kurir paket perkotaan dengan mempertimbangkan stasiun pengisian daya dan batasan kapasitas baterai guna mengurangi emisi.',
                'description_en' => 'Developing routing optimization models for electric vehicles (EV) in urban parcel delivery, considering charging stations and battery limits to reduce carbon emissions.',
                'team' => 'Dr. Ir. Wahyu Hidayat, Rian Pradana, M.T.',
                'image' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop',
                'order' => 3,
            ],
            [
                'title_id' => 'Desain Tata Letak Gudang Otomatis Menggunakan Algoritma Genetika',
                'title_en' => 'Automated Warehouse Layout Design Using Genetic Algorithm',
                'category' => 'Operations Research',
                'year' => 2026,
                'description_id' => 'Mendesain tata letak penempatan barang otomatis di rak gudang guna meminimalkan jarak tempuh robot pemindah barang (AMR) dan mempercepat waktu penyiapan pesanan.',
                'description_en' => 'Designing an automated item placement layout on warehouse shelves to minimize Autonomous Mobile Robot (AMR) travel distance and accelerate order picking times.',
                'team' => 'Tim Lab Otomasi Gudang, Dr. Akbar',
                'image' => 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600&auto=format&fit=crop',
                'order' => 4,
            ],
            [
                'title_id' => 'Mitigasi Risiko Rantai Pasok Dingin (Cold Chain) Produk Perikanan',
                'title_en' => 'Risk Mitigation in Fishery Products Cold Chain Supply Chain',
                'category' => 'Operations Research',
                'year' => 2025,
                'description_id' => 'Menggunakan pemodelan simulasi untuk meminimalkan risiko pembusukan ikan selama pengapalan antarpulau dengan menempatkan sensor pemantau suhu berbasis IoT.',
                'description_en' => 'Using simulation modeling to minimize fish spoilage risks during inter-island transit by deploying IoT temperature monitoring sensors.',
                'team' => 'Rian Pradana, Dosen SCM, Mahasiswa Asisten',
                'image' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop',
                'order' => 5,
            ],
            [
                'title_id' => 'Simulasi Kebijakan Inventori Multi-Eselon pada Ritel Modern',
                'title_en' => 'Multi-Echelon Inventory Policy Simulation in Modern Retail',
                'category' => 'Operations Research',
                'year' => 2025,
                'description_id' => 'Simulasi sistem persediaan barang dari pusat distribusi (DC) hingga ke puluhan gerai ritel guna mencegah penumpukan barang dan ketiadaan stok (stockout).',
                'description_en' => 'Simulating inventory systems from distribution centers (DC) to dozens of retail outlets to prevent inventory piles and stockouts.',
                'team' => 'Dr. Ir. Wahyu Hidayat, Tim Lab Simulasi',
                'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
                'order' => 6,
            ],
            [
                'title_id' => 'Penerapan Blockchain untuk Ketertelusuran Rantai Pasok Halal',
                'title_en' => 'Blockchain Implementation for Halal Supply Chain Traceability',
                'category' => 'Digital Logistics',
                'year' => 2026,
                'description_id' => 'Riset implementasi smart contract blockchain untuk memastikan keaslian status sertifikat halal bahan baku makanan dari peternakan hingga restoran.',
                'description_en' => 'Researching blockchain smart contract deployment to ensure the authenticity of raw food material halal certificates from farms to restaurants.',
                'team' => 'Dr. Akbar, Asisten Peneliti',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
                'order' => 7,
            ],
            [
                'title_id' => 'Analisis Efisiensi Terminal Petikemas Menggunakan Data Analytics',
                'title_en' => 'Container Terminal Efficiency Analysis Using Data Analytics',
                'category' => 'Operations Research',
                'year' => 2025,
                'description_id' => 'Mengolah big data pergerakan kapal dan alat bongkar muat untuk mengurangi dwelling time kontainer di pelabuhan laut besar.',
                'description_en' => 'Processing vessel movement and loading equipment big data to reduce container dwelling times at major seaports.',
                'team' => 'Dr. Ir. Wahyu Hidayat, Tim Riset Pelabuhan',
                'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
                'order' => 8,
            ],
            [
                'title_id' => 'Desain Jaringan Logistik Kemanusiaan untuk Penanggulangan Bencana',
                'title_en' => 'Humanitarian Logistics Network Design for Disaster Management',
                'category' => 'Operations Research',
                'year' => 2026,
                'description_id' => 'Pemodelan penempatan gudang logistik darurat bencana alam di Jawa Barat untuk mempercepat penyaluran bantuan makanan medis ke lokasi terdampak.',
                'description_en' => 'Modeling emergency disaster relief warehouse positioning in West Java to speed up food and medical aid dispatch to affected areas.',
                'team' => 'Rian Pradana, Tim Lab Kemanusiaan',
                'image' => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop',
                'order' => 9,
            ],
            [
                'title_id' => 'Optimasi Penjadwalan Truk pada Hub Konsolidasi Logistik',
                'title_en' => 'Truck Scheduling Optimization at Logistics Consolidation Hubs',
                'category' => 'Operations Research',
                'year' => 2026,
                'description_id' => 'Menggunakan pemodelan programa linear integer campuran untuk mengatur jadwal kedatangan dan keberangkatan truk kontainer di hub logistik kurir kilat.',
                'description_en' => 'Using mixed-integer linear programming to schedule container truck arrivals and departures at express courier logistics hubs.',
                'team' => 'Dr. Akbar, Dosen Matematika Industri',
                'image' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
                'order' => 10,
            ],
        ];

        foreach ($rows as $row) {
            Research::updateOrCreate(['title_id' => $row['title_id']], $row);
        }
    }

    private function seedCommunityServices(): void
    {
        $rows = [
            [
                'title_id' => 'Digitalisasi Logistik Gudang UMKM Sentra Rajutan Binong Jati',
                'title_en' => 'Logistics Digitization of MSME Warehouses in Binong Jati Knitting Center',
                'category' => 'Pendampingan',
                'year' => 2025,
                'location' => 'Bandung, Jawa Barat',
                'partners' => 'Koperasi Sentra Binong Jati',
                'description_id' => 'Pelatihan dan pendampingan implementasi sistem pencatatan persediaan digital bagi pelaku UMKM rajutan di daerah Binong Jati Bandung untuk mengurangi selisih stockopname.',
                'description_en' => 'Training and mentoring on digital inventory record-keeping systems for knitting MSMEs in Binong Jati Bandung to reduce stocktake discrepancies.',
                'team' => 'Dosen & Himpunan Mahasiswa Teknik Logistik',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
                'order' => 1,
            ],
            [
                'title_id' => 'Pendampingan Manajemen Inventori pada Koperasi Susu Lembang',
                'title_en' => 'Inventory Management Mentoring at Lembang Dairy Cooperative',
                'category' => 'Pelatihan',
                'year' => 2025,
                'location' => 'Lembang, Bandung Barat',
                'partners' => 'KPSBU Lembang',
                'description_id' => 'Mengajarkan teknik First-In First-Out (FIFO) dan penataan tata letak kulkas penyimpanan susu segar guna menjaga kualitas produk sebelum diantar ke industri pengolahan.',
                'description_en' => 'Teaching First-In First-Out (FIFO) techniques and layout setup of fresh milk storage fridges to maintain product quality before distribution to processing plants.',
                'team' => 'Rian Pradana, M.T. & Tim Dosen Pengabdi',
                'image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
                'order' => 2,
            ],
            [
                'title_id' => 'Pelatihan Standardisasi Pengemasan Produk Ekspor bagi Pengrajin Kulit Sukaregang',
                'title_en' => 'Export Packaging Standardization Training for Sukaregang Leather Artisans',
                'category' => 'Pelatihan',
                'year' => 2026,
                'location' => 'Garut, Jawa Barat',
                'partners' => 'Asosiasi Pengrajin Kulit Garut',
                'description_id' => 'Pelatihan metode pengemasan pelindung kelembapan tinggi untuk tas dan jaket kulit guna mencegah jamur selama proses pengapalan laut kontainer ekspor.',
                'description_en' => 'Mentoring on moisture-barrier packaging methods for leather bags and jackets to prevent mold growth during maritime export container shipping.',
                'team' => 'Dr. Ir. Wahyu Hidayat & Tim Mahasiswa',
                'image' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop',
                'order' => 3,
            ],
            [
                'title_id' => 'Edukasi Keselamatan Kerja dan Ergonomi Gudang UMKM Makanan Ringan',
                'title_en' => 'Occupational Safety and Warehouse Ergonomics Education for Snack MSMEs',
                'category' => 'Sosialisasi',
                'year' => 2025,
                'location' => 'Cimahi, Jawa Barat',
                'partners' => 'Paguyuban UMKM Cimahi',
                'description_id' => 'Memberikan edukasi postur tubuh yang benar saat mengangkat kardus barang berat dan tata letak rak aman untuk menghindari kecelakaan kerja karyawan gudang.',
                'description_en' => 'Providing education on correct body postures when lifting heavy boxes and safe shelf layout designs to prevent warehouse employee injuries.',
                'team' => 'Tim Dosen K3 Logistik',
                'image' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
                'order' => 4,
            ],
            [
                'title_id' => 'Penyusunan Rute Distribusi Efisien untuk Kelompok Tani Sayur Lembang',
                'title_en' => 'Efficient Distribution Routing Setup for Lembang Vegetable Farmer Group',
                'category' => 'Pendampingan',
                'year' => 2026,
                'location' => 'Lembang, Jawa Barat',
                'partners' => 'Kelompok Tani Sayur Mulya',
                'description_id' => 'Membantu penyusunan jadwal dan rute armada pick-up petani ke pasar induk Bandung guna mengurangi konsumsi bahan bakar dan menyegarkan produk.',
                'description_en' => 'Assisting farmers in scheduling and routing pickup trucks to Bandung wholesale markets to reduce fuel consumption and preserve product freshness.',
                'team' => 'Rian Pradana, M.T., Mahasiswa Asisten',
                'image' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop',
                'order' => 5,
            ],
            [
                'title_id' => 'Sosialisasi Sistem Rantai Dingin Sederhana bagi Pedagang Ikan Tradisional',
                'title_en' => 'Simple Cold Chain System Socialization for Traditional Fish Merchants',
                'category' => 'Sosialisasi',
                'year' => 2025,
                'location' => 'Pelabuhan Ratu, Sukabumi',
                'partners' => 'Himpunan Nelayan Seluruh Indonesia',
                'description_id' => 'Penyuluhan pentingnya es batu berkadar garam tertentu dan styrofoam box tertutup selama transportasi ikan hasil tangkapan menuju konsumen perkotaan.',
                'description_en' => 'Sensitizing merchants on the importance of salted ice cubes and sealed styrofoam boxes during fish transport from capture points to urban consumers.',
                'team' => 'Dr. Akbar & Tim Lab Cold Chain',
                'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop',
                'order' => 6,
            ],
            [
                'title_id' => 'Pelatihan Penggunaan E-Commerce untuk Pemasaran Produk Desa Wisata',
                'title_en' => 'E-Commerce Marketing Training for Tourism Village Products',
                'category' => 'Pelatihan',
                'year' => 2026,
                'location' => 'Ciwidey, Bandung',
                'partners' => 'Pokdarwis Desa Alam Ciwidey',
                'description_id' => 'Pelatihan cara mendaftar e-commerce, menghitung ongkos kirim otomatis, serta memilih kurir ekspedisi logistik yang andal bagi pengelola oleh-oleh desa wisata.',
                'description_en' => 'Training on e-commerce setup, automatic shipping rate calculations, and choosing reliable logistics couriers for local souvenir shops.',
                'team' => 'Dosen E-Logistik & Tim Pengabdi',
                'image' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
                'order' => 7,
            ],
            [
                'title_id' => 'Pendampingan Tata Letak Gudang Bahan Baku Industri Kerajinan Bambu',
                'title_en' => 'Raw Material Warehouse Layout Mentoring for Bamboo Craft Industry',
                'category' => 'Pendampingan',
                'year' => 2025,
                'location' => 'Tasikmalaya, Jawa Barat',
                'partners' => 'Koperasi Pengrajin Bambu Kreatif',
                'description_id' => 'Mendesain tata letak gudang bahan baku bambu dengan prinsip 5S (Seiri, Seiton, Seiso, Seiketsu, Shitsuke) untuk mempermudah pengambilan bambu sesuai ukuran.',
                'description_en' => 'Designing bamboo raw material warehouse layouts based on 5S principles to ease wood retrieval according to sizes.',
                'team' => 'Tim Dosen Rekayasa Sistem Kerja',
                'image' => 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600&auto=format&fit=crop',
                'order' => 8,
            ],
            [
                'title_id' => 'Edukasi Manajemen Logistik Bencana bagi Relawan Kebencanaan Lokal',
                'title_en' => 'Disaster Logistics Management Education for Local Volunteers',
                'category' => 'Sosialisasi',
                'year' => 2026,
                'location' => 'Cianjur, Jawa Barat',
                'partners' => 'BPBD Kabupaten Cianjur',
                'description_id' => 'Pelatihan pencatatan bantuan masuk, penyortiran tanggal kedaluwarsa makanan bantuan, dan penataan alur distribusi barang di posko utama bencana.',
                'description_en' => 'Training on incoming aid registration, expiration date sorting for food items, and warehouse flow management at main disaster posts.',
                'team' => 'Rian Pradana, M.T. & Tim Pengabdi Bencana',
                'image' => 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop',
                'order' => 9,
            ],
            [
                'title_id' => 'Digitalisasi Pencatatan Pengiriman Barang BUMDes dengan Aplikasi Android',
                'title_en' => 'Digitizing BUMDes Cargo Dispatch Logging with Android App',
                'category' => 'Pelatihan',
                'year' => 2026,
                'location' => 'Majalengka, Jawa Barat',
                'partners' => 'BUMDes Maju Bersama',
                'description_id' => 'Instalasi dan pelatihan aplikasi android pencatatan pengiriman hasil tani BUMDes guna memonitor status kurir dan waktu tempuh pengantaran.',
                'description_en' => 'Installation and training on an Android dispatch logging app for agricultural goods to track courier status and delivery durations.',
                'team' => 'Dosen & HMTL Telkom University',
                'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
                'order' => 10,
            ],
        ];

        foreach ($rows as $row) {
            CommunityService::updateOrCreate(['title_id' => $row['title_id']], $row);
        }
    }

    private function seedLecturers(): void
    {
        Lecturer::query()->delete();
        $rows = [
            [
                'name' => 'Dr. Femi Yulianti, S.Si., M.T., CPLM., ESLog.',
                'nidn' => '402078204',
                'nip' => '402078204',
                'functional_position' => 'Lektor',
                'position_id' => 'Ketua Program Studi (Kaprodi) S1 Teknik Logistik',
                'position_en' => 'Head of S1 Logistics Engineering Study Program',
                'bio_id' => 'Kepala Program Studi S1 Teknik Logistik Universitas Telkom. Memiliki sertifikasi CPLM dan ESLog, berfokus pada manajemen logistik, rantai pasok digital, dan optimalisasi sistem logistik.',
                'bio_en' => 'Head of the S1 Logistics Engineering Study Program at Telkom University. Holds CPLM and ESLog certifications, focusing on logistics management, digital supply chain, and logistics system optimization.',
                'expertise' => ['Logistics Management', 'Digital Supply Chain', 'Supply Chain Engineering'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Universitas Indonesia', 'year' => 2004],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2007],
                    ['degree' => 'S3', 'institution' => 'Institut Teknologi Bandung', 'year' => 2015],
                ],
                'teaching_history' => [
                    ['semester' => 'Ganjil 2025/2026', 'courses' => ['Pengantar Logistik & Rantai Pasok', 'Perencanaan Rantai Pasok']],
                ],
                'photo' => '/images/dosen/Femi Yulianti.png',
                'scholar_url' => 'https://scholar.google.com/citations?user=9EnYw10AAAAJ&hl=en&oi=ao',
                'sinta_url' => 'https://sinta.kemdiktisaintek.go.id/authors/profile/6727281',
                'scopus_url' => 'https://www.scopus.com/authid/detail.uri?authorId=57215416344',
                'scholar_id' => '9EnYw10AAAAJ',
                'sinta_id' => '6727281',
                'scopus_id' => '57215416344',
                'email' => 'femiyulianti@telkomuniversity.ac.id',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Putu Giri Artha Kusuma, S.T., M.T., CPLM., ESLog.',
                'nidn' => '402097401',
                'nip' => '402097401',
                'functional_position' => 'Lektor',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Pakar di bidang pemodelan sistem rantai pasok dan operasional logistik bersertifikasi CPLM dan ESLog.',
                'bio_en' => 'Expert in supply chain systems modeling and logistics operations certified with CPLM and ESLog.',
                'expertise' => ['Supply Chain Modeling', 'Operations Research', 'Logistics Operations'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Institut Teknologi Bandung', 'year' => 2002],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2005],
                    ['degree' => 'S3', 'institution' => 'Universitas Indonesia', 'year' => 2014],
                ],
                'teaching_history' => [
                    ['semester' => 'Genap 2025/2026', 'courses' => ['Sistem Persediaan', 'Riset Operasi 1']],
                ],
                'photo' => '/images/dosen/Putu Giri.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_putu_giri',
                'sinta_id' => 'sinta_putu_giri',
                'scopus_id' => 'scopus_putu_giri',
                'email' => 'putugiri@telkomuniversity.ac.id',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Erlangga Bayu Setyawan, S.T., M.T., ESLog',
                'nidn' => '429079301',
                'nip' => '429079301',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Kaur Layanan Akademik FRI / Dosen S1 Teknik Logistik',
                'position_en' => 'FRI Academic Services Coordinator / Faculty Member',
                'bio_id' => 'Kaur Layanan Akademik Fakultas Rekayasa Industri dan Dosen S1 Teknik Logistik dengan fokus pada tata kelola logistik digital.',
                'bio_en' => 'Head of Academic Services at the Faculty of Industrial Engineering and S1 Logistics Engineering Lecturer with a focus on digital logistics governance.',
                'expertise' => ['Logistics Services', 'Academic Operations', 'Digital Logistics'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Telkom University', 'year' => 2012],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2015],
                ],
                'teaching_history' => [
                    ['semester' => 'Ganjil 2025/2026', 'courses' => ['Kalkulus 1', 'Fisika Dasar 1']],
                ],
                'photo' => '/images/dosen/Erlangga Bayu Setyawan.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_erlangga',
                'sinta_id' => 'sinta_erlangga',
                'scopus_id' => 'scopus_erlangga',
                'email' => 'erlanggabayu@telkomuniversity.ac.id',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Yodi Nurdiansyah, S.T., M.T.',
                'nidn' => '403068705',
                'nip' => '403068705',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Kaur Kemahasiswaan FRI / Dosen S1 Teknik Logistik',
                'position_en' => 'FRI Student Affairs Coordinator / Faculty Member',
                'bio_id' => 'Kaur Kemahasiswaan Fakultas Rekayasa Industri dan Dosen S1 Teknik Logistik yang berfokus pada pembinaan kemahasiswaan dan rekayasa proses bisnis.',
                'bio_en' => 'Head of Student Affairs at the Faculty of Industrial Engineering and S1 Logistics Engineering Lecturer focusing on student development and business process engineering.',
                'expertise' => ['Student Development', 'Process Engineering', 'Enterprise Systems'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Institut Teknologi Bandung', 'year' => 2009],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2012],
                ],
                'teaching_history' => [
                    ['semester' => 'Genap 2025/2026', 'courses' => ['Pemodelan & Rekayasa Proses Bisnis Digital', 'Kewirausahaan']],
                ],
                'photo' => '/images/dosen/Yodi Nurdiansyah.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_yodi',
                'sinta_id' => 'sinta_yodi',
                'scopus_id' => 'scopus_yodi',
                'email' => 'yodinurdiansyah@telkomuniversity.ac.id',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Prafajar Suksessanno Muttaqin, S.T., M.T., ESLog',
                'nidn' => '403079401',
                'nip' => '403079401',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik yang berfokus pada otomasi pergudangan dan pemodelan rantai pasok digital.',
                'bio_en' => 'S1 Logistics Engineering Lecturer focusing on warehouse automation and digital supply chain modeling.',
                'expertise' => ['Warehouse Automation', 'Simulation Modeling', 'Digital Supply Chain'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Telkom University', 'year' => 2016],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2019],
                ],
                'teaching_history' => [
                    ['semester' => 'Ganjil 2025/2026', 'courses' => ['Simulasi Diskrit Sistem Logistik', 'E-Logistics']],
                ],
                'photo' => '/images/dosen/Prafajar Suksessanno.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_prafajar',
                'sinta_id' => 'sinta_prafajar',
                'scopus_id' => 'scopus_prafajar',
                'email' => 'prafajar@telkomuniversity.ac.id',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Seto Sumargo, S.T., M.T.',
                'nidn' => '419018701',
                'nip' => '419018701',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik dengan keahlian dalam rekayasa kualitas dan sistem keselamatan kerja di bidang logistik.',
                'bio_en' => 'S1 Logistics Engineering Lecturer with expertise in quality engineering and occupational safety systems in logistics.',
                'expertise' => ['Quality Engineering', 'Occupational Safety', 'Logistics Systems'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Universitas Indonesia', 'year' => 2009],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2012],
                ],
                'teaching_history' => [
                    ['semester' => 'Genap 2025/2026', 'courses' => ['Rekayasa Kualitas Sistem Logistik', 'Sistem Transportasi']],
                ],
                'photo' => '/images/dosen/Seto Sumargo.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_seto',
                'sinta_id' => 'sinta_seto',
                'scopus_id' => 'scopus_seto',
                'email' => 'setosumargo@telkomuniversity.ac.id',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Gisti Ayu Pratiwi, S.T., M.T.',
                'nidn' => '427109302',
                'nip' => '427109302',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik dengan spesialisasi logistik e-commerce dan analitik data logistik.',
                'bio_en' => 'S1 Logistics Engineering Lecturer specializing in e-commerce logistics and logistics data analytics.',
                'expertise' => ['E-Commerce Logistics', 'Data Analytics', 'Inventory Systems'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Telkom University', 'year' => 2015],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2018],
                ],
                'teaching_history' => [
                    ['semester' => 'Ganjil 2025/2026', 'courses' => ['Analitik Data Logistik', 'Sistem Persediaan']],
                ],
                'photo' => '/images/dosen/Gisti Ayu Pratiwi.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_gisti',
                'sinta_id' => 'sinta_gisti',
                'scopus_id' => 'scopus_gisti',
                'email' => 'gistiayu@telkomuniversity.ac.id',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Leo Rama Kristiana, S.T., M.T.',
                'nidn' => '410109001',
                'nip' => '410109001',
                'functional_position' => 'Lektor',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik yang berfokus pada manajemen pergudangan, optimasi inventori, serta sistem transportasi logistik.',
                'bio_en' => 'S1 Logistics Engineering Lecturer focusing on warehouse management, inventory optimization, and logistics transportation systems.',
                'expertise' => ['Warehouse Management', 'Inventory Optimization', 'Transportation Systems'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Telkom University', 'year' => 2012],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2015],
                ],
                'teaching_history' => [
                    ['semester' => 'Genap 2025/2026', 'courses' => ['Pergudangan & Penanganan Material', 'Sistem Transportasi']],
                ],
                'photo' => '/images/dosen/Leo Rama Kristiana.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_leo_rama',
                'sinta_id' => 'sinta_leo_rama',
                'scopus_id' => 'scopus_leo_rama',
                'email' => 'leorama@telkomuniversity.ac.id',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'name' => 'Aulia Dihas Zahira, S.T., M.T.',
                'nidn' => '5439878985',
                'nip' => '5439878985',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik yang memiliki ketertarikan riset pada analisis tekno-ekonomi dan perencanaan sistem rantai pasok berkelanjutan.',
                'bio_en' => 'S1 Logistics Engineering Lecturer with research interests in techno-economics analysis and sustainable supply chain planning.',
                'expertise' => ['Techno-Economics', 'Sustainable Logistics', 'Supply Chain Management'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Telkom University', 'year' => 2016],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2019],
                ],
                'teaching_history' => [
                    ['semester' => 'Ganjil 2025/2026', 'courses' => ['Analisis Biaya & Tekno-Ekonomi', 'Sistem Logistik Berkelanjutan']],
                ],
                'photo' => '/images/dosen/Aulia Dihas Zahira.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_aulia_dihas',
                'sinta_id' => 'sinta_aulia_dihas',
                'scopus_id' => 'scopus_aulia_dihas',
                'email' => 'auliadihas@telkomuniversity.ac.id',
                'order' => 9,
                'is_active' => true,
            ],
            [
                'name' => 'Fariz Affandi Harahap, S.T., M.Log.',
                'nidn' => '26000045',
                'nip' => '26000045',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik dengan keilmuan logistik pelabuhan, manajemen kargo, dan rekayasa rantai pasok maritim.',
                'bio_en' => 'S1 Logistics Engineering Lecturer with expertise in port logistics, cargo management, and maritime supply chain engineering.',
                'expertise' => ['Port Logistics', 'Cargo Management', 'Maritime Supply Chain'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Universitas Sumatera Utara', 'year' => 2014],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2018],
                ],
                'teaching_history' => [
                    ['semester' => 'Genap 2025/2026', 'courses' => ['Logistik Kargo', 'Transportasi Logistik']],
                ],
                'photo' => '/images/dosen/Fariz Affandi Harahap.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_fariz',
                'sinta_id' => 'sinta_fariz',
                'scopus_id' => 'scopus_fariz',
                'email' => 'farizaffandi@telkomuniversity.ac.id',
                'order' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Juvianto Dwi Prasetyo, S.T.P., M.T.',
                'nidn' => '9751774675130302',
                'nip' => '9751774675130302',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Logistik',
                'position_en' => 'Faculty Member of S1 Logistics Engineering',
                'bio_id' => 'Dosen S1 Teknik Logistik dengan ketertarikan pada agro-logistik, cold chain, dan logistik bahan pangan.',
                'bio_en' => 'S1 Logistics Engineering Lecturer with interest in agro-logistics, cold chain, and food logistics.',
                'expertise' => ['Agro-Logistics', 'Cold Chain Logistics', 'Food Supply Chain'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Institut Pertanian Bogor', 'year' => 2013],
                    ['degree' => 'S2', 'institution' => 'Institut Teknologi Bandung', 'year' => 2017],
                ],
                'teaching_history' => [
                    ['semester' => 'Ganjil 2025/2026', 'courses' => ['Pergudangan & Penanganan Material', 'Pengadaan']],
                ],
                'photo' => '/images/dosen/Juvianto Dwi Prasetyo.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_juvianto',
                'sinta_id' => 'sinta_juvianto',
                'scopus_id' => 'scopus_juvianto',
                'email' => 'juviantodwi@telkomuniversity.ac.id',
                'order' => 11,
                'is_active' => true,
            ],
            [
                'name' => 'Syifa Maulvi Zainiun, S.T, M.Sc',
                'nidn' => '1857777678230242',
                'nip' => '1857777678230242',
                'functional_position' => 'Asisten Ahli',
                'position_id' => 'Dosen Program Studi S1 Teknik Industri',
                'position_en' => 'Faculty Member of S1 Industrial Engineering',
                'bio_id' => 'Dosen S1 Teknik Industri yang mengajar rekayasa ergonomi dan manajemen rantai pasok industri silang.',
                'bio_en' => 'S1 Industrial Engineering Lecturer teaching ergonomics engineering and cross-industry supply chain management.',
                'expertise' => ['Ergonomics', 'Supply Chain Management', 'Industrial Engineering'],
                'education' => [
                    ['degree' => 'S1', 'institution' => 'Institut Teknologi Sepuluh Nopember', 'year' => 2015],
                    ['degree' => 'S2', 'institution' => 'University of Manchester', 'year' => 2019],
                ],
                'teaching_history' => [
                    ['semester' => 'Genap 2025/2026', 'courses' => ['Kewirausahaan', 'K3 Logistik']],
                ],
                'photo' => '/images/dosen/Syifa Maulvi Zainiun.png',
                'scholar_url' => 'https://scholar.google.com',
                'sinta_url' => 'https://sinta.kemdikbud.go.id',
                'scopus_url' => 'https://www.scopus.com',
                'scholar_id' => 'scholar_syifa_maulvi',
                'sinta_id' => 'sinta_syifa_maulvi',
                'scopus_id' => 'scopus_syifa_maulvi',
                'email' => 'syifamaulvi@telkomuniversity.ac.id',
                'order' => 12,
                'is_active' => true,
            ],
        ];

        foreach ($rows as $row) {
            Lecturer::updateOrCreate(['nidn' => $row['nidn']], $row);
        }
    }
}
