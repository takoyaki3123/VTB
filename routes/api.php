<?php

use App\Http\Controllers\ApplyController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImgCollectController;
use App\Http\Controllers\KeyVisualController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckLogin;
use App\Http\Middleware\CheckManage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/uploadImg', [ImgCollectController::class, 'store']);
Route::post('/getHome', [HomeController::class, 'show']);
Route::post('/getGroup', [GroupController::class, 'show']);
Route::post('/getGroupList', [GroupController::class, 'showList']);
Route::post('/getGroupListWithImg', [GroupController::class, 'index']);
Route::post('/getMember', [MemberController::class, 'show']);
Route::post('/getMemberList', [MemberController::class, 'showList']);
Route::post('/getAllMemberList', [MemberController::class, 'showAllList']);

Route::middleware(['auth:sanctum', CheckAdmin::class])->group(function () {
    // ホームページの管理
    Route::post('/updateHome', [HomeController::class, 'update']);
    // グループ申請の通過と拒否
    Route::post('/approveGroup', [GroupController::class, 'approve']);
    Route::post('/rejectGroup', [GroupController::class, 'reject']);
    // メンバー申請の通過と拒否
    Route::post('/approveMember', [MemberController::class, 'approve']);
    Route::post('/rejectMember', [MemberController::class, 'reject']);


    Route::post('/getUserList', [UserController::class, 'index']);
    Route::post('/updatePermission', [UserController::class, 'updatePermission']);
});
Route::middleware(['auth:sanctum', CheckManage::class])->group(function () {
    Route::post('/updateMember', [MemberController::class, 'update']);
    Route::post('/updateGroup', [GroupController::class, 'update']);
});
Route::middleware(['auth:sanctum', CheckLogin::class])->group(function () {
    Route::post('/applyNewGroup', [GroupController::class, 'apply']);
    Route::post('/getApplyGroup', [GroupController::class, 'applyGroupList']);
    Route::post('/applyNewMember', [MemberController::class, 'apply']);
    Route::post('/getApplyMember', [MemberController::class, 'applyMemberList']);
    Route::post('/getApplyList', [ApplyController::class, 'getApplyList']);
    Route::post('/updatePersonal', [UserController::class, 'update']);
    Route::post('/user', function (Request $request) {
        return $request->user();
    });
});
Route::post('/loginVerify', [UserController::class, 'login']);
// token
Route::get('/csrfToken', function () {
    return response()->json(['token' => csrf_token()]);
});