<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminActivityController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $type = $request->input('type');

        $activities = Activity::query()
            ->when($search, function ($query, $search) {
                $query->where('title_id', 'like', "%{$search}%")
                    ->orWhere('title_en', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            })
            ->when($type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Activities/Index', [
            'activities' => $activities,
            'filters' => [
                'search' => $search,
                'type' => $type
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Activities/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'body_id' => 'nullable|string',
            'body_en' => 'nullable|string',
            'type' => 'required|in:visit,workshop,lecture',
            'date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'cover' => 'nullable|image|max:2048',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title_id']);
        
        $slugCount = Activity::where('slug', 'like', $validated['slug'] . '%')->count();
        if ($slugCount > 0) {
            $validated['slug'] .= '-' . ($slugCount + 1);
        }

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('activities', 'public');
            $validated['cover'] = '/storage/' . $path;
        }

        Activity::create($validated);

        return redirect()->route('admin.activities.index')->with('success', 'Activity created successfully.');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activities/Edit', [
            'activity' => $activity
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'body_id' => 'nullable|string',
            'body_en' => 'nullable|string',
            'type' => 'required|in:visit,workshop,lecture',
            'date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'cover_file' => 'nullable|image|max:2048',
            'is_featured' => 'boolean',
        ]);

        if ($activity->title_id !== $validated['title_id']) {
            $validated['slug'] = Str::slug($validated['title_id']);
            $slugCount = Activity::where('slug', 'like', $validated['slug'] . '%')->where('id', '!=', $activity->id)->count();
            if ($slugCount > 0) {
                $validated['slug'] .= '-' . ($slugCount + 1);
            }
        }

        if ($request->hasFile('cover_file')) {
            if ($activity->cover) {
                $oldPath = str_replace('/storage/', '', $activity->cover);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('cover_file')->store('activities', 'public');
            $validated['cover'] = '/storage/' . $path;
        }

        $activity->update($validated);

        return redirect()->route('admin.activities.index')->with('success', 'Activity updated successfully.');
    }

    public function destroy(Activity $activity)
    {
        if ($activity->cover) {
            $oldPath = str_replace('/storage/', '', $activity->cover);
            Storage::disk('public')->delete($oldPath);
        }

        $activity->delete();

        return redirect()->route('admin.activities.index')->with('success', 'Activity deleted successfully.');
    }
}
