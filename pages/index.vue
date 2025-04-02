<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { AreaChart } from '~/components/ui/chart-area';

definePageMeta({
  layout: "dashboard",
})

const amountTransaction = ref<number | null>(30000000)
const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]

</script>

<template>
  <div class="grid gap-4">
    <h1 class="text-2xl font-semibold">{{ $t('dashboard') }}</h1>
  
    <div class="grid grid-cols-1">
      <Card class="shadow-sm">
        <CardHeader class="flex flex-col gap-2">
          <CardDescription>{{ $t('total_transaction') }}</CardDescription>
          <CardTitle class="text-5xl">{{amountTransaction}}</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart
            index="name"
            :data="data"
            :categories="['total', 'predicted']"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>