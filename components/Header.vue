<template>
  <header class="border-b bg-white sticky top-0 z-50">
    <UContainer class="flex h-16 items-center justify-between">
      <div class="font-medium">{{ runtimeConfig.public.name }}</div>
    </UContainer>
  </header>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const links = [
  { text: 'Home', to: '/' },
  // { text: 'Demo', to: '/components' },
]
</script>
