<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json(['user'=>$user], 200);
    }
}
