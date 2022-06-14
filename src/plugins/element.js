import { ElAside, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElButtonGroup, ElCheckbox, ElCheckboxGroup, ElCol, ElConfigProvider, ElContainer, ElDatePicker, ElOption, ElForm, ElFormItem, ElHeader, ElInput, ElLink, ElMain, ElMenu, ElMenuItem, ElPagination, ElPopover, ElRow, ElScrollbar, ElSelect, ElSubMenu, ElSwitch, ElTable, ElTableColumn, ElTooltip, ElDialog } from "element-plus"
const components = [ElButton, ElHeader, ElMain, ElButtonGroup, ElTable, ElTableColumn, ElConfigProvider, ElMenu, ElMenuItem, ElAside, ElContainer, ElSubMenu, ElPopover, ElPagination, ElCheckboxGroup, ElCheckbox, ElScrollbar, ElBreadcrumb, ElBreadcrumbItem, ElSwitch, ElLink, ElForm, ElFormItem, ElRow, ElCol, ElInput, ElTooltip, ElSelect, ElDatePicker, ElOption, ElDialog]

const install = (Vue) => {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

export default install