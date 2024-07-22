<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('users', [\App\Http\Controllers\UserController::class, 'index']);
Route::get('chat/{id}', [\App\Http\Controllers\MessageController::class, 'show']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum', 'web']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::get('user', [AuthController::class, 'getAuthUser']);

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});
