<script setup>
import TablePage from '@/components/common/table-page'
import { formItem } from './config/form'
import { tableColumn } from './config/table'
import { useHallDeviceStore } from '@/store'
const hallDevice = useHallDeviceStore()

// computed
const tableData = computed(() => {
  return hallDevice.getTableData
})

const filter = computed(() => {
  return hallDevice.getFilter
})

// methods
hallDevice.ajaxTableData()

// 查询
const search = (params) => {
  hallDevice.ajaxTableData(params)
}

// 当前页条数
const sizeChange = (value) => {
  hallDevice.filter.pageSize = value
}

// 页数
const currentChange = (value) => {
  hallDevice.filter.currentPage = value
}

</script>

<template>
  <table-page class="hallDevice" v-bind="{
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
.hallDevice {}
</style>
