export const tableColumn = reactive([
  {
    prop: 'date',
    label: '日期'
  },
  {
    prop: 'total',
    label: '应到岗人数',
    sortable: true
  },
  {
    prop: 'attendance',
    label: '实际到岗人数',
    sortable: true
  },
  {
    prop: 'unAttendance',
    label: '未到岗人数',
    sortable: true
  }
])