<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class ManagerPage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Log::debug ('my session value in middleware: ' .json_encode($request->user()));
        // Log::debug ('request session user: ' . $request->session()->get('user'));
        // dd($request->header('Cookie'));
        if (!empty($request->user())) {
            if ($request->user()['name'] != 'administrator') {
                return redirect('/');
            } else {
                return $next($request);
            }
        }
        return redirect(('/login'));
    }
}
