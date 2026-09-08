<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Traits\RedirectTrait;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use App\Http\Requests\Admin\UserUpdateRequest;

class UserController extends Controller
{
    use RedirectTrait;

    /**
     * @var UserService
     */
    private UserService $service;

    /**
     * Create a new controller instance.
     *
     * @param UserService $userService
     */
    public function __construct($userService)
    {
        $this->service = $userService;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return Application|Factory|View
     */
    public function edit($user): Application|Factory|View
    {
        return view('admin.users.edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param User $user
     *
     * @return RedirectResponse
     */
    public function update($request, $user): RedirectResponse
    {
        $this->service->update($request, $user);

        return $this->redirectToBack($request);
    }
}
