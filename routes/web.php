<?php

use App\Http\Middleware\ManagerPage;
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
Route::prefix('apply')->group(function () {
    Route::get('/group', function () {
        return Inertia::render('applyGroup');
    });
    Route::get('/member', function () {
        return Inertia::render('applyMember');
    });
})->name('applyPage');


// admins
Route::middleware(['manageSetting', 'managePage'])->group(function () {
    Route::get('/homeManage', function () {
        return Inertia::render('manage/homeManage');
    });
    Route::get('/groupListManage', function () {
        return Inertia::render('manage/groupListManage');
    });
    Route::get('/groupManage', function () {
        return Inertia::render('manage/groupManage');
    });
    Route::get('/applyGroupManage', function () {
        return Inertia::render('manage/applyGroupManage');
    });
});
Route::middleware(['manageSetting'])->group(function() {

    Route::get('/managerLogin', function () {
        return Inertia::render('manage/login');
    })->name('managerlogin');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
