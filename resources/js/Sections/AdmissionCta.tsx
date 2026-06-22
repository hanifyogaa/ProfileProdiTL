import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';

export function AdmissionCta() {
    const { locale, t } = useLocale();

    return (
        <section className="bg-surface-0 text-ink-900 relative overflow-hidden py-20">
            <div className="mx-auto max-w-[800px] px-6 text-center">
                <Reveal>
                    <span className="text-brand-700 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase">
                        <span
                            className="bg-brand-700/80 inline-block h-[2px] w-[18px] rounded-full"
                            aria-hidden="true"
                        />
                        {locale === 'id'
                            ? 'Penerimaan Mahasiswa Baru'
                            : 'Admissions Open'}
                    </span>

                    <h2 className="font-display text-ink-900 mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
                        {locale === 'id'
                            ? 'Siap Menjadi Insinyur Logistik Masa Depan?'
                            : 'Ready to Become a Future Logistics Engineer?'}
                    </h2>

                    <p className="text-navy-700 mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                        {locale === 'id'
                            ? 'Bergabunglah bersama kami di prodi Teknik Logistik Telkom University dan kuasai keahlian rantai pasok digital masa depan.'
                            : 'Join us at Telkom University Logistics Engineering and master the digital supply chain skills of tomorrow.'}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Button
                            href="https://smb.telkomuniversity.ac.id/"
                            variant="primary"
                            className="bg-brand-700 hover:bg-brand-800 text-surface-0 shadow-sm"
                        >
                            {t({ id: 'Daftar Sekarang', en: 'Apply Now' })}
                        </Button>
                        <Button
                            href="/kontak"
                            variant="secondary"
                            className="border-brand-700 text-brand-700 hover:bg-brand-700 hover:text-surface-0"
                        >
                            {t({ id: 'Hubungi Kami', en: 'Contact Us' })}
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
