<script setup>
import DForm from '@/base-ui/d-form'
import { formItem } from './config/form'
import { getFormValue } from '@/utils'
import { reset } from '@/hook'

// data
const formValue = reactive(getFormValue(formItem))
const defaultValue = reactive(getFormValue(formItem))

</script>

<template>
  <section class="attendance">
    <d-form ref="searchForm" v-bind="{
      formItem,
      model: formValue,
      inline: true
    }">
      <template #search>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset(formValue, defaultValue)">重置</el-button>
      </template>
    </d-form>
  </section>
</template>

<style lang="scss" scoped>
.attendance {}
</style>
