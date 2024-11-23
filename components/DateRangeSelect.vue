<template>
  <div class="flex gap-3 overflow-x-auto">
    <Button
      v-for="item in dates"
      :key="item.text"
      class="whitespace-nowrap"
      :class="{ 'bg-primary': !isEqual(props.modelValue, item.date) }"
      :disabled="props.loading"
      @click="emit('selected', item.date)"
    >
      {{ item.text }}
    </Button>
  </div>
</template>
<script setup lang="ts">
import { isEqual } from 'lodash'
const props = defineProps<{
  modelValue: { start?: Date | number; end?: Date | number }
  loading?: boolean
}>()
const emit = defineEmits(['selected'])

const { startOfTime, endOfTime, subTime } = useDate()
const dates = [
  {
    text: 'Today',
    date: {
      start: startOfTime(new Date(), 'day').getTime(),
      end: endOfTime(new Date(), 'day').getTime(),
    },
  },
  {
    text: 'Yesterday',
    date: {
      start: startOfTime(subTime(new Date(), 1, 'day'), 'day').getTime(),
      end: endOfTime(subTime(new Date(), 1, 'day'), 'day').getTime(),
    },
  },
  {
    text: 'This Week',
    date: {
      start: startOfTime(new Date(), 'week').getTime(),
      end: endOfTime(new Date(), 'week').getTime(),
    },
  },
  {
    text: 'This Month',
    date: {
      start: startOfTime(new Date(), 'month').getTime(),
      end: endOfTime(new Date(), 'month').getTime(),
    },
  },
  {
    text: 'Last Month',
    date: {
      start: startOfTime(subTime(new Date(), 1, 'month'), 'month').getTime(),
      end: endOfTime(subTime(new Date(), 1, 'month'), 'month').getTime(),
    },
  },
]
</script>
