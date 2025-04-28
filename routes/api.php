<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\ImgCollectController;
use App\Http\Controllers\KeyVisualController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/uploadImg', [ImgCollectController::class, 'store']);
Route::post('/updateHome', [KeyVisualController::class, 'update']);
Route::post('/getHome', [KeyVisualController::class, 'show']);
Route::post('/getGroup', [GroupController::class, 'show']);
Route::post('/getGroupList', [GroupController::class, 'showList']);
Route::post('/getGroupListWithImg', [GroupController::class, 'index']);
Route::post('/updateGroup', [GroupController::class, 'update']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
