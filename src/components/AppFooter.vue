<script setup lang="ts">
import { appStoreLink, bottomLeftLinks, bottomRightLinks, copyright, firstSubtitle, links, secondSubtitle, text, title } from '@/assets/data/footer'
import AppStoreIcon from '@/assets/icons/app-store.svg'
import TextLogoIcon from '@/assets/icons/text-logo.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import ArrowBackgroundIcon from '@/assets/icons/arrow-background.svg'
import PlusIcon from '@/assets/icons/plus.svg'
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <h3 class="footer__title">{{ title }}</h3>

        <ul class="footer__links">
          <li
            v-for="link of links"
            :key="link.href"
            class="footer__link"
          >
            <a :href="link.href">{{ link.text }}</a>
          </li>
        </ul>

        <div class="footer__block">
          <h4 class="footer__subtitle">{{ firstSubtitle }}</h4>
          <button class="footer__button">
            <div class="footer__arrow">
              <ArrowBackgroundIcon />
              <ArrowRightIcon />
            </div>
            <span>Join us</span>
          </button>

          <h4 class="footer__subtitle">{{ secondSubtitle }}</h4>
          <p class="footer__text">{{ text }}</p>
          <a
            class="footer__app-store"
            target="_blank"
            :href="appStoreLink"
          >
            <AppStoreIcon />
          </a>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__plus">
          <PlusIcon />
        </div>

        <div class="footer__bottom-left">
          <a href="/" class="footer__logo footer__link">
            <TextLogoIcon />
          </a>

          <ul class="footer__bottom-links">
            <li
              v-for="link of bottomLeftLinks"
              :key="link.href"
              class="footer__text"
            >
              <a
                class="footer__link"
                :href="link.href"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <span class="footer__copyright footer__text">{{ copyright }}</span>
        <div class="footer__bottom-right">
          <ul class="footer__bottom-links">
            <li
              v-for="link of bottomRightLinks"
              :key="link.href"
              class="footer__text"
            >
              <a
                class="footer__link"
                :href="link.href"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  $this: &;

  display: flex;
  height: 100svh;
  max-height: 85rem;
  padding: clamp(3.5rem, mix.ruber(5.5, 147), 8.5rem) var(--padding-container) clamp(3.8rem, mix.ruber(5.8, 147), 7.8rem);

  background: #a39b8b;
  color: var(--light-text-color);
  overflow: hidden;

  @include mix.media(laptop-l) {
    height: auto;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2.4rem;

    width: 100%;
  }

  &__top {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    gap: 2.4rem;

    @include mix.media(mobile) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 4rem;
    }
  }

  &__title, &__link > a {
    font-family: 'Youth', sans-serif;
    @include mix.title(clamp(2.4rem, mix.ruber(4, 102), 4.8rem), 400, inherit, 0.97);
    letter-spacing: -0.048rem;
  }

  &__title {
    grid-column: 1 / 3;
    max-width: 45rem;
    margin: 0;

    opacity: 0.6;

    @include mix.media(mobile) {
      grid-column: unset;
    }
  }

  &__links, &__bottom-links {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__links {
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  &__link {
    transition: opacity 300ms;

    @include mix.hover {
      opacity: 0.6;
    }
  }

  &__block {
    max-width: 34rem;

    @include mix.media(mobile) {
      grid-column: 1 / 3;
    }
  }

  &__subtitle {
    margin-block: 0 2rem;

    font-family: var(--main-font);
    @include mix.text-style(clamp(1.8rem, mix.ruber(2.4, 102), 2.9rem), 400, inherit, 1.1);
    letter-spacing: -0.029rem;

    @include mix.media(mobile) {
      margin-bottom: 1.2rem;
    }
  }

  &__text {
    font-family: var(--mono-font);
    @include mix.text-style(clamp(1rem, mix.ruber(1.2, 102), 1.3rem), 400, inherit, 1.77);
    text-transform: uppercase;
    letter-spacing: 0.066rem;

    & > a {
      color: inherit;
    }
  }

  &__button {
    @include mix.flex-row(1rem);
    margin-bottom: 4rem;

    font-family: var(--mono-font);
    @include mix.text-style(clamp(1rem, mix.ruber(1.2, 102), 1.3rem), 400, inherit, 1.8);
    text-transform: uppercase;

    @include mix.hover {
      #{$this}__arrow > svg:first-child {
        transform: scale(1.1) rotate(50deg);
      }
    }

    @include mix.media(mobile) {
      margin-bottom: 2.4rem;
    }
  }

  &__arrow {
    position: relative;
    width: 3.7rem;
    height: 3.6rem;

    & > svg {
      &:first-child {
        @include mix.absolute-cover;
        transition: transform 400ms cubic-bezier(0, 0, 0.2, 1);
      }

      &:last-child {
        @include mix.absolute-center;
        color: var(--text-color);
      }
    }
  }

  &__app-store {
    display: block;
    width: 20rem;
    margin-top: 1.8rem;

    transition: opacity 300ms;

    & > svg {
      @include mix.full-size;
    }

    @include mix.hover {
      opacity: 0.6;
    }
  }

  &__bottom {
    $bottom: &;
    position: relative;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;

    padding-top: 6rem;
    border-top: 1px solid rgba(#f2efe9, 0.2);

    @include mix.media(laptop-l) {
      grid-template-columns: auto 1fr;
      gap: 2rem 1.5rem;
      padding-top: 2.6rem;
    }

    @include mix.media(tablet-s) {
      grid-template-columns: auto;
      row-gap: 1.6rem;
      padding-top: 1.6rem;
    }

    &-left {
      @include mix.flex-row(2.6rem);
    }

    &-links {
      flex-shrink: 0;
      @include mix.flex-row(1.3rem);

      & > li:not(:first-child) {
        @include mix.flex-row(1.3rem);

        &::before {
          content: '';
          display: block;
          @include mix.circle(3px, null, var(--light-text-color));
        }
      }
    }

    &-right {
      justify-self: end;

      @include mix.media(laptop-l) {
        justify-self: unset;
      }

      @include mix.media(custom, #{vars.$breakpoint_tablet-s + 1px}, #{vars.$breakpoint_laptop-l}) {
        #{$bottom}-links > li {
          @include mix.flex-row(1.3rem);

          &::before {
            content: '';
            display: block;
            @include mix.circle(3px, null, var(--light-text-color));
          }
        }
      }

      @include mix.media(tablet-s) {
        width: 100%;
        padding-top: 1.6rem;
        border-top: 1px solid rgba(#f2efe9, 0.2);
        overflow: auto;
      }
    }
  }

  &__plus {
    position: absolute;
    top: -1.1rem;
    left: 50%;
    transform: translateX(-50%);

    & > svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__logo {
    display: block;
    width: 14rem;
    height: 3rem;
    margin-right: 5.3rem;

    color: inherit;

    & > svg {
      @include mix.full-size;
    }

    @include mix.media(laptop-l) {
      display: none;
    }
  }

  &__copyright {
    text-align: center;

    @include mix.media(laptop-l) {
      grid-row: 2;
      grid-column: 1 / 3;

      padding-top: 2rem;
      border-top: 1px solid rgba(#f2efe9, 0.2);
    }

    @include mix.media(laptop-l) {
      grid-column: unset;
      grid-row: 3;
    }

    @include mix.media(tablet-s) {
      padding-top: 1.6rem;
    }
  }
}
</style>
