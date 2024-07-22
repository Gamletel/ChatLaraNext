<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use function Laravel\Prompts\error;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name'=>['string'],
            'email'=>['required','email'],
            'password'=>['required'],
        ]);

        $user = User::create([
            'name'=>$credentials['name'],
            'email'=>$credentials['email'],
            'password'=>Hash::make($credentials['password']),
        ]);


        return response()->json(['message'=>'Registration success'], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'=>['required','email'],
            'password'=>['required', 'string'],
        ]);

        if (!auth()->attempt($credentials)){
            return response()->json([
                'errors' => ['message' => 'Invalid credentials']
            ], 401);
        }

        $user = auth()->user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token'=>$token,
            'token_type'=>'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        auth()->logout();

        // Очищаем сессию
        $request->session()->invalidate();

        // Регенерируем CSRF токен
        $request->session()->regenerateToken();

        return response()->json([
            'message'=>'Logout Success'
        ], 200);
    }

    public function getAuthUser()
    {
        return response()->json([
            'user' =>auth('sanctum')->user(),
        ], 200);
    }
}
