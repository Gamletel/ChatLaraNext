<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function show(int $id)
    {
        $user = auth()->id();
        $messages = Message::where('fromID', $id)
            ->orWhere('toID', $id)
            ->get();

        return json_encode($messages);
    }
}
