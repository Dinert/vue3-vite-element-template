import { defineStore } from 'pinia'
import request from '@/service/request'
import _ from 'lodash'
import { paginations } from '@/base-ui/d-table/config'

export const useGovernmentEntry = defineStore('governmentEntry', {
  state: () => ({
    tableData1: [],
    tableData2: [],
    tableData3: [],
    filter1: {
      total: 0,
      pageSize: paginations.pageSize,
      currentPage: paginations.currentPage
    },
    filter2: {
      total: 0,
      pageSize: paginations.pageSize,
      currentPage: paginations.currentPage
    },
    filter3: {
      total: 0,
      pageSize: paginations.pageSize,
      currentPage: paginations.currentPage
    }
  }),
  getters: {
    getTableData1(state) {
      let tableData = state.tableData1
      if(state.tableData1 && state.tableData1.length) {
        tableData = [JSON.parse(state.tableData1[0].data)]
      }
      return tableData
    },
    getTableData2(state) {
      let tableData = state.tableData2
      if(state.tableData2 && state.tableData2.length) {
        tableData = [JSON.parse(state.tableData2[0].data)]
      }
      return tableData
    },
    getTableData3(state) {
      let tableData = state.tableData3
      if(state.tableData3 && state.tableData3.length) {
        tableData = [JSON.parse(state.tableData3[0].data)]
      }
      return tableData
    }
  },
  actions: {
    ajaxTableData(params, index) {
      return new Promise(async (resolve) => {
        const tableData = await request({
          url: '/common-data/get/all',
          params: params
        })
        this['tableData' + index] = tableData
        this['filter' + index ].total = this['tableData' + index].length
        resolve(this.tableData)
      })
    }
  }
})