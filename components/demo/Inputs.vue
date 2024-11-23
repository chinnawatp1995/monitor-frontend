<template>
  <UCard>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup name="input" label="Input">
        <UInput v-model="state.input" placeholder="Type something..." />
      </UFormGroup>

      <UFormGroup name="inputMenu" label="Input Menu">
        <UInputMenu
          v-model="state.inputMenu"
          :options="options"
          value-attribute="value"
          placeholder="Type something..."
        />
      </UFormGroup>

      <UFormGroup name="textarea" label="Textarea">
        <UTextarea v-model="state.textarea" placeholder="Type something..." />
      </UFormGroup>

      <UFormGroup name="select" label="Select">
        <USelect
          v-model="state.select"
          placeholder="Select..."
          :options="options"
        />
      </UFormGroup>

      <UFormGroup name="selectMenu" label="Select Menu">
        <USelectMenu
          v-model="state.selectMenu"
          placeholder="Select..."
          :options="options"
        />
      </UFormGroup>

      <UFormGroup name="toggle" label="Toggle">
        <UToggle v-model="state.toggle" />
      </UFormGroup>

      <UFormGroup name="checkbox" label="Checkbox">
        <UCheckbox v-model="state.checkbox" label="Check me" />
      </UFormGroup>

      <UFormGroup name="radioGroup" label="Radio Group">
        <URadioGroup v-model="state.radioGroup" :options="options" />
      </UFormGroup>

      <UFormGroup name="radio" label="Radio">
        <URadio
          v-for="option in options"
          :key="option.value"
          v-model="state.radio"
          v-bind="option"
        >
          {{ option.label }}
        </URadio>
      </UFormGroup>

      <UFormGroup name="range" label="Range">
        <URange v-model="state.range" />
      </UFormGroup>
      <DatePicker v-model="state.date"></DatePicker>
      <DateRangePicker v-model="state.dateRange"></DateRangePicker>
      <DateRangePicker
        v-model="state.dateRange"
        isMonthLength
      ></DateRangePicker>

      <UButton type="submit"> Submit </UButton>

      <UButton variant="outline" class="ml-2" @click="form.clear()">
        Clear
      </UButton>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { boolean, number, object, string, type InferType } from 'yup'

const schema = object({
  input: string().min(10),
  inputMenu: string().required(),
  textarea: string().min(10),
  select: string().required(),
  selectMenu: string().required(),
  toggle: boolean().required(),
  checkbox: boolean().required(),
  radio: string().required(),
  radioGroup: string().required(),
  range: number().max(20, 'Must be less than 20'),
})

type Schema = InferType<typeof schema>

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

const state = reactive({
  input: undefined,
  inputMenu: undefined,
  textarea: undefined,
  select: undefined,
  selectMenu: undefined,
  checkbox: undefined,
  toggle: undefined,
  radio: undefined,
  radioGroup: undefined,
  switch: undefined,
  range: undefined,
  date: Date.now(),
  dateRange: {
    start: Date.now(),
    end: Date.now(),
  },
})

const form = ref()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>
