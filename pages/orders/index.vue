<script setup lang="ts">
import OrdersCalendar from '~/components/orders-calendar.vue';
import OrdersTable from '~/components/orders-table.vue';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <h1 class="text-2xl font-semibold">{{ $t('orders') }}</h1>
  
    <div class="flex-1 grid grid-cols-1">
      <Card class="flex flex-col shadow-sm">
        <CardHeader class="flex flex-col gap-2 border-b-[1px]">
          <CardTitle>{{ $t('total_transaction') }}</CardTitle>
        </CardHeader>
        <div class="flex-1 flex">
          <div class="flex-1 border-r-[1px]">
            <OrdersTable />
          </div>
          <div class="">
            <OrdersCalendar />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>