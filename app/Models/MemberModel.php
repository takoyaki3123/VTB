<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MemberModel extends Model
{
    //
    protected $fillable = [
        'img_id',
        'group_id',
        'name',
        'desc',
        'streamUrl',
        'socialUrl',
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
    protected $table = 'Member';


    public function groupMember(): BelongsTo{
        return $this->belongsTo(GroupModel::class, foreignKey: 'group_id', ownerKey: 'id');
    }
    public function thumbnail(): HasOne{
        return $this->hasOne(ImgCollectModel::class, 'id', 'img_id');
    }
}
