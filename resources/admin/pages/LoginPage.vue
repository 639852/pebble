<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { NButton, NCard, NCheckbox, NFlex, NForm, NFormItem, NInput, useMessage } from 'naive-ui'

import type { FormRules } from 'naive-ui'

const formEl = useTemplateRef('formEl')
const message = useMessage()
const isFirstSend = ref(true)

const state = useForm({
  email: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  email: {
    required: true,
    message: 'Please fill in email field.',
    trigger: ['input'],
  },
  password: {
    required: true,
    message: 'Please fill in password field.',
    trigger: ['input'],
  },
}

function validate() {
  isFirstSend.value = false

  return formEl.value?.validate((errors) => {
    if (!errors) return
    message.error('Please fill in all required fields')
  })
}

async function submit() {
  if ((await validate())?.warnings) return

  try {
    state.post('/login', {
      onFinish: () => state.reset('password'),
      onSuccess: () => {
        state.resetAndClearErrors()
        isFirstSend.value = true
      },
      onError: (errors) => {
        message.error(errors.email ?? '')
      },
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <NFlex
    justify="center"
    align="center"
    class="login-page"
  >
    <NCard
      title="Login"
      class="login-page__card"
    >
      <NForm
        ref="formEl"
        size="large"
        class="login-page__form"
        :rules="rules"
        :model="state"
      >
        <NFormItem
          path="email"
          label="Email"
        >
          <NInput
            v-model:value="state.email"
            placeholder="Please input email"
            @keydown.enter="submit"
          />
        </NFormItem>

        <NFormItem
          path="password"
          label="Password"
          :show-feedback="!state.password && !isFirstSend"
        >
          <NInput
            v-model:value="state.password"
            type="password"
            show-password-on="click"
            placeholder="********"
            @keydown.enter="submit"
            @change="isFirstSend = true"
          />
        </NFormItem>

        <NFormItem
          path="remember"
          class="login-page__checkbox"
          :class="!state.password && !isFirstSend ? 'mb-8' : 'mbl-8'"
          :show-label="false"
          :show-feedback="false"
        >
          <NCheckbox v-model:checked="state.remember"> Remember me </NCheckbox>
        </NFormItem>

        <NButton
          secondary
          type="primary"
          size="large"
          class="login-page__button"
          @click="submit"
        >
          Enter
        </NButton>
      </NForm>
    </NCard>
  </NFlex>
</template>

<style scoped lang="scss">
.login-page {
  height: 100%;

  &__card {
    max-width: 576px;

    :deep(.n-card-header) {
      --n-padding-bottom: 24px;
      --n-title-font-size: 24px;
      text-align: center;
    }
  }

  &__form {
    width: 100%;
  }

  &__checkbox {
    &.mb-8 {
      margin-bottom: 8px;
    }

    &.mbl-8 {
      margin-block: 8px;
    }
  }

  &__button {
    width: 100%;
  }
}
</style>
