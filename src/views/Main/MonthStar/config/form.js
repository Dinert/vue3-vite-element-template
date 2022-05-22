export const formItem = reactive({
  month: {
    type: 'month',
    label: '月份',
  },
  name: {
    type: 'input',
    label: '姓名',
  },
  department: {
    type: 'input',
    label: '部门',
  },
  enable: {
    type: 'select',
    label: '大屏显示',
    options: [
      {value: true, label: '显示'},
      {value: false, label: '隐藏'},
    ]
  }
})