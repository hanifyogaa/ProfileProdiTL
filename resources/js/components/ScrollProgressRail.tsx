import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SECTIONS = [
    'hero',
    'stats',
    'distinctiveness',
    'greeting',
    'featured',
    'news',
    'curriculum',
    'career',
    'achievements',
    'tracer',
    'labs',
    'partners',
    'cta',
];

export function ScrollProgressRail() {
    const shouldReduceMotion = useReducedMotion();
    const [activeId, setActiveId] = useState(SECTIONS[0]);

    useEffect(() => {
        const onScroll = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestId = SECTIONS[0];
            let closestDistance = Infinity;

            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestId = id;
                }
            }

            setActiveId(closestId);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    };

    return (
        <div className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex">
            {SECTIONS.map((id) => {
                const isActive = id === activeId;
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => scrollToSection(id)}
                        aria-label={`Go to section: ${id}`}
                        aria-current={isActive}
                        className="group flex items-center justify-center p-1"
                    >
                        <span
                            className={`block rounded-full transition-all duration-300 ${
                                isActive
                                    ? 'h-2.5 w-2.5 bg-amber-500'
                                    : 'bg-cream-300/50 group-hover:bg-cream-300 h-1.5 w-1.5'
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}
