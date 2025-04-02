<?php

namespace App\Http\Controllers;

use App\Models\KeyVisualModel;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Prompts\Key;

class KeyVisualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get home key visual
        $keyVisual = KeyVisualModel::with('allImg')->where('group_id','!=','0')->toArray();
        return $keyVisual;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //get post data
        $post = $request->post();
        $result = KeyVisualModel::firstOrCreate(['img_id'=>$post['body']['background']['id'],'img2_id'=>$post['body']['character']['id'],'group_id'=>$post['body']['group']]);
        return $result;
    }

    /**
     * Display the home page resource.
     */
    public function show(Request $request)
    {
        //
        $homeKeyVisual = DB::table('KeyVisual as k')
                        ->join('imgCollect as img', 'k.img_id', '=', 'img.id')
                        ->join('imgCollect as img2', 'k.img2_id', '=', 'img2.id')
                        ->where('k.group_id', '=', $request->post()['body']['group_id'])
                        ->get(['k.*','img.name as background','img2.name as character'])->toArray();
        $homeKeyVisual[0]->bgPath = Storage::url("image/".$homeKeyVisual[0]->background);
        $homeKeyVisual[0]->characterPath = Storage::url("image/".$homeKeyVisual[0]->character);
        return $homeKeyVisual[0];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //get post data
        $post = $request->post();
        $homeKeyVisual = KeyVisualModel::find($post['body']['id']);
        if(isset(['body']['background']['id'])) {
            $homeKeyVisual->img_id = $post['body']['background']['id'];
        }
        if(isset($post['body']['character']['id'])) {
            $homeKeyVisual->img2_id = $post['body']['character']['id'];
        }
        $homeKeyVisual->save();
        return true;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KeyVisualModel $keyVisualModel)
    {
        //
    }
}
