<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminResearchController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');

        $researches = Research::query()
            ->when($search, fn($q, $s) => $q->where('title_id', 'like', "%{$s}%")
                ->orWhere('title_en', 'like', "%{$s}%")
                ->orWhere('team', 'like', "%{$s}%"))
            ->when($category, fn($q, $c) => $q->where('category', $c))
            ->orderByDesc('year')->orderBy('order')
            ->paginate(10)->withQueryString();

        $categories = Research::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/Researches/Index', [
            'researches' => $researches,
            'categories' => $categories,
            'filters' => ['search' => $search, 'category' => $category],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Researches/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string|max:255',
            'title_en'       => 'required|string|max:255',
            'category'       => 'nullable|string|max:100',
            'year'           => 'nullable|integer|min:2000|max:2099',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'image'          => 'nullable|image|max:2048',
            'team'           => 'nullable|string|max:255',
            'order'          => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('researches', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Research::create($validated);

        return redirect()->route('admin.researches.index')->with('success', 'Penelitian berhasil ditambahkan.');
    }

    public function edit(Research $research)
    {
        return Inertia::render('Admin/Researches/Edit', ['research' => $research]);
    }

    public function update(Request $request, Research $research)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string|max:255',
            'title_en'       => 'required|string|max:255',
            'category'       => 'nullable|string|max:100',
            'year'           => 'nullable|integer|min:2000|max:2099',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'image_file'     => 'nullable|image|max:2048',
            'team'           => 'nullable|string|max:255',
            'order'          => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            if ($research->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $research->image));
            }
            $path = $request->file('image_file')->store('researches', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $research->update($validated);

        return redirect()->route('admin.researches.index')->with('success', 'Penelitian berhasil diperbarui.');
    }

    public function destroy(Research $research)
    {
        if ($research->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $research->image));
        }
        $research->delete();

        return redirect()->route('admin.researches.index')->with('success', 'Penelitian berhasil dihapus.');
    }
}
