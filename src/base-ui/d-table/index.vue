<script setup>
import RecuveTableColumn from './recuve-table-column'
const props = defineProps({
  table: {
    type: Object,
    default: () => {}
  },

  // 表格头控制栏
  showHeader: {
    type: Boolean,
    default: true
  },

  // table-column的数据
  tableColumn: {
    type: Array,
    default: () => []
  },

  // 表格尾部
  showFooter: {
    type: Boolean,
    default: true
  },

  // 分页
  pagination: {
    type: Object,
    default: () => {}
  },
})

// emit
const emit = defineEmits(['currentChange', 'sizeChange'])

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
  return props.tableColumn.length === tableColumns.value.length
})

// methods
// 全部显示
const allShow = () => {
  classfiyData.value = []
  getClassfiyData()
}

// sizeChange
const sizeChange = (value) => {
  emit('sizeChange', value)
}

// currentChange
const currentChange = (value) => {
  emit('currentChange', value)
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
    <div class="d-table-header" v-if="showHeader">
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
        data: [],
        height: '100%',
        border: true,
        showHeader: true,
        ...table
      }" v-on="{...table.on}">
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
      <el-pagination v-bind="{
        currentPage: 1,
        pageSize: 15,
        pageSizes: [15, 30, 50, 70, 100],
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 100,
        ...pagination
      }" v-on="{
        sizeChange,
        currentChange,
        ...pagination.on
      }"/>
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
  overflow: auto;

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

      ::v-deep(.cell > div) {
        @extend .text-dot;
      }
    }
  }

  &-footer {
    margin-top: 16px;
    display: flex;
    .el-pagination{
      display: flex;
      flex-wrap: wrap;
    }
  }

}
</style>
