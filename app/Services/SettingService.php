<?php

namespace App\Services;

use App\Helpers\Storage;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Traits\MediaTrait;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;

class SettingService
{
    use MediaTrait;

    /**
     * Save Content Settings.
     *
     * @param Request $request
     * @return void
     * @throws ValidationException
     */
    public function save(Request $request): void
    {
        $this->saveText($request);
        $this->saveArrays($request);
        $this->saveFiles($request);
        $this->saveMedia($request);
    }

    /**
     * Save text data.
     *
     * @param Request $request
     */
    private function saveText(Request $request): void
    {
        foreach ($request->settings ?? [] as $name => $setting) {
            Setting::query()->updateOrCreate(['name' => $name], ['value' => $setting])->save();
        }
    }

    /**
     * Save media data.
     *
     * @param Request $request
     */
    private function saveMedia(Request $request): void
    {
        foreach ($request->media ?? [] as $name => $media) {
            if ($media instanceof UploadedFile || is_array($media)) {
                Setting::query()->updateOrCreate(
                    ['name' => $name],
                    ['value' => $this->saveFileOrImageFromPicker($media, 'files/setting', null, setting($name) ?? null)]
                )->save();
            } elseif (isset($media['remove']) && $media['remove'] == 1) {
                Storage::removeFile(setting($name) ?? null);
                Setting::query()->where('name', '=', $name)->delete();
            }
        }
    }

    /**
     * Save files (json) data.
     *
     * @param Request $request
     */
    private function saveFiles(Request $request): void
    {
        foreach ($request->uploadFiles ?? [] as $name => $file) {
            if ($file instanceof UploadedFile) {
                Setting::query()->updateOrCreate(
                    ['name' => $name],
                    ['value' => Storage::saveFile($file, 'files/setting', setting($name) ?? null)]
                )->save();
            } elseif (isset($file['remove']) && $file['remove'] == 1) {
                Storage::removeFile(setting($name) ?? null);
                Setting::query()->where('name', '=', $name)->delete();
            }
        }
    }

    /**
     * Save arrays (json) data.
     *
     * @param Request $request
     */
    private function saveArrays(Request $request): void
    {
        foreach ($request->arrays ?? [] as $name => $array) {
            $array = (!empty($request->input('array_settings')[$name]['array_values']))
                ? array_values_recursive($array)
                : $array;

            foreach ($array as $i => $item) {
                if ($item['src'] instanceof UploadedFile) {
                    $src = Storage::saveFile($item['src'], 'files/setting', setting($name . $i . '_src') ?? null);
                    $array[$i]['src'] = $src;
                }
            }

            Setting::query()->updateOrCreate(
                ['name' => $name],
                ['value' => json_encode(array_filter($array), JSON_UNESCAPED_UNICODE)]
            )->save();
        }
    }
}
