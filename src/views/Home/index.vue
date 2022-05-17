<script setup>
import { useGlobalStore } from '@/store'
import { devPro } from '@/utils'
devPro()
const globalStore = useGlobalStore()
</script>

<template>
  <div class="home">
    {{ globalStore.doubleCounter }}

    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
      <el-button>中文</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
</style>
