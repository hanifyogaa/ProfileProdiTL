import { Achievements } from '@/Sections/Achievements';
import { AdmissionCta } from '@/Sections/AdmissionCta';
import { CareerProspects } from '@/Sections/CareerProspects';
import { CurriculumSnapshot } from '@/Sections/CurriculumSnapshot';
import { Distinctiveness } from '@/Sections/Distinctiveness';
import { FeaturedCarousel } from '@/Sections/FeaturedCarousel';
import { Footer } from '@/Sections/Footer';
import { Hero } from '@/Sections/Hero';
import { KaprodiGreeting } from '@/Sections/KaprodiGreeting';
import { LabsFacilities } from '@/Sections/LabsFacilities';
import { LatestNews } from '@/Sections/LatestNews';
import { Navbar } from '@/Sections/Navbar';
import { PartnersMarquee } from '@/Sections/PartnersMarquee';
import { StatsStrip } from '@/Sections/StatsStrip';
import { TracerChart } from '@/Sections/TracerChart';
import { BackToTop } from '@/components/BackToTop';
import { ScrollProgressRail } from '@/components/ScrollProgressRail';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

interface HomeProps {
    hero: any;
    stats: any[];
    distinctiveness: any;
    greeting: any;
    featured: any[];
    latestNews: any[];
    curriculumSummary: any;
    prospects: any;
    achievements: any[];
    tracerStats: any;
    labs: any[];
    partners: any[];
    settings: {
        site_meta: any;
        socials: any;
        contact: any;
    };
}

export default function Home({
    hero,
    stats,
    distinctiveness,
    greeting,
    featured,
    latestNews,
    curriculumSummary,
    prospects,
    achievements,
    tracerStats,
    labs,
    partners,
    settings,
}: HomeProps) {
    const { locale } = useLocale();

    const pageTitle =
        locale === 'id'
            ? 'Beranda - Teknik Logistik · Digital Supply Chain FRI Telkom University'
            : 'Home - Logistics Engineering · Digital Supply Chain FRI Telkom University';

    const pageDesc =
        locale === 'id'
            ? 'Program Studi S1 Teknik Logistik Fakultas Rekayasa Industri Universitas Telkom dengan fokus keilmuan e-logistik.'
            : 'S1 Logistics Engineering Undergraduate Study Program, Faculty of Industrial Engineering, Telkom University with an e-logistics focus.';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <meta
                    name="keywords"
                    content="teknik logistik, digital supply chain, e-logistik, telkom university, fri, logistik indonesia"
                />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
            </Head>

            <div className="bg-surface-0 text-ink-900 min-h-screen font-sans antialiased">
                <Navbar />

                <main className="relative">
                    {/* 1. Hero — full viewport, dark cinematic */}
                    <div id="hero">
                        <Hero hero={hero} />
                    </div>

                    {/* Seamless bleed: dark → white */}
                    {/* Hero ends dark, stats starts white — the hero's bottom gradient handles it */}

                    {/* 2. Stats Strip — white surface, no border */}
                    <div id="stats" className="relative z-10">
                        <StatsStrip stats={stats} />
                    </div>

                    {/* 3. Distinctiveness — same white surface, flows into next */}
                    <div id="distinctiveness" className="relative z-10">
                        <Distinctiveness distinctiveness={distinctiveness} />
                    </div>

                    {/* 4. Kaprodi Greeting — slightly elevated card, same surface */}
                    <div id="greeting" className="relative z-10">
                        <KaprodiGreeting greeting={greeting} />
                    </div>

                    {/* Subtle warm gradient bridge before full-screen dark section */}
                    <div
                        className="pointer-events-none relative z-10 h-24"
                        style={{
                            background:
                                'linear-gradient(to bottom, #fffdfb 0%, #24141f 100%)',
                        }}
                    />

                    {/* 5. Featured Activities — full-screen dark immersive */}
                    <div id="featured" className="relative z-10">
                        <FeaturedCarousel featured={featured} />
                    </div>

                    {/* Dark → white gradient bridge */}
                    <div
                        className="pointer-events-none relative z-10 h-24"
                        style={{
                            background:
                                'linear-gradient(to bottom, #24141f 0%, #fffdfb 100%)',
                        }}
                    />

                    {/* 6. News grid — white */}
                    <div id="news" className="relative z-10">
                        <LatestNews latestNews={latestNews} />
                    </div>

                    {/* 7. Curriculum snapshot */}
                    <div id="curriculum" className="relative z-10">
                        <CurriculumSnapshot
                            curriculumSummary={curriculumSummary}
                        />
                    </div>

                    {/* 8. Career Prospects */}
                    <div id="career" className="relative z-10">
                        <CareerProspects prospects={prospects} />
                    </div>

                    {/* 9. Achievements carousel */}
                    <div id="achievements" className="relative z-10">
                        <Achievements achievements={achievements} />
                    </div>

                    {/* 10. Tracer study area chart */}
                    <div id="tracer" className="relative z-10">
                        <TracerChart tracerStats={tracerStats} />
                    </div>

                    {/* 11. Laboratories & study facilities */}
                    <div id="labs" className="relative z-10">
                        <LabsFacilities labs={labs} />
                    </div>

                    {/* 12. Partners marquee */}
                    <div id="partners" className="relative z-10">
                        <PartnersMarquee partners={partners} />
                    </div>

                    {/* Gradient bridge before dark CTA */}
                    <div
                        className="pointer-events-none relative z-10 h-20"
                        style={{
                            background:
                                'linear-gradient(to bottom, #fffdfb 0%, rgba(140,100,65,0.08) 100%)',
                        }}
                    />

                    {/* 13. Call-to-action banner */}
                    <div id="cta" className="relative z-10">
                        <AdmissionCta />
                    </div>
                </main>

                {/* 14. Program Footer */}
                <Footer settings={settings} />

                <ScrollProgressRail />
                <BackToTop />
            </div>
        </>
    );
}
