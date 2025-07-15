<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EventModel extends Model
{
    //
    protected $fillable = [
        'promotion_img_id',
        'group_id',
        'title',
        'desc',
        'link',
        'start',
        'end',
        'status',
        'ctime',
        'utime',
    ];
    
    protected $primaryKey = 'id';
    protected $dateFormat = 'Y-m-d H:i:s';
    const CREATED_AT = 'ctime';
    const UPDATED_AT = 'utime';
    protected $table = 'Events';

    public function promotionPic(): HasOne{
        return $this->hasOne(ImgCollectModel::class, 'id', 'promotion_img_id');
    }
    
    public function host(): BelongsTo{
        return $this->belongsTo(GroupModel::class, foreignKey: 'group_id', ownerKey: 'id');
    }
}
