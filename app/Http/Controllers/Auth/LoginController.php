<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * The path to the "admin" route for your application.
     *
     * Users with role "admin" are redirected here after authentication.
     *
     * @var string
     */
    public const ADMIN = '/admin';

    use AuthenticatesUsers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        if (Auth::check()) {
            return redirect($this->redirectTo());
        }

        return Inertia::render('LoginPage');
    }

    /**
     * @param  Request  $request
     * @return RedirectResponse|Response
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            $this->clearLoginAttempts($request);

            return $this->sendLoginResponse($request);
        }

        $this->incrementLoginAttempts($request);

        return response()->json([
            'message' => 'Invalid email or password',
        ], 422);
    }

    /**
     * @param Request $request 
     */
    protected function validateLogin($request): Validator
    {
        return validator($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);
    }

    /**
     * @param Request $request 
     */
    protected function attemptLogin($request)
    {
        return $this->guard()->attempt(
            $this->credentials($request),
            $request->filled('remember')
        );
    }

    /**
     * @param Request $request 
     */
    protected function credentials($request)
    {
        return $request->only('email', 'password');
    }

    /**
     * @param Request $request 
     */
    protected function sendLoginResponse($request)
    {
        $request->session()->regenerate();

        return redirect()->intended($this->redirectTo());
    }

    /**
     * @param Request $request 
     */
    public function logout($request)
    {
        $this->guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Brutforce guard (Throttle).
     */
    protected function decayMinutes()
    {
        return 2;
    }

    /**
     * Where to redirect users after login.
     *
     *
     * @return string
     */
    public function redirectTo(): string
    {
        if (Auth::user()->hasRole('admin')) {
            return self::ADMIN;
        }
        return self::HOME;
    }
}
