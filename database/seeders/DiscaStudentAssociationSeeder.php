<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Seeds settings.student_association with the DISCA content that used to be
 * hardcoded in resources/js/Pages/StudentAssociation.tsx, so the admin panel
 * starts pre-filled instead of empty. Only fills keys that are still empty —
 * never overwrites name/instagram/description/vision/divisions if an admin
 * has already edited them.
 */
class DiscaStudentAssociationSeeder extends Seeder
{
    public function run(): void
    {
        $existing = Setting::getValue('student_association') ?? [];

        $defaults = [
            'name' => 'DISCA · Digital Supply Chain Student Association',
            'instagram' => 'disca.telkomuniversity',
            'description' => [
                'id' => 'DISCA Universitas Telkom adalah Himpunan yang beranggotakan dan mewadahi seluruh mahasiswa Prodi S1 Digital Supply Chain, Fakultas Rekayasa Industri, Universitas Telkom. Lembaga ini berfungsi sebagai lembaga eksekutif yang bersifat independen dan non-structural institution.',
                'en' => 'DISCA of Telkom University is a student association encompassing and accommodating all students of the S1 Digital Supply Chain Program, Faculty of Industrial Engineering, Telkom University. The institution functions as an independent, non-structural executive body.',
            ],
            'vision' => [
                'id' => '"Terwujudnya DISCA sebagai wadah maupun sarana yang aktif dalam menciptakan lingkungan yang komunikatif, integritas, inisiatif, berkarakter, dan memberikan kebebasan dalam beraspirasi serta berekspresi berlandaskan asas kekeluargaan."',
                'en' => '"To realize DISCA as an active platform and means for creating a communicative, integrity-driven, initiative-based, character-building environment that provides freedom of aspiration and expression grounded in a sense of kinship."',
            ],
            'divisions' => [],
            'founded_date' => 'Berdiri 6 April 2023',
            'faculty_label' => 'FRI · Universitas Telkom',
            'history' => [
                'id' => 'Berawal dari kepanitiaan pembentukan himpunan dengan nama Keluarga Besar Mahasiswa Teknik Logistik (KBMTL) hingga akhirnya didirikan secara resmi oleh mahasiswa Digital Supply Chain angkatan II (2020) pada tanggal 6 April 2023 dengan nama Digital Supply Chain Student Association (DISCA) Universitas Telkom.',
                'en' => 'Starting from a committee establishing a student association under the name Keluarga Besar Mahasiswa Teknik Logistik (KBMTL), it was formally founded by the 2nd batch (2020) Digital Supply Chain students on April 6, 2023 under the name Digital Supply Chain Student Association (DISCA) of Telkom University.',
            ],
            'missions' => [
                ['id' => 'Memaksimalkan DISCA sebagai wadah yang aktif dalam menampung aspirasi mahasiswa/i Digital Supply Chain.', 'en' => 'Maximizing DISCA as an active platform for accommodating the aspirations of Digital Supply Chain students.'],
                ['id' => 'Mengoptimalkan kemampuan mahasiswa/i Digital Supply Chain baik dalam akademik maupun non-akademik.', 'en' => 'Optimizing the abilities of Digital Supply Chain students in both academic and non-academic areas.'],
                ['id' => 'Mempersiapkan DISCA dalam membentuk rancangan himpunan Digital Supply Chain.', 'en' => 'Preparing DISCA in forming the design framework for the Digital Supply Chain student association.'],
            ],
            'logo_image' => '/images/logo-dsc-himpunan.png',
            'logo_meanings' => [
                ['title' => ['id' => 'Warna Coklat', 'en' => 'Brown Color'], 'description' => ['id' => 'Dimaknai sebagai kenyamanan dan ketenangan.', 'en' => 'Symbolizes comfort and tranquility.']],
                ['title' => ['id' => 'Warna Hitam', 'en' => 'Black Color'], 'description' => ['id' => 'Dimaknai sebagai netral dan kuat.', 'en' => 'Symbolizes neutrality and strength.']],
                ['title' => ['id' => 'Warna Krem (Beige)', 'en' => 'Cream (Beige) Color'], 'description' => ['id' => 'Dimaknai sebagai fleksibilitas dan dapat diandalkan.', 'en' => 'Symbolizes flexibility and reliability.']],
                ['title' => ['id' => 'Warna Merah', 'en' => 'Red Color'], 'description' => ['id' => 'Diwakilkan dengan berani dan energik.', 'en' => 'Represents courage and energy.']],
                ['title' => ['id' => 'Bentuk Gear', 'en' => 'Gear Shape'], 'description' => ['id' => 'Menggambarkan perubahan revolusi industri dan aktivitas DISCA yang terus berlangsung diiringi perkembangan teknologi.', 'en' => "Depicts the industrial revolution and DISCA's continuous activities alongside technological progress."]],
                ['title' => ['id' => 'Bentuk 3 Persegi', 'en' => 'Three-Square Shape'], 'description' => ['id' => 'Menggambarkan profesionalisme, kekuatan, dan stabilitas, serta merepresentasikan Visi Program Studi Digital Supply Chain.', 'en' => 'Depicts professionalism, strength, and stability, representing the DSC Program vision.']],
                ['title' => ['id' => 'Bentuk Point', 'en' => 'Point Shape'], 'description' => ['id' => 'Diartikan sebagai DISCA Universitas Telkom yang memiliki arah serta tujuan yang jelas.', 'en' => 'Signifies that DISCA has a clear direction and purpose.']],
            ],
            'leadership' => [
                ['name' => 'Christmas Ekaputra Maryono Pathibang', 'role' => ['id' => 'Ketua Umum', 'en' => 'General Chairperson'], 'description' => ['id' => 'Memimpin dan bertanggung jawab tertinggi atas seluruh aktivitas DISCA.', 'en' => 'Leads and bears the highest responsibility for all DISCA activities.'], 'photo' => null],
                ['name' => 'Hanil Fazli', 'role' => ['id' => 'Wakil Ketua Umum', 'en' => 'Deputy General Chairperson'], 'description' => ['id' => 'Mendampingi ketua dalam menjalankan tugas dan tanggung jawab kepemimpinan.', 'en' => 'Assists the chairperson in carrying out leadership duties and responsibilities.'], 'photo' => null],
                ['name' => 'Tartar Abimanyu', 'role' => ['id' => 'Sekretaris Umum', 'en' => 'General Secretary'], 'description' => ['id' => 'Bertanggung jawab pada semua arsip dokumen, surat, notulensi rapat, dan data.', 'en' => 'Responsible for all document archives, letters, meeting minutes, and data.'], 'photo' => null],
                ['name' => 'Hardiyat Hawari Hutama', 'role' => ['id' => 'Wakil Sekretaris', 'en' => 'Deputy Secretary'], 'description' => ['id' => 'Membantu Sekretaris Umum dalam pengelolaan administrasi dan dokumentasi organisasi.', 'en' => 'Assists the General Secretary in managing organizational administration and documentation.'], 'photo' => null],
                ['name' => 'Catherine Adella Yudhaningtyas', 'role' => ['id' => 'Bendahara Umum', 'en' => 'General Treasurer'], 'description' => ['id' => 'Bertanggung jawab dalam laporan keuangan, pengendalian, dan pengawasan aliran dana.', 'en' => 'Responsible for financial reporting, control, and monitoring of fund flows.'], 'photo' => null],
                ['name' => 'Puja Amelia Arisma', 'role' => ['id' => 'Wakil Bendahara', 'en' => 'Deputy Treasurer'], 'description' => ['id' => 'Mendampingi Bendahara Umum dalam pengelolaan keuangan organisasi.', 'en' => "Assists the General Treasurer in managing the organization's finances."], 'photo' => null],
            ],
            'departments' => [
                ['abbr' => 'KADERISASI', 'name' => ['id' => 'Departemen Kaderisasi', 'en' => 'Cadre Development Department'], 'description' => ['id' => 'Bertanggung jawab terhadap seluruh proses kaderisasi dalam membentuk kader penerus, mengawasi seluruh rangkaian kaderisasi, dan menjaga kestabilan DISCA melalui alur kaderisasi.', 'en' => "Responsible for the entire cadre formation process, overseeing all cadre stages, and maintaining DISCA's stability through the cadre development pipeline."]],
                ['abbr' => 'KEMHAS', 'name' => ['id' => 'Departemen Kemahasiswaan', 'en' => 'Student Affairs Department'], 'description' => ['id' => 'Bertanggung jawab terhadap kegiatan internal DISCA — menjaga solidaritas, pengembangan minat bakat, dan advokasi kemahasiswaan dalam ruang lingkup Digital Supply Chain.', 'en' => 'Responsible for DISCA internal activities — maintaining solidarity, developing student interests and talents, and student advocacy within the Digital Supply Chain scope.']],
                ['abbr' => 'AKSET', 'name' => ['id' => 'Departemen Akademik & Riset', 'en' => 'Academic & Research Department'], 'description' => ['id' => 'Bertanggung jawab menunjang akademik, memperluas wawasan, dan mendorong mahasiswa berprestasi dalam bidang penelitian, khususnya ilmu logistik.', 'en' => 'Supports academics, broadens knowledge, and encourages students to excel in research, particularly in the field of logistics.']],
                ['abbr' => 'MENFO', 'name' => ['id' => 'Departemen Media & Informasi', 'en' => 'Media & Information Department'], 'description' => ['id' => 'Bertanggung jawab sebagai media penyebaran informasi seluruh kegiatan Prodi Digital Supply Chain, memastikan arus informasi tersebar merata di internal maupun eksternal DISCA.', 'en' => 'Responsible for disseminating information about all DSC Program activities, ensuring information flows evenly both internally and externally within DISCA.']],
                ['abbr' => 'PR', 'name' => ['id' => 'Biro Public Relation', 'en' => 'Public Relations Bureau'], 'description' => ['id' => 'Bertanggung jawab terhadap pengelolaan informasi dan menjadi penghubung antara pihak eksternal maupun internal dalam menciptakan komunikasi yang baik di lingkup DISCA.', 'en' => 'Responsible for managing information and acting as a bridge between external and internal parties to foster good communication within the DISCA scope.']],
            ],
            'dpm' => [
                'description' => [
                    'id' => 'Lembaga legislatif DISCA yang memiliki fungsi pengawasan terhadap kinerja lembaga eksekutif serta mewadahi aspirasi seluruh entitas Digital Supply Chain.',
                    'en' => "The legislative body of DISCA with a supervisory function over the executive body's performance and a platform for all Digital Supply Chain entity aspirations.",
                ],
                'commissions' => [
                    ['name' => ['id' => 'Inti DPM', 'en' => 'DPM Core'], 'description' => ['id' => 'Mengatur urusan internal DPM DISCA serta membangun relasi dengan pihak eksternal.', 'en' => 'Manages internal DPM affairs and builds relations with external parties.']],
                    ['name' => ['id' => 'Komisi Aspirasi', 'en' => 'Aspiration Commission'], 'description' => ['id' => 'Bertugas untuk mewadahi aspirasi seluruh entitas Digital Supply Chain.', 'en' => 'Tasked with accommodating the aspirations of all Digital Supply Chain entities.']],
                    ['name' => ['id' => 'Komisi Pengawasan', 'en' => 'Oversight Commission'], 'description' => ['id' => 'Bertugas untuk mengawasi kinerja lembaga eksekutif Badan Pengurus Harian (BPH) DISCA.', 'en' => 'Tasked with overseeing the performance of the DISCA Daily Management Board (BPH).']],
                ],
            ],
            'activities' => [
                [
                    'label' => ['id' => 'Kolaborasi Organisasi', 'en' => 'Organizational Collaboration'],
                    'title' => ['id' => 'Studi Banding HIMA DSC × HMTM', 'en' => 'Comparative Study HIMA DSC × HMTM'],
                    'description' => [
                        'id' => 'Kegiatan Studi Banding antara Himpunan Mahasiswa Digital Supply Chain (HIMA DSC) Universitas Telkom dan Himpunan Mahasiswa Teknik Manufaktur (HMTM) Universitas Telkom sebagai wadah kolaborasi untuk saling berbagi program kerja, struktur organisasi, serta pengalaman kepengurusan demi memajukan iklim organisasi yang inovatif dan kontributif.',
                        'en' => 'A comparative study session between the Digital Supply Chain Student Association (HIMA DSC) and the Manufacturing Engineering Student Association (HMTM) of Telkom University, fostering collaboration to share work programs, organizational structures, and leadership insights.',
                    ],
                    'photos' => [
                        '/images/news/kemahasiswaan_studybandingdscxhmtm.png',
                        '/images/news/kemahasiswaan_studybandingdscxhmtm1.png',
                        '/images/news/kemahasiswaan_studybandingdscxhmtm2.png',
                    ],
                ],
                [
                    'label' => ['id' => 'Musyawarah & Konstitusi', 'en' => 'Assembly & Constitution'],
                    'title' => ['id' => 'Sidang AD/ART & Pleno HIMA', 'en' => 'AD/ART & Plenary Session'],
                    'description' => [
                        'id' => 'Sidang AD/ART dan Sidang Pleno Himpunan Mahasiswa merupakan agenda krusial organisasi untuk membahas dan mengesahkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART), mengevaluasi capaian program kerja setengah periode kepengurusan, serta merumuskan rekomendasi taktis demi kelancaran roda organisasi.',
                        'en' => 'The AD/ART and Plenary Session is a crucial organizational agenda to discuss and ratify the Constitution and Bylaws (AD/ART), evaluate mid-term program achievements, and formulate tactical recommendations for smooth organizational operations.',
                    ],
                    'photos' => [
                        '/images/news/kemahasiswaan_adarthimpunan.png',
                        '/images/news/kemahasiswaan_adarthimpunan1.png',
                    ],
                ],
            ],
            'stats' => [
                ['value' => '5', 'label' => ['id' => 'Departemen & Biro', 'en' => 'Depts & Bureaus']],
                ['value' => '12+', 'label' => ['id' => 'Program Kerja', 'en' => 'Work Programs']],
                ['value' => '200+', 'label' => ['id' => 'Anggota Aktif', 'en' => 'Active Members']],
                ['value' => '2023', 'label' => ['id' => 'Tahun Berdiri', 'en' => 'Year Founded']],
            ],
        ];

        // Only fill keys that are currently empty/missing — never clobber anything an admin already edited.
        $merged = $existing;
        foreach ($defaults as $key => $value) {
            $isEmpty = !array_key_exists($key, $merged) || $merged[$key] === null || $merged[$key] === '' || $merged[$key] === [];
            if ($isEmpty) {
                $merged[$key] = $value;
            }
        }

        Setting::updateOrCreate(['key' => 'student_association'], ['value' => $merged]);
    }
}
