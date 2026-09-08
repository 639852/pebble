<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { NButton, NCard, NCheckbox, NFlex, NForm, NFormItem, NInput, useMessage } from 'naive-ui'

import type { FormItemRule, FormRules } from 'naive-ui'

const formEl = useTemplateRef('formEl')
const message = useMessage()
const isFirstSend = ref(true)

const state = useForm({
  email: '',
  password: '',
  remember: false,
})

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const rules: FormRules = {
  email: {
    required: true,
    message: 'Please fill in email field.',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: 'Please fill in password field.',
    trigger: ['input', 'blur'],
  },
}

const emailFeedback = computed(() => {
  const rule = rules.email as FormItemRule

  if (isFirstSend.value) return
  if (!state.email) return rule.message as string
  if (state.email.match(emailRegexp)) {
    return
  }

  return 'Email field invalid'
})

function validate() {
  isFirstSend.value = false

  return formEl.value?.validate((errors) => {
    if (errors) {
      console.log(errors)
      message.error('Please fill in all required fields')
      isFirstSend.value = false
    }
  })
}

async function submit() {
  if ((await validate())?.warnings) return

  try {
    state.post('/login', {
      onFinish: () => state.reset('password'),
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
          :validation-status="typeof emailFeedback === 'string' ? 'error' : 'success'"
          :feedback="emailFeedback"
        >
          <NInput
            v-model:value="state.email"
            placeholder="Please input email"
            @keydown.enter.prevent
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
            @keydown.enter.prevent
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
