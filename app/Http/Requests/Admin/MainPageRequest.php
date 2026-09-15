<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MainPageRequest extends FormRequest
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
        return [
            'banner' => ['sometimes', 'nullable'],
            'banner.title' => ['nullable', 'string', 'max:255'],
            'banner.firstImageSrc' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,svg+xml', 'max:5120'],
            'banner.secondImageSrc' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,svg+xml', 'max:5120'],
            'banner.video' => ['nullable', 'file', 'mimes:mp4,webm'],

            'firstTextBlock' => ['sometimes', 'nullable'],
            'firstTextBlock.firstText' => ['nullable', 'string'],
            'firstTextBlock.secondText' => ['nullable', 'string'],

            'twoImagesBlock' => ['sometimes', 'nullable'],
            'twoImagesBlock.firstMedia' => ['sometimes', 'nullable'],
            'twoImagesBlock.firstMedia.src' => ['nullable', 'file', 'mimes:jpeg,jpg,png,webp,svg+xml,mp4,webm', 'max:5120'],
            'twoImagesBlock.firstMedia.title' => ['nullable', 'string', 'max:255'],
            'twoImagesBlock.firstMedia.description' => ['nullable', 'string'],
            'twoImagesBlock.secondMedia' => ['sometimes', 'nullable'],
            'twoImagesBlock.secondMedia.src' => ['nullable', 'file', 'mimes:jpeg,jpg,png,webp,svg+xml,mp4,webm', 'max:5120'],
            'twoImagesBlock.secondMedia.title' => ['nullable', 'string', 'max:255'],
            'twoImagesBlock.secondMedia.description' => ['nullable', 'string'],
            'twoImagesBlock.video' => ['sometimes', 'nullable'],
            'twoImagesBlock.video.src' => ['nullable', 'file', 'mimes:jpeg,jpg,png,webp,svg+xml,mp4,webm', 'max:5120'],
            'twoImagesBlock.video.title' => ['nullable', 'string', 'max:255'],
            'twoImagesBlock.video.description' => ['nullable', 'string'],

            'secondTextBlock' => ['sometimes', 'nullable'],
            'secondTextBlock.title' => ['nullable', 'string', 'max:255'],

            'mediaSlider' => ['sometimes', 'nullable'],
            'mediaSlider.buttonText' => ['nullable', 'string'],
            'mediaSlider.buttonLink' => ['nullable', 'string'],
            'mediaSlider.items' => ['array', 'nullable'],
            'mediaSlider.items.*.src' => ['nullable', 'file', 'mimes:jpeg,jpg,png,webp,svg+xml,mp4,webm', 'max:5120'],
            'mediaSlider.items.*.title' => ['nullable', 'string', 'max:255'],
            'mediaSlider.items.*.description' => ['nullable', 'string'],

            'inviteBlock' => ['sometimes', 'nullable'],
            'inviteBlock.title' => ['nullable', 'string', 'max:255'],
            'inviteBlock.subtitle' => ['nullable', 'string', 'max:255'],
            'inviteBlock.text' => ['nullable', 'string'],
            'inviteBlock.firstImageSrc' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,svg+xml', 'max:5120'],
            'inviteBlock.secondImageSrc' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,svg+xml', 'max:5120'],
            'inviteBlock.firstButton' => ['sometimes', 'nullable'],
            'inviteBlock.firstButton.href' => ['nullable', 'string'],
            'inviteBlock.firstButton.text' => ['nullable', 'string'],
            'inviteBlock.secondButton' => ['sometimes', 'nullable'],
            'inviteBlock.secondButton.href' => ['nullable', 'string'],
            'inviteBlock.secondButton.text' => ['nullable', 'string'],
        ];
    }
}
