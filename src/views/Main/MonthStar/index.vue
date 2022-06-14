<script setup>
import { TablePage, getFormValue, filterNullStrUndefind } from '@dinert/element-plus'
import { formItem } from './config/form'
import { tableColumn } from './config/table'
import { useStar } from '@/store'
const star = useStar()


// data


// computed
const tableData = computed(() => {
  return star.getTableData
})

const filter = computed(() => {
  return star.getFilter
})

// methods
star.ajaxTableData()

// 开关状态改变
const swichChange = (row) => {
}

// 查询
const search = (params) => {
  star.ajaxTableData(params)
}
search(filterNullStrUndefind(getFormValue(formItem)))


// 当前页条数
const sizeChange = (value) => {
  star.filter.pageSize = value
}

// 页数
const currentChange = (value) => {
  star.filter.currentPage = value
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
.monthStart {}
</style>
