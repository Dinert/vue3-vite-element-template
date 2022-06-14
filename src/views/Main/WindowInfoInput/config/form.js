export const formItem = reactive({
  type: {
    type: 'select',
    label: '窗口类型',
    options: [
      {value: '一口受理', label: '一口受理'},
      {value: '综合窗口', label: '综合窗口'}, 
      {value: '企业帮办', label: '企业帮办'}, 
      {value: '专窗', label: '专窗'}, 
      {value: '咨询台', label: '咨询台'}, 
    ],
    value: '一口受理'
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