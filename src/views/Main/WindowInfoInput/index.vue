<script setup>
import { getFormValue } from '@/utils'
import DForm from '@/base-ui/d-form'
import DTable from '@/base-ui/d-table'
import { tableData, tableColumn } from '@/base-ui/d-table/config'
import { formItem } from '@/base-ui/d-form/config'
import { reset } from '@/hook'

// ref
const searchForm = ref(null)

// Mounted
onMounted(() => {
  console.log(searchForm.value.form, 'demoForm.value')
})

// data
const formValue = reactive(getFormValue(formItem))
const defaultValue = reactive(getFormValue(formItem))

// methods

// 查询
const search = () => {
  console.log('查询', '哈哈哈')
}

// watch
watch(() => formValue.time, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

</script>

<template>
  <section class="windowInfoInput">
    <d-form ref="searchForm" v-bind="{
      formItem,
      model: formValue,
      inline: true
    }">
      <template #search>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset(formValue, defaultValue)">重置</el-button>
      </template>
    </d-form>
    <d-table v-bind="{ tableData, tableColumn }">
      <template #header-left>
        <el-button type="primary">新增</el-button>
      </template>
      <template #tableColumnAfter>
        <el-table-column label="操作" prop="operation" align="center">
          <template #default>
            <div class="table-column-after">
              <el-link type="primary">编缉</el-link>
              <el-link type="danger">删除</el-link>
              <el-link type="danger">删除</el-link>
              <el-link type="danger">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </d-table>
  </section>
</template>

<style lang="scss" scoped>
.windowInfoInput {
  display: flex;
  flex-direction: column;

  .d-table {
    flex: 1;
    height: 0;
  }
}
</style>
