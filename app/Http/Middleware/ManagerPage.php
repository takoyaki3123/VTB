<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        Log::debug ('my session value: ' . json_encode(session()->all()));
        Log::debug ('request session user: ' . $request->session()->get('user'));
        dd($request->header('Cookie'));
        if (empty(session('user'))) {
            return redirect('/managerLogin');
        }
        return $next($request);
    }
}
