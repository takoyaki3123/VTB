<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    // login verify
    public function login(Request $request)
    {
        $validate = $request->authenticate();

        if ($validate) {
            $post = $request->post()['body'];
    
            $acct = User::where([['email', '=', $post['acct']],['password', '=', $post['ps']]])->first();
            session(['user' => $acct['name']]);
            return $acct;
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
