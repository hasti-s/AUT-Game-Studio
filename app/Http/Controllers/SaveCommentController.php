<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SaveCommentController extends Controller
{
    public function saveComment(Request $req)
    {
        $commentObj = new Comment;
        $formAll = $req->all();
        $user = Auth::user();
        $title = $formAll['commentTitle'];
        return redirect(url('/games/' . $formAll['commentTitle']))->with('message', 'Submitted successfully!!');
    }
}
