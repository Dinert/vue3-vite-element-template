import { defineStore } from "pinia";
import request from '@/service/request'
import { storage } from '@/utils'
import router from '@/router'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: {},
    userInfo: {},
    cookie: '',
    menuList: []
  }),
  getters: {

  },
  actions: {

    // 请求登录接口
    getLogin(options) {
      return new Promise((resolve, reject) => {
        request({
          url: '/login',
          ...options
        }).then(data => {
          if (data) {
            let tempToken = {
              token: `${data.tokenType} ${data.value}`,
              expiration: data.expiration,
              cookie: data.value,
              userInfo: data.additionalInformation.userInfo
            }
            this.token = tempToken
            this.userInfo = data.additionalInformation.userInfo
            this.cookie = data.value
            storage('localStorage', 'zwjd-token', this.token)
            router.push('/');
          }
          resolve(data)
        })
      })
    },

    // 设置Login的值
    setLoginValue() {
      const token = storage("localStorage", "zwjd-token");
      if (token) {
        if (!this.cookie) {
          this.token = token.token;
          this.userInfo = token.userInfo;
          this.cookie = token.cookie;
        }
      }
    },

    // 请求菜单
    getMenuList() {
      return new Promise((resolve, reject) => {
        if (this.menuList && this.menuList.length > 0) {
          resolve(this.menuList)
        } else {
          request({
            url: '/api/current/mainMenu',
            loading: {
            }
          }).then(data => {
            this.menuList = data
            resolve(this.menuList)
          })
        }
      })
    }
  },

})