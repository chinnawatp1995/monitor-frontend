<template>
  <div class="flex gap-3">
    <UButton
      label="Show error toast"
      color="error"
      @click="
        toast.add({
          title: 'Error',
          description: 'Something went wrong',
          ...errorNoti,
        })
      "
    />
    <UButton
      label="Show success toast"
      color="success"
      @click="
        toast.add({
          title: 'Success',
          description: 'This is a notification.',
          ...successNoti,
        })
      "
    />
    <UButton label="Show model" @click="isOpen = true"></UButton>
    <ConfirmDialog
      v-model="isOpen"
      :loading="false"
      @close="isOpen = false"
      @submit="isOpen = false"
    ></ConfirmDialog>
  </div>
</template>
<script setup>
const toast = useToast()
const { errorNoti, successNoti } = useAlert()

const isOpen = ref(false)
</script>
