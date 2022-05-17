<script setup>
import config from "@/global/js/resize";

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


