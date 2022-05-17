<script setup>
import RecuveTableColumn from './recuve-table-column'
import { tableData, tableColumn } from './config/index'
const props = defineProps({

  // 表格数据
  tableData: {
    type: Array,
    default: () => {
      return tableData
    }
  },

  // 是否显示表格头
  showHeader: {
    type: Boolean,
    default: true
  },

  // 行的className的回调
  rowClassName: {
    type: [Function, String],
  },

  // 表头行的className的回调
  headerRowClassName: {
    type: [Function, String],
  },

  // table-column的数据
  tableColumn: {
    type: Array,
    default: () => {
      return tableColumn
    }
  },

  tableHeader: {
    type: Object,
    default: () => { }
  },

  tableFooter: {
    type: Object,
    default: () => { }
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

// mounted

// data
const classfiyData = ref([])


// computed
// 过滤table的数据
const tableColumns = computed(() => {
  return props.tableColumn.filter(item => {
    if (classfiyData.value.includes(item.label)) {
      return item
    }
  })
})

const isAllData = computed(() => {
  return tableColumn.length === tableColumns.value.length
})

// methods
// 全部显示
const allShow = () => {
  classfiyData.value = []
  getClassfiyData()
}

// 分类显示
const getClassfiyData = () => {
  for (const prop of props.tableColumn) {
    classfiyData.value.push(prop.label)
  }
}
getClassfiyData()


</script>

<template>
  <div class="d-table">
    <div class="d-table-header">
      <div class="d-table-header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="d-table-header-right">
        <el-button-group>
          <el-button :type="isAllData ? 'primary' : 'default'" @click="allShow">全部显示
          </el-button>
          <el-popover :teleported="false">
            <template #reference>
              <el-button :type="!isAllData ? 'primary' : undefined">
                分类显示
                <svg class="ali-icon" aria-hidden="true" style="margin-left: 6px;">
                  <use xlink:href="#icon-arrow-down"></use>
                </svg>
              </el-button>
            </template>
            <ul class="el-popover-classify">
              <li v-for="column in tableColumn" :key="column.prop">
                <el-checkbox-group v-model="classfiyData">
                  <el-checkbox :label="column.label" :name="column.prop" :disabled="column.disabled" />
                </el-checkbox-group>
              </li>
            </ul>
          </el-popover>

        </el-button-group>
      </div>

    </div>
    <div class="d-table-body">
      <el-table v-bind="{
        data: tableData,
        height: '100%',
        border: true,
        showHeader,
        rowClassName,
        headerRowClassName
      }">
        <recuve-table-column :tableColumn="tableColumns">
          <template #default="scope">
            <slot :name="'column_' + scope.prop" v-bind="scope">
            </slot>
          </template>
          <template #tableColumnAfter>
            <slot name="tableColumnAfter"></slot>
          </template>
        </recuve-table-column>
      </el-table>
    </div>
    <div class="d-table-footer" v-if="showFooter">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d-table {
  margin-top: 16px;
  background-color: var(--el-bg-color);
  border-radius: var(--el-bg-radius);
  padding: 16px;
  display: flex;
  flex-direction: column;

  &-header {
    text-align: right;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    &::v-deep(.el-popover) {
      .el-popover-classify li .el-checkbox {
        width: 100%;
        line-height: 24px;
        height: 24px;
      }
    }

    &-left {}
  }

  &-body {
    flex: 1;
    height: 0;

    .el-table {
      height: 100%;

      ::v-deep(.cell > div) {
        @extend .text-dot;
      }
    }
  }

}
</style>
