<?php

namespace App\Helpers;

use Gregwar\Image\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage as FacadesStorage;

class Storage
{
    /**
     * Save image in storage.
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param string|null $crop
     * @param string|null $removeImage
     *
     * @return string $fullPath
     */
    public static function saveImage(UploadedFile $file, string $directory, ?string $crop = '', ?string $removeImage = ''): string
    {
        $fullPath = FacadesStorage::disk('public')->put($directory, $file);

        $image = Image::open(FacadesStorage::path($fullPath))->fixOrientation();

        if (!in_array(substr(strrchr($fullPath, '.'), 1), ['svg', 'gif'])) {
            if (!empty($crop)) {
                list($width, $height, $type, $attr) = getimagesize(FacadesStorage::path($fullPath));
                $crop = explode(',', $crop);
                if ($width < $crop[0] && $height < $crop[1]) {
                    $image->resize((int)$crop[0], (int)$crop[1], 'transparent');
                } else {
                    $image->zoomCrop((int)$crop[0], (int)$crop[1], 'transparent', 'center', 'center');
                }
            }
        }

        if (!empty($removeImage)) self::removeFile($removeImage);

        return '/storage/' . $directory . '/' . basename($fullPath);
    }

    /**
     * Save file in storage.
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param string|null $removeFile
     *
     * @return string $fullPath
     */
    public static function saveFile(UploadedFile $file, string $directory, ?string $removeFile = null): string
    {
        $fullPath = FacadesStorage::disk('public')->put($directory, $file);

        if (!empty($removeFile)) self::removeFile($removeFile);

        return '/storage/' . $fullPath;
    }

    /**
     * Remove file from storage.
     *
     * @param string $path
     */
    public static function removeFile(string $path): void
    {
        if (stripos($path, 'default')) return;

        $file = str_replace('/storage', '', $path);

        if (File::exists(FacadesStorage::disk('public')->path($file))) {
            File::delete(FacadesStorage::disk('public')->path($file));
        }
    }

    /**
     * Remove file or image from storage.
     *
     * @param string|null $path
     */
    public static function removeFileOrImage(?string $path): void
    {
        if (empty($path)) return;

        self::removeFile($path);
    }

    /**
     * Save file or image (universal).
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param string|null $crop
     * @param string|null $removeImage
     * @return string
     */
    public static function saveFileOrImage(UploadedFile $file, string $directory, ?string $crop = null, ?string $removeImage = null): string
    {
        return is_image($file->extension())
            ? self::saveImage($file, $directory, $crop, $removeImage)
            : self::saveFile($file, $directory, $removeImage);
    }
}
