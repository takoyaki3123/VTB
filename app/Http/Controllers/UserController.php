<?php

namespace App\Http\Controllers;

use App\Http\Exception\HandleException;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\ErrorHandler\Debug;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $userList = User::all()->toArray();

        return new HandleException(200, $userList, '');
    }

    // login verify
    public function login(Request $request)
    {
        $validate = $request->authenticate();

        if ($validate) {
            $post = $request->post()['body'];
    
            $acct = User::where([['email', '=', $post['acct']],['password', '=', $post['ps']]])->first();
            return new HandleException(200, $acct, '');
        }
    }

    public function logout()
    {
        session()->forget('user');
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
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        $post = $request->post()['body'];
        $user = User::find((int)$post['id']);
        if (!empty($user)) {
            $user->name = $post['name'];
            $user->email = $post['email'];
            $user->save();
            return new HandleException(200, [], '');
        }
        return new HandleException(400, [], '使用者が見当たりません');
    }

    public function updatePermission(Request $request)
    {
        $post = $request->post()['body'];
        $user = User::find((int)$post['id']);
        $user->manage_group = $post['newPermission'];
        $user->save();
        return new HandleException(200, [], '');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
