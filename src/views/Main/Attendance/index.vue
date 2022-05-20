<script setup>
import TablePage from '@/components/common/table-page'
import { formItem } from './config/form'
import { tableColumn } from './config/table'
import { useAttendanceStore } from '@/store'
const attendanceStore = useAttendanceStore()

// computed
const tableData = computed(() => {
  return attendanceStore.getTableData
})
const total = computed(() => {
  return attendanceStore.getTotal
})

// methods
attendanceStore.ajaxTableData()


// 请求表格的数据

</script>

<template>
  <table-page v-bind="{ formItem, tableColumn, tableData, total}">
    <template #tableColumnAfter>
      <el-link>删除</el-link>
    </template>
  </table-page>
</template>

<style lang="scss" scoped>
.attendance {}
</style>
