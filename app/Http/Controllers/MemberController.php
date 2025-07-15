<?php

namespace App\Http\Controllers;

use App\Http\Exception\Response;
use App\Models\MemberModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        //
        $member = MemberModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])->where([['id', '=', $request->post()['body']['id']], ['status', '=', '1']])
            ->get(['id', 'name', 'socialUrl', 'streamUrl', 'desc', 'img_id'])
            ->map(function ($memberData) {
                $memberData['imgName'] = $memberData->thumbnail ? $memberData->thumbnail->imgName : null;
                unset($memberData->thumbnail);
                return $memberData;
            })
            ->toArray();
        return new Response(200, $member[0], '');
    }

    /**
     * Display the list in specified group.
     */
    public function showList(Request $request)
    {
        //
        $memberList = MemberModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->with(["company" => function ($query) {
                $query->select(['id', 'name as groupName']);
            }])
            ->where([['group_id', '=', $request->post()['body']['group_id']], ['status', '=', '1']])
            ->get(['id', 'name', 'streamUrl', 'img_id', 'group_id'])
            ->map(function ($member) {
                $member['imgName'] = $member->thumbnail ? $member->thumbnail->imgName : null;
                $member['groupName'] = $member->company ? $member->company->groupName : null;
                unset($member->thumbnail);
                unset($member->company);
                return $member;
            })
            ->toArray();
        return new Response(200, $memberList, '');
    }

    /**
     * Display the list with group.
     */
    public function showAllList(Request $request)
    {
        //
        $memberList = MemberModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->with(["company" => function ($query) {
                $query->select(['id', 'name as groupName']);
            }])
            ->where([['status', '=', '1']])
            ->get(['id', 'name', 'img_id', 'group_id'])
            ->map(function ($member) {
                $member['imgName'] = $member->thumbnail ? $member->thumbnail->imgName : null;
                $member['groupName'] = $member->company ? $member->company->groupName : null;
                unset($member->thumbnail);
                unset($member->company);
                return $member;
            })
            ->toArray();
        return new Response(200, $memberList, '');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MemberModel $memberModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MemberModel $memberModel)
    {
        //
        $post = $request->post()['body'];
        $member = MemberModel::find($post['id']);
        try {
            if (!empty($member)) {
                $member->name = $post['name'];
                $member->desc = $post['desc'];
                $member->streamUrl = $post['streamUrl'];
                $member->socialUrl = $post['socialUrl'];
                $member->img_id = $post['avatar']['id'];
                $member->save();
                return new Response(200, [], '');
            }
            return new Response(400, [], 'メンバーを見当たりません');
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MemberModel $memberModel)
    {
        //
    }

    public function apply(Request $request)
    {
        return new Response(400, [], 'test');
        $memberData = $request->post()['body'];
        $validate = Validator::make($memberData, [
            'name' => ['required'],
            'desc' => ['required'],
            'group_id' => ['required'],
            'avatar.id' => ['required'],
            'streamUrl' => ['required'],
            'socialUrl' => ['required'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        } else {
            $streamUrlPattern = "/^https:\/\/www.youtube.com\/@[a-zA-Z0-9_]+$/";
            if (!empty($memberData['streamUrl'])) {
                if (preg_match($streamUrlPattern, $memberData['streamUrl'])) {
                    return new Response(400, [], 'チャンネルリンク形式が違います');
                }
            }
            try {
                if (isset($memberData['id']) && $memberData['id'] != 0) {
                    //　申請し直し
                    $member = MemberModel::find($memberData['id']);
                    $member->name = $memberData['name'];
                    $member->desc = $memberData['desc'];
                    $member->streamUrl = $memberData['streamUrl'] ?: '';
                    $member->socialUrl = $memberData['socialUrl'] ?: '';
                    $member->status = '0';
                    $member->apply_user = $request->user()['id'];
                    $member->img_id = $memberData['avatar']['id'] ?? 0;
                    $member->group_id = $memberData['group_id'];
                    $member->save();
                    return new Response(200, [], '');
                } else {
                    //　新しい申請
                    $member = MemberModel::firstOrCreate(['name' => $memberData['name'], 'group_id' => $memberData['group_id']],[
                        'desc' => $memberData['desc'],
                        'streamUrl' => $memberData['streamUrl'] ?: '',
                        'socialUrl' => $memberData['socialUrl'] ?: '',
                        'status' => '0',
                        'apply_user' => $request->user()['id'] ?? 0,
                        'img_id' => $memberData['avatar']['id'],
                    ]);
                    if ($member->wasRecentlyCreated) {
                        return new Response(200, [], '');
                    } else {
                        return new Response(400, [], '既に登録しているメンバーです！');
                    }
                }
            } catch (\Throwable $th) {
                return new Response(400, [], '申請失敗', $th);
            }
        }
    }


    public function applyMemberList()
    {
        $groupList = MemberModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->where([['id', '!=', '0'], ['status', '=', '0']])
            ->get(['id', 'name', 'desc', 'streamUrl', 'socialUrl', 'img_id', 'ctime'])
            ->map(function ($group) {
                $group['imgName'] = $group->thumbnail ? $group->thumbnail->imgName : null;
                unset($group->thumbnail);
                return $group;
            })
            ->toArray();
        return new Response(200, $groupList, '');
    }
    
    public function approve(Request $request)
    {
        $post = $request->post();
        $validate = Validator::make($post['body'], [
            'id' => ['required', 'integer'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }

        try {
            $memberID = $post['body']['id'];
            $member = MemberModel::find($memberID);
            if (!empty($member)) {
                if ($member->status != 0) {
                    return new Response(400, [], '資料に問題がありました！');
                }
                $member->status = '1';
                $member->save();
                return new Response(200, [], '');
            }
            return new Response(400, [], 'メンバーを見つかりませんでした');
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー', $th);
        }
    }

    public function reject(Request $request)
    {
        $post = $request->post();
        $validate = Validator::make($post['body'], [
            'id' => ['required', 'integer'],
            'rejectReason' => ['required', 'string'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        try {
            $memberID = $post['body']['id'];
            $member = MemberModel::find($memberID);
            if (!empty($member)) {
                if ($member->status != 0) {
                    return new Response(400, [], '資料に問題がありました！');
                }
                $member->status = 2;
                $member->rejectReason = $post['body']['rejectReason'];
                $member->save();
                return new Response(200, [], '');
            }
            return new Response(400, [], 'メンバーを見つかりませんでした');
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー', $th);
        }
    }
}
