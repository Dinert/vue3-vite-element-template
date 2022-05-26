<script setup>
import config from "@/global/js/resize";
import useWindowResize from "@/hook/useWindowResize";

useWindowResize(() => {
  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight
  // if (clientWidth <= 1366 && clientHeight <= 768) {
  //     config.size = 'default'
  // } else 
  if (clientWidth <= 1920 && clientHeight <= 1080) {
    config.size = 'default'
  } else {
    config.size = 'large'
  }
})

</script>

<template>
  <el-config-provider v-bind="config">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
#app {
  background-color: var(--el-bg-color);
}
</style>


