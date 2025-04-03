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
    <TableCaption>A list of your menus.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[180px] ps-6">
          Menu
        </TableHead>
        <TableHead>
          Category
        </TableHead>
        <TableHead class="w-[180px]">Description</TableHead>
        <TableHead>
          Status
        </TableHead>
        <TableHead>
          Price
        </TableHead>
        <TableHead class="pe-6">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-semibold ps-6">
          Ayam Bakar
        </TableCell>
        <TableCell>Makanan Berat</TableCell>
        <TableCell>-</TableCell>
        <TableCell>Available</TableCell>
        <TableCell>80000</TableCell>
        <TableCell class="pe-6"></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>