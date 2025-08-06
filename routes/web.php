<?php

use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckLogin;
use App\Http\Middleware\CheckManage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//for all user
Route::get('/', function () {
    return Inertia::render('home');
})->name('home');
Route::get('/group/{id}', function ($id) {
    return Inertia::render('group', ['id' => $id]);
})->name('group');
Route::get('/groupList', function () {
    return Inertia::render('groupList');
})->name('groupList');
Route::get('/member/{id}/', function ($id) {
    return Inertia::render('member', ['id' => $id]);
})->name('member');
Route::get('/member/{id}/{liveID}', function ($id, $liveID) {
    return Inertia::render('member', ['id' => $id, 'liveStatus' => empty($liveID) ? false: true, 'liveID' => $liveID]);
});
Route::get('/event/{id}', function ($id) {
    return Inertia::render('eventPage', ['id' => $id]);
})->name('eventPage');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

//for admin
Route::middleware([CheckAdmin::class])->group(function () {
    Route::prefix('manage')->group(function () {
        Route::get('/home', function () {
            return Inertia::render('manage/homeManage');
        });
        Route::get('/groupList', function () {
            return Inertia::render('manage/groupListManage');
        });
        // Route::get('/group', function () {
        //     return Inertia::render('manage/groupManage');
        // });
    
        Route::get('/user', function () {
            return Inertia::render('manage/userManage');
        });
    
    
        Route::get('/applyGroup', function () {
            return Inertia::render('manage/applyGroupManage');
        });
        Route::get('/applyMember', function () {
            return Inertia::render('manage/applyMemberManage');
        });
        Route::get('/applyEvent', function () {
            return Inertia::render('manage/applyEventManage');
        });
    });
})->name('managePage');

// for manager in each group
Route::middleware([CheckManage::class])->group(function () {
    Route::prefix('manage')->group(function () {
        Route::get('/memberList', function () {
            return Inertia::render('manage/memberList');
        });
        Route::get('/member/{id}', function ($id) {
            return Inertia::render('manage/memberManage', ['id' => $id]);
        });
        Route::get('/group', function () {
            return Inertia::render('manage/groupManage');
        });
        Route::get('/eventList', function () {
            return Inertia::render('manage/eventList');
        });
    });
});

// for user
Route::middleware([CheckLogin::class])->group(function () {
    Route::prefix('apply')->group(function () {
        Route::get('/group', function () {
            return Inertia::render('applyGroup');
        });
        Route::get('/member', function () {
            return Inertia::render('applyMember');
        });
        Route::get('/event', function () {
            return Inertia::render('applyEvent');
        });
        Route::get('/list', function () {
            return Inertia::render('applyList');
        });

    })->name('applyPage');

    Route::get('/personal', function () {
        return Inertia::render('personal');
    })->name('personal');
    // 待新增
    Route::get('/profile', function () {
        return Inertia::render('manage/groupManage');
    });
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
