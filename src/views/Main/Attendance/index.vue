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

const filter = computed(() => {
  return attendanceStore.getFilter
})

// methods
attendanceStore.ajaxTableData()

// 查询
const search = (params) => {
  attendanceStore.ajaxTableData(params)
}

// 当前页条数
const sizeChange = (value) => {
  attendanceStore.filter.pageSize = value
}

// 页数
const currentChange = (value) => {
  attendanceStore.filter.currentPage = value
}

</script>

<template>
  <table-page v-bind="{
    formItem, tableColumn, table: {data: tableData},
    pagination: filter
  }" v-on="{
  search,
  currentChange,
  sizeChange
}">
    <template #tableColumnAfter>
      <el-table-column label="操作" prop="operation" align="center" fixed="right" width="150px">
        <div class="table-column-after">
          <el-link type="primary">编辑</el-link>
          <el-link type="danger">删除</el-link>
        </div>
      </el-table-column>
    </template>
  </table-page>
</template>

<style lang="scss" scoped>
.attendance {}
</style>
