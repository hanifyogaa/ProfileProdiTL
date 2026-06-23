<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminLabController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $labs = Lab::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('focus', 'like', "%{$search}%");
            })
            ->orderBy('order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Labs/Index', [
            'labs' => $labs,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Labs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'focus' => 'nullable|string|max:255',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'order' => 'integer',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('labs', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        Lab::create($validated);

        return redirect()->route('admin.labs.index')->with('success', 'Lab created successfully.');
    }

    public function edit(Lab $lab)
    {
        return Inertia::render('Admin/Labs/Edit', [
            'lab' => $lab
        ]);
    }

    public function update(Request $request, Lab $lab)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'focus' => 'nullable|string|max:255',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
            'photo_file' => 'nullable|image|max:2048',
            'order' => 'integer',
        ]);

        if ($request->hasFile('photo_file')) {
            if ($lab->photo) {
                $oldPath = str_replace('/storage/', '', $lab->photo);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('photo_file')->store('labs', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        $lab->update($validated);

        return redirect()->route('admin.labs.index')->with('success', 'Lab updated successfully.');
    }

    public function destroy(Lab $lab)
    {
        if ($lab->photo) {
            $oldPath = str_replace('/storage/', '', $lab->photo);
            Storage::disk('public')->delete($oldPath);
        }

        $lab->delete();

        return redirect()->route('admin.labs.index')->with('success', 'Lab deleted successfully.');
    }
}
