<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils';


const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  class?: string
}>(), {
  orientation: 'horizontal',
  decorative: true,
  class: ''
})

// Clases dinámicas basadas en la orientación
const separatorClasses = computed(() => {

  const orientationClasses = props.orientation === 'horizontal'
    ? 'h-[1px] w-full'
    : 'h-full w-[1px]'

  return cn(`shrink-0 bg-border ${orientationClasses} ${props.class}`)
})

// Atributos de accesibilidad
const ariaOrientation = computed(() =>
  props.orientation === 'vertical' ? 'vertical' : undefined
)
</script>

<template>
  <div :class="separatorClasses" role="separator" :aria-orientation="ariaOrientation" :aria-hidden="decorative"
    :data-orientation="orientation" />
</template>

<style scoped>
/* Variables CSS para shadcn/ui */
:root {
  --border: 214.3 31.8% 91.4%;
}

.dark {
  --border: 217.2 32.6% 17.5%;
}
</style>