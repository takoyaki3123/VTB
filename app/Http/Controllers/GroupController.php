<?php

namespace App\Http\Controllers;

use App\Models\GroupModel;
use App\Models\KeyVisualModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //　IDは関連する為に必要
        //　laravelの関連は一つのselectが終わってからもう一つのselectを行う
        //　故にgropuのidを捜索（？）の必要がある
        $groupList = GroupModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->where('id', '!=', '0')
            ->get(['id', 'name', 'img_id'])
            ->map(function ($group) {
                $group['imgName'] = $group->thumbnail ? $group->thumbnail->imgName : null;
                unset($group->thumbnail);
                return $group;
            })
            ->toArray();
        return $groupList;
    }

    /**
     * 
     */
    public function showList()
    {
        //
        $groupList = GroupModel::where('id', '!=', '0')->get(['id', 'name'])->toArray();
        return $groupList;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $post = $request->post();

        $GroupData = DB::table('Group as g')
            ->join('KeyVisual as k', 'k.group_id', '=', 'g.id')
            ->join('imgCollect as img', 'k.img_id', '=', 'img.id') // main background in group page
            ->join('imgCollect as img2', 'k.img2_id', '=', 'img2.id') // character img infront of background in group page
            ->join('imgCollect as group_img', 'g.img_id', '=', 'group_img.id') // keyvisual in home page
            ->where('g.id', '=', $post['body']['group_id'])
            ->get(['g.name', 'g.desc', 'g.id', 'img.name as background', 'img2.name as character', 'img2.name as groupImg'])->toArray();
        if(count($GroupData) > 0) {
            $GroupData[0]->bgPath = Storage::url("image/" . $GroupData[0]->background);
            $GroupData[0]->characterPath = Storage::url("image/" . $GroupData[0]->character);
            return $GroupData[0];
        }
        return [];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $post = $request->post();
        $group = GroupModel::find($post['body']['id']);
        $homeKeyVisual = KeyVisualModel::where('group_id', $post['body']['id'])->first();
        if (isset($post['body']['background']['id']) && $post['body']['background']['id'] != 0) {
            $homeKeyVisual->img_id = $post['body']['background']['id'];
        }
        if (isset($post['body']['character']['id']) && $post['body']['character']['id'] != 0) {
            $homeKeyVisual->img2_id = $post['body']['character']['id'];
        }
        if (isset($post['body']['visual']['id']) && $post['body']['visual']['id'] != 0) {
            $group->img_id = $post['body']['visual']['id'];
        }
        $homeKeyVisual->save();

        $group->desc = $post['body']['desc'];
        $group->save();
        return true;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupModel $groupModel)
    {
        //
    }
}
