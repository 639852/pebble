<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

trait RedirectTrait
{
    /**
     * @param Request $request
     * @param Model $model
     * @param string $route
     * @param string $message
     *
     * @return RedirectResponse
     */
    public function redirect($request, $model, $route, string $message = 'Объект успешно сохранен.'): RedirectResponse
    {
        $redirect = redirect()->route("admin.{$route}.index");

        if ($request->submit === 'save') {
            $redirect = redirect()->route("admin.{$route}.edit", $model->id);
            foreach (['accordion', 'tab'] as $fragment) {
                if (!empty($request->{$fragment})) {
                    $redirect = $redirect->withFragment($request->{$fragment});
                }
            }
        }

        return $redirect->with('success', $message);
    }

    /**
     * @param Request $request
     * @param Model $model
     * @param string $saveRoute
     * @param string $defaultRoute
     * @param string $message
     *
     * @return RedirectResponse
     */
    public function redirectToRoutes($request, $model, $saveRoute, $defaultRoute, $message = 'Объект успешно сохранен.'): RedirectResponse
    {
        $redirect = redirect()->route($defaultRoute);

        if ($request->submit === 'save') {
            $redirect = redirect()->route($saveRoute, $model->id);
            foreach (['accordion', 'tab'] as $fragment) {
                if (!empty($request->{$fragment})) {
                    $redirect = $redirect->withFragment($request->{$fragment});
                }
            }
        }

        return $redirect->with('success', $message);
    }

    /**
     * @param Request $request
     * @param string $message
     *
     * @return RedirectResponse
     */
    public function redirectToBack($request, $message = 'Объект успешно сохранен.'): RedirectResponse
    {
        $redirect = redirect()->back();

        foreach (['accordion', 'tab'] as $fragment) {
            if (!empty($request->{$fragment})) {
                $redirect = $redirect->withFragment($request->{$fragment});
            }
        }

        return $redirect->with('success', $message);
    }
}
