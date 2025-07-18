<?php

namespace App\Http\Controllers;

use App\Http\Exception\Response;
use App\Models\GroupModel;
use App\Models\KeyVisualModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
            ->where([['status', '=', '1']])
            ->get(['id', 'name', 'img_id'])
            ->map(function ($group) {
                $group['imgName'] = $group->thumbnail ? $group->thumbnail->imgName : null;
                unset($group->thumbnail);
                return $group;
            })
            ->toArray();
        return new Response(200, $groupList, '');
    }

    /**
     * Display a listing of the resource without img
     */
    public function showList()
    {
        //
        $groupList = GroupModel::where([['status', '=', '1']])->get(['id', 'name'])->toArray();
        return new Response(200, $groupList, '');
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
            ->leftJoin('KeyVisual as k', 'k.group_id', '=', 'g.id')
            ->leftJoin('imgCollect as img', 'k.background_img_id', '=', 'img.id') // main background in group page
            ->leftJoin('imgCollect as img2', 'k.character_img_id', '=', 'img2.id') // character img infront of background in group page
            ->leftJoin('imgCollect as group_img', 'g.img_id', '=', 'group_img.id') // keyvisual in home page
            ->where([['g.id', '=', $post['body']['group_id']], ['g.status', '=', '1']])
            ->get(['g.name', 'g.desc', 'g.id', 'img.name as background', 'img2.name as character', 'group_img.name as groupImg'])->toArray();
        if(count($GroupData) > 0) {
            $GroupData[0]->bgPath = Storage::url("image/" . $GroupData[0]->background);
            $GroupData[0]->characterPath = Storage::url("image/" . $GroupData[0]->character);
            return  new Response(200, (array)$GroupData[0], '');
        }
        return new Response(200, [], '');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $groupData = $request->post()['body'];

        $validate = Validator::make($groupData, [
            'id' => ['required'],
            'desc' => ['required']
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        try {
            // group update
            $group = GroupModel::find($groupData['id']);
            if (empty($group)) {
                return new Response(400, [], '存在しないグループです');
            }

            if (isset($groupData['visual']['id']) && $groupData['visual']['id'] != 0) {
                $group->img_id = $groupData['visual']['id'];
            }
            $group->desc = $groupData['desc'];
            $group->save();

            // kv update
            $homeKeyVisual = KeyVisualModel::where('group_id', $groupData['id'])->first();
            if (empty($homeKeyVisual)) {
                $homeKeyVisual = new KeyVisualModel;
                $homeKeyVisual->group_id = $groupData['id'];
            }
            if (isset($groupData['background']['id']) && $groupData['background']['id'] != 0) {
                $homeKeyVisual->background_img_id = $groupData['background']['id'];
            }
            if (isset($groupData['character']['id']) && $groupData['character']['id'] != 0) {
                $homeKeyVisual->character_img_id = $groupData['character']['id'];
            }

            $homeKeyVisual->save();
            return  new Response(200, [], '');
        } catch (\Throwable $th) {
            //throw $th;
            return  new Response(400, [], '変更失敗しました', $th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupModel $groupModel)
    {
        //
    }


    public function apply(Request $request)
    {
        $groupData = $request->post()['body'];

        $validate = Validator::make($groupData, [
            'name' => ['required'],
            'desc' => ['required'],
            'link' => ['required'],
            'visual.id' => ['required'],
            'background.id' => ['required'],
            'character.id' => ['required'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        try {
            if (isset($groupData['id']) && $groupData['id'] != 0) {
                $group = GroupModel::find($groupData['id']);
                
                if (empty($group)) {
                    return new Response(400, [], '存在しないグループです');
                }

                $group->name = $groupData['name'];
                $group->desc = $groupData['desc'];
                $group->link = $groupData['link'] ?: '';
                $group->status = '0';
                $group->img_id = $groupData['visual']['id'];
                $group->save();

                $kvData = [
                    'background_id' => $groupData['background']['id'],
                    'character_id' => $groupData['character']['id'], 
                    'group_id' => $group->id
                ];
                
                if (!KeyVisualController::update($kvData)) {
                    return new Response(400, [], 'エラー');
                }
                return new Response(200, $group, '');
            } else {
                $groupExists = GroupModel::where('name', '=', $groupData['name'])->exists();
                if ($groupExists) {
                    return new Response(400, [], '既に存在しているグループです！');
                } else {
                    $group = new GroupModel;
                    $group->name = $groupData['name'];
                    $group->desc = $groupData['desc'];
                    $group->link = $groupData['link'] ?: '';
                    $group->apply_user = $request->user()['id'];
                    $group->status = '0';
                    $group->img_id = $groupData['visual']['id'];
                    $group->save();

                    $kvData = [
                        'background_id' => $groupData['background']['id'],
                        'character_id' => $groupData['character']['id'], 
                        'group_id' => $group->id
                    ];
                    
                    if (!KeyVisualController::store($kvData)) {
                        return new Response(400, [], 'エラー');
                    }
                    return new Response(200, [], '');
                }
            }
        } catch (\Throwable $th) {
            return new Response(400, [], '申請失敗', $th);
        }
    }

    public function applyGroupList() {
        $groupList = DB::table('Group as g')
            ->leftJoin('KeyVisual as k', 'k.group_id', '=', 'g.id')
            ->leftJoin('imgCollect as img', 'k.background_img_id', '=', 'img.id') // main background in group page
            ->leftJoin('imgCollect as img2', 'k.character_img_id', '=', 'img2.id') // character img infront of background in group page
            ->leftJoin('imgCollect as group_img', 'g.img_id', '=', 'group_img.id') // keyvisual in home page
            ->where([['g.status', '=', '0']])
            ->get(['g.name', 'g.desc', 'g.id', 'img.name as background', 'img2.name as character', 'group_img.name as groupImg'])
            ->toArray();
        return new Response(200, $groupList, '');
    }

    public function approve(Request $request)
    {
        $post = $request->post();

        $validate = Validator::make($post['body'], [
            'id' => ['required'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        $groupID = $post['body']['id'];
        $group = GroupModel::find($groupID);
        if (empty($group)) {
            return new Response(400, [], '存在しないグループです');
        }
        $group->status = '1';
        $group->save();
        return new Response(200, [], '');
    }

    public function reject(Request $request)
    {
        $post = $request->post();
        $validate = Validator::make($post['body'], [
            'id' => ['required'],
            'rejectReason' => ['required'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        $group = GroupModel::find($post['body']['id']);
        if (empty($group)) {
            return new Response(400, [], '存在しないグループです');
        }
        $group->status = 2;
        $group->rejectReason = $post['body']['rejectReason'];
        $group->save();
        return new Response(200, [], '');
    }
}
