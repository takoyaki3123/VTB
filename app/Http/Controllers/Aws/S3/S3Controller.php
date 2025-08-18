<?php

namespace App\Http\Controllers\Aws\S3;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class S3Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // //
        // Storage::disk('s3')->put('test1.txt', 'test again');
        // $contents = Storage::disk('s3')->get('test1.txt');
        // var_dump( $contents ); // This will show "test again text"
    }

    public function uploadFile()
    {
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
