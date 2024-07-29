<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get("users", [\App\Http\Controllers\UserController::class, "index"]);
Route::get("chat/{id}", [
    \App\Http\Controllers\MessageController::class,
    "show",
]);

Route::post("register", [AuthController::class, "register"]);
Route::post("login", [AuthController::class, "login"]);
Route::post("logout", [AuthController::class, "logout"])->middleware("web");
Route::get("user", [AuthController::class, "getAuthUser"])->middleware('web');

Route::get('chat/{id}', [ChatController::class, 'show']);

Route::post("/tokens/create", function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ["token" => $token->plainTextToken];
});
