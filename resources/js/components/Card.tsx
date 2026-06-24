import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    /** Disable glass — falls back to plain opaque surface */
    solid?: boolean;
    /** Suppress the hover lift (for carousel cards, nested contexts) */
    noLift?: boolean;
    /** Custom inline styles */
    style?: React.CSSProperties;
}

export function Card({ children, className, solid = false, noLift = false, style }: CardProps) {
    return (
        <div
            style={style}
            className={cn(
                'rounded-2xl transition-all duration-300',
                solid
                    ? 'border border-cream-300/40 bg-surface-0'
                    : [
                          // Warm glass: semi-transparent warm white with amber inner glow
                          'border border-white/70',
                          'bg-white/55',
                          // Stronger backdrop blur so transparency reads even on light BGs
                          'backdrop-blur-2xl backdrop-saturate-[180%]',
                          // Shadow stack: ambient depth + top-edge highlight + subtle amber inner ring
                          'shadow-[0_4px_28px_-8px_rgba(36,20,31,0.14),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(217,159,96,0.08)]',
                      ],
                !noLift && [
                    'hover:-translate-y-2',
                    solid
                        ? 'hover:shadow-[0_16px_36px_-12px_rgba(36,20,31,0.18)]'
                        : 'hover:shadow-[0_20px_48px_-14px_rgba(36,20,31,0.22),inset_0_1px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(217,159,96,0.15)]',
                ],
                className,
            )}
        >
            {children}
        </div>
    );
}
