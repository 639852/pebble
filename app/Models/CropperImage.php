<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $src
 * @property int $top
 * @property int $left
 * @property int $cropWidth
 * @property int $cropHeight
 */
class CropperImage extends Model
{
    protected $table = 'cropper_images';

    protected $fillable = [
        'src',
        'top',
        'left',
        'cropWidth',
        'cropHeight',
    ];
}
