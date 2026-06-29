<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use Illuminate\Contracts\Support\Htmlable;

class WebsiteSettings extends Page
{
    protected string $view = 'filament.pages.website-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;
    protected static ?string $navigationLabel = 'Pengaturan Website';
    protected static ?int $navigationSort = 1;

    // ── Form state properties ────────────────────────────────────────────
    // Hero
    public string $hero_eyebrow_id  = '';
    public string $hero_eyebrow_en  = '';
    public string $hero_title_id    = '';
    public string $hero_title_en    = '';
    public string $hero_subtitle_id = '';
    public string $hero_subtitle_en = '';
    public string $hero_primary_cta_label_id   = '';
    public string $hero_primary_cta_label_en   = '';
    public string $hero_primary_cta_href       = '';
    public string $hero_secondary_cta_label_id = '';
    public string $hero_secondary_cta_label_en = '';
    public string $hero_secondary_cta_href     = '';

    // Site Meta
    public string $meta_name    = '';
    public string $meta_address = '';

    // Contact
    public string $contact_email = '';
    public string $contact_phone = '';

    // Socials
    public string $social_instagram = '';
    public string $social_line      = '';
    public string $social_tiktok    = '';

    // Greeting / Kaprodi
    public string $greeting_name             = '';
    public string $greeting_photo            = '';
    public string $greeting_quote_id         = '';
    public string $greeting_quote_en         = '';
    public string $greeting_attribution_id   = '';
    public string $greeting_attribution_en   = '';
    public string $greeting_link_href        = '';
    public string $greeting_full_message_id  = '';
    public string $greeting_full_message_en  = '';

    // Tracer Study
    public string $tracer_caption_id = '';
    public string $tracer_caption_en = '';
    public array  $tracer_series     = [];

    // Career Prospects
    public string $prospects_heading_id = '';
    public string $prospects_heading_en = '';
    public array  $prospects_tracks     = [];

    // Distinctiveness
    public string $distinct_heading_id = '';
    public string $distinct_heading_en = '';
    public string $distinct_body_id    = '';
    public string $distinct_body_en    = '';
    public string $distinct_link_href  = '';
    public array  $distinct_points     = [];

    // About Content (Visi, Misi, History)
    public string $about_visi_id    = '';
    public string $about_visi_en    = '';
    public array  $about_misi       = [];
    public string $about_history_id = '';
    public string $about_history_en = '';

    // Accreditation
    public string $accred_body_name = '';
    public string $accred_status_id = '';
    public string $accred_status_en = '';
    public string $accred_desc_id   = '';
    public string $accred_desc_en   = '';
    public array  $accred_decrees   = [];

    // Research Areas
    public array $research_areas = [];

    // MBKM
    public string $mbkm_desc_id  = '';
    public string $mbkm_desc_en  = '';
    public array  $mbkm_programs = [];

    // Curriculum Summary
    public int    $curriculum_total_sks = 145;
    public int    $curriculum_semesters = 8;

    // Section visibility toggles
    public bool $visible_tracer = false;
    public bool $visible_cta    = true;

    // ── Boot ────────────────────────────────────────────────────────────
    public function mount(): void
    {
        $hero       = Setting::getValue('hero', []);
        $meta       = Setting::getValue('site_meta', []);
        $contact    = Setting::getValue('contact', []);
        $socials    = Setting::getValue('socials', []);
        $greeting   = Setting::getValue('greeting', []);
        $tracer     = Setting::getValue('tracer_stats', []);
        $prospects  = Setting::getValue('prospects', []);
        $distinct   = Setting::getValue('distinctiveness', []);

        $this->hero_eyebrow_id  = $hero['eyebrow']['id']  ?? '';
        $this->hero_eyebrow_en  = $hero['eyebrow']['en']  ?? '';
        $this->hero_title_id    = $hero['title']['id']    ?? '';
        $this->hero_title_en    = $hero['title']['en']    ?? '';
        $this->hero_subtitle_id = $hero['subtitle']['id'] ?? '';
        $this->hero_subtitle_en = $hero['subtitle']['en'] ?? '';
        $this->hero_primary_cta_label_id   = $hero['primary_cta']['label']['id']   ?? '';
        $this->hero_primary_cta_label_en   = $hero['primary_cta']['label']['en']   ?? '';
        $this->hero_primary_cta_href       = $hero['primary_cta']['href']          ?? '';
        $this->hero_secondary_cta_label_id = $hero['secondary_cta']['label']['id'] ?? '';
        $this->hero_secondary_cta_label_en = $hero['secondary_cta']['label']['en'] ?? '';
        $this->hero_secondary_cta_href     = $hero['secondary_cta']['href']        ?? '';

        $this->meta_name    = $meta['name']    ?? '';
        $this->meta_address = $meta['address'] ?? '';

        $this->contact_email = $contact['email'] ?? '';
        $this->contact_phone = $contact['phone'] ?? '';

        $this->social_instagram = $socials['instagram'] ?? '';
        $this->social_line      = $socials['line']      ?? '';
        $this->social_tiktok    = $socials['tiktok']    ?? '';

        $this->greeting_name           = $greeting['name']             ?? '';
        $this->greeting_photo          = $greeting['photo']            ?? '';
        $this->greeting_quote_id       = $greeting['quote']['id']      ?? '';
        $this->greeting_quote_en       = $greeting['quote']['en']      ?? '';
        $this->greeting_attribution_id = $greeting['attribution']['id'] ?? '';
        $this->greeting_attribution_en = $greeting['attribution']['en'] ?? '';
        $this->greeting_link_href      = $greeting['link_href']         ?? '';
        $this->greeting_full_message_id = $greeting['full_message']['id'] ?? '';
        $this->greeting_full_message_en = $greeting['full_message']['en'] ?? '';

        $this->tracer_caption_id = $tracer['caption']['id'] ?? '';
        $this->tracer_caption_en = $tracer['caption']['en'] ?? '';
        $this->tracer_series     = $tracer['series']        ?? [];

        $this->prospects_heading_id = $prospects['heading']['id'] ?? '';
        $this->prospects_heading_en = $prospects['heading']['en'] ?? '';
        $this->prospects_tracks     = $prospects['tracks']        ?? [];

        $this->distinct_heading_id = $distinct['heading']['id'] ?? '';
        $this->distinct_heading_en = $distinct['heading']['en'] ?? '';
        $this->distinct_body_id    = $distinct['body']['id']    ?? '';
        $this->distinct_body_en    = $distinct['body']['en']    ?? '';
        $this->distinct_link_href  = $distinct['link_href']     ?? '';
        $this->distinct_points     = $distinct['points']        ?? [];

        // About Content
        $about = Setting::getValue('about_content', []);
        $this->about_visi_id    = $about['visi']['id']    ?? '';
        $this->about_visi_en    = $about['visi']['en']    ?? '';
        $this->about_misi       = $about['misi']          ?? [];
        $this->about_history_id = $about['history']['id'] ?? '';
        $this->about_history_en = $about['history']['en'] ?? '';

        // Accreditation
        $accred = Setting::getValue('accreditation', []);
        $this->accred_body_name = $accred['body_name']          ?? 'LAM Teknik';
        $this->accred_status_id = $accred['status']['id']       ?? '';
        $this->accred_status_en = $accred['status']['en']       ?? '';
        $this->accred_desc_id   = $accred['description']['id']  ?? '';
        $this->accred_desc_en   = $accred['description']['en']  ?? '';
        $this->accred_decrees   = $accred['decrees']            ?? [];

        // Research Areas
        $research = Setting::getValue('research_areas', []);
        $this->research_areas = $research['areas'] ?? [];

        // MBKM
        $mbkm = Setting::getValue('mbkm_content', []);
        $this->mbkm_desc_id  = $mbkm['description']['id'] ?? '';
        $this->mbkm_desc_en  = $mbkm['description']['en'] ?? '';
        $this->mbkm_programs = $mbkm['programs']          ?? [];

        // Curriculum Summary
        $curr = Setting::getValue('curriculum_summary', []);
        $this->curriculum_total_sks = (int) ($curr['total_sks'] ?? 145);
        $this->curriculum_semesters = (int) ($curr['semesters'] ?? 8);

        // Section visibility
        $visibleSections = Setting::getValue('visible_sections', []);
        $this->visible_tracer = $visibleSections['tracer'] ?? false;
        $this->visible_cta    = $visibleSections['cta']    ?? true;
    }

    public static function getNavigationGroup(): string|null { return 'Pengaturan'; }

    public function getTitle(): string|Htmlable
    {
        return 'Pengaturan Website';
    }

    // Exposed for the Blade view to iterate repeaters
    public function addTracerSeries(): void
    {
        $this->tracer_series[] = ['year' => '', 'employment_rate' => ''];
    }

    public function removeTracerSeries(int $index): void
    {
        array_splice($this->tracer_series, $index, 1);
        $this->tracer_series = array_values($this->tracer_series);
    }

    public function addProspectsTrack(): void
    {
        $this->prospects_tracks[] = ['title_id' => '', 'title_en' => '', 'description_id' => '', 'description_en' => ''];
    }

    public function removeProspectsTrack(int $index): void
    {
        array_splice($this->prospects_tracks, $index, 1);
        $this->prospects_tracks = array_values($this->prospects_tracks);
    }

    public function addDistinctPoint(): void
    {
        $this->distinct_points[] = ['title_id' => '', 'title_en' => '', 'description_id' => '', 'description_en' => ''];
    }

    public function removeDistinctPoint(int $index): void
    {
        array_splice($this->distinct_points, $index, 1);
        $this->distinct_points = array_values($this->distinct_points);
    }

    public function addAboutMisi(): void
    {
        $this->about_misi[] = ['id' => '', 'en' => ''];
    }

    public function removeAboutMisi(int $index): void
    {
        array_splice($this->about_misi, $index, 1);
        $this->about_misi = array_values($this->about_misi);
    }

    public function addAccredDecree(): void
    {
        $this->accred_decrees[] = [
            'title'       => ['id' => '', 'en' => ''],
            'number'      => '',
            'description' => ['id' => '', 'en' => ''],
        ];
    }

    public function removeAccredDecree(int $index): void
    {
        array_splice($this->accred_decrees, $index, 1);
        $this->accred_decrees = array_values($this->accred_decrees);
    }

    public function addResearchArea(): void
    {
        $this->research_areas[] = [
            'icon'        => 'code',
            'title'       => ['id' => '', 'en' => ''],
            'description' => ['id' => '', 'en' => ''],
        ];
    }

    public function removeResearchArea(int $index): void
    {
        array_splice($this->research_areas, $index, 1);
        $this->research_areas = array_values($this->research_areas);
    }

    public function addMbkmProgram(): void
    {
        $this->mbkm_programs[] = [
            'title'       => ['id' => '', 'en' => ''],
            'description' => ['id' => '', 'en' => ''],
        ];
    }

    public function removeMbkmProgram(int $index): void
    {
        array_splice($this->mbkm_programs, $index, 1);
        $this->mbkm_programs = array_values($this->mbkm_programs);
    }

    // ── Save ─────────────────────────────────────────────────────────────
    protected function getHeaderActions(): array
    {
        return [
            Action::make('save')
                ->label('Simpan Pengaturan')
                ->icon(Heroicon::OutlinedCheck)
                ->color('primary')
                ->action('save'),
        ];
    }

    public function save(): void
    {
        // Hero
        Setting::updateOrCreate(['key' => 'hero'], ['value' => [
            'eyebrow'       => ['id' => $this->hero_eyebrow_id,  'en' => $this->hero_eyebrow_en],
            'title'         => ['id' => $this->hero_title_id,    'en' => $this->hero_title_en],
            'subtitle'      => ['id' => $this->hero_subtitle_id, 'en' => $this->hero_subtitle_en],
            'image'         => null,
            'primary_cta'   => ['label' => ['id' => $this->hero_primary_cta_label_id,   'en' => $this->hero_primary_cta_label_en],   'href' => $this->hero_primary_cta_href],
            'secondary_cta' => ['label' => ['id' => $this->hero_secondary_cta_label_id, 'en' => $this->hero_secondary_cta_label_en], 'href' => $this->hero_secondary_cta_href],
        ]]);

        // Site Meta
        Setting::updateOrCreate(['key' => 'site_meta'], ['value' => [
            'name'    => $this->meta_name,
            'address' => $this->meta_address,
        ]]);

        // Contact
        Setting::updateOrCreate(['key' => 'contact'], ['value' => [
            'email' => $this->contact_email,
            'phone' => $this->contact_phone,
        ]]);

        // Socials
        Setting::updateOrCreate(['key' => 'socials'], ['value' => [
            'instagram' => $this->social_instagram,
            'line'      => $this->social_line,
            'tiktok'    => $this->social_tiktok,
        ]]);

        // Greeting
        Setting::updateOrCreate(['key' => 'greeting'], ['value' => [
            'name'        => $this->greeting_name ?: null,
            'photo'       => $this->greeting_photo ?: null,
            'quote'       => ['id' => $this->greeting_quote_id,       'en' => $this->greeting_quote_en],
            'attribution' => ['id' => $this->greeting_attribution_id, 'en' => $this->greeting_attribution_en],
            'link_href'   => $this->greeting_link_href ?: null,
            'full_message'=> ['id' => $this->greeting_full_message_id, 'en' => $this->greeting_full_message_en],
        ]]);

        // Tracer Stats
        Setting::updateOrCreate(['key' => 'tracer_stats'], ['value' => [
            'caption' => ['id' => $this->tracer_caption_id, 'en' => $this->tracer_caption_en],
            'series'  => $this->tracer_series,
        ]]);

        // Prospects
        Setting::updateOrCreate(['key' => 'prospects'], ['value' => [
            'heading' => ['id' => $this->prospects_heading_id, 'en' => $this->prospects_heading_en],
            'tracks'  => $this->prospects_tracks,
        ]]);

        // Distinctiveness
        Setting::updateOrCreate(['key' => 'distinctiveness'], ['value' => [
            'heading'   => ['id' => $this->distinct_heading_id, 'en' => $this->distinct_heading_en],
            'body'      => ['id' => $this->distinct_body_id,    'en' => $this->distinct_body_en],
            'link_href' => $this->distinct_link_href ?: null,
            'points'    => $this->distinct_points,
        ]]);

        // About Content
        Setting::updateOrCreate(['key' => 'about_content'], ['value' => [
            'visi'    => ['id' => $this->about_visi_id,    'en' => $this->about_visi_en],
            'misi'    => $this->about_misi,
            'history' => ['id' => $this->about_history_id, 'en' => $this->about_history_en],
        ]]);

        // Accreditation
        Setting::updateOrCreate(['key' => 'accreditation'], ['value' => [
            'body_name'   => $this->accred_body_name,
            'status'      => ['id' => $this->accred_status_id, 'en' => $this->accred_status_en],
            'description' => ['id' => $this->accred_desc_id,   'en' => $this->accred_desc_en],
            'decrees'     => $this->accred_decrees,
        ]]);

        // Research Areas
        Setting::updateOrCreate(['key' => 'research_areas'], ['value' => [
            'areas' => $this->research_areas,
        ]]);

        // MBKM
        Setting::updateOrCreate(['key' => 'mbkm_content'], ['value' => [
            'description' => ['id' => $this->mbkm_desc_id, 'en' => $this->mbkm_desc_en],
            'programs'    => $this->mbkm_programs,
        ]]);

        // Curriculum Summary (preserve pdf_url)
        $existingCurr = Setting::getValue('curriculum_summary', []);
        Setting::updateOrCreate(['key' => 'curriculum_summary'], ['value' => [
            'total_sks' => $this->curriculum_total_sks,
            'semesters' => $this->curriculum_semesters,
            'pdf_url'   => $existingCurr['pdf_url'] ?? null,
        ]]);

        // Section visibility
        Setting::updateOrCreate(['key' => 'visible_sections'], ['value' => [
            'tracer' => $this->visible_tracer,
            'cta'    => $this->visible_cta,
        ]]);

        Notification::make()
            ->title('Pengaturan berhasil disimpan')
            ->success()
            ->send();
    }
}
