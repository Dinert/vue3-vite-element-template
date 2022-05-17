<script setup>

import { getFormValue } from '@/utils'
import DForm from '@/base-ui/d-form'
import { formItem } from '@/base-ui/d-form/config'

// ref
const searchForm = ref(null)


// Mounted
onMounted(() => {
  console.log(searchForm.value.form, 'demoForm.value')
})

// data
const formValue = reactive(getFormValue(formItem))

// methods


// watch
watch(() => formValue.time, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

</script>

<template>
  <section class="attendance">
    <d-form ref="searchForm" :formItem="formItem" :model="formValue" :inline="true"></d-form>
  </section>
</template>

<style lang="scss" scoped>
.attendance {}
</style>
