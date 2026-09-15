<?php

namespace App\Services;

use App\Helpers\Storage;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Models\User;

class UserService
{
    /**
     * @param UserUpdateRequest $request
     * @param User $user
     * @return User
     */
    public function update(UserUpdateRequest $request, User $user): User
    {
        $user->update(
            array_replace(
                $request->except('password'),
                $this->saveImage($request, $user->image),
                $request->filled('password') ? ['password' => $request->password] : []
            )
        );

        return $user;
    }

    /**
     * @param UserUpdateRequest $request
     * @param string|null $currentImage
     * @return null[]|string[]
     */
    private function saveImage(UserUpdateRequest $request, $currentImage = null): array
    {
        return [
            'image' => $request->hasFile('image') ? Storage::saveImage($request->file('image'), 'images/users', '256,256', $currentImage) : $currentImage
        ];
    }
}
