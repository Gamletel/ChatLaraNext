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
}
