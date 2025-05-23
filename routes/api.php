<?php

use App\Http\Controllers\ApplyController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ImgCollectController;
use App\Http\Controllers\KeyVisualController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/uploadImg', [ImgCollectController::class, 'store']);
Route::post('/getHome', [KeyVisualController::class, 'show']);
Route::post('/getGroup', [GroupController::class, 'show']);
Route::post('/getGroupList', [GroupController::class, 'showList']);
Route::post('/getGroupListWithImg', [GroupController::class, 'index']);

Route::middleware(['auth:sanctum', CheckAdmin::class])->group(function () {
    // グループ申請の通過と拒否
    Route::post('/approveGroup', [GroupController::class, 'approve']);
    Route::post('/rejectGroup', [GroupController::class, 'reject']);
    // メンバー申請の通過と拒否
    Route::post('/approveMember', [MemberController::class, 'approve']);
    Route::post('/rejectMember', [MemberController::class, 'reject']);
});

Route::middleware(['auth:sanctum', CheckLogin::class])->group(function () {
    Route::post('/applyNewGroup', [GroupController::class, 'apply']);
    Route::post('/getApplyGroup', [GroupController::class, 'applyGroupList']);
    Route::post('/applyNewMember', [MemberController::class, 'apply']);
    Route::post('/getApplyMember', [MemberController::class, 'applyMemberList']);
    
    Route::post('/getApplyList', [ApplyController::class, 'getApplyList']);
    Route::post('/user', function (Request $request) {
        return $request->user();
    });
});
Route::middleware(['manageSetting'])->group(function () {
    Route::post('/updateGroup', [GroupController::class, 'update']);
    Route::post('/updateHome', [KeyVisualController::class, 'update']);
    Route::post('/loginVerify', [UserController::class, 'login']);
});
// token
Route::get('/csrfToken', function () {
    return response()->json(['token' => csrf_token()]);
});