import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

interface BilingualStr { id: string; en: string; }

interface AboutContent {
    visi?: BilingualStr;
    misi?: BilingualStr[];
    history?: BilingualStr;
}

interface AboutProps {
    greeting?: any;
    distinctiveness?: any;
    aboutContent?: AboutContent;
}

export default function About({ greeting, distinctiveness, aboutContent }: AboutProps) {
    const { locale } = useLocale();

    const title = locale === 'id' ? 'Profil Program Studi' : 'Study Program Profile';

    const visi = aboutContent?.visi?.[locale as 'id' | 'en'] ??
        (locale === 'id'
            ? '"Menjadi Program Studi S1 Teknik Logistik berstandar internasional yang unggul dalam keilmuan e-logistik dan rantai pasok digital untuk mendukung kemajuan bangsa."'
            : '"To become an internationally standardized Logistics Engineering Study Program that excels in e-logistics and digital supply chains to support national development."');

    const misiItems: string[] = aboutContent?.misi?.map(m => m[locale as 'id' | 'en']) ?? (
        locale === 'id' ? [
            'Menyelenggarakan pendidikan berkualitas internasional di bidang rekayasa logistik berbasis teknologi informasi.',
            'Mengembangkan riset inovatif di bidang e-logistik, pergudangan pintar, dan manajemen rantai pasok digital.',
            'Melaksanakan pengabdian masyarakat guna memberikan solusi nyata bagi permasalahan logistik nasional.',
        ] : [
            'To organize internationally certified logistics engineering education based on information technology.',
            'To develop innovative research in e-logistics, smart warehousing, and digital supply chain systems.',
            'To conduct community service to provide tangible solutions to national logistics bottlenecks.',
        ]
    );

    const history = aboutContent?.history?.[locale as 'id' | 'en'] ??
        (locale === 'id'
            ? 'Program Studi S1 Teknik Logistik Universitas Telkom didirikan di bawah Fakultas Rekayasa Industri untuk merespon kebutuhan masif industri akan tenaga ahli logistik yang melek teknologi. Kurikulum kami memadukan fondasi teknik industri dengan kemampuan analitik sistem informasi logistik terkini.'
            : 'Telkom University’s S1 Logistics Engineering program was established under the Faculty of Industrial Engineering to address the critical industry shortage of tech-savvy logistics engineers. Our curriculum bridges traditional industrial engineering with state-of-the-art information systems.');

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1000px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                    </div>
                </Reveal>

                {/* Asymmetric Vision & Mission */}
                <div className="mb-16 grid items-stretch gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Reveal delay={0.1}>
                            <Card className="bg-brand-800 text-surface-0 flex h-full flex-col justify-between border-none p-8 shadow-xl">
                                <div>
                                    <span className="mb-4 block font-mono text-xs font-bold tracking-wider text-amber-500 uppercase">
                                        {locale === 'id' ? 'Visi Kami' : 'Our Vision'}
                                    </span>
                                    <p className="font-display text-lg leading-relaxed font-medium italic sm:text-xl">
                                        {visi}
                                    </p>
                                </div>
                            </Card>
                        </Reveal>
                    </div>

                    <div className="md:col-span-7">
                        <Reveal delay={0.2}>
                            <Card className="border-cream-300/20 bg-surface-0 h-full border p-8">
                                <span className="text-brand-700 mb-4 block font-mono text-xs font-bold tracking-wider uppercase">
                                    {locale === 'id' ? 'Misi Kami' : 'Our Mission'}
                                </span>
                                <ul className="text-navy-700 list-decimal space-y-4 pl-4 text-sm leading-relaxed font-medium">
                                    {misiItems.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </Card>
                        </Reveal>
                    </div>
                </div>

                {/* History */}
                <Reveal>
                    <div className="prose text-navy-700 mb-16 max-w-none space-y-6 text-sm leading-relaxed">
                        <h2 className="font-display text-ink-900 text-2xl font-semibold">
                            {locale === 'id' ? 'Sejarah & Legalitas' : 'History & Legal Framework'}
                        </h2>
                        <p>{history}</p>
                    </div>
                </Reveal>
            </div>
        </MainLayout>
    );
}
