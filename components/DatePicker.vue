<script setup lang="ts">
import 'v-calendar/dist/style.css'

interface IProps {
  mode?: 'date' | 'dateTime'
  min?: string | Date
  max?: string | Date
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  mode: 'date',
})

const attrs = useAttrs()

const { dateTimeFormat, config } = useDate()

const date = defineModel<number>()

const inputFormat = computed(() => {
  switch (props.mode) {
    case 'date':
      return 'DD/MM/YYYY'
    case 'dateTime':
      return 'DD/MM/YYYY HH:mm'
    default:
      return 'DD/MM/YYYY'
  }
})

const isOpen = ref(false)

const closeDialog = () => {
  if (props.mode === 'dateTime') return
  isOpen.value = false
}
watch(
  date,
  () => {
    closeDialog()
  },
  { deep: true },
)
</script>

<template>
  <UPopover
    v-model:open="isOpen"
    :popper="{ placement: 'bottom-start' }"
    :class="{ 'rounded-md bg-slate-300': props.disabled }"
  >
    <UButton
      icon="tabler:calendar-month"
      color="white"
      class="text-sm"
      v-bind="attrs"
      :disabled="props.disabled"
    >
      <span v-if="date" class="flex items-center gap-2">
        {{ dateTimeFormat(date, inputFormat) }}
      </span>
      <span v-else>เลือกวันที่</span>
    </UButton>
    <template #panel>
      <v-date-picker
        v-model.number="date"
        is24hr
        transparent
        borderless
        color="primary"
        :mode="props.mode"
        :key="date"
        :timezone="config.timezone"
        :min-date="props.min"
        :max-date="props.max"
        locale="th"
        :attributes="[{ key: 'today', dot: true, dates: new Date() }]"
        @close="closeDialog()"
        @change="closeDialog()"
      />
    </template>
  </UPopover>
</template>
