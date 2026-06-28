<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramLearningOutcome;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProgramLearningOutcomeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $plos = ProgramLearningOutcome::query()
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                    ->orWhere('description_id', 'like', "%{$search}%")
                    ->orWhere('description_en', 'like', "%{$search}%");
            })
            ->orderBy('order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Plos/Index', [
            'plos' => $plos,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Plos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:program_learning_outcomes,code',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'order' => 'integer',
        ]);

        ProgramLearningOutcome::create($validated);

        return redirect()->route('admin.plos.index')->with('success', 'PLO berhasil ditambahkan.');
    }

    public function edit(ProgramLearningOutcome $plo)
    {
        return Inertia::render('Admin/Plos/Edit', [
            'plo' => $plo,
        ]);
    }

    public function update(Request $request, ProgramLearningOutcome $plo)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:program_learning_outcomes,code,' . $plo->id,
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'order' => 'integer',
        ]);

        $plo->update($validated);

        return redirect()->route('admin.plos.index')->with('success', 'PLO berhasil diperbarui.');
    }

    public function destroy(ProgramLearningOutcome $plo)
    {
        $plo->delete();

        return redirect()->route('admin.plos.index')->with('success', 'PLO berhasil dihapus.');
    }
}
