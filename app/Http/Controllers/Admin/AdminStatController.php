<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminStatController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $stats = Stat::query()
            ->when($search, function ($query, $search) {
                $query->where('metric', 'like', "%{$search}%")
                    ->orWhere('label_id', 'like', "%{$search}%")
                    ->orWhere('label_en', 'like', "%{$search}%");
            })
            ->orderBy('order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Stats/Index', [
            'stats' => $stats,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Stats/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'metric' => 'required|string|max:255',
            'year' => 'nullable|string|max:4',
            'value' => 'required|string|max:255',
            'unit' => 'nullable|string|max:50',
            'label_id' => 'required|string|max:255',
            'label_en' => 'required|string|max:255',
            'order' => 'integer',
        ]);

        Stat::create($validated);

        return redirect()->route('admin.stats.index')->with('success', 'Stat created successfully.');
    }

    public function edit(Stat $stat)
    {
        return Inertia::render('Admin/Stats/Edit', [
            'stat' => $stat
        ]);
    }

    public function update(Request $request, Stat $stat)
    {
        $validated = $request->validate([
            'metric' => 'required|string|max:255',
            'year' => 'nullable|string|max:4',
            'value' => 'required|string|max:255',
            'unit' => 'nullable|string|max:50',
            'label_id' => 'required|string|max:255',
            'label_en' => 'required|string|max:255',
            'order' => 'integer',
        ]);

        $stat->update($validated);

        return redirect()->route('admin.stats.index')->with('success', 'Stat updated successfully.');
    }

    public function destroy(Stat $stat)
    {
        $stat->delete();

        return redirect()->route('admin.stats.index')->with('success', 'Stat deleted successfully.');
    }
}
