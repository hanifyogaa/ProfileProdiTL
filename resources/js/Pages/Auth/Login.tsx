import InputError from '@/components/InputError';
import { Reveal } from '@/components/Reveal';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const inputCls =
        'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 pl-11 text-sm text-surface-0 placeholder:text-cream-300/40 outline-none transition-colors focus:border-amber-500/60 focus:bg-white/8 focus:ring-1 focus:ring-amber-500/30';

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12" style={{ background: '#1C1119' }}>
            <Head title="Masuk Admin" />

            {/* Ambient background glow — static gradients, no motion to keep it light */}
            <div className="pointer-events-none absolute inset-0" style={{
                background: 'radial-gradient(ellipse 70% 50% at 20% 15%, rgba(217,159,96,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 45% at 85% 85%, rgba(140,100,65,0.14) 0%, transparent 60%)',
            }} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, #D99F60 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }} />

            <Reveal className="relative z-10 w-full max-w-md" variant="fade-up">
                <div
                    className="rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-md sm:p-10"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                    {/* Brand mark */}
                    <Link href="/" className="mb-8 flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl text-base font-bold" style={{ background: '#D99F60', color: '#24141F' }}>
                            TL
                        </span>
                        <div className="leading-tight">
                            <p className="font-display text-sm font-semibold text-surface-0">Teknik Logistik</p>
                            <p className="text-[11px] text-cream-300/60">Telkom University</p>
                        </div>
                    </Link>

                    <h1 className="font-display text-2xl font-bold text-surface-0">Masuk Admin</h1>
                    <p className="mt-1.5 text-sm text-cream-300/70">Kelola konten website Program Studi Teknik Logistik.</p>

                    {status && (
                        <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-7 space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-cream-300/70">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream-300/40" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={inputCls}
                                    autoComplete="username"
                                    autoFocus
                                    placeholder="nama@proditl.ac.id"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.email} className="text-red-400" />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-cream-300/70">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream-300/40" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className={`${inputCls} pr-11`}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream-300/50 transition-colors hover:text-cream-300"
                                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="text-red-400" />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 text-sm text-cream-300/70">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked as false)}
                                    className="size-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-1 focus:ring-amber-500/40 focus:ring-offset-0"
                                />
                                Ingat saya
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-amber-500/90 underline-offset-2 transition-colors hover:text-amber-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:rounded"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:opacity-50"
                            style={{ background: '#D99F60', color: '#24141F' }}
                        >
                            <LogIn className="size-4" />
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-cream-300/40">
                    &copy; {new Date().getFullYear()} Program Studi Teknik Logistik, Telkom University
                </p>
            </Reveal>
        </div>
    );
}
