<script setup>
import { TablePage, getFormValue, filterNullStrUndefind } from '@dinert/element-plus'

import { formItem } from './config/form'
import { tableColumn } from './config/table'
import { useRateStore } from '@/store'
const rate = useRateStore()

// computed
const tableData = computed(() => {
  return rate.getTableData
})

const filter = computed(() => {
  return rate.getFilter
})
// 查询
const search = (params) => {
  rate.ajaxTableData(params)
}
search(filterNullStrUndefind(getFormValue(formItem)))


// 当前页条数
const sizeChange = (value) => {
  rate.filter.pageSize = value
}

// 页数
const currentChange = (value) => {
  rate.filter.currentPage = value
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
.rate {}
</style>
