<script setup>
import DForm from '@/base-ui/d-form'
import DTable from '@/base-ui/d-table'
import { getFormValue } from '@/utils'
import { reset } from '@/hook'

const props = defineProps({

  // form表单的配置
  formItem: {
    type: Object,
    default: () => {}
  },

  // 表格的数据
  tableData: {
    type: Array,
    default: () => []
  },

  // 表格的列
  tableColumn: {
    type: Array,
    default: () => []
  },
  
  // 是否显示操作
  isOperation: {
    type: Boolean,
    default: true
  },

  // 表格总条数
  total: {
    type: Number
  }
})

// emit
const emit = defineEmits(['search'])

// Mounted

// ref

// data
const formValue = reactive(getFormValue(props.formItem))
const defaultValue = reactive(getFormValue(props.formItem))

// computed

// methods
// 查询
const search = (formValue, isFilter = true) => {
  let tempObj = {}
  if(isFilter) {
    for(const prop in formValue) {
      const value = formValue[prop]
      if(!['', null, undefined].includes(value)) {
        tempObj[prop] = formValue[prop]
      }
    }
  }else {
    tempObj = formValue
  }
  emit('search', tempObj)
}

// watch

</script>

<template>
  <section class="table-page">
    <d-form ref="searchForm" v-bind="{
      formItem,
      model: formValue,
      inline: true
    }">
      <template #search>
        <el-button type="primary" @click="search(formValue)">查询</el-button>
        <el-button type="default" @click="reset(formValue, defaultValue, search)">重置</el-button>
      </template>
    </d-form>
    <d-table v-bind="{ tableData, tableColumn, total }">
      <template #default="scope">
          <slot :name="'column_' + scope.prop" v-bind="scope">
          </slot>
      </template>
      <template #tableColumnAfter>
        <el-table-column label="操作" prop="operation" align="center" v-if="isOperation && tableColumn && tableColumn.length">
          <template #default>
            <div class="table-column-after">
              <slot name="tableColumnAfter"></slot>
            </div>
          </template>
        </el-table-column>
      </template>
    </d-table>
  </section>
</template>

<style lang="scss" scoped>
.table-page{
  display: flex;
  flex-direction: column;
  .d-table{
    flex: 1;
    height: 0;
  }
}
</style>
