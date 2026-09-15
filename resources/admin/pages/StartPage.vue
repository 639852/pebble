<script setup lang="ts">
import { NDataTable } from 'naive-ui'

interface User {
  id: number
  name: string
  email: string
  roles: [{ id: number; name: string }]
}
const props = defineProps<{ auth: { user: User } }>()

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
]

const data = [
  { ...props.auth.user, role: props.auth.user.roles[0].name },
  { id: 2, name: 'Test user', email: 'test@example.com', role: 'user' },
]
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="data"
  />
</template>
