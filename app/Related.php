<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Related extends Model
{
    protected $table = 'related';

    public function game(){
        return $this->belongsTo(Game::class);
    }
}
