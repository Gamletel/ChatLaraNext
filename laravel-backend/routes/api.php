<?php
use Illuminate\Support\Facades\Route;

Route::get('api/users', [\App\Http\Controllers\UserController::class, 'index'])->name('user.index');
