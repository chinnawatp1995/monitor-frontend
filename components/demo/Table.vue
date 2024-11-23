<template>
  <UInput
    v-model="q"
    size="md"
    icon="i-heroicons-magnifying-glass-20-solid"
    placeholder="Filter people..."
    class="mb-6"
  />
  <UTable
    :columns="columns"
    :rows="filteredRows"
    :sort="{ column: 'title', direction: 'asc' }"
    class="rounded-lg bg-white border"
  />
  <div class="flex justify-end mt-3">
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="people.length"
    />
  </div>
</template>
<script setup lang="ts">
import { type UITable } from '@/types'
const columns: UITable = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'email', label: 'Email', sortable: true, direction: 'desc' },
  { key: 'role', label: 'Role' },
]

const page = ref(1)
const pageCount = 5
const q = ref('')
const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }
  return people
    .filter((person) => {
      return Object.values(person).some((value) => {
        return String(value).toLowerCase().includes(q.value.toLowerCase())
      })
    })
    .slice((page.value - 1) * pageCount, page.value * pageCount)
})

const people = [
  {
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin',
  },
  {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member',
  },
  {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin',
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner',
  },
  {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member',
  },
]
</script>
