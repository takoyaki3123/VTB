<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class KeyVisualModel extends Model
{
    //
    protected $fillable = [
        'background_img_id',
        'character_img_id',
        'group_id',
        'name',
        'ctime',
        'utime',
    ];
    protected $primaryKey = 'id';
    protected $dateFormat = 'Y-m-d H:i:s';
    const CREATED_AT = 'ctime';
    const UPDATED_AT = 'utime';
    protected $table = 'KeyVisual';
    public function groupKeyVisual(): BelongsTo
    {
        return $this->belongsTo(GroupModel::class, 'id', 'group_id');
    }
}
