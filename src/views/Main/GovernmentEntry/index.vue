<script setup>
import DTable from '@/base-ui/d-table'
import { tableColumn } from './config/table';
import { useGovernmentEntry } from '@/store'
const government = useGovernmentEntry()
// Mounted

// ref

// data
const tables = ['zeroRunning', 'mPoliceAuthen', 'hallEntry']

// computed
const tableData1 = computed(() => {
  return government.getTableData1
})
const tableData2 = computed(() => {
  return government.getTableData2
})
const tableData3 = computed(() => {
  return government.getTableData3
})

// methods
for (let i = 0; i < tables.length; i++) {
  government.ajaxTableData({
    type: tables[i]
  }, i + 1)
}


// watch

</script>

<template>
  <section class="governmentEntry">
    <d-table v-bind="{ tableColumn, showFooter: false, showHeader: false, table: { data: tableData1 } }"></d-table>
    <d-table v-bind="{ tableColumn, showFooter: false, showHeader: false, table: { data: tableData2 } }"></d-table>
    <d-table v-bind="{ tableColumn, showFooter: false, showHeader: false, table: { data: tableData3 } }"></d-table>
  </section>
</template>

<style lang="scss" scoped>
.governmentEntry {

  // height: 1005;
  .d-table {
    height: 80px;
  }
}
</style>
