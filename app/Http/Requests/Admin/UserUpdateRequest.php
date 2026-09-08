<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')->id ?? null;

        return [
            'name' => 'required',
            'email' => ['required', "unique:users,email,$userId,id"],
            'password' => ['nullable', 'min:6', 'confirmed'],
        ];
    }

    /**
     * Return messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Имя является обязательным полем.',
            'email.required' => 'Email является обязательным полем.',
            'email.unique' => 'Пользователсь с таким email-ом уже существует.',
            'password.min' => 'Пароль не может быть меньше :min символов.',
            'password.confirmed' => 'Пароли не совпадают',
        ];
    }
}
