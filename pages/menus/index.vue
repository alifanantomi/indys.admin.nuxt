<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { Card, CardHeader } from '~/components/ui/card';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <h1 class="text-2xl font-semibold">{{ $t('menus') }}</h1>
  
    <div class="flex-1 grid grid-cols-1">
      <Card class="flex flex-col shadow-sm">
        <CardHeader class="flex flex-col border-b-[1px]">
          <FiltersHeader 
            :onSearch="() => {}" 
            :action="{ 
              title: 'New Menu',
              icon: Plus, 
              onClick: () => {} 
            }" 
          />
        </CardHeader>
        <div class="flex-1 flex">
          <MenusTable />
        </div>
      </Card>
    </div>
  </div>
</template>