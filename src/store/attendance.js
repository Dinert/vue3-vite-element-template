import { defineStore } from "pinia";
import request from '@/service/request'

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    tableData: []
  }),
  getters: {
    getTableData: (state) => {
      const tableData = state.tableData
      const result = []
      tableData.forEach(item => {
        const data = JSON.parse(item.data)
        data.unAttendance = data.total - data.attendance
        result.push(data)
      })
      return result
    },
    getTotal: (state) => {
      return state.tableData.length
    }
  },
  actions: {
    ajaxTableData() {
      return new Promise(async (resolve, reject) => {
        const tableData = await request({
          url: '/common-data/get/all',
          params: {
            type: 'attendance'
          }
        })
        this.tableData = tableData
        resolve(this.tableData)
      })
    }
  }
})