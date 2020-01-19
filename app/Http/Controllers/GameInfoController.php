<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameInfoController extends Controller
{
    public function gameInfo()
    {
        return view('gameInfo');
    }

    public function minesweeper()
    {
        return view('minesweeper');
    }
}
