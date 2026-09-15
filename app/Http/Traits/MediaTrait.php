<?php

namespace App\Http\Traits;

use App\Helpers\Storage;
use Illuminate\Http\UploadedFile;

trait MediaTrait
{
    /**
     * Save image or file from picker.
     *
     * @param array|UploadedFile|null $media
     * @param string $directory
     * @param string|null $crop
     * @param string|null $removeFile
     * @return string|null
     */
    private static function saveFileOrImageFromPicker(
        array|UploadedFile|null $media,
        string $directory,
        ?string $crop = null,
        ?string $removeFile = null
    ): string|null {
        if (empty($media)) {
            $src = null;
        } else if ($media['src'] instanceof UploadedFile && !$media['remove']) {
            $src = Storage::saveFileOrImage($media['src'], $directory, $crop, $removeFile ?? null);
        } else if ($media instanceof UploadedFile) {
            $src = Storage::saveFileOrImage($media, $directory, $crop, $removeFile ?? null);
        } elseif (!isset($media['remove']) || !$media['remove']) {
            $src = $media['src'] ?? null;
        } else {
            $src = null;
        }

        if (empty($src)) {
            Storage::removeFileOrImage($removeFile ?? null);
        }

        return $src;
    }
}
