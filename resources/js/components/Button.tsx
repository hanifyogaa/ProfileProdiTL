import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

interface ButtonProps {
    href: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    children: ReactNode;
    className?: string;
}

const variants = {
    primary:
        'rounded-full bg-brand-700 text-surface-0 hover:bg-brand-800 px-6 min-h-11 hover:ring-2 hover:ring-amber-500/40 hover:ring-offset-2 focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2',
    secondary:
        'rounded-full bg-surface-0 border border-cream-300 text-brand-700 hover:border-amber-600 hover:text-amber-600 px-6 min-h-11',
    tertiary:
        'relative pb-1 text-brand-700 group flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full',
};

export function Button({
    href,
    variant = 'primary',
    children,
    className,
}: ButtonProps) {
    const classes = cn(
        'inline-flex items-center justify-center gap-2 font-sans font-semibold transition-colors',
        variants[variant],
        className,
    );

    if (href.startsWith('http')) {
        return (
            <a
                href={href}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}
