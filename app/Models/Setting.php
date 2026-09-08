<?php

namespace App\Models;

use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;


/**
 * @property int $id
 * @property string $name
 * @property string $value
 */
class Setting extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'settings';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'value'
    ];

    public $timestamps = false;

    /**
     * Get setting by name.
     *
     * @param string $name
     * @param bool|null $associative
     * @return mixed
     */
    public static function getSettingByName(string $name,  ?bool $associative = null): mixed
    {
        try {
            $settings = Container::getInstance()->get('GetterService');
        } catch (NotFoundExceptionInterface | ContainerExceptionInterface $e) {
            abort(500, 'Settings not loaded. ' . $e->getMessage());
        }

        $setting = !empty($settings) ? $settings->get($name) : NULL;

        if (!$setting) return NULL;

        if (is_json($setting)) return json_decode($setting, $associative);

        return $setting;
    }
}
