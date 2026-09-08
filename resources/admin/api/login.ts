import type { LoginData } from '~/types'

const url = '/login'

export function login(data: LoginData) {
  const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content

  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token ?? '',
    },
    credentials: 'include',
  })
}
