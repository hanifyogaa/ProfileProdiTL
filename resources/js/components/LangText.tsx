import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';

export function LangText({ text }: { text: Bilingual }) {
    const { t } = useLocale();

    return <>{t(text)}</>;
}
