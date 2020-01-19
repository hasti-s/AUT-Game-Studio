<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Leaderboard;
use App\Game;
use App\Related;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class APIController extends Controller
{


    public function home()
    {
        $games = Game::take(3)->orderBy('rate','desc')->get()->toArray();
        foreach ($games as $n) {
            $n['categories'] = json_decode($n['categories']);
            $new_res[] = $n;
        }
        $r2 = [];
        $r2 = $new_res;

        $new_res = [];
        $new_games = Game::orderBy('created_at' , 'desc')->take(2)->get()->toArray();
        $comments = Comment::with(['user'])->orderBy('created_at' , 'desc')->take(4)->get()->toArray();
        foreach ($new_games as $n) {
            $n['categories'] = json_decode($n['categories']);
            $new_res[] = $n;
        }
        $r = [];
        $r['response'] = [];
        $r['response']['ok'] = 1;
        $r['response']['result'] = [];
        $r['response']['result']['homepage'] = [];
        $r['response']['result']['homepage']['tutorial'] = [];
        $r['response']['result']['homepage']['slider'] = $r2;
        $r['response']['result']['homepage']['comments'] = $comments;
        $r['response']['result']['homepage']['new_games'] = $new_res;

        return $r;
    }

    public function games()
    {
        $games = Game::take(3)->get()->toArray();
        $new_res = [];
        foreach ($games as $n) {
            $n['categories'] = json_decode($n['categories']);
            $new_res[] = $n;
        }
        $r = [];
        $r['response'] = [];
        $r['response']['ok'] = 1;
        $r['response']['result'] = [];
        $r['response']['result']['games'] = [];
        $r['response']['result']['games'] = $new_res;
        return $r;

    }

    public function comments($game_name)
    {
        $game_id = Game::where('title', $game_name)->take(1)->get();
        $comments = Comment::where('game_id', $game_id[0]['id'])->with(['user'])->get()->toArray();
        $r = [];
        $r['response'] = [];
        $r['response']['ok'] = 1;
        $r['response']['result'] = [];
        $r['response']['result']['comments'] = [];

        $i = 0;
        foreach ($comments as $c) {
            $r['response']['result']['comments'][$i]['rate'] = $c['rate'];
            $r['response']['result']['comments'][$i]['text'] = $c['text'];
            $r['response']['result']['comments'][$i]['date'] = $c['date'];
            $r['response']['result']['comments'][$i]['game_name'] = $game_id[0]['title'];
            $r['response']['result']['comments'][$i]['player'] = [];
            $r['response']['result']['comments'][$i]['player']['name'] = $c['user']['name'];
            $r['response']['result']['comments'][$i]['player']['avatar'] =$c['user']['avatar'];
            $i++;
        }
        return $r;
    }

    public function gallery($game_name)
    {
        return ""; // inam nadarim dg bikhial!
    }

    public function game($game_name)
    {
        $game = Game::take(1)->where('title', $game_name)->get();
//        return $game;
        $game[0]['categories'] = json_decode($game[0]['categories']);

        $r = [];
        $r['response'] = [];
        $r['response']['ok'] = 1;
        $r['response']['result'] = [];
        $r['response']['result']['game'] = $game;

        return $r;
    }

    public function leaderboards($game_name)
    {
        $game_id = Game::take(1)->where('title', $game_name)->take(10)->get();
        $records = Leaderboard::where('game_id', $game_id[0]['id'])->orderBy('score' , 'desc')->with(['user'])->take(10)->get()->toArray();

        $r = [];

        if(Auth::guest()) {
            $r['response'] = [];
            $r['response']['ok'] = 1;
            $r['response']['result'] = [];
            $r['response']['result']['leaderboard'] = $records;

            return $r;
        }
        elseif(!Auth::guest()){
            $user_id = Auth::user()->id;
//            dd($user_id);
            $record = Leaderboard::where('game_id', $game_id[0]['id'])->where('user_id', $user_id)->with(['user'])->get()->toArray();
            array_merge($records, $record);
//            dd($records);
            $r['response'] = [];
            $r['response']['ok'] = 1;
            $r['response']['result'] = [];
            $r['response']['result']['leaderboard'] = $records;

            return $r;
        }
        return $r;

    }

    public function leaderboard($gameTitle) {
        //user handle nemishe tooye javab
        $gameId = Game::where('title', $gameTitle)->get()[0]['id'];
        $leaderboard = Leaderboard::with(['user', 'game'])->where('game_id', $gameId)->orderBy('score', 'desc')->take(10)->get();

        if(!(Auth::guest())) {
            $userRecord = Leaderboard::with(['user', 'game'])->where('game_id', $gameId)->where('user_id', Auth::user()->id)->get();
            $tmp = false;
            for($i = 0; $i < count($leaderboard->toArray()); $i++) {
                if($leaderboard->toArray()[$i] == $userRecord->toArray()[0]) {
                    $tmp = true;
                    break;
                }
            }
            if($tmp == false) {
                $leaderboard[] = $userRecord[0];
            }
        } else {
            $leaderboard = Leaderboard::with(['user', 'game'])->where('game_id', $gameId)->orderBy('score', 'desc')->take(10)->get();
        }
        $leaderboard = ['leaderboard'=>$leaderboard];
        $response = ['ok'=>true, 'result'=>$leaderboard];
        return ['response'=>$response];
    }

    public function gameList($game_name)
    {
        $games = Game::where('title', 'LIKE', '%'.$game_name.'%')->get();
        $new_res = [];
        foreach ($games as $n) {
            $n['categories'] = json_decode($n['categories']);
            $new_res[] = $n;
        }
        $r = [];
        $r['response'] = [];
        $r['response']['ok'] = 1;
        $r['response']['result'] = [];
        $r['response']['result']['games'] = [];
        $r['response']['result']['games'] = $new_res;

        return $r;
    }

    public function related($game_name)
    {
        $game_id = Game::where('title', $game_name)->take(1)->get();
        //return $game_id[0]['id'];
        $games = Related::with(['game'])->where('related_id', $game_id[0]['id'])->get();

        $new_res = [];
        foreach ($games as $n) {
            $n['game']['categories'] = json_decode($n['game']['categories']);
            $new_res[] = $n;
        }
        $r = [];
        $r['response'] = [];
        $r['response']['ok'] = 1;
        $r['response']['result'] = [];
        $r['response']['result']['games'] = [];
        $r['response']['result']['games'] = $games;

        return $r;
    }
}