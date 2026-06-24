<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminLecturerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $lecturers = Lecturer::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('nidn', 'like', "%{$search}%")
                    ->orWhere('functional_position', 'like', "%{$search}%");
            })
            ->orderBy('order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Lecturers/Index', [
            'lecturers' => $lecturers,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Lecturers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nidn' => 'nullable|string|max:50',
            'nip' => 'nullable|string|max:50',
            'functional_position' => 'nullable|string|max:255',
            'position_id' => 'nullable|string|max:255',
            'position_en' => 'nullable|string|max:255',
            'bio_id' => 'nullable|string',
            'bio_en' => 'nullable|string',
            'expertise' => 'nullable|array',
            'education' => 'nullable|array',
            'teaching_history' => 'nullable|array',
            'photo' => 'nullable|image|max:2048',
            'scholar_url' => 'nullable|url',
            'scholar_id' => 'nullable|string|max:255',
            'sinta_url' => 'nullable|url',
            'sinta_id' => 'nullable|string|max:255',
            'scopus_url' => 'nullable|url',
            'scopus_id' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('lecturers', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        Lecturer::create($validated);

        return redirect()->route('admin.lecturers.index')->with('success', 'Lecturer profile created successfully.');
    }

    public function edit(Lecturer $lecturer)
    {
        return Inertia::render('Admin/Lecturers/Edit', [
            'lecturer' => $lecturer
        ]);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nidn' => 'nullable|string|max:50',
            'nip' => 'nullable|string|max:50',
            'functional_position' => 'nullable|string|max:255',
            'position_id' => 'nullable|string|max:255',
            'position_en' => 'nullable|string|max:255',
            'bio_id' => 'nullable|string',
            'bio_en' => 'nullable|string',
            'expertise' => 'nullable|array',
            'education' => 'nullable|array',
            'teaching_history' => 'nullable|array',
            'photo_file' => 'nullable|image|max:2048',
            'scholar_url' => 'nullable|url|nullable',
            'scholar_id' => 'nullable|string|max:255',
            'sinta_url' => 'nullable|url|nullable',
            'sinta_id' => 'nullable|string|max:255',
            'scopus_url' => 'nullable|url|nullable',
            'scopus_id' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo_file')) {
            // Delete old photo
            if ($lecturer->photo) {
                $oldPath = str_replace('/storage/', '', $lecturer->photo);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('photo_file')->store('lecturers', 'public');
            $validated['photo'] = '/storage/' . $path;
        }

        $lecturer->update($validated);

        return redirect()->route('admin.lecturers.index')->with('success', 'Lecturer profile updated successfully.');
    }

    public function destroy(Lecturer $lecturer)
    {
        if ($lecturer->photo) {
            $oldPath = str_replace('/storage/', '', $lecturer->photo);
            Storage::disk('public')->delete($oldPath);
        }

        $lecturer->delete();

        return redirect()->route('admin.lecturers.index')->with('success', 'Lecturer profile deleted successfully.');
    }
}
