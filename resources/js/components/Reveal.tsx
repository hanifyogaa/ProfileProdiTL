import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

export type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    /** Vertical offset for fade-up/fade-down (default 24px) */
    y?: number;
    /** Animation variant (default: fade-up) */
    variant?: RevealVariant;
    /** Intersection threshold (default 0.15) */
    threshold?: number;
}

type MotionValues = Record<string, number | string>;

function getVariantConfig(variant: RevealVariant, y: number): { initial: MotionValues; animate: MotionValues } {
    switch (variant) {
        case 'fade-down':
            return { initial: { opacity: 0, y: -y }, animate: { opacity: 1, y: 0 } };
        case 'fade-left':
            return { initial: { opacity: 0, x: -56 }, animate: { opacity: 1, x: 0 } };
        case 'fade-right':
            return { initial: { opacity: 0, x: 56 }, animate: { opacity: 1, x: 0 } };
        case 'zoom-in':
            return { initial: { opacity: 0, scale: 0.88 }, animate: { opacity: 1, scale: 1 } };
        case 'fade-up':
        default:
            return { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 } };
    }
}

export function Reveal({
    children,
    delay = 0,
    className,
    y = 40,
    variant = 'fade-up',
    threshold = 0.12,
}: RevealProps) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, inView } = useInView({ triggerOnce: true, threshold });

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const { initial, animate } = getVariantConfig(variant, y);

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={inView ? animate : undefined}
            transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
