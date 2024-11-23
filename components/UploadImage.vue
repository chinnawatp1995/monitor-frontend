<template>
  <label>
    <div
      class="flex cursor-pointer items-center justify-center rounded border bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none"
      ref="dropImage"
      :class="{ 'bg-primary/20': isOverDropZone }"
    >
      {{ props.label || 'Choose file' }}
      <Icon name="lucide:image-plus" class="ml-2"></Icon>
    </div>
    <input
      type="file"
      class="sr-only"
      @change="onChange"
      tabindex="-1"
      accept="image/*"
      :multiple="props.multiple"
    />
  </label>
</template>
<script setup lang="ts">
interface Props {
  modelValue?: FileList
  multiple?: boolean
  label?: string
}
const emit = defineEmits(['update:modelValue'])
const props = defineProps<Props>()

const dropImage = ref()
const onChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  emit('update:modelValue', files)
}
const onDrop = (files: File[] | null) => {
  if (!files) return emit('update:modelValue', files)
  const validFiles = files.filter((k) => k.type.includes('image'))
  emit('update:modelValue', validFiles)
}
const { isOverDropZone } = useDropZone(dropImage, onDrop)
</script>
