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
            $image->save(FacadesStorage::path($directory . '/thumbs/' . basename($fullPath)), 'guess', 100);
        } else {
            File::ensureDirectoryExists(FacadesStorage::path($directory . '/thumbs/'));
            File::copy(
                FacadesStorage::path($directory . '/' . basename($fullPath)),
                FacadesStorage::path($directory . '/thumbs/' . basename($fullPath))
            );
        }

        if (!empty($removeImage)) self::removeImage($removeImage);

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
     * Remove image from storage.
     *
     * @param string $path
     */
    public static function removeImage(string $path): void
    {
        if (stripos($path, 'default') !== false) return;

        foreach ([str_replace('/storage', '', $path), str_replace(['/thumbs', '/storage'], '', $path)] as $file) {
            if (File::exists(FacadesStorage::path($file))) {
                File::delete(FacadesStorage::path($file));
            }
        }
    }

    /**
     * Remove file from storage.
     *
     * @param string $path
     */
    public static function removeFile(string $path): void
    {
        if (stripos($path, 'default')) return;

        if (File::exists(FacadesStorage::path(str_replace('/storage', '', $path)))) {
            File::delete(FacadesStorage::path(str_replace('/storage', '', $path)));
        }
    }

    /**
     * Remove file or image from storage.
     *
     * @param string|null $path
     */
    public static function removeFileOrImage(?string $path): void
    {
        if (empty($path))
            return;

        is_image(pathinfo($path, PATHINFO_EXTENSION))
            ? self::removeImage($path)
            : self::removeFile($path);
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
