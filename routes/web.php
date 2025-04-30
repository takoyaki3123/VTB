<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// users
Route::get('/', function () {
    return Inertia::render('home');
})->name('home');
Route::get('/group/{id}', function ($id) {
    return Inertia::render('group', ['id' => $id]);
})->name('group');
Route::get('/groupList', function () {
    return Inertia::render('groupList');
})->name('groupList');

// admins
Route::get('/homeManage', function () {
    return Inertia::render('manage/homeManage');
})->name('homeManage');
Route::get('/groupManage', function () {
    return Inertia::render('manage/groupManage');
})->name('groupManage');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
