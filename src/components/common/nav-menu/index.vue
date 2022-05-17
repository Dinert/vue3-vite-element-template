<script setup>
import NavMenuSubmenu from "./nav-menu-submenu.vue";

// props
defineProps({
  menus: {
    type: Array,
    default: () => [],
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});

// init
const route = useRoute();

// compunted
const currentUrl = computed(() => {
  return route.path;
});

// methods
</script>

<template>
  <el-menu
    :collapse="collapse"
    mode="vertical"
    :collapse-transition="false"
    :default-active="currentUrl"
  >
    <nav-menu-submenu :menus="menus"></nav-menu-submenu>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-right: none;
  &::v-deep(.el-menu-item) {
    &:hover {
      color: var(--el-color-white);
    }
    &.is-active {
      background-color: var(--el-menu-active-text-color);
      border-left: 3px solid var(--el-color-primary);
    }
  }
}
</style>
