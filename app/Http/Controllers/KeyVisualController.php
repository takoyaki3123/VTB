<?php

namespace App\Http\Controllers;

use App\Http\Exception\Response;
use App\Models\KeyVisualModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
    static public function store(Array $data)
    {
        //get post data

        $validate = Validator::make($data, [
            'background_id' => ['required'],
            'character_id' => ['required'],
            'group_id' => ['required'],
        ]);
        if ($validate->fails()) {
            return new Response(400, [], '資料に問題がありました！');
        }
        $keyVisual = new KeyVisualModel;
        $keyVisual->background_img_id = $data['background_id'];
        $keyVisual->character_img_id = $data['character_id'];
        $keyVisual->group_id = $data['group_id'];
        $keyVisual->save();
        return new Response("200", [], '');
    }

    /**
     * Display the home page resource.
     */
    public function show(Request $request)
    {
        //
        $homeKeyVisual = DB::table('KeyVisual as k')
                        ->join('imgCollect as img', 'k.background_img_id', '=', 'img.id')
                        ->join('imgCollect as img2', 'k.character_img_id', '=', 'img2.id')
                        ->where('k.id', '=', $request->post()['body']['id'])
                        ->get(['k.*','img.name as background','img2.name as character'])->toArray();
        if (count($homeKeyVisual) != 0) {
            $homeKeyVisual[0]->bgPath = Storage::url("image/".$homeKeyVisual[0]->background);
            $homeKeyVisual[0]->characterPath = Storage::url("image/".$homeKeyVisual[0]->character);
            return new Response("200", $homeKeyVisual[0], '');
        }
        return new Response("200", [], '');
    }

    /**
     * Update the specified resource in storage.
     */
    static public function update(Array $data)
    {
        //get post data
        $validate = Validator::make($data['body'], [
            'group_id' => ['required'],
        ]);
        if ($validate->fails()) {
            return false;
        }
        $homeKeyVisual = KeyVisualModel::where('group_id', $data['group_id'])->first();
        if ($homeKeyVisual != null) {
            if (isset($data['background_id']) && $data['background_id'] != 0) {
                $homeKeyVisual->background_img_id = $data['background_id'];
            }
            if (isset($data['character_id']) && $data['character_id'] != 0) {
                $homeKeyVisual->character_img_id = $data['character_id'];
            }
            $homeKeyVisual->save();
            return true;
        }
        return false;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KeyVisualModel $keyVisualModel)
    {
        //
    }
}
