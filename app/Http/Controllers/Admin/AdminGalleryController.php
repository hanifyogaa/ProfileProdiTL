<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminGalleryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');

        $galleries = Gallery::query()
            ->when($search, function ($query, $search) {
                $query->where('title_id', 'like', "%{$search}%")
                    ->orWhere('title_en', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            })
            ->when($category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
            'filters' => [
                'search' => $search,
                'category' => $category
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Galleries/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'caption_id' => 'nullable|string|max:255',
            'caption_en' => 'nullable|string|max:255',
            'image' => 'required|image|max:3072', // max 3MB for high-res pictures
            'category' => 'required|string|in:umum,kegiatan,laboratorium,prestasi',
            'order' => 'integer',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Gallery::create($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item uploaded successfully.');
    }

    public function edit(Gallery $gallery)
    {
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $gallery
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'caption_id' => 'nullable|string|max:255',
            'caption_en' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:3072',
            'category' => 'required|string|in:umum,kegiatan,laboratorium,prestasi',
            'order' => 'integer',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image_file')) {
            if ($gallery->image) {
                $oldPath = str_replace('/storage/', '', $gallery->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_file')->store('gallery', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $gallery->update($validated);

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item updated successfully.');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image) {
            $oldPath = str_replace('/storage/', '', $gallery->image);
            Storage::disk('public')->delete($oldPath);
        }

        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item deleted successfully.');
    }
}
