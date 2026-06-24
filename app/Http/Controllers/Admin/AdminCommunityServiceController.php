<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCommunityServiceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');

        $services = CommunityService::query()
            ->when($search, fn($q, $s) => $q->where('title_id', 'like', "%{$s}%")
                ->orWhere('title_en', 'like', "%{$s}%")
                ->orWhere('team', 'like', "%{$s}%")
                ->orWhere('location', 'like', "%{$s}%"))
            ->when($category, fn($q, $c) => $q->where('category', $c))
            ->orderByDesc('year')->orderBy('order')
            ->paginate(10)->withQueryString();

        $categories = CommunityService::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/CommunityServices/Index', [
            'services'   => $services,
            'categories' => $categories,
            'filters'    => ['search' => $search, 'category' => $category],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CommunityServices/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string|max:255',
            'title_en'       => 'required|string|max:255',
            'category'       => 'nullable|string|max:100',
            'year'           => 'nullable|integer|min:2000|max:2099',
            'location'       => 'nullable|string|max:255',
            'partners'       => 'nullable|string|max:255',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'image'          => 'nullable|image|max:2048',
            'team'           => 'nullable|string|max:255',
            'order'          => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('community-services', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        CommunityService::create($validated);

        return redirect()->route('admin.community-services.index')->with('success', 'Program pengabdian berhasil ditambahkan.');
    }

    public function edit(CommunityService $communityService)
    {
        return Inertia::render('Admin/CommunityServices/Edit', ['service' => $communityService]);
    }

    public function update(Request $request, CommunityService $communityService)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string|max:255',
            'title_en'       => 'required|string|max:255',
            'category'       => 'nullable|string|max:100',
            'year'           => 'nullable|integer|min:2000|max:2099',
            'location'       => 'nullable|string|max:255',
            'partners'       => 'nullable|string|max:255',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'image_file'     => 'nullable|image|max:2048',
            'team'           => 'nullable|string|max:255',
            'order'          => 'integer',
        ]);

        if ($request->hasFile('image_file')) {
            if ($communityService->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $communityService->image));
            }
            $path = $request->file('image_file')->store('community-services', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $communityService->update($validated);

        return redirect()->route('admin.community-services.index')->with('success', 'Program pengabdian berhasil diperbarui.');
    }

    public function destroy(CommunityService $communityService)
    {
        if ($communityService->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $communityService->image));
        }
        $communityService->delete();

        return redirect()->route('admin.community-services.index')->with('success', 'Program pengabdian berhasil dihapus.');
    }
}
