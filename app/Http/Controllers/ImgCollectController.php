<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Aws\S3\S3Controller;
use App\Http\Exception\Response;
use App\Models\ImgCollectModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        $postData = $request->post()['body'];
        // todo: upload file
        $request->validate(['image' => 'required|image|mimes:png, jpg, jpeg, webp']);
        $img = $request->file('image');
        $fileType = $img->getClientOriginalExtension();
        // $fileName = $request->file('image')->getClientOriginalName();
        $fileName = time() . '.' . $fileType;
        $size = $img->getSize();

        $exists = Storage::exists('app/public/image/' . $fileName);
        if (!$exists) {
          Storage::disk('image')->put($fileName, $img->get());
        }

        // todo: create file data
        $result = ImgCollectModel::firstOrCreate(['name' => $fileName, 'type' => $fileType, 'size' => $size])->toArray();

        // todo: upload file to aws s3
        $uploadResult = (new S3Controller())->uploadFile($img->get(), $fileName, $postData['type'], $postData);
        if ($uploadResult) {
            $result->delete();
            Storage::disk('image')->delete($fileName);
            return new Response('400', '', 'アップロード中にエラーが発生しました。');
        }
        return new Response('200', $result, '');
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
