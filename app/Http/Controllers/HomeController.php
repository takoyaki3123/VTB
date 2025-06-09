<?php

namespace App\Http\Controllers;

use App\Http\Exception\HandleException;
use App\Models\HomeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
        $home = HomeModel::with(['backgroundImg' => function ($query) {
            $query->select(['id','name as imgName']);
        }])->with(['characterImg' => function ($query) {
            $query->select(['id','name as imgName']);
        }])
            ->get(['id', 'background', 'character'])
            ->map(function ($home) {
                $home['background'] = $home->backgroundImg ? $home->backgroundImg->imgName : null;
                $home['character'] = $home->characterImg ? $home->characterImg->imgName : null;
                Log::debug('home: ' . json_encode($home));
                return $home;
            })
            ->toArray();
        return new HandleException(200, $home[0], '');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $post = $request->post();
        $home = HomeModel::find($post['body']['id']);
        if ($home != null) {
            if (isset($post['body']['background']['id']) && $post['body']['background']['id'] != 0) {
                $home->background = $post['body']['background']['id'];
            }
            if (isset($post['body']['character']['id']) && $post['body']['character']['id'] != 0) {
                $home->character = $post['body']['character']['id'];
            }
            $home->save();
            return new HandleException('200', [], '');
        } else {
            try {
                $home = new HomeModel;
                $home->background = $post['body']['background']['id'];
                $home->character = $post['body']['character']['id'];
                $home->save();
                return new HandleException('200', [], '');
            } catch (\Throwable $th) {
                //throw $th;
                Log::debug("error from update home by code " . $th->getCode() . ", message: " . $th->getMessage());
            }
        }
        return new HandleException('400', [], 'エラー');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeModel $homeModel)
    {
        //
    }
}
