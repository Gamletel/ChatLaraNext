<?php
use Illuminate\Support\Facades\Route;

Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::get('users', [\App\Http\Controllers\UserController::class, 'index'])->name('user.index');
Route::get('chat/{id}', [\App\Http\Controllers\MessageController::class, 'show']);
