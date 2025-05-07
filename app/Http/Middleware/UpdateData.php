<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdateData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $requestToken = $request->input('token') ?? '';
        $sessionToken = $request->session()->token();
        if (!empty($sessionToken)) {
            if (!hash_equals($sessionToken, $requestToken)) {
                abort(419, 'CSRF Token Mismatch.');
            }
        }
        return $next($request);
    }
}
