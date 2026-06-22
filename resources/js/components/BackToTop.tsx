import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
    const shouldReduceMotion = useReducedMotion();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="border-cream-300/40 bg-surface-0 text-brand-700 hover:bg-brand-700 hover:text-surface-0 fixed right-6 bottom-6 z-40 flex size-11 items-center justify-center rounded-full border shadow-[0_8px_24px_-10px_rgba(36,20,31,0.25)] transition-colors"
                >
                    <ChevronUp className="size-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
