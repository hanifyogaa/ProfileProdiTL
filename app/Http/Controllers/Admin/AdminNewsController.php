<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminNewsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $news = News::query()
            ->when($search, function ($query, $search) {
                $query->where('title_id', 'like', "%{$search}%")
                    ->orWhere('title_en', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/News/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'excerpt_id' => 'nullable|string',
            'excerpt_en' => 'nullable|string',
            'body_id' => 'nullable|string',
            'body_en' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_featured' => 'boolean',
            'featured_image' => 'nullable|image|max:2048', // max 2MB
        ]);

        $validated['slug'] = Str::slug($validated['title_id']);
        
        // Ensure slug is unique
        $slugCount = News::where('slug', 'like', $validated['slug'] . '%')->count();
        if ($slugCount > 0) {
            $validated['slug'] .= '-' . ($slugCount + 1);
        }

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('news', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        News::create($validated);

        return redirect()->route('admin.news.index')->with('success', 'News created successfully.');
    }

    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news
        ]);
    }

    public function update(Request $request, News $news)
    {
        // Support Inertia PATCH/PUT with multipart data using _method='PUT' override
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'excerpt_id' => 'nullable|string',
            'excerpt_en' => 'nullable|string',
            'body_id' => 'nullable|string',
            'body_en' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_featured' => 'boolean',
            'featured_image_file' => 'nullable|image|max:2048',
        ]);

        // Regenerate slug if title_id changed
        if ($news->title_id !== $validated['title_id']) {
            $validated['slug'] = Str::slug($validated['title_id']);
            $slugCount = News::where('slug', 'like', $validated['slug'] . '%')->where('id', '!=', $news->id)->count();
            if ($slugCount > 0) {
                $validated['slug'] .= '-' . ($slugCount + 1);
            }
        }

        if ($request->hasFile('featured_image_file')) {
            // Delete old image
            if ($news->featured_image) {
                $oldPath = str_replace('/storage/', '', $news->featured_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('featured_image_file')->store('news', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        if ($validated['status'] === 'published' && !$news->published_at) {
            $validated['published_at'] = now();
        } elseif ($validated['status'] === 'draft') {
            $validated['published_at'] = null;
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', 'News updated successfully.');
    }

    public function destroy(News $news)
    {
        if ($news->featured_image) {
            $oldPath = str_replace('/storage/', '', $news->featured_image);
            Storage::disk('public')->delete($oldPath);
        }
        
        $news->delete();

        return redirect()->route('admin.news.index')->with('success', 'News deleted successfully.');
    }
}
