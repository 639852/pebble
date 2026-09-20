import { h } from 'vue'
import { NIcon } from 'naive-ui'

import type { Component } from 'vue'

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

interface State {
  [key: string]: string | File | State | Array<State>
}

export function objectToFormData(obj: State, formData = new FormData(), prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key

    if (value instanceof File) {
      formData.append(fullKey, value, value.name)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${fullKey}[${index}]`, item, item.name)
        } else if (item !== null && typeof item === 'object') {
          objectToFormData(item, formData, `${fullKey}[${index}]`)
        } else {
          formData.append(`${fullKey}[${index}]`, String(item))
        }
      })
    } else if (value !== null && typeof value === 'object') {
      objectToFormData(value, formData, fullKey)
    } else {
      formData.append(fullKey, String(value))
    }
  }
  return formData
}

export async function getBase64Image(value: string | File) {
  try {
    let blob: Blob

    if (typeof value === 'string') {
      const response = await fetch(value, { mode: 'cors' })
      blob = await response.blob()
    } else {
      blob = value
    }
    const reader = new FileReader()

    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error(error)
    return ''
  }
}
