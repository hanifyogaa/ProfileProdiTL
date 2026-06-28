<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminSettingsController extends Controller
{
    public function edit()
    {
        $settings = Setting::all()->pluck('value', 'key');

        $keys = [
            'hero', 'distinctiveness', 'greeting', 'prospects',
            'curriculum_summary', 'tracer_stats', 'site_meta',
            'socials', 'contact', 'embed_urls',
            'about_content', 'prodi_stats', 'student_association',
            'accreditation', 'org_structure', 'mbkm_content',
        ];

        foreach ($keys as $key) {
            if (!$settings->has($key)) {
                $settings->put($key, []);
            }
        }

        return Inertia::render('Admin/Settings/Edit', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'hero'                       => 'nullable|array',
            'distinctiveness'            => 'nullable|array',
            'greeting'                   => 'nullable|array',
            'prospects'                  => 'nullable|array',
            'curriculum_summary'         => 'nullable|array',
            'tracer_stats'               => 'nullable|array',
            'site_meta'                  => 'nullable|array',
            'socials'                    => 'nullable|array',
            'contact'                    => 'nullable|array',
            'embed_urls'                 => 'nullable|array',
            'about_content'              => 'nullable|array',
            'prodi_stats'                => 'nullable|array',
            'student_association'        => 'nullable|array',
            'accreditation'              => 'nullable|array',
            'org_structure'              => 'nullable|array',
            'mbkm_content'               => 'nullable|array',
            // File uploads
            'hero_image_file'            => 'nullable|image|max:3072',
            'greeting_photo_file'        => 'nullable|image|max:2048',
            'accreditation_badge_file'   => 'nullable|image|max:2048',
            'curriculum_pdf_file'        => 'nullable|file|mimes:pdf|max:10240',
            'prerequisite_image_file'    => 'nullable|image|max:5120',
            'iabee_badge_file'           => 'nullable|image|max:2048',
            'unggul_badge_file'          => 'nullable|image|max:2048',
            'org_chart_image_file'       => 'nullable|image|max:5120',
            'about_hero_image_file'      => 'nullable|image|max:3072',
            'contact_hero_image_file'    => 'nullable|image|max:3072',
            'curriculum_hero_image_file' => 'nullable|image|max:3072',
            'statistics_hero_image_file' => 'nullable|image|max:3072',
            'mbkm_hero_image_file'       => 'nullable|image|max:3072',
        ]);

        $settings = Setting::all()->pluck('value', 'key');

        $keys = [
            'hero', 'distinctiveness', 'greeting', 'prospects',
            'curriculum_summary', 'tracer_stats', 'site_meta',
            'socials', 'contact', 'embed_urls',
            'about_content', 'prodi_stats', 'student_association',
            'accreditation', 'org_structure', 'mbkm_content',
        ];

        $data = $request->only($keys);

        // ── Hero image ──
        $heroData = $data['hero'] ?? ($settings['hero'] ?? []);
        if ($request->hasFile('hero_image_file')) {
            if (!empty($heroData['image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $heroData['image']));
            }
            $heroData['image'] = '/storage/' . $request->file('hero_image_file')->store('settings', 'public');
        }
        $data['hero'] = $heroData;

        // ── Greeting photo ──
        $greetingData = $data['greeting'] ?? ($settings['greeting'] ?? []);
        if ($request->hasFile('greeting_photo_file')) {
            if (!empty($greetingData['photo'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $greetingData['photo']));
            }
            $greetingData['photo'] = '/storage/' . $request->file('greeting_photo_file')->store('settings', 'public');
        }
        $data['greeting'] = $greetingData;

        // ── Accreditation badge ──
        $metaData = $data['site_meta'] ?? ($settings['site_meta'] ?? []);
        if ($request->hasFile('accreditation_badge_file')) {
            if (!empty($metaData['accreditation_badge'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $metaData['accreditation_badge']));
            }
            $metaData['accreditation_badge'] = '/storage/' . $request->file('accreditation_badge_file')->store('settings', 'public');
        }
        // ── Contact page hero image ──
        if ($request->hasFile('contact_hero_image_file')) {
            if (!empty($metaData['hero_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $metaData['hero_image']));
            }
            $metaData['hero_image'] = '/storage/' . $request->file('contact_hero_image_file')->store('settings', 'public');
        }
        $data['site_meta'] = $metaData;

        // ── About page hero image ──
        $aboutData = $data['about_content'] ?? ($settings['about_content'] ?? []);
        if ($request->hasFile('about_hero_image_file')) {
            if (!empty($aboutData['hero_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $aboutData['hero_image']));
            }
            $aboutData['hero_image'] = '/storage/' . $request->file('about_hero_image_file')->store('settings', 'public');
        }
        $data['about_content'] = $aboutData;

        // ── Curriculum PDF ──
        $currData = $data['curriculum_summary'] ?? ($settings['curriculum_summary'] ?? []);
        if ($request->hasFile('curriculum_pdf_file')) {
            if (!empty($currData['pdf_url'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $currData['pdf_url']));
            }
            $currData['pdf_url'] = '/storage/' . $request->file('curriculum_pdf_file')->store('settings', 'public');
        }

        // ── Prerequisite image ──
        if ($request->hasFile('prerequisite_image_file')) {
            if (!empty($currData['prerequisite_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $currData['prerequisite_image']));
            }
            $currData['prerequisite_image'] = '/storage/' . $request->file('prerequisite_image_file')->store('settings', 'public');
        }

        // ── Curriculum page hero image ──
        if ($request->hasFile('curriculum_hero_image_file')) {
            if (!empty($currData['hero_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $currData['hero_image']));
            }
            $currData['hero_image'] = '/storage/' . $request->file('curriculum_hero_image_file')->store('settings', 'public');
        }
        $data['curriculum_summary'] = $currData;

        // ── IABEE badge ──
        $prodiStatsData = $data['prodi_stats'] ?? ($settings['prodi_stats'] ?? []);
        if ($request->hasFile('iabee_badge_file')) {
            if (!empty($prodiStatsData['iabee_badge'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $prodiStatsData['iabee_badge']));
            }
            $prodiStatsData['iabee_badge'] = '/storage/' . $request->file('iabee_badge_file')->store('settings', 'public');
        }

        // ── Unggul badge ──
        if ($request->hasFile('unggul_badge_file')) {
            if (!empty($prodiStatsData['unggul_badge'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $prodiStatsData['unggul_badge']));
            }
            $prodiStatsData['unggul_badge'] = '/storage/' . $request->file('unggul_badge_file')->store('settings', 'public');
        }
        $data['prodi_stats'] = $prodiStatsData;

        // ── Org structure chart image ──
        $orgData = $data['org_structure'] ?? ($settings['org_structure'] ?? []);
        if ($request->hasFile('org_chart_image_file')) {
            if (!empty($orgData['chart_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $orgData['chart_image']));
            }
            $orgData['chart_image'] = '/storage/' . $request->file('org_chart_image_file')->store('settings', 'public');
        }
        $data['org_structure'] = $orgData;

        // ── Statistics page hero image ──
        $tracerData = $data['tracer_stats'] ?? ($settings['tracer_stats'] ?? []);
        if ($request->hasFile('statistics_hero_image_file')) {
            if (!empty($tracerData['hero_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $tracerData['hero_image']));
            }
            $tracerData['hero_image'] = '/storage/' . $request->file('statistics_hero_image_file')->store('settings', 'public');
        }
        $data['tracer_stats'] = $tracerData;

        // ── MBKM page hero image ──
        $mbkmData = $data['mbkm_content'] ?? ($settings['mbkm_content'] ?? []);
        if ($request->hasFile('mbkm_hero_image_file')) {
            if (!empty($mbkmData['hero_image'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $mbkmData['hero_image']));
            }
            $mbkmData['hero_image'] = '/storage/' . $request->file('mbkm_hero_image_file')->store('settings', 'public');
        }
        // Admin form sends flat title_id/title_en/desc_id/desc_en; public page expects nested {id,en}.
        if (!empty($mbkmData['schemes'])) {
            $mbkmData['schemes'] = array_map(function ($scheme) {
                return [
                    'title' => ['id' => $scheme['title_id'] ?? '', 'en' => $scheme['title_en'] ?? ''],
                    'desc'  => ['id' => $scheme['desc_id'] ?? '', 'en' => $scheme['desc_en'] ?? ''],
                    'sks'   => $scheme['sks'] ?? '',
                ];
            }, $mbkmData['schemes']);
        }
        $data['mbkm_content'] = $mbkmData;

        // ── Save all ──
        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return redirect()->route('admin.settings.edit')->with('success', 'Pengaturan berhasil disimpan.');
    }
}
