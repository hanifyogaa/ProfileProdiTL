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
            'about_content', 'prodi_stats',
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
            // File uploads
            'hero_image_file'            => 'nullable|image|max:3072',
            'greeting_photo_file'        => 'nullable|image|max:2048',
            'accreditation_badge_file'   => 'nullable|image|max:2048',
            'curriculum_pdf_file'        => 'nullable|file|mimes:pdf|max:10240',
            'prerequisite_image_file'    => 'nullable|image|max:5120',
            'iabee_badge_file'           => 'nullable|image|max:2048',
            'unggul_badge_file'          => 'nullable|image|max:2048',
        ]);

        $settings = Setting::all()->pluck('value', 'key');

        $keys = [
            'hero', 'distinctiveness', 'greeting', 'prospects',
            'curriculum_summary', 'tracer_stats', 'site_meta',
            'socials', 'contact', 'embed_urls',
            'about_content', 'prodi_stats',
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
        $data['site_meta'] = $metaData;

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

        // ── Save all ──
        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return redirect()->route('admin.settings.edit')->with('success', 'Pengaturan berhasil disimpan.');
    }
}
