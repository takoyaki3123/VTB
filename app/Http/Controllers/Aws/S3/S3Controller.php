<?php

namespace App\Http\Controllers\Aws\S3;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

define('GROUPDIR', 'group/');
define('EVENTDIR', 'group/<group>/event/');
define('MEMBERDIR', 'group/<group>/member/');
define('HOMEDIR', 'home/');
class S3Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    public function uploadFile(bool|string $file, string $fileName, string $type, array $param)
    {
        if ($file == false) {
            return false;
        }

        $path = '';
        switch ($type) {
            case 'group':
                $path = GROUPDIR;
            break;
            case 'event':
            case 'member':
                $group = (int)$param['group'];
                if ($group <= 0) {
                    return false;
                }
                if ($type == 'event') {
                    $path = preg_replace('/<group>/', $group, EVENTDIR);
                } else {
                    $path = preg_replace('/<group>/', $group, MEMBERDIR);
                }
            break;
            case 'home':
                $path = HOMEDIR;
            break;
            default:
                return false;
            break;
        }

        $path .= $fileName;

        $result = Storage::disk('s3')->put($path, $file);
        return $result;
    }

    public function uploadDir()
    {

    }
    public function removeFile(string $fileName, string $type, array $param)
    {

        $path = '';
        switch ($type) {
            case 'group':
            case 'event':
                $group = (int)$param['group'];
                if ($group <= 0) {
                    return false;
                }
                $path = preg_replace('<<group>>', $group, GROUPDIR);
            break;
            case 'home':
                $path = HOMEDIR;
            break;
            case 'member':
                $path = MEMBERDIR;
            break;
            default:
                return false;
            break;
        }

        $path .= $fileName;
        $result = Storage::disk('s3')->delete($path);
        return $result;
    }
    public function removeDir()
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
