<template>
  <UModal v-model="props.modelValue" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="font-medium text-lg">
          {{ props.title }}
        </div>
      </template>
      <div class="opacity-70">
        {{ props.message }}
      </div>
      <template #footer>
        <div class="grid grid-cols-2 gap-3">
          <UButton
            :label="props.closeText"
            variant="ghost"
            size="lg"
            block
            @click="emit('close')"
          ></UButton>
          <UButton
            :label="props.submitText"
            size="lg"
            block
            :loading="props.loading"
            @click="emit('submit')"
          ></UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
interface IProps {
  modelValue: boolean
  loading: boolean
  title?: string
  message?: string
  closeText?: string
  submitText?: string
  isDanger?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  loading: false,
  title: 'Confirm',
  message: 'Are you sure you want to proceed?',
  closeText: 'Close',
  submitText: 'Confirm',
  isDanger: false,
})
const emit = defineEmits(['close', 'submit'])
</script>
