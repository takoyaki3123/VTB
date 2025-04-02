<?php

namespace App\Http\Controllers;

use App\Models\GroupModel;
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
        //
        $groupList = GroupModel::where('id', '!=', '0');
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
        $GroupData = DB::table('Group as g')
        ->join('KeyVisual as k', 'k.group_id', '=', 'g.id')
        ->join('imgCollect as img', 'k.img_id', '=', 'img.id')
        ->join('imgCollect as img2', 'k.img2_id', '=', 'img2.id')
        ->where('g.id', '=', $request->post()['body']['group_id'])
        ->get(['g.*','img.name as background','img2.name as character'])->toArray();
        $GroupData[0]->bgPath = Storage::url("image/".$GroupData[0]->background);
        $GroupData[0]->characterPath = Storage::url("image/".$GroupData[0]->character);
        return $GroupData[0];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GroupModel $groupModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupModel $groupModel)
    {
        //
    }
}
