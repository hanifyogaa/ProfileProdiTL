import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

interface AboutProps {
    greeting: any;
    distinctiveness: any;
}

export default function About({ greeting, distinctiveness }: AboutProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id' ? 'Profil Program Studi' : 'Study Program Profile';

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
                                        {locale === 'id'
                                            ? 'Visi Kami'
                                            : 'Our Vision'}
                                    </span>
                                    <p className="font-display text-lg leading-relaxed font-medium italic sm:text-xl">
                                        {locale === 'id'
                                            ? '“Menjadi Program Studi S1 Teknik Logistik berstandar internasional yang unggul dalam keilmuan e-logistik dan rantai pasok digital untuk mendukung kemajuan bangsa.”'
                                            : '“To become an internationally standardized Logistics Engineering Study Program that excels in e-logistics and digital supply chains to support national development.”'}
                                    </p>
                                </div>
                            </Card>
                        </Reveal>
                    </div>

                    <div className="md:col-span-7">
                        <Reveal delay={0.2}>
                            <Card className="border-cream-300/20 bg-surface-0 h-full border p-8">
                                <span className="text-brand-700 mb-4 block font-mono text-xs font-bold tracking-wider uppercase">
                                    {locale === 'id'
                                        ? 'Misi Kami'
                                        : 'Our Mission'}
                                </span>
                                <ul className="text-navy-700 list-decimal space-y-4 pl-4 text-sm leading-relaxed font-medium">
                                    <li>
                                        {locale === 'id'
                                            ? 'Menyelenggarakan pendidikan berkualitas internasional di bidang rekayasa logistik berbasis teknologi informasi.'
                                            : 'To organize internationally certified logistics engineering education based on information technology.'}
                                    </li>
                                    <li>
                                        {locale === 'id'
                                            ? 'Mengembangkan riset inovatif di bidang e-logistik, pergudangan pintar, dan manajemen rantai pasok digital.'
                                            : 'To develop innovative research in e-logistics, smart warehousing, and digital supply chain systems.'}
                                    </li>
                                    <li>
                                        {locale === 'id'
                                            ? 'Melaksanakan pengabdian masyarakat guna memberikan solusi nyata bagi permasalahan logistik nasional.'
                                            : 'To conduct community service to provide tangible solutions to national logistics bottlenecks.'}
                                    </li>
                                </ul>
                            </Card>
                        </Reveal>
                    </div>
                </div>

                {/* History & Decree Details */}
                <Reveal>
                    <div className="prose text-navy-700 mb-16 max-w-none space-y-6 text-sm leading-relaxed">
                        <h2 className="font-display text-ink-900 text-2xl font-semibold">
                            {locale === 'id'
                                ? 'Sejarah & Legalitas'
                                : 'History & Legal Framework'}
                        </h2>
                        <p>
                            {locale === 'id'
                                ? 'Program Studi S1 Teknik Logistik Universitas Telkom didirikan di bawah Fakultas Rekayasa Industri untuk merespon kebutuhan masif industri akan tenaga ahli logistik yang melek teknologi. Kurikulum kami memadukan fondasi teknik industri dengan kemampuan analitik sistem informasi logistik terkini.'
                                : 'Telkom University’s S1 Logistics Engineering program was established under the Faculty of Industrial Engineering to address the critical industry shortage of tech-savvy logistics engineers. Our curriculum bridges traditional industrial engineering with state-of-the-art information systems.'}
                        </p>
                    </div>
                </Reveal>
            </div>
        </MainLayout>
    );
}
