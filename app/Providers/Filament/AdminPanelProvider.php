<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use App\Filament\Widgets\ContentOverviewWidget;
use App\Filament\Widgets\DraftNewsWidget;
use App\Filament\Widgets\LatestNewsWidget;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\HtmlString;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('Prodi Teknik Logistik')
            ->colors([
                'primary'   => Color::hex('#D99F60'),
                'gray'      => Color::hex('#6B7280'),
                'danger'    => Color::Rose,
                'info'      => Color::hex('#505666'),
                'success'   => Color::Emerald,
                'warning'   => Color::hex('#C08A4C'),
            ])
            ->font('Plus Jakarta Sans')
            ->renderHook('panels::head.start', fn (): HtmlString => new HtmlString(
                '<link rel="preconnect" href="https://fonts.googleapis.com">'
                . '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
                . '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">'
            ))
            ->renderHook('panels::styles.after', fn (): HtmlString => new HtmlString('
                <style id="tl-admin-theme">
                    /* ── Fonts ── loaded after @filamentStyles so they win cleanly */
                    body.fi-body, body.fi-body * {
                        font-family: "Plus Jakarta Sans", system-ui, sans-serif;
                    }
                    body.fi-body .fi-header-heading,
                    body.fi-body .fi-logo,
                    body.fi-body .fi-simple-header-heading {
                        font-family: "Fraunces", Georgia, serif;
                        letter-spacing: -0.01em;
                    }

                    /* ── Body ── */
                    body.fi-body {
                        background-color: #ECEBE9;
                    }

                    /* ── Topbar ── */
                    body.fi-body .fi-topbar {
                        background-color: #FFFDFB;
                        box-shadow: 0 1px 3px rgba(140,100,65,0.12);
                    }
                    body.fi-body .fi-topbar-start .fi-logo {
                        color: #6E4E33;
                        font-family: "Fraunces", Georgia, serif;
                        font-weight: 700;
                    }

                    /* ── Sidebar ── */
                    body.fi-body .fi-sidebar {
                        background-color: #FFFDFB;
                        border-right: 1px solid rgba(140,100,65,0.15);
                    }
                    body.fi-body .fi-sidebar-header {
                        background: linear-gradient(135deg, #8C6441 0%, #5C3D22 100%);
                        padding: 1rem 1.5rem;
                    }
                    body.fi-body .fi-sidebar-header .fi-logo {
                        color: #FFFDFB;
                        font-family: "Fraunces", Georgia, serif;
                        font-weight: 700;
                    }

                    /* group labels */
                    body.fi-body .fi-sidebar-group-label {
                        color: rgba(140,100,65,0.6);
                        font-size: 0.65rem;
                        font-weight: 700;
                        letter-spacing: 0.12em;
                        text-transform: uppercase;
                    }

                    /* nav item */
                    body.fi-body .fi-sidebar-item-label {
                        color: #3D2B1F;
                        font-weight: 500;
                    }
                    body.fi-body .fi-sidebar-item-icon {
                        color: #C08A4C;
                    }
                    body.fi-body .fi-sidebar-item-btn:hover {
                        background-color: rgba(217,159,96,0.10);
                    }
                    body.fi-body .fi-sidebar-item-btn:hover .fi-sidebar-item-label {
                        color: #6E4E33;
                    }

                    /* active nav item */
                    body.fi-body .fi-sidebar-item.fi-active .fi-sidebar-item-btn {
                        background-color: rgba(140,100,65,0.12);
                    }
                    body.fi-body .fi-sidebar-item.fi-active .fi-sidebar-item-label {
                        color: #8C6441;
                        font-weight: 600;
                    }
                    body.fi-body .fi-sidebar-item.fi-active .fi-sidebar-item-icon {
                        color: #D99F60;
                    }

                    /* group expand button */
                    body.fi-body .fi-sidebar-group-btn:hover {
                        background-color: rgba(217,159,96,0.07);
                    }

                    /* ── Main content area ── */
                    body.fi-body .fi-main {
                        background-color: #ECEBE9;
                    }

                    /* ── Page header ── */
                    body.fi-body .fi-header-heading {
                        color: #24141F;
                    }

                    /* ── Sections / cards ── */
                    body.fi-body .fi-section {
                        background-color: #FFFDFB;
                        border-color: rgba(140,100,65,0.15);
                    }
                    body.fi-body .fi-section-header {
                        border-bottom-color: rgba(140,100,65,0.10);
                    }
                    body.fi-body .fi-section-header-heading {
                        color: #6E4E33;
                    }

                    /* ── Tables ── */
                    body.fi-body .fi-ta-header-cell-label {
                        color: #8C6441;
                        font-size: 0.68rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                    }

                    /* ── Login page ── */
                    body.fi-body .fi-simple-main {
                        background-color: #FFFDFB;
                        border-color: rgba(140,100,65,0.15);
                    }
                    body.fi-body .fi-simple-header-heading {
                        color: #24141F;
                        font-family: "Fraunces", Georgia, serif;
                    }
                </style>
            '))
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                ContentOverviewWidget::class,
                LatestNewsWidget::class,
                DraftNewsWidget::class,
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->navigationGroups([
                'Konten Utama',
                'Akademik',
                'Umum',
                'Pengaturan',
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
