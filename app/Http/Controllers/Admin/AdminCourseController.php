<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLearningOutcome;
use App\Models\ProgramLearningOutcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminCourseController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $semester = $request->input('semester');

        $courses = Course::query()
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                    ->orWhere('name_id', 'like', "%{$search}%")
                    ->orWhere('name_en', 'like', "%{$search}%");
            })
            ->when($semester, function ($query, $semester) {
                $query->where('semester', $semester);
            })
            ->orderBy('semester')
            ->orderBy('code')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'filters' => [
                'search' => $search,
                'semester' => $semester
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:courses,code',
            'name_id' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'sks' => 'required|integer|min:1|max:10',
            'semester' => 'required|integer|min:1|max:8',
            'type' => 'required|in:wajib,pilihan',
            'cpl' => 'nullable|string',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_signature' => 'boolean',
        ]);

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            'clos' => $course->clos()->with('plos:id')->orderBy('order')->get(),
            'allPlos' => ProgramLearningOutcome::orderBy('order')->get(['id', 'code']),
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:courses,code,' . $course->id,
            'name_id' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'sks' => 'required|integer|min:1|max:10',
            'semester' => 'required|integer|min:1|max:8',
            'type' => 'required|in:wajib,pilihan',
            'cpl' => 'nullable|string',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_signature' => 'boolean',
            'clos' => 'nullable|array',
            'clos.*.code' => 'required|string|max:50',
            'clos.*.description_id' => 'required|string',
            'clos.*.description_en' => 'required|string',
            'clos.*.plo_ids' => 'nullable|array',
            'clos.*.plo_ids.*' => 'integer|exists:program_learning_outcomes,id',
        ]);

        $closInput = $validated['clos'] ?? [];
        unset($validated['clos']);

        DB::transaction(function () use ($course, $validated, $closInput) {
            $course->update($validated);

            $course->clos()->delete();

            foreach ($closInput as $index => $row) {
                $clo = CourseLearningOutcome::create([
                    'course_id' => $course->id,
                    'code' => $row['code'],
                    'description_id' => $row['description_id'],
                    'description_en' => $row['description_en'],
                    'order' => $index,
                ]);

                $clo->plos()->sync($row['plo_ids'] ?? []);
            }
        });

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}
