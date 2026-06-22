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
Route::get('/kurikulum', [PageController::class, 'curriculum'])->name('curriculum');
Route::get('/dosen', [PageController::class, 'lecturers'])->name('lecturers');
Route::get('/berita', [PageController::class, 'news'])->name('news');
Route::get('/berita/{slug}', [PageController::class, 'newsDetail'])->name('news.detail');
Route::get('/galeri', [PageController::class, 'gallery'])->name('gallery');
Route::get('/prestasi', [PageController::class, 'achievements'])->name('achievements');
Route::get('/agenda', [PageController::class, 'activities'])->name('activities');
Route::get('/laboratorium', [PageController::class, 'labs'])->name('labs');
Route::get('/kemitraan', [PageController::class, 'partnerships'])->name('partnerships');
Route::get('/riset', [PageController::class, 'research'])->name('research');
Route::get('/mbkm', [PageController::class, 'mbkm'])->name('mbkm');
Route::get('/statistik', [PageController::class, 'statistics'])->name('statistics');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/kontak', [PageController::class, 'contact'])->name('contact');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
