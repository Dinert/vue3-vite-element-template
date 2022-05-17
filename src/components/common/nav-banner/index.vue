<script setup>
const route = useRoute();

// compunted
const currentUrlArr = computed(() => {
  const temptitle = route.meta.title || "";
  const title = temptitle.split("/");
  return title;
});
</script>

<template>
  <el-breadcrumb separator="/">
    <template v-for="currentUrl in currentUrlArr" :key="currentUrl">
      <el-breadcrumb-item>{{ currentUrl }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>


<style lang="scss" scoped>
.el-breadcrumb {
  flex: 1;
  padding: 0 15px;
  height: var(--el-header-height);
  line-height: var(--el-header-height);
  &__item::v-deep(span) {
    cursor: default !important;
  }
}
</style>
