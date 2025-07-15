<?php

namespace App\Http\Controllers;


use App\Http\Exception\Response;
use App\Models\EventModel;
use App\Models\GroupModel;
use App\Models\MemberModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ApplyController extends Controller
{
    public function getApplyList(Request $request)
    {
        Log::debug ('my user value in middleware: ' .json_encode(Auth::user()));

        $groupList = GroupModel::with(['thumbnail' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->where([['status', '!=', '1'], ['apply_user', '=', $request->user()['id']]])
            ->get(['id', 'name', 'desc', 'link', 'status', 'ctime', 'img_id'])
            ->map(function ($group) {
                $group['imgName'] = $group->thumbnail ? $group->thumbnail->imgName : null;
                unset($group->thumbnail);
                return $group;
            })
            ->toArray();
        $memberList = MemberModel::with(['thumbnail' => function ($query) {
                $query->select(['id','name as imgName']);
            }, 'company' => function ($query) {
                $query->select(['id','name as groupName']);
            }])
                ->where([['status', '!=', '1'], ['apply_user', '=', $request->user()['id']]])
                ->get(['id', 'name', 'desc', 'streamUrl', 'socialUrl', 'rejectReason', 'status', 'ctime', 'group_id', 'img_id'])
                ->map(function ($member) {
                    $member['imgName'] = $member->thumbnail ? $member->thumbnail->imgName : null;
                    unset($member->thumbnail);
                    $member['groupName'] = $member->company ? $member->company->groupName : null;
                    unset($member->company);
                    return $member;
                })
                ->toArray();
        $eventList = EventModel::with(['promotionPic' => function ($query) {
                $query->select(['id','name as imgName']);
            }, 'host' => function ($query) {
                $query->select(['id','name as groupName']);
            }])
                ->where([['status', '!=', '1'], ['apply_user', '=', $request->user()['id']]])
                ->get(['id', 'title', 'desc', 'link', 'start', 'end', 'reject_reason', 'ctime', 'status', 'group_id', 'promotion_img_id'])
                ->map(function ($event) {
                    $event['imgName'] = $event->promotionPic ? $event->promotionPic->imgName : null;
                    unset($event->promotionPic);
                    $event['groupName'] = $event->host ? $event->host->groupName : null;
                    unset($event->host);
                    return $event;
                })
                ->toArray();
        $result['group'] = $groupList;
        $result['member'] = $memberList;
        $result['event'] = $eventList;
        return new Response(200, $result, '');
    }
}
?>