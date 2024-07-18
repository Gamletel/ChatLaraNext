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

        if (Auth::attempt($user)){
            $request->session()->regenerate();

            return response()->json(['message'=>'Registration successful'], 201);
        }

        return response()->json(['message'=>'Registration failed'], 400);
    }
}
