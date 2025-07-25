<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Log::debug ('my user value in middleware: ' .json_encode(Auth::user()));
        if (!empty($request->user())) {
            if ($request->user()['manage_group'] != '10242048') {
                return redirect('/');
            } else {
                return $next($request);
            }
        }
        return redirect(('/login'));
    }
}
