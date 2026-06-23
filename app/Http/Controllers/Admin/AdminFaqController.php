<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminFaqController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');

        $faqs = Faq::query()
            ->when($search, function ($query, $search) {
                $query->where('question_id', 'like', "%{$search}%")
                    ->orWhere('question_en', 'like', "%{$search}%")
                    ->orWhere('answer_id', 'like', "%{$search}%")
                    ->orWhere('answer_en', 'like', "%{$search}%");
            })
            ->when($category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->orderBy('order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => $faqs,
            'filters' => [
                'search' => $search,
                'category' => $category
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Faqs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_id' => 'required|string',
            'question_en' => 'required|string',
            'answer_id' => 'required|string',
            'answer_en' => 'required|string',
            'category' => 'required|string|in:umum,akademik,karir,mbkm',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        Faq::create($validated);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ created successfully.');
    }

    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/Faqs/Edit', [
            'faq' => $faq
        ]);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question_id' => 'required|string',
            'question_en' => 'required|string',
            'answer_id' => 'required|string',
            'answer_en' => 'required|string',
            'category' => 'required|string|in:umum,akademik,karir,mbkm',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $faq->update($validated);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ deleted successfully.');
    }
}
