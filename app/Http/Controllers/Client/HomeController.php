<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Traits\MainPageTrait;
use App\Services\SettingService;
use Inertia\Inertia;

class HomeController extends Controller
{
    use MainPageTrait;

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

    public function index()
    {
        $data = $this->collectData();
        return Inertia::render('MainPage', ['data' => $data]);
    }
}
