
export const formItem = reactive({
  name: {
    type: 'input',
    label: '名字'
  },
  chiose: {
    type: 'select',
    label: '时间',
    options: [
      {value: '1', label: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈'},
      {value: '2', label: '哈哈2'},
    ]
  },
  time:{ 
    type: 'datetimerange',
    label: '日期',
    placeholder: '请输入日期',
    startPlaceholder: '请输入日期',
    endPlaceholder: '请输入结束日期',
    rangeSeparator: '至',
  },
  chiose2: {
    type: 'select',
    label: '选择',
    options: [
      {value: '1', label: '哈哈'},
      {value: '2', label: '哈哈2'},
    ]
  }
})

   