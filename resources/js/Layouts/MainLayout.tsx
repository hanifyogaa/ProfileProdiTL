import { Footer } from '@/Sections/Footer';
import { Navbar } from '@/Sections/Navbar';
import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
    /** Pass true for pages that open with a fullscreen cinematic hero — removes top padding and signals Navbar to use light text */
    fullHero?: boolean;
}

export function MainLayout({ children, fullHero = false }: MainLayoutProps) {
    const { props } = usePage();

    // Read shared settings from Inertia props with dynamic fallback values
    const settings = (props.settings as any) || {
        site_meta: {
            name: 'Teknik Logistik · Digital Supply Chain',
            address: 'Fakultas Rekayasa Industri, Telkom University',
            accreditation_badge: null,
        },
        socials: {
            instagram: 'https://instagram.com/disca.telkomuniv',
            line: null,
            tiktok: null,
        },
        contact: {
            email: 'disca@telkomuniversity.ac.id',
            phone: '+62 22 756 4108',
        },
    };

    return (
        <div className="bg-surface-50 text-ink-900 flex min-h-screen flex-col font-sans antialiased">
            <Navbar lightOnTop={fullHero} />

            <main className={`flex-1 pb-12 ${fullHero ? '' : 'pt-24'}`}>{children}</main>

            <Footer settings={settings} />
        </div>
    );
}
export default MainLayout;
