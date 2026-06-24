<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminAchievementController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $level = $request->input('level');

        $achievements = Achievement::query()
            ->when($search, function ($query, $search) {
                $query->where('title_id', 'like', "%{$search}%")
                    ->orWhere('title_en', 'like', "%{$search}%")
                    ->orWhere('holder', 'like', "%{$search}%");
            })
            ->when($level, function ($query, $level) {
                $query->where('level', $level);
            })
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Achievements/Index', [
            'achievements' => $achievements,
            'filters' => [
                'search' => $search,
                'level' => $level
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Achievements/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string|max:255',
            'title_en'       => 'required|string|max:255',
            'level'          => 'required|in:national,international',
            'date'           => 'required|date',
            'holder'         => 'required|string|max:255',
            'category'       => 'nullable|string|max:100',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
            'cover'          => 'nullable|image|max:2048',
            'order'          => 'integer',
        ]);

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('achievements', 'public');
            $validated['cover'] = '/storage/' . $path;
        }

        Achievement::create($validated);

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement recorded successfully.');
    }

    public function edit(Achievement $achievement)
    {
        return Inertia::render('Admin/Achievements/Edit', [
            'achievement' => $achievement
        ]);
    }

    public function update(Request $request, Achievement $achievement)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string|max:255',
            'title_en'       => 'required|string|max:255',
            'level'          => 'required|in:national,international',
            'date'           => 'required|date',
            'holder'         => 'required|string|max:255',
            'category'       => 'nullable|string|max:100',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
            'cover_file'     => 'nullable|image|max:2048',
            'order'          => 'integer',
        ]);

        if ($request->hasFile('cover_file')) {
            if ($achievement->cover) {
                $oldPath = str_replace('/storage/', '', $achievement->cover);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('cover_file')->store('achievements', 'public');
            $validated['cover'] = '/storage/' . $path;
        }

        $achievement->update($validated);

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement updated successfully.');
    }

    public function destroy(Achievement $achievement)
    {
        if ($achievement->cover) {
            $oldPath = str_replace('/storage/', '', $achievement->cover);
            Storage::disk('public')->delete($oldPath);
        }

        $achievement->delete();

        return redirect()->route('admin.achievements.index')->with('success', 'Achievement deleted successfully.');
    }
}
