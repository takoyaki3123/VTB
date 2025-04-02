<?php

namespace App\Http\Controllers;

use App\Models\ImgCollectModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImgCollectController extends Controller
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
        // todo: upload file
        $fileName = $request->file('image')->getClientOriginalName();
        $fileType = $request->file('image')->getClientOriginalExtension();
        $size = $request->file('image')->getSize();
        $exists = Storage::exists('app/public/image'.$fileName);
        if(!$exists){
          Storage::disk('image')->put($fileName,$request->file('image')->get());
        }
        // todo: create file data
        $result = ImgCollectModel::firstOrCreate(['name'=>$fileName,'type'=>$fileType,'size'=>$size]);

        return $result;
    }

    /**
     * Display the specified resource.
     */
    public function show(ImgCollectModel $imgCollectModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ImgCollectModel $imgCollectModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ImgCollectModel $imgCollectModel)
    {
        //
    }
}
