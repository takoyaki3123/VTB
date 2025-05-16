<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\ImgCollectController;
use App\Http\Controllers\KeyVisualController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/uploadImg', [ImgCollectController::class, 'store']);
Route::post('/getHome', [KeyVisualController::class, 'show']);
Route::post('/getGroup', [GroupController::class, 'show']);
Route::post('/getGroupList', [GroupController::class, 'showList']);
Route::post('/getGroupListWithImg', [GroupController::class, 'index']);
Route::post('/applyNewGroup', [GroupController::class, 'apply']);
Route::post('/getApplyGroup', [GroupController::class, 'applyList']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::middleware(['manageSetting'])->group(function () {
    Route::post('/updateGroup', [GroupController::class, 'update']);
    Route::post('/updateHome', [KeyVisualController::class, 'update']);
    Route::post('/loginVerify', [UserController::class, 'login']);
});
// token
Route::get('/csrfToken', function () {
    return response()->json(['token' => csrf_token()]);
});