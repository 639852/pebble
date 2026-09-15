<?php

namespace App\Services;

use App\Http\Traits\MediaTrait;
use App\Models\Setting;
use Illuminate\Http\Request;

class MainPageService
{
    use MediaTrait;

    /**
     * @var SettingService
     */
    private SettingService $service;

    /**
     * Create a new controller instance.
     *
     * @param SettingService $settingService
     */
    public function __construct(SettingService $settingService)
    {
        $this->service = $settingService;
    }

    /**
     * @param Request $request
     */
    public function update(Request $request)
    {
        $path = '/files/main-page';
        $data = [
            'settings' => [
                'main_page_hero_title' => $request->banner->title,
                'main_page_hero_first_image' => $this->saveFileOrImageFromPicker(
                    $request->banner->firstImageSrc,
                    $path,
                    null,
                    $request->banner->firstImageSrc
                ),
                'main_page_hero_second_image' => $this->saveFileOrImageFromPicker(
                    $request->banner->secondImageSrc,
                    $path,
                    null,
                    $request->banner->secondImageSrc
                ),
                'main_page_hero_video' => $this->saveFileOrImageFromPicker(
                    $request->banner->video,
                    $path,
                    null,
                    $request->banner->video
                ),
            ],
        ];

        $this->service->save(Setting::collection($data));
    }
}
