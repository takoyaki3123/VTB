<?php

namespace App\Http\Controllers;


use App\Http\Exception\HandleException;
use App\Models\GroupModel;
use Illuminate\Http\Request;

class ApplyController extends Controller
{
    public function getApplyList(Request $request)
    {

        $groupList = GroupModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->where([['id', '!=', '0'], ['status', '=', '0'], ['apply_user', '=', $request->user()['name']]])
            ->get(['id', 'name', 'desc', 'link', 'img_id', 'ctime'])
            ->map(function ($group) {
                $group['imgName'] = $group->thumbnail ? $group->thumbnail->imgName : null;
                unset($group->thumbnail);
                return $group;
            })
            ->toArray();
        $result['group'] = $groupList;
        return new HandleException(200, $result, '');
    }
}
?>