<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next';
import Input from './ui/input/Input.vue';

</script>

<template>
  <div class="flex justify-between items-center">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>

    <Button>
      <Plus class="w-4 h-4 mr-2" /> New Menu
    </Button>
  </div>
</template>