<script setup>
import DForm from '@/base-ui/d-form'
import DTable from '@/base-ui/d-table'
import { getFormValue } from '@/utils'
import { reset } from '@/hook'

const props = defineProps({

  // form表单的配置
  formItem: {
    type: Object,
    default: () => { }
  },

  // 表格的数据
  table: {
    type: Object,
    default: () => { }
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

  // 分页
  pagination: {
    type: Object,
    default: () => { }
  },
})

// emit
const emit = defineEmits(['search', 'currentChange', 'sizeChange'])

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
  if (isFilter) {
    for (const prop in formValue) {
      const value = formValue[prop]
      if (!['', null, undefined].includes(value)) {
        tempObj[prop] = formValue[prop]
      }
    }
  } else {
    tempObj = formValue
  }
  emit('search', tempObj)
}

// column的prop
const columnProp = (prop) => {
  return 'column_' + prop
}


// 当前页条数
const sizeChange = (value) => {
  emit('sizeChange', value)
}

// 页数
const currentChange = (value) => {
  emit('currentChange', value)
}


// watch

</script>

<template>
  <section class="table-page">
    <d-form ref="searchForm" v-bind="{
      formItem,
      form: {
        model: formValue,
      }
    }">
      <template #search>
        <el-button type="primary" @click="search(formValue)">查询</el-button>
        <el-button type="default" @click="reset(formValue, defaultValue, search)">重置</el-button>
      </template>
    </d-form>
    <d-table v-bind="{ table, tableColumn, pagination }" v-on="{
      sizeChange,
      currentChange
    }">
      <template v-for="column in tableColumn" :key="column.prop" v-slot:[columnProp(column.prop)]="scope">
        <slot :name="columnProp(column.prop)" v-bind="scope"></slot>
      </template>
      <template #tableColumnAfter>
        <slot name="tableColumnAfter"></slot>
      </template>
    </d-table>
  </section>
</template>

<style lang="scss" scoped>
.table-page {
  display: flex;
  flex-direction: column;

  .d-table {
    flex: 1;
    height: 0;
  }
}
</style>
