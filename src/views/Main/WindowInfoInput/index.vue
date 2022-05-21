<script setup>
import TablePage from '@/components/common/table-page'
import { formItem } from './config/form'
import { tableColumn } from './config/table'
import { useWindowInfoInput } from '@/store'
const windowInfoInput = useWindowInfoInput()

// data
const enables = ref({})

// computed
const tableData = computed(() => {
  return windowInfoInput.getTableData
})

const filter = computed(() => {
  return windowInfoInput.getFilter
})

// methods
windowInfoInput.ajaxTableData()

// 开关状态改变
const swichChange = (row) => {
  console.log(row, 'rowwwwwwwwwwwwwwww')
}

// 查询
const search = (params) => {
  windowInfoInput.ajaxTableData(params)
}

// 当前页条数
const sizeChange = (value) => {
  windowInfoInput.filter.pageSize = value
}

// 页数
const currentChange = (value) => {
  windowInfoInput.filter.currentPage = value
}

</script>

<template>
  <table-page v-bind="{
    formItem, tableColumn, tableData,
    total: filter.total, pageSize: filter.pageSize, currentPage: filter.currentPage
  }" v-on="{
  search,
  currentChange,
  sizeChange
}">
    <template #column_enable="{ row }">
      <el-switch @change="swichChange(row)" v-model="row.enable" active-text="显示" inactive-text="隐藏"></el-switch>
    </template>
    <template #tableColumnAfter>
      <el-table-column label="操作" prop="operation" align="center" fixed="right" width="200px">
        <div class="table-column-after">
          <el-link type="primary">查看照片</el-link>
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
