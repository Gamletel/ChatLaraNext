<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return json_encode($users);
    }

    public function find(Request $request)
    {
        $users = User::where("name", $request["name"])->get();

        return response()->json(["users" => $users]);
    }
}
