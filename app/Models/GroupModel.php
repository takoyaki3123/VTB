<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class GroupModel extends Model
{
    //
    protected $fillable = [
        'img_id',
        'name',
        'desc',
        'link',
        'apply_user',
        'status',
        'rejectReason',
        'ctime',
        'utime',
    ];
    protected $primaryKey = 'id';
    protected $dateFormat = 'Y-m-d H:i:s';
    const CREATED_AT = 'ctime';
    const UPDATED_AT = 'utime';
    protected $table = 'Group';

    public function thumbnail(): HasOne{
        return $this->hasOne(ImgCollectModel::class, 'id', 'img_id');
    }
    public function groupMember(): HasMany{
        return $this->hasMany(MemberModel::class, 'id', 'group_id');
    }
    public function groupKeyVisual(): HasOne
    {
        return $this->hasOne(KeyVisualModel::class);
    }
}
