<?php

namespace App\Http\Controllers;

use App\Http\Exception\HandleException;
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
    public function show(MemberModel $memberModel)
    {
        //
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
            return new HandleException(400, [], '資料に問題がありました！');
        } else {
            Log::debug('data:' . json_encode($memberData));
            if (isset($memberData['id']) && $memberData['id'] != 0) {
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
                return new HandleException(200, [], '');
            } else {
                $group = MemberModel::firstOrCreate(['name' => $memberData['name'], 'group_id' => $memberData['group_id']],[
                    'desc' => $memberData['desc'],
                    'streamUrl' => $memberData['streamUrl'] ?: '',
                    'socialUrl' => $memberData['socialUrl'] ?: '',
                    'status' => '0',
                    'apply_user' => $request->user()['id'] ?? 0,
                    'img_id' => $memberData['avatar']['id'],
                ]);
                if ($group->wasRecentlyCreated) {
                    return new HandleException(200, [], '');
                } else {
                    return new HandleException(400, [], '既に登録しているメンバーです！');
                }
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
        return new HandleException(200, $groupList, '');
    }
    
    public function approve(Request $request)
    {
        $post = $request->post();
        $validate = Validator::make($post['body'], [
            'id' => ['required', 'integer'],
        ]);
        if ($validate->fails()) {
            return new HandleException(400, [], '資料に問題がありました！');
        }

        $memberID = $post['body']['id'];
        $member = MemberModel::find($memberID);
        if (!empty($member)) {
            if ($member->status != 0) {
                return new HandleException(400, [], '資料に問題がありました！');
            }
            $member->status = '1';
            $member->save();
            return new HandleException(200, [], '');
        }
        return new HandleException(400, [], 'メンバーを見つかりませんでした');
    }

    public function reject(Request $request)
    {
        $post = $request->post();
        $validate = Validator::make($post['body'], [
            'id' => ['required', 'integer'],
            'rejectReason' => ['required', 'string'],
        ]);
        if ($validate->fails()) {
            return new HandleException(400, [], '資料に問題がありました！');
        }
        $memberID = $post['body']['id'];
        $member = MemberModel::find($memberID);
        if (!empty($member)) {
            if ($member->status != 0) {
                return new HandleException(400, [], '資料に問題がありました！');
            }
            $member->status = 2;
            $member->rejectReason = $post['body']['rejectReason'];
            $member->save();
            return new HandleException(200, [], '');
        }
        return new HandleException(400, [], 'メンバーを見つかりませんでした');
    }
}
