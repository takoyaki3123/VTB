<?php

use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckLogin;
use App\Http\Middleware\CheckManage;
use App\Http\Middleware\ManagerPage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');
Route::get('/group/{id}', function ($id) {
    return Inertia::render('group', ['id' => $id]);
})->name('group');
Route::get('/groupList', function () {
    return Inertia::render('groupList');
})->name('groupList');
Route::get('/member/{id}', function ($id) {
    return Inertia::render('member', ['id' => $id]);
})->name('member');

Route::middleware([CheckAdmin::class])->group(function () {
    Route::get('/homeManage', function () {
        return Inertia::render('manage/homeManage');
    });
    Route::get('/groupListManage', function () {
        return Inertia::render('manage/groupListManage');
    });
    Route::get('/groupManage', function () {
        return Inertia::render('manage/groupManage');
    });

    // 待新增
    Route::get('/groupManage', function () {
        return Inertia::render('manage/groupManage');
    });
    Route::get('/userManage', function () {
        return Inertia::render('manage/userManage');
    });


    Route::get('/applyGroupManage', function () {
        return Inertia::render('manage/applyGroupManage');
    });
    Route::get('/applyMemberManage', function () {
        return Inertia::render('manage/applyMemberManage');
    });
})->name('managePage');
Route::middleware([CheckManage::class])->group(function () {
    Route::get('/manage/memberList', function () {
        return Inertia::render('manage/memberList');
    });
    Route::get('/manage/member/{id}', function ($id) {
        return Inertia::render('manage/memberManage', ['id' => $id]);
    });
});

Route::middleware([CheckLogin::class])->group(function () {
    Route::prefix('apply')->group(function () {
        Route::get('/group', function () {
            return Inertia::render('applyGroup');
        });
        Route::get('/member', function () {
            return Inertia::render('applyMember');
        });
        Route::get('/list', function () {
            return Inertia::render('applyList');
        });
    })->name('applyPage');

    // 待新增
    Route::get('/profile', function () {
        return Inertia::render('manage/groupManage');
    });
});
// Route::middleware(['manageSetting'])->group(function() {

//     Route::get('/managerLogin', function () {
//         return Inertia::render('manage/login');
//     })->name('managerlogin');
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
