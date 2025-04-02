<?php

use App\Http\Controllers\ImgCollectController;
use App\Http\Controllers\KeyVisualController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/uploadImg', [ImgCollectController::class, 'store']);
Route::post('/updateHome', [KeyVisualController::class, 'update']);
Route::post('/getHome', [KeyVisualController::class, 'show']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
