<script setup>
import { TablePage, getFormValue, filterNullStrUndefind, DDialog } from '@dinert/element-plus'
import { formItem } from './config/form'
import { tableColumn } from './config/table'
import { useWindowInfoInput } from '@/store'
const windowInfoInput = useWindowInfoInput()


// data
const enables = ref({})
const lookVisible = ref(false)

// computed
const tableData = computed(() => {
  return windowInfoInput.getTableData
})

const filter = computed(() => {
  return windowInfoInput.getFilter
})

// 开关状态改变
const swichChange = (row) => {
}

// 查询
const search = (params) => {
  windowInfoInput.ajaxTableData(params)
}

search(filterNullStrUndefind(getFormValue(formItem)))


// 当前页条数
const sizeChange = (value) => {
  windowInfoInput.filter.pageSize = value
}

// 页数
const currentChange = (value) => {
  windowInfoInput.filter.currentPage = value
}

// 查看照片
const lookHandler = () => {
  lookVisible.value = true
}

const lookClose = () => {
  lookVisible.value = false
}

</script>

<template>
  <div class="windowInfoInput">
    <table-page v-bind="{
      formItem, tableColumn, table: { data: tableData },
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
            <el-link type="primary" @click="lookHandler">查看照片</el-link>
            <el-link type="primary">编辑</el-link>
            <el-link type="danger">删除</el-link>
          </div>
        </el-table-column>
      </template>
    </table-page>
    <d-dialog v-bind="{ title: '哈哈', visible: lookVisible }" @close="lookClose">
      <template #title>
        <span>哈哈工工工工工工工哈</span>
      </template>
      我真的是服了你这个老六

      <template #footer>
        <el-button>哈哈哈</el-button>
        <el-button>哈哈哈</el-button>
      </template>
    </d-dialog>
  </div>

</template>

<style lang="scss" scoped>
.windowInfoInput {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  .table-page {
    height: 100%;
  }
}
</style>
