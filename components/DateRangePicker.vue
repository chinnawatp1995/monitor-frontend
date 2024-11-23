<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { isEqual } from 'lodash'
import 'v-calendar/dist/style.css'

interface IProps {
  mode?: 'date' | 'dateTime'
  min?: string | Date
  max?: string | Date
  disabled?: boolean
  isMonthLength?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  mode: 'date',
})

const attrs = useAttrs()

const { dateTimeFormat, config, startOfTime, endOfTime, subTime } = useDate()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')

const date = defineModel<{ start?: number; end?: number }>()

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

const defaultRange = [
  {
    label: 'วันนี้',
    date: {
      start: startOfTime(new Date(), 'day').getTime(),
      end: endOfTime(new Date(), 'day').getTime(),
    },
  },
  {
    label: 'เมื่อวาน',
    date: {
      start: startOfTime(subTime(new Date(), 1, 'day'), 'day').getTime(),
      end: endOfTime(subTime(new Date(), 1, 'day'), 'day').getTime(),
    },
  },
  {
    label: '7 วันล่าสุด',
    date: {
      start: startOfTime(subTime(new Date(), 6, 'day'), 'day').getTime(),
      end: endOfTime(new Date(), 'day').getTime(),
    },
  },
  {
    label: 'เดือนนี้',
    date: {
      start: startOfTime(new Date(), 'month').getTime(),
      end: endOfTime(new Date(), 'day').getTime(),
    },
  },
  ...[...Array(2).keys()].map((k) => ({
    label: dateTimeFormat(subTime(new Date(), k + 1, 'month'), 'MMMM YY'),
    date: {
      start: startOfTime(
        subTime(new Date(), k + 1, 'month'),
        'month',
      ).getTime(),
      end: endOfTime(subTime(new Date(), k + 1, 'month'), 'month').getTime(),
    },
  })),
]

const monthlyRange = [
  {
    label: 'เดือนนี้',
    date: {
      start: startOfTime(new Date(), 'month').getTime(),
      end: endOfTime(new Date(), 'day').getTime(),
    },
  },
  ...[...Array(5).keys()].map((k) => ({
    label: dateTimeFormat(subTime(new Date(), k + 1, 'month'), 'MMMM YY'),
    date: {
      start: startOfTime(
        subTime(new Date(), k + 1, 'month'),
        'month',
      ).getTime(),
      end: endOfTime(subTime(new Date(), k + 1, 'month'), 'month').getTime(),
    },
  })),
]

const ranges = props.isMonthLength ? monthlyRange : defaultRange

const selectRange = (value: { start: number; end: number }) => {
  date.value = value
}

const isRangeSelected = (value: { start: number; end: number }) => {
  if (!date.value?.start || !date.value?.end) return false
  return isEqual(
    {
      start: dateTimeFormat(
        startOfTime(date.value?.start, 'day'),
        inputFormat.value,
      ),
      end: dateTimeFormat(endOfTime(date.value?.end, 'day'), inputFormat.value),
    },
    {
      start: dateTimeFormat(value.start, inputFormat.value),
      end: dateTimeFormat(value.end, inputFormat.value),
    },
  )
}

const isOpen = ref(false)
watch(
  date,
  () => {
    isOpen.value = false
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
      class="w-full text-sm sm:w-auto"
      v-bind="attrs"
      :disabled="props.disabled"
    >
      <span v-if="date?.start && date?.end" class="flex items-center gap-2">
        {{ dateTimeFormat(date.start, inputFormat) }}
        <Icon
          v-if="date.start && date.end"
          name="tabler:arrow-narrow-right"
          class="flex-none"
        ></Icon>
        {{ dateTimeFormat(date.end, inputFormat) }}
      </span>
      <span v-else>เลือกช่วงวัน</span>
    </UButton>
    <template #panel>
      <div class="flex divide-gray-200 sm:divide-x dark:divide-gray-800">
        <div class="hidden flex-col py-3 sm:flex">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-4 text-base"
            :class="[
              isRangeSelected(range.date)
                ? 'bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary'
                : 'hover:bg-gray-100',
            ]"
            truncate
            size="md"
            @click="selectRange(range.date)"
          />
        </div>
        <v-date-picker
          v-model.range.number="date"
          is24hr
          transparent
          borderless
          color="primary"
          :mode="props.mode"
          :key="date"
          :timezone="config.timezone"
          :min-date="props.min"
          :max-date="props.max"
          :columns="isMobile ? 1 : 2"
          locale="th"
          :attributes="[{ key: 'today', dot: true, dates: new Date() }]"
          @close="isOpen = false"
          @change="isOpen = false"
        />
      </div>
    </template>
  </UPopover>
</template>
