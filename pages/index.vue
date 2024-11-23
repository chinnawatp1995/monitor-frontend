<template>
  <div class="py-3">
    <UAlert icon="i-heroicons-command-line" title="Nuxt UI" class="mb-6">
      <template #description>
        <NuxtLink
          to="https://ui.nuxt.com/getting-started/installation"
          target="_blank"
          class="text-primary"
        >
          https://ui.nuxt.com/getting-started/installation
        </NuxtLink>
      </template>
    </UAlert>

    <UTabs :items="items" :ui="{ wrapper: 'space-y-6' }">
      <template #item="{ item }">
        <component :is="item.component"></component>
      </template>
    </UTabs>
  </div>
</template>
<script setup>
const { addTime } = useDate()
const items = [
  {
    label: 'Inputs',
    component: resolveComponent('DemoInputs'),
  },
  {
    label: 'Table',
    component: resolveComponent('DemoTable'),
  },
  {
    label: 'Notifications',
    component: resolveComponent('DemoNotifications'),
  },
]
</script>
