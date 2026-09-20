<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MainPageRequest;
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

    /**
     * @param MainPageRequest $request
     */
    public function update(MainPageRequest $request)
    {
        $request->validated();
        $this->service->save($request);

        return Inertia::flash('message', 'Main page saved successfully!')->back();
    }
}
