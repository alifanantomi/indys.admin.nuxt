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
import { useUserStore } from '~/store/user';

const { users, fetchUsers } = useUserStore()

fetchUsers()
</script>

<template>
  <Table>
    <TableCaption>A list of your menus.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="ps-6">
          Email
        </TableHead>
        <TableHead>
          Role
        </TableHead>
        <TableHead>
          Status
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in users" :key="user.id">
        <TableCell class="font-semibold ps-6">{{ user.email }}</TableCell> 
        <TableCell>{{ user.access }}</TableCell> 
        <TableCell>Confirmed</TableCell> 
      </TableRow>
    </TableBody>
  </Table>
</template>