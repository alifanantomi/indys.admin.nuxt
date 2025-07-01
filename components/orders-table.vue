<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTransactionStore } from '~/store/transaction';

const { transactions, fetchTransactions } = useTransactionStore()

fetchTransactions()
</script>

<template>
  <Table>
    <TableCaption>A list of your recent orders.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="ps-6">
          Order
        </TableHead>
        <TableHead>No.</TableHead>
        <TableHead class="w-[180px]">Items</TableHead>
        <TableHead>
          Delivery
        </TableHead>
        <TableHead>
          Status
        </TableHead>
        <TableHead class="pe-6">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="transaction in transactions" :key="transaction.id">
        <TableCell class="font-semibold ps-6">
          {{ transaction.food.name }}
        </TableCell>
        <TableCell>{{ transaction.id }}</TableCell>
        <TableCell>{{ transaction.food.name }}</TableCell>
        <TableCell>Delivery</TableCell>
        <TableCell>Waiting for courier</TableCell>
        <TableCell class="pe-6"></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>