<template>
  <UButton
    color="gray"
    icon="i-heroicons-x-mark-20-solid"
    @click="emit('close')"
  />
</template>
<script setup lang="ts">
const emit = defineEmits(['close'])
</script>
