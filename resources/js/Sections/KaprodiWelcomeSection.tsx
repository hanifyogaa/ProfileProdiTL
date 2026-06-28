import { LangText } from '@/components/LangText';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';
import { 
    Cpu, 
    Brain, 
    TrendingUp, 
    PlayCircle, 
    Database, 
    BookOpen, 
    Users, 
    Wrench, 
    Lightbulb, 
    Award,
    Sparkles,
    Briefcase,
    Mail,
    ArrowRight
} from 'lucide-react';

interface GreetingData {
    name: string | null;
    photo: string | null;
    quote: Bilingual;
    attribution: Bilingual;
    link_href: string;
    full_message?: Bilingual;
}

interface KaprodiWelcomeSectionProps {
    greeting: GreetingData;
}

// Helper to parse welcome message into structured sections
function parseWelcomeMessage(text: string) {
    const paras = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    
    let state: 'intro' | 'why_choose' | 'careers' | 'outro' = 'intro';
    
    const introParas: string[] = [];
    let whyChooseTitle = '';
    let whyChooseIntro = '';
    const whyChooseBullets: string[] = [];
    let careersTitle = '';
    const careersBullets: string[] = [];
    const outroParas: string[] = [];
    
    for (const para of paras) {
        const isWhyChooseHeader = para.includes('Mengapa Memilih') || para.includes('Why Choose');
        const isCareersHeader = para.includes('Mempersiapkan Kar') || para.includes('Preparing for');
        
        if (isWhyChooseHeader) {
            state = 'why_choose';
            whyChooseTitle = para;
            continue;
        }
        
        if (isCareersHeader) {
            state = 'careers';
            careersTitle = para;
            continue;
        }
        
        if (state === 'intro') {
            introParas.push(para);
        } else if (state === 'why_choose') {
            if (para.startsWith('•') || para.startsWith('-')) {
                whyChooseBullets.push(para.replace(/^[•-]\s*/, ''));
            } else {
                whyChooseIntro = para;
            }
        } else if (state === 'careers') {
            if (para.startsWith('•') || para.startsWith('-')) {
                careersBullets.push(para.replace(/^[•-]\s*/, ''));
            } else {
                state = 'outro';
                outroParas.push(para);
            }
        } else if (state === 'outro') {
            outroParas.push(para);
        }
    }
    
    return {
        introParas,
        whyChooseTitle,
        whyChooseIntro,
        whyChooseBullets,
        careersTitle,
        careersBullets,
        outroParas
    };
}

const getWhyChooseIcon = (index: number) => {
    switch (index) {
        case 0: return <Cpu className="size-5" style={{ color: '#D99F60' }} />;
        case 1: return <Brain className="size-5" style={{ color: '#D99F60' }} />;
        case 2: return <TrendingUp className="size-5" style={{ color: '#D99F60' }} />;
        case 3: return <PlayCircle className="size-5" style={{ color: '#D99F60' }} />;
        case 4: return <Database className="size-5" style={{ color: '#D99F60' }} />;
        case 5: return <BookOpen className="size-5" style={{ color: '#D99F60' }} />;
        case 6: return <Users className="size-5" style={{ color: '#D99F60' }} />;
        default: return <Award className="size-5" style={{ color: '#D99F60' }} />;
    }
};

const getCareerIcon = (index: number) => {
    switch (index) {
        case 0: return <Wrench className="size-6 text-white" />;
        case 1: return <BookOpen className="size-6 text-white" />;
        case 2: return <Lightbulb className="size-6 text-white" />;
        default: return <Award className="size-6 text-white" />;
    }
};

export function KaprodiWelcomeSection({ greeting }: KaprodiWelcomeSectionProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const kaprodiName = greeting.name || 'Dr. Femi Yulianti, S.Si., M.T., CPLM., ESLog.';
    const kaprodiPhoto = greeting.photo || '/images/dosen/Femi Yulianti.png';
    const fullMessage = greeting.full_message?.[l] || '';

    const parsed = parseWelcomeMessage(fullMessage);
    const hasSpecialSections = parsed.whyChooseBullets.length > 0 || parsed.careersBullets.length > 0;

    // Parse Outro Sections
    let careerText = '';
    let messageTitle = '';
    let messageBody = '';
    let invitationText = '';

    for (const para of parsed.outroParas) {
        if (para.includes('peluang berkarier') || para.includes('career opportunities') || para.includes('Lulusan memiliki')) {
            careerText = para;
        } else if (para.includes('Belajar, Berkembang') || para.includes('Learn, Grow')) {
            messageTitle = para;
        } else if (para.includes('Saya percaya') || para.includes('I believe') || para.includes('pendidikan yang baik')) {
            messageBody = para;
        } else if (para.includes('Kami mengundang') || para.includes('We invite you') || para.includes('menjadi bagian')) {
            invitationText = para;
        }
    }

    // Extract roles from careerText
    let roles: string[] = [];
    if (careerText) {
        if (l === 'id') {
            const match = careerText.match(/sebagai\s+(.+?)\s+di/i) || careerText.match(/sebagai\s+(.+)/i);
            if (match && match[1]) {
                roles = match[1].split(/, hingga|,|dan/).map(r => r.trim()).filter(r => r.length > 0 && r !== 'hingga' && r !== 'dan');
            }
        } else {
            const match = careerText.match(/as\s+(.+?)\s+in/i) || careerText.match(/as\s+(.+)/i);
            if (match && match[1]) {
                roles = match[1].split(/, or|,|and/).map(r => r.trim()).filter(r => r.length > 0 && r !== 'or' && r !== 'and');
            }
        }
    }

    return (
        <section className="bg-surface-0 relative py-20 scroll-mt-24" id="welcome-message">
            <div className="mx-auto max-w-[1100px] px-6">
                
                {/* ── SECTION HEADER ── */}
                <Reveal>
                    <div className="mb-14 text-center md:text-left">
                        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                            {l === 'id' ? 'Sambutan Kaprodi' : 'Head of Program Welcome'}
                        </span>
                        <h2 className="font-display text-ink-900 text-3xl font-semibold sm:text-4xl">
                            {l === 'id' ? 'Sambutan Ketua Program Studi' : 'Welcoming Message'}
                        </h2>
                    </div>
                </Reveal>

                {/* ── UPPER ROW: PHOTO & INTRODUCTION ── */}
                <div className="grid gap-10 md:grid-cols-12 items-start mb-16">
                    {/* Left Column: Portrait Card */}
                    <div className="md:col-span-4 flex flex-col items-center md:sticky md:top-28">
                        <Reveal delay={0.08}>
                            <div className="w-full max-w-[280px] md:max-w-none overflow-hidden rounded-3xl border shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                                style={{ borderColor: 'rgba(172,149,135,0.25)', background: '#FFFDFB' }}>
                                <div className="aspect-[4/5] overflow-hidden relative bg-surface-50">
                                    <img 
                                        src={kaprodiPhoto} 
                                        alt={kaprodiName} 
                                        className="absolute inset-0 size-full object-cover object-top" 
                                    />
                                    <div className="pointer-events-none absolute inset-0" 
                                        style={{ background: 'linear-gradient(to top, rgba(36,20,31,0.4) 0%, transparent 60%)' }} 
                                    />
                                </div>
                                <div className="p-6 text-center md:text-left">
                                    <h3 className="font-display text-ink-900 text-lg font-bold leading-snug">{kaprodiName}</h3>
                                    <p className="text-xs font-semibold mt-1.5" style={{ color: '#8C6441' }}>
                                        <LangText text={greeting.attribution} />
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Quote & Main Intro */}
                    <div className="md:col-span-8 space-y-6">
                        <Reveal delay={0.12}>
                            <div className="rounded-3xl p-8" 
                                style={{ background: 'rgba(217,159,96,0.06)', borderLeft: '4px solid #D99F60' }}>
                                <span className="font-display text-4xl leading-none font-bold text-amber-500 block -mt-2">"</span>
                                <p className="font-display text-ink-900 text-lg leading-relaxed font-medium italic -mt-2">
                                    <LangText text={greeting.quote} />
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <div className="space-y-5 text-navy-700 text-sm leading-[1.85] text-justify">
                                {hasSpecialSections ? (
                                    parsed.introParas.map((para, i) => (
                                        <p key={i} style={{ color: '#24141F' }}>{para}</p>
                                    ))
                                ) : (
                                    // Fallback if formatting changes
                                    fullMessage.split('\n').map((para, i) =>
                                        para.trim() === '' ? null : (
                                            <p key={i} className={para.startsWith('•') ? 'pl-4' : ''} style={{ color: '#24141F' }}>
                                                {para}
                                            </p>
                                        )
                                    )
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* ── LOWER ROW: SPECIAL SECTIONS (WHY CHOOSE & CAREERS) ── */}
                {hasSpecialSections && (
                    <div className="space-y-16 mt-8">
                        
                        {/* ── 1. MENGAPA MEMILIH (WHY CHOOSE) ── */}
                        {parsed.whyChooseBullets.length > 0 && (
                            <div className="space-y-8">
                                <Reveal>
                                    <div className="border-t border-cream-300/40 pt-12">
                                        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                                            <Sparkles className="size-5" style={{ color: '#D99F60' }} />
                                            <h3 className="font-display text-ink-900 text-xl font-bold">
                                                {parsed.whyChooseTitle}
                                            </h3>
                                        </div>
                                        {parsed.whyChooseIntro && (
                                            <p className="text-sm text-navy-600 max-w-2xl text-center md:text-left">
                                                {parsed.whyChooseIntro}
                                            </p>
                                        )}
                                    </div>
                                </Reveal>

                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                                    {parsed.whyChooseBullets.map((bullet, i) => (
                                        <Reveal key={i} delay={0.05 * i} className="h-full">
                                            <div className="flex gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] h-full items-start"
                                                style={{ 
                                                    borderColor: 'rgba(172,149,135,0.18)', 
                                                    background: 'rgba(255,253,251,0.6)' 
                                                }}>
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                                                    style={{ background: 'rgba(217,159,96,0.11)' }}>
                                                    {getWhyChooseIcon(i)}
                                                </div>
                                                <p className="text-sm font-medium leading-relaxed" style={{ color: '#24141F' }}>
                                                    {bullet}
                                                </p>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── 2. MEMPERSIAPKAN KARIER (CAREER TRACKS) ── */}
                        {parsed.careersBullets.length > 0 && (
                            <div className="space-y-8">
                                <Reveal>
                                    <div className="border-t border-cream-300/40 pt-12">
                                        <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                            <Briefcase className="size-5" style={{ color: '#D99F60' }} />
                                            <h3 className="font-display text-ink-900 text-xl font-bold">
                                                {parsed.careersTitle}
                                            </h3>
                                        </div>
                                    </div>
                                </Reveal>

                                <div className="grid gap-6 md:grid-cols-3 items-stretch">
                                    {parsed.careersBullets.map((bullet, i) => {
                                        const parts = bullet.split(',');
                                        const trackName = parts[0]?.trim();
                                        const trackDesc = parts.slice(1).join(',').trim();

                                        return (
                                            <Reveal key={i} delay={0.08 * i} className="h-full">
                                                <div className="flex flex-col h-full rounded-2xl border p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                                                    style={{ 
                                                        borderColor: 'rgba(172,149,135,0.18)', 
                                                        background: 'rgba(255,253,251,0.6)' 
                                                    }}>
                                                    <div className="flex size-12 items-center justify-center rounded-2xl mb-4 shadow-sm shrink-0"
                                                        style={{ background: 'linear-gradient(135deg, #6E4E33 0%, #8C6441 100%)' }}>
                                                        {getCareerIcon(i)}
                                                    </div>
                                                    <h4 className="font-display text-ink-900 text-base font-bold mb-2">
                                                        {trackName}
                                                    </h4>
                                                    <p className="text-xs text-navy-700 leading-relaxed flex-1">
                                                        {trackDesc}
                                                    </p>
                                                </div>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── 3. ELEGANT REDESIGNED OUTRO & CTA SECTIONS ── */}
                        {parsed.outroParas.length > 0 && (
                            <div className="space-y-8 border-t border-cream-300/40 pt-12">
                                {/* Career prospects grid item (Role Tags) */}
                                {careerText && (
                                    <Reveal>
                                        <div className="rounded-3xl border p-8 space-y-6 transition-shadow hover:shadow-md"
                                            style={{ borderColor: 'rgba(172,149,135,0.18)', background: 'rgba(255,253,251,0.6)' }}>
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="size-5" style={{ color: '#D99F60' }} />
                                                <h4 className="font-display text-ink-900 text-lg font-bold">
                                                    {l === 'id' ? 'Prospek Karier & Alumni' : 'Career Prospects & Alumni'}
                                                </h4>
                                            </div>
                                            <p className="text-sm text-navy-700 leading-relaxed">
                                                {l === 'id'
                                                    ? 'Lulusan Program Studi S1 Teknik Logistik memiliki peluang karier yang sangat luas dan strategis di berbagai sektor industri modern. Profesi lulusan meliputi:'
                                                    : 'Graduates of the S1 Logistics Engineering program enjoy broad and strategic career opportunities across modern industrial sectors. Graduate professions include:'}
                                            </p>
                                            {roles.length > 0 && (
                                                <div className="flex flex-wrap gap-2.5">
                                                    {roles.map((role, idx) => (
                                                        <div key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors hover:border-amber-400 hover:bg-amber-50/20"
                                                            style={{ borderColor: 'rgba(140,100,65,0.20)', background: '#FFFDFB', color: '#6E4E33' }}>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                            {role}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Reveal>
                                )}

                                {/* Personal Message Letter from Kaprodi */}
                                {messageBody && (
                                    <Reveal>
                                        <div className="rounded-3xl border p-8 space-y-6 relative overflow-hidden transition-shadow hover:shadow-md"
                                            style={{ borderColor: 'rgba(140,100,65,0.25)', background: 'rgba(255,253,251,0.90)' }}>
                                            {/* Decorative layout background blur */}
                                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: '#D99F60' }} />
                                            
                                            {messageTitle && (
                                                <h4 className="font-display text-ink-900 text-xl font-bold tracking-tight border-b pb-4" style={{ borderColor: 'rgba(172,149,135,0.15)' }}>
                                                    {messageTitle}
                                                </h4>
                                            )}
                                            
                                            <p className="text-sm text-navy-800 leading-[1.85] italic text-justify">
                                                "{messageBody}"
                                            </p>
                                            
                                            <div className="flex flex-col items-end pt-2 text-right">
                                                <p className="text-xs font-semibold text-navy-500">{l === 'id' ? 'Salam hangat,' : 'Warm regards,'}</p>
                                                <p className="font-display text-sm font-bold text-ink-900 mt-1">{kaprodiName}</p>
                                                <p className="text-[11px] font-medium text-navy-500 mt-0.5"><LangText text={greeting.attribution} /></p>
                                            </div>
                                        </div>
                                    </Reveal>
                                )}

                                {/* Enrollment CTA Banner */}
                                {invitationText && (
                                    <Reveal>
                                        <div className="rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-lg border transition-transform duration-500 hover:scale-[1.005]"
                                            style={{ 
                                                background: 'linear-gradient(135deg, #24141F 0%, #3D2335 50%, #6E4E33 100%)',
                                                borderColor: 'rgba(217,159,96,0.20)'
                                            }}>
                                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent pointer-events-none" />
                                            
                                            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                                                <h4 className="font-display text-white text-xl md:text-2xl font-bold leading-snug">
                                                    {l === 'id' ? 'Mari Bergabung dengan S1 Teknik Logistik' : 'Join S1 Logistics Engineering'}
                                                </h4>
                                                <p className="text-sm leading-[1.75]" style={{ color: 'rgba(255, 253, 251, 0.90)' }}>
                                                    {invitationText}
                                                </p>
                                                <div className="pt-2 flex flex-wrap justify-center gap-4">
                                                    <a href="/kontak" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-white text-navy-950 transition-all duration-300 hover:bg-amber-100 hover:scale-105 shadow-md">
                                                        {l === 'id' ? 'Hubungi Layanan Prodi' : 'Contact Us'}
                                                        <Mail className="size-3.5" />
                                                    </a>
                                                    <a href="https://smb.telkomuniversity.ac.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold border text-white transition-all duration-300 hover:bg-white/10 hover:scale-105"
                                                        style={{ borderColor: 'rgba(255,255,251,0.30)' }}>
                                                        {l === 'id' ? 'Info Pendaftaran SMB' : 'Admissions Info'}
                                                        <ArrowRight className="size-3.5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
