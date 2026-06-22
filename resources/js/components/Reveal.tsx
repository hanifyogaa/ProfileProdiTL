import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    y?: number;
}

export function Reveal({
    children,
    delay = 0,
    className,
    y = 24,
}: RevealProps) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
