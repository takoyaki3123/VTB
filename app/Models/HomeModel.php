<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HomeModel extends Model
{
    //
    protected $fillable = [
        'background',
        'character',
    ];
    protected $primaryKey = 'id';
    protected $dateFormat = 'Y-m-d H:i:s';
    const CREATED_AT = null;
    const UPDATED_AT = 'utime';
    protected $table = 'Home';

    public function backgroundImg(): HasOne{
        return $this->hasOne(ImgCollectModel::class, 'id', 'background');
    }
    public function characterImg(): HasOne{
        return $this->hasOne(ImgCollectModel::class, 'id', 'character');
    }
}
