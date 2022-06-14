import { defineStore } from "pinia";
import request from '@/service/request'
import _ from 'lodash'
import {paginations} from '@/config'

export const useWindowInfoInput = defineStore('windowInfoInput', {
  state: () => ({
    tableData: [],
    filter: {
      total: 0,
      pageSize: paginations.pageSize,
      currentPage: paginations.currentPage
    }
  }),
  getters: {
    getTableData: (state) => {
      let tableData = state.tableData
      const result = []
      const pageSize = state.filter.pageSize
      const currentPage = state.filter.currentPage
      tableData = tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
      tableData.forEach(item => {
        const data = JSON.parse(item.data)
        result.push(data)
      })
      return result
    },
    getFilter: (state) => {
      return state.filter
    }
  },
  actions: {
    ajaxTableData(params) {
      return new Promise(async (resolve, reject) => {
        const tableData = await request({
          url: '/common-data/get/all',
          params: {
            type: 'window_person'
          }
        })

        // 判断是否有参数
        const isParams = !(_.isEmpty(params))

        // 有就过滤表格中的数据
        if (isParams) {
          this.tableData = tableData.filter(item => {
            const data = JSON.parse(item.data)
            let itemVals = ''
            let paramsVals = ''
            for (const prop in params) {
              let paramsVal = params[prop]
              let itemVal = data[prop]
              
              if(prop === 'month') {
                paramsVal = dayjs(paramsVal).format('YYYY-MM-DD')
                itemVal = dayjs(itemVal).format('YYYY-MM-DD')
              }
              itemVals += itemVal
              paramsVals += paramsVal
            }
            if(itemVals === paramsVals) {
              return item
            }
          })
        } else {
          this.tableData = tableData
        }
        console.log(this.tableData, 'this.tableDatathis.tableDatathis.tableData')
        this.filter.total = this.tableData.length
        resolve(this.tableData)
      })
    }
  }
})