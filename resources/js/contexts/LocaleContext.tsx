import type { Bilingual } from '@/types';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

export type Locale = 'id' | 'en';

interface LocaleContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    toggleLocale: () => void;
    t: <T>(text: Bilingual<T>) => T;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'locale';

function getInitialLocale(): Locale {
    if (typeof window === 'undefined') {
        return 'id';
    }

    return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'id';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>(getInitialLocale);

    useEffect(() => {
        document.documentElement.lang = locale;
        window.localStorage.setItem(STORAGE_KEY, locale);
    }, [locale]);

    const toggleLocale = () =>
        setLocale((prev) => (prev === 'id' ? 'en' : 'id'));
    const t = <T,>(text: Bilingual<T>) => text[locale];

    return (
        <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const ctx = useContext(LocaleContext);

    if (!ctx) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }

    return ctx;
}
