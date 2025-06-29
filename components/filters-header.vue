<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import type { Component } from 'vue';
import Input from './ui/input/Input.vue';
import { cn } from '@/lib/utils';

interface ActionProps {
  title: string
  icon?: Component
  onClick: (value?: string) => void 
}

const props = defineProps<{
  class?: string,
  action?: ActionProps,
  onSearch?: (val?: string) => void
}>()

</script>

<template>
  <div :class="cn('flex justify-between items-center', props.class)">
    <div v-if="onSearch" class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    
    <Button v-if="action" @click="action.onClick">
      <component v-if="action.icon" :is="action.icon" class="w-4 h-4" /> {{ action.title }}
    </Button>
  </div>
</template>