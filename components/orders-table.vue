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
      <TableRow>
        <TableCell class="font-semibold ps-6">
          John Smith
        </TableCell>
        <TableCell>0001</TableCell>
        <TableCell>Ayam Bakar, Ayam Goreng, Es Teh</TableCell>
        <TableCell>Delivery</TableCell>
        <TableCell>Waiting for courier</TableCell>
        <TableCell class="pe-6"></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>