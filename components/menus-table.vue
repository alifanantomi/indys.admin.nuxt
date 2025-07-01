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
import { useMenuStore } from '~/store/menu';

const { isLoading, menus, fetchMenus } = useMenuStore()

onMounted(async () => {
  console.log("ON MOUNTED")
  await fetchMenus()
})
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
      <template v-if="isLoading">
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow v-for="menu in menus" :key="menu.id">
          <TableCell class="font-semibold ps-6">
            {{ menu.name }}
          </TableCell>
          <TableCell>{{ menu.categories.map((v) => v.name).join(', ') }}</TableCell>
          <TableCell>{{ menu.description }}</TableCell>
          <TableCell>{{ menu.available ? 'Available' : 'Not Available' }}</TableCell>
          <TableCell>{{ menu.price }}</TableCell>
          <TableCell class="pe-6"></TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>