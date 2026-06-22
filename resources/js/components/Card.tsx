import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Card({
    children,
    className,
    glass,
}: {
    children: ReactNode;
    className?: string;
    glass?: boolean;
}) {
    return (
        <div
            className={cn(
                'rounded-2xl border',
                glass
                    ? 'bg-surface-0/55 border-white/50 shadow-[0_10px_30px_-14px_rgba(36,20,31,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md backdrop-saturate-150'
                    : 'border-cream-300/40 bg-surface-0',
                className,
            )}
        >
            {children}
        </div>
    );
}
