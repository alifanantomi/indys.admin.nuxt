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
        <TableHead class="ps-6">
          Name
        </TableHead>
        <TableHead>
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
      <TableRow>
        <TableCell class="font-semibold ps-6">
          John Smith
        </TableCell>
        <TableCell>john@mail.com</TableCell> 
        <TableCell>USER</TableCell> 
        <TableCell>Confirmed</TableCell> 
      </TableRow>
    </TableBody>
  </Table>
</template>