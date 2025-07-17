<?php

namespace App\Http\Controllers;

use App\Http\Exception\Response;
use App\Models\EventModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $groupList = EventModel::with(['promotionPic' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->where([['status', '=', true]])
            ->get(['id', 'name', 'group_id', 'promotion_img_id'])
            ->map(function ($event) {
                $event['promotion_img'] = $event->promotionPic['name'];
                unset($event->promotionPic);
                return $event;
            })
            ->toArray();
        return new Response(200, $groupList, '');
    }

    public function showList(Request $request)
    {
        //
        $memberList = EventModel::with(['promotionPic' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->with(["host" => function ($query) {
                $query->select(['id', 'name as groupName']);
            }])
            ->where([['group_id', '=', $request->post()['body']['group_id']], ['status', '=', '1']])
            ->get(['id', 'name', 'streamUrl', 'img_id', 'group_id'])
            ->map(function ($event) {
                $event['imgName'] = $event->promotionPic ? $event->promotionPic->imgName : null;
                $event['groupName'] = $event->host ? $event->host->groupName : null;
                unset($event->promotionPic);
                unset($event->host);
                return $event;
            })
            ->toArray();
        return new Response(200, $memberList, '');
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
    }

    public function showGroupEvent(Request $request)
    {
        $post = $request->post()['body'];
        $groupList = EventModel::with(['promotionPic' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->where([['status', '=', true], ['group_id', '=', $post['group_id']]])
            ->get(['id', 'name', 'group_id', 'promotion_img_id'])
            ->map(function ($event) {
                $event['promotion_img'] = $event->promotionPic['name'];
                unset($event->promotionPic);
                return $event;
            })
            ->toArray();
        return new Response(200, $groupList, '');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EventModel $eventModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventModel $eventModel)
    {
        //
        $eventData = $request->post()['body'];

        $validate = Validator::make($eventData, [
            'group_id' => ['required'],
            'title' => ['required'],
            'start' => ['required'],
            'end' => ['required'],
            'link' => ['required'],
            'desc' => ['required'],
            'promotion_img_id' => ['required']
        ]);

        if ($validate->failed()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        $user = $request->user();
        if (empty($user['id'])) {
            return new Response(400, [], '登録していません');
        }

        try {
            $event = EventModel::find($eventData['id']);

            if (empty($event)) {
                return new Response(400, [], '存在しないイベントです');
            }
            if ($user->manage_group != $event->group_id) {
                return new Response(400, [], 'このイベントを編集できません');
            }
            if ($event->group_id != $eventData['group_id']) {
                return new Response(400, [], 'イベント情報が違いがあります');
            }

            $event->start = $eventData['start'];
            $event->end = $eventData['end'];
            $event->title = $eventData['title'];
            $event->desc = $eventData['desc'];
            $event->link = $eventData['link'];
            $event->promotion_img_id = $eventData['promotion_img_id'];
            $event->save();
            return new Response(200, [], '');
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー', $th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventModel $eventModel)
    {
        //
    }
    public function getApplyEventList(Request $request)
    {

        $groupList = EventModel::with(['promotionPic' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->with(['host' => function ($query) {
                $query->select(['id','name as groupName']);
            }])
            ->where([['id', '!=', '0'], ['status', '=', '0']])
            ->get(['id', 'name', 'desc', 'streamUrl', 'socialUrl', 'img_id', 'ctime'])
            ->map(function ($event) {
                $event['imgName'] = $event->promotionPic ? $event->promotionPic->imgName : null;
                unset($event->thumbnail);
                $event['groupName'] = $event->host ? $event->host->groupName : null;
                unset($event->host);
                return $event;
            })
            ->toArray();
        return new Response(200, $groupList, '');
    }

    public function apply(Request $request) {
        $eventData = $request->post()['body'];

        $validate = Validator::make($eventData, [
            'group_id' => ['required'],
            'title' => ['required'],
            'start' => ['required'],
            'end' => ['required'],
            'link' => ['required'],
            'desc' => ['required'],
            'promotion_img_id' => ['required']
        ]);

        if ($validate->failed()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        if (empty($request->user()['id'])) {
            return new Response(400, [], '登録していません');
        }
        try {
            if (isset($eventData['id']) && !empty($eventData['id'])) {
                // 申請し直し
                $event = EventModel::find($eventData['id']);

                if (empty($event)) {
                    return new Response(400, [], '存在しないイベントです');
                }

                if ($event->group_id != $eventData['group_id']) {
                    return new Response(400, [], 'イベント情報が違いがあります');
                }

                $event->start = $eventData['start'];
                $event->end = $eventData['end'];
                $event->title = $eventData['title'];
                $event->desc = $eventData['desc'];
                $event->link = $eventData['link'];
                $event->promotion_img_id = $eventData['promotion_img_id'];
                $event->save();
                return new Response(200, [], '');
            } else {
                // 初申請
                $event = new EventModel;
                
                $event->group_id = $eventData['group_id'];
                $event->start = $eventData['start'];
                $event->end = $eventData['end'];
                $event->title = $eventData['title'];
                $event->desc = $eventData['desc'];
                $event->link = $eventData['link'];
                $event->promotion_img_id = $eventData['promotion_img_id'];
                $event->apply_user = $request->user()['id'];
                $event->save();
                return new Response(200, [], '');
            }
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー', $th);
        }
    }

    public function approve(Request $request) {
        $eventData = $request->post()['body'];

        $validate = Validator::make($eventData, [
            'id' => ['required'],
            'group_id' => ['required'],
        ]);

        if ($validate->failed()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        if (empty($request->user()['id'])) {
            return new Response(400, [], '登録していません');
        }
        try {
            $event = EventModel::find($eventData['id']);

            if (empty($event)) {
                return new Response(400, [], '存在しないイベントです');
            }

            if ($event->group_id != $eventData['group_id']) {
                return new Response(400, [], 'イベント情報が違いがあります');
            }

            $event->status = true;
            $event->save();
            return new Response(200, [], '');
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー', $th);
        }
    }

    public function reject(Request $request) {
        $eventData = $request->post()['body'];

        $validate = Validator::make($eventData, [
            'id' => ['required'],
            'group_id' => ['required'],
            'reject_reason' => ['required'],
        ]);

        if ($validate->failed()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        if (empty($request->user()['id'])) {
            return new Response(400, [], '登録していません');
        }
        try {
            $event = EventModel::find($eventData['id']);

            if (empty($event)) {
                return new Response(400, [], '存在しないイベントです');
            }

            if ($event->group_id != $eventData['group_id']) {
                return new Response(400, [], 'イベント情報が違いがあります');
            }

            $event->status = false;
            $event->reject_reason = $eventData['reject_reason'];
            $event->save();
            return new Response(200, [], '');
        } catch (\Throwable $th) {
            return new Response(400, [], 'エラー', $th);
        }
    }
}
