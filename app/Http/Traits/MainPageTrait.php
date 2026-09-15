<?php

namespace App\Http\Traits;

trait MainPageTrait
{
    public function collectData()
    {
        return [
            'banner' => [
                'title' => setting('main_page_hero_title'),
                'firstImageSrc' => setting('main_page_hero_first_image'),
                'secondImageSrc' => setting('main_page_hero_second_image'),
                'video' => setting('main_page_hero_video'),
            ],
            'firstTextBlock' => [
                'firstText' => setting('main_page_first_text_block_first_text'),
                'secondText' => setting('main_page_first_text_block_second_text'),
            ],
            'twoImagesBlock' => [
                'firstMedia' => [
                    'src' => setting('main_page_two_images_first_media_src'),
                    'title' => setting('main_page_two_images_first_media_title'),
                    'description' => setting('main_page_two_images_first_media_description'),
                ],
                'secondMedia' => [
                    'src' => setting('main_page_two_images_second_media_src'),
                    'title' => setting('main_page_two_images_second_media_title'),
                    'description' => setting('main_page_two_images_second_media_description'),
                ],
                'video' => [
                    'src' => setting('main_page_two_images_video_src'),
                    'title' => setting('main_page_two_images_video_title'),
                    'description' => setting('main_page_two_images_video_description'),
                ],
            ],
            'secondTextBlock' => [
                'title' => setting('main_page_second_text_block_title'),
            ],
            'mediaSlider' => [
                'buttonText' => setting('main_page_media_slider_button_text'),
                'buttonLink' => setting('main_page_media_slider_button_link'),
                'items' => array_values(setting('main_page_media_slider', true) ?? []),
                'rawItems' => setting('main_page_media_slider', true),
            ],
            'inviteBlock' => [
                'title' => setting('main_page_invite_block_title'),
                'subtitle' => setting('main_page_invite_block_subtitle'),
                'text' => setting('main_page_invite_block_text'),
                'firstImageSrc' => setting('main_page_invite_block_first_image'),
                'secondImageSrc' => setting('main_page_invite_block_second_image'),
                'firstButton' => [
                    'href' => setting('main_page_invite_block_first_button_href'),
                    'text' => setting('main_page_invite_block_first_button_text'),
                ],
                'secondButton' => [
                    'href' => setting('main_page_invite_block_second_button_href'),
                    'text' => setting('main_page_invite_block_second_button_text'),
                ],
            ],
        ];
    }
}
