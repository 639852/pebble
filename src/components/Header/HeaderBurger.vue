<template>
  <div class="header-burger">
    <div class="header-burger__lines">
      <span class="header-burger__line"></span>
      <span class="header-burger__line"></span>
      <span class="header-burger__line"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-burger {
  $this: &;

  @include mix.flex-center;
  @include mix.box(10.8rem);
  cursor: pointer;

  @include mix.hover {
    #{$this}__line {
      transform: translateX(100%);

      &:nth-child(1) {
        transition-delay: 0ms;
      }

      &:nth-child(3) {
        transition-delay: 200ms;
      }
    }
  }

  &__lines {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    width: 1.8rem;
    overflow: hidden;
  }

  &__line {
    height: 1px;
    background: var(--icon-color);
    transition: transform 300ms ease-in 300ms;

    &:nth-child(2) {
      transition-delay: 100ms;
    }

    &:nth-child(3) {
      transition-delay: 0ms;
    }
  }
}
</style>
