import { defineStore } from "pinia";
import request from '@/service/request'
import _ from 'lodash'
import dayjs from "dayjs";
import {paginations} from '@/base-ui/d-table/config'

export const useRateStore = defineStore('rate', {
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
            type: 'rate'
          }
        })

        // 判断是否有参数
        const isParams = !(_.isEmpty(params))

        // 有就过滤表格中的数据
        if(isParams) {
          this.tableData = tableData.filter(item => {
            const data = JSON.parse(item.data)
            let itemVals = ''
            let paramsVals = ''
            for (const prop in params) {
              let paramsVal = params[prop]
              let itemVal = data[prop]
              
              if(prop === 'month') {
                paramsVal = dayjs(paramsVal).format('YYYY-MM')
                itemVal = dayjs(itemVal).format('YYYY-MM')
              }
              itemVals += itemVal
              paramsVals += paramsVal
            }
            console.log(itemVals, paramsVals, 'aaaaaaaaaaaaa')
            if(itemVals === paramsVals) {
              return item
            }
          })
        }else {
          this.tableData = tableData
        }
      
        this.filter.total = this.tableData.length
        resolve(this.tableData)
      })
    }
  }
})