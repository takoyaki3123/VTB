<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImgCollectModel extends Model
{
    //
    protected $fillable = [
        'name',
        'type',
        'size',
        'ctime',
    ];
    protected $primaryKey = 'id';
    protected $dateFormat = 'Y-m-d H:i:s';
    const CREATED_AT = 'ctime';
    const UPDATED_AT = null;
    protected $table = 'ImgCollect';

    public function group(): BelongsTo{
        return $this->belongsTo(GroupModel::class, 'img_id', 'id');
    }
}
