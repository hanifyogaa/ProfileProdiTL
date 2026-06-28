<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Public Program Pages
Route::get('/profil', [PageController::class, 'about'])->name('about');
Route::get('/profil/akreditasi', [PageController::class, 'accreditation'])->name('accreditation');
Route::get('/profil/struktur-organisasi', fn() => redirect('/dosen#org', 301))->name('org-structure');
Route::get('/kurikulum', [PageController::class, 'curriculum'])->name('curriculum');
Route::get('/dosen', [PageController::class, 'lecturers'])->name('lecturers');
Route::get('/berita', [PageController::class, 'news'])->name('news');
Route::get('/berita/{slug}', [PageController::class, 'newsDetail'])->name('news.detail');
Route::get('/galeri', [PageController::class, 'gallery'])->name('gallery');
Route::get('/prestasi', [PageController::class, 'achievements'])->name('achievements');
Route::get('/agenda', [PageController::class, 'activities'])->name('activities');
Route::get('/agenda/{slug}', [PageController::class, 'activityDetail'])->name('activity.detail');
Route::get('/laboratorium', [PageController::class, 'labs'])->name('labs');
Route::get('/kemitraan', [PageController::class, 'partnerships'])->name('partnerships');
Route::get('/riset', [PageController::class, 'research'])->name('research');
Route::get('/riset/{id}', [PageController::class, 'researchDetail'])->name('research.detail');
Route::get('/pengabdian', [PageController::class, 'communityService'])->name('community-service');
Route::get('/pengabdian/{id}', [PageController::class, 'communityServiceDetail'])->name('community-service.detail');
Route::get('/kemahasiswaan', [PageController::class, 'studentAssociation'])->name('student-association');
Route::get('/mbkm', [PageController::class, 'mbkm'])->name('mbkm');
Route::get('/statistik', [PageController::class, 'statistics'])->name('statistics');
Route::get('/akademik/kalender-akademik', [PageController::class, 'kalenderAkademik'])->name('kalender-akademik');
Route::get('/akademik/pedoman-akademik', [PageController::class, 'pedomanAkademik'])->name('pedoman-akademik');
Route::get('/akademik/kode-etik', [PageController::class, 'kodeEtik'])->name('kode-etik');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/kontak', [PageController::class, 'contact'])->name('contact');

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Panel Routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('news', \App\Http\Controllers\Admin\AdminNewsController::class);
    Route::resource('lecturers', \App\Http\Controllers\Admin\AdminLecturerController::class);
    Route::resource('courses', \App\Http\Controllers\Admin\AdminCourseController::class);
    Route::resource('activities', \App\Http\Controllers\Admin\AdminActivityController::class);
    Route::resource('achievements', \App\Http\Controllers\Admin\AdminAchievementController::class);
    Route::resource('labs', \App\Http\Controllers\Admin\AdminLabController::class);
    Route::resource('partners', \App\Http\Controllers\Admin\AdminPartnerController::class);
    Route::resource('stats', \App\Http\Controllers\Admin\AdminStatController::class);
    Route::resource('galleries', \App\Http\Controllers\Admin\AdminGalleryController::class);
    Route::resource('faqs', \App\Http\Controllers\Admin\AdminFaqController::class);
    Route::resource('researches', \App\Http\Controllers\Admin\AdminResearchController::class);
    Route::resource('community-services', \App\Http\Controllers\Admin\AdminCommunityServiceController::class);
    
    Route::get('settings', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'edit'])->name('settings.edit');
    Route::put('settings', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'update'])->name('settings.update');

    Route::get('users', [\App\Http\Controllers\Admin\AdminUserController::class, 'index'])->name('users.index');
    Route::get('users/create', [\App\Http\Controllers\Admin\AdminUserController::class, 'create'])->name('users.create');
    Route::post('users', [\App\Http\Controllers\Admin\AdminUserController::class, 'store'])->name('users.store');
    Route::patch('users/{user}/toggle-admin', [\App\Http\Controllers\Admin\AdminUserController::class, 'toggleAdmin'])->name('users.toggle-admin');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
