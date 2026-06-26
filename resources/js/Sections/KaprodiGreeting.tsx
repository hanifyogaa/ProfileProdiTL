import { Card } from '@/components/Card';
import { LangText } from '@/components/LangText';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';
import { router } from '@inertiajs/react';
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface GreetingData {
    name: string | null;
    photo: string | null;
    quote: Bilingual;
    attribution: Bilingual;
    link_href: string;
    full_message?: Bilingual;
}

interface KaprodiGreetingProps {
    greeting: GreetingData;
    /** If true, clicking "Baca selengkapnya" opens the modal directly on this page.
     *  If false (default), it navigates to link_href with #greeting-modal hash,
     *  and the target page will auto-open the modal on arrival. */
    inlineModal?: boolean;
}

export function KaprodiGreeting({ greeting, inlineModal = false }: KaprodiGreetingProps) {
    const { t, locale } = useLocale();
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const yPortrait = useTransform(
        scrollYProgress,
        [0, 1],
        [20, shouldReduceMotion ? 20 : -60],
    );

    const kaprodiName = greeting.name || 'Dr. Ir. Muhammad Akbar, S.T., M.T.';
    const kaprodiPhoto =
        greeting.photo ||
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=750';

    // Auto-open modal if URL has #greeting-modal hash (navigated from homepage)
    // Only run on pages where inlineModal=true (i.e. the profile page)
    useEffect(() => {
        if (!inlineModal) return; // Don't auto-open on homepage
        if (window.location.hash === '#greeting-modal') {
            const timer = setTimeout(() => {
                setModalOpen(true);
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [inlineModal]);


    // Lock body scroll when modal is open
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [modalOpen]);

    const handleReadMore = () => {
        if (inlineModal) {
            // Open modal directly on this page
            setModalOpen(true);
        } else {
            // Navigate to link_href page with hash, which will auto-open modal there
            const href = (greeting.link_href || '/profil') + '#greeting-modal';
            router.visit(href);
        }
    };

    // Full greeting message fallback
    const fullMessage = greeting.full_message?.[locale as 'id' | 'en'] || (locale === 'id'
        ? `Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSelamat datang di Program Studi S1 Teknik Logistik, Universitas Telkom. Sebagai Kepala Program Studi, saya sangat bangga dan bersyukur atas kepercayaan yang diberikan kepada kami untuk mendidik dan membentuk generasi penerus bangsa di bidang logistik dan rantai pasok digital.\n\nProgram Studi Teknik Logistik Telkom University hadir untuk menjawab tantangan era industri 4.0 yang membutuhkan tenaga ahli yang tidak hanya memahami sistem logistik secara konvensional, tetapi juga mampu mengintegrasikan teknologi digital dalam setiap aspek rantai pasok. Kurikulum kami dirancang 145 SKS dalam delapan semester, memadukan matematika dan ilmu dasar, pendidikan umum, dan topik keteknikan logistik dengan kekhasan e-logistik dan supply chain digital.\n\nKami berkomitmen untuk menghasilkan lulusan yang:\n• Mampu merancang dan mengoptimalkan sistem logistik berbasis data\n• Berjiwa wirausaha dan inovatif\n• Siap bersaing di kancah internasional\n• Berkontribusi pada pembangunan berkelanjutan (SDGs)\n\nBersama seluruh dosen dan staf yang berdedikasi, kami siap mendampingi perjalanan akademik Anda menuju kesuksesan. Selamat bergabung dan mari kita wujudkan masa depan logistik Indonesia yang lebih baik bersama-sama.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.`
        : `Welcome to the S1 Logistics Engineering Study Program at Telkom University. As the Head of Study Program, I am deeply honored and grateful for the trust placed in us to educate and shape the next generation of logistics and digital supply chain professionals.\n\nThe Logistics Engineering Study Program at Telkom University was established to meet the challenges of the Industry 4.0 era, which demands experts who not only understand conventional logistics systems but are also capable of integrating digital technology into every aspect of the supply chain. Our curriculum is designed with 145 credit hours over eight semesters, combining mathematics and basic sciences, general education, and engineering topics with a distinctive focus on e-logistics and digital supply chain management.\n\nWe are committed to producing graduates who:\n• Can design and optimize data-driven logistics systems\n• Are entrepreneurial and innovative\n• Are ready to compete on the international stage\n• Contribute to sustainable development (SDGs)\n\nTogether with our dedicated faculty and staff, we are ready to accompany your academic journey toward success. Welcome aboard, and let us build a better future for Indonesia's logistics sector together.`
    );

    return (
        <>
            <section ref={sectionRef} className="bg-surface-0 relative pt-0 pb-20">
                <div className="mx-auto max-w-[1000px] px-6">
                    <Reveal variant="zoom-in" delay={0.15}>
                        <Card noLift className="relative -mt-16 shadow-[0_24px_48px_-20px_rgba(36,20,31,0.28)] sm:-mt-24">
                            <div className="grid md:grid-cols-12">
                                {/* Photo Column */}
                                <div className="bg-surface-50 border-cream-300/10 relative z-10 aspect-[4/5] overflow-hidden rounded-t-2xl border md:col-span-4 md:-my-8 md:-ml-6 md:aspect-auto md:rounded-2xl md:shadow-lg">
                                    <motion.div
                                        className="absolute inset-0 -inset-y-10"
                                        style={{ y: yPortrait }}
                                    >
                                        <img
                                            src={kaprodiPhoto}
                                            alt={kaprodiName}
                                            className="size-full object-cover object-top"
                                        />
                                    </motion.div>
                                    <div className="from-ink-900/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent md:hidden" />
                                    <div className="text-surface-0 absolute bottom-4 left-6 md:hidden">
                                        <h4 className="text-lg font-semibold">{kaprodiName}</h4>
                                        <p className="text-cream-300 text-xs">
                                            <LangText text={greeting.attribution} />
                                        </p>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex flex-col justify-between p-8 md:col-span-8 md:p-12">
                                    <div>
                                        <span className="font-display mb-6 block text-4xl leading-none font-semibold text-amber-500">"</span>
                                        <blockquote className="font-display text-ink-900 text-lg leading-relaxed font-medium italic sm:text-xl">
                                            <LangText text={greeting.quote} />
                                        </blockquote>
                                    </div>

                                    <div className="border-cream-300/30 mt-8 flex flex-wrap items-end justify-between gap-6 border-t pt-6">
                                        <div className="hidden md:block">
                                            <h4 className="font-display text-ink-900 text-lg font-bold">{kaprodiName}</h4>
                                            <p className="text-navy-700 text-sm font-medium">
                                                <LangText text={greeting.attribution} />
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleReadMore}
                                                className="text-brand-700 group flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                                            >
                                                {t({ id: 'Baca selengkapnya', en: 'Read more' })}
                                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Reveal>
                </div>
            </section>

            {/* ── MODAL ── */}
            <AnimatePresence>
                {modalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                            onClick={() => setModalOpen(false)}
                        />

                        {/* Modal panel */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.94, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
                                style={{ background: '#FFFDFB', border: '1px solid rgba(172,149,135,0.20)' }}
                            >
                                {/* Modal header */}
                                <div className="flex items-center gap-5 border-b px-8 py-6 shrink-0"
                                    style={{ borderColor: 'rgba(172,149,135,0.18)', background: 'linear-gradient(135deg, rgba(36,20,31,0.97) 0%, rgba(110,78,51,0.20) 100%)' }}>
                                    <div className="size-16 shrink-0 overflow-hidden rounded-2xl border-2 shadow-lg"
                                        style={{ borderColor: 'rgba(217,159,96,0.40)' }}>
                                        <img src={kaprodiPhoto} alt={kaprodiName} className="size-full object-cover object-top" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D99F60' }}>
                                            {locale === 'id' ? 'Sambutan Kaprodi' : 'Head of Program Greeting'}
                                        </p>
                                        <h3 className="font-display text-lg font-bold text-white leading-snug truncate">{kaprodiName}</h3>
                                        <p className="text-sm mt-0.5" style={{ color: 'rgba(172,149,135,0.80)' }}>
                                            <LangText text={greeting.attribution} />
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                                        style={{ color: 'rgba(172,149,135,0.80)' }}
                                        aria-label="Close"
                                    >
                                        <X className="size-5" />
                                    </button>
                                </div>

                                {/* Modal body — scrollable */}
                                <div className="overflow-y-auto px-8 py-8 flex-1">
                                    {/* Pull quote */}
                                    <div className="mb-6 rounded-2xl p-6" style={{ background: 'rgba(217,159,96,0.06)', borderLeft: '3px solid #D99F60' }}>
                                        <span className="font-display text-3xl leading-none font-semibold text-amber-500">"</span>
                                        <p className="font-display text-ink-900 text-base leading-relaxed font-medium italic mt-1">
                                            <LangText text={greeting.quote} />
                                        </p>
                                    </div>

                                    {/* Full message */}
                                    <div className="space-y-4 text-sm leading-[1.85]" style={{ color: '#24141F' }}>
                                        {fullMessage.split('\n').map((para, i) =>
                                            para.trim() === '' ? null : (
                                                <p key={i} className={para.startsWith('•') ? 'pl-4' : ''}>
                                                    {para}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Modal footer */}
                                <div className="border-t px-8 py-5 flex justify-end shrink-0"
                                    style={{ borderColor: 'rgba(172,149,135,0.18)' }}>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                                        style={{ background: '#24141F', color: '#FFFDFB' }}
                                    >
                                        {locale === 'id' ? 'Tutup' : 'Close'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
