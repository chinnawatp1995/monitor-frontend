<template>
  <div class="app">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
const { initYup } = useYup()
initYup()
// handle error fast navigate
window.onerror = (e) => {
  if (e?.toString().includes('NotFoundError:')) {
    document.location.reload()
    return true
  }
}
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
