<script setup>
const router = useRouter();

// props
defineProps({
  menus: {
    type: Array,
    default: () => [],
  },
});

// emit
const emit = defineEmits(["menuItemClick"]);

// methods
const menuItemClick = (item) => {
  router.push({
    path: item.url || "/not-found",
  });
  emit("menuItemClick", item);
};
</script>

<template>
  <template v-for="item in menus">
    <template v-if="item.subMenuItems && item.subMenuItems.length > 0">
      <el-sub-menu :index="item.url" :show-timeout="0" :hide-timeout="100">
        <template #title>
          <svg class="ali-icon" aria-hidden="true">
            <use xlink:href="#icon-s-home"></use>
          </svg>
          <span>{{ item.caption }}</span>
        </template>

        <template v-for="subitem in item.subMenuItems" :key="subitem.url">
          <template v-if="subitem.subMenuItems && subitem.subMenuItems.length">
            <el-sub-menu
              :index="subitem.url"
              :show-timeout="0"
              :hide-timeout="100"
            >
              <template #title>
                <svg class="ali-icon" aria-hidden="true">
                  <use xlink:href="#icon-s-home"></use>
                </svg>
                <span>{{ subitem.caption }}</span>
              </template>
              <nav-menu-submenu
                :menus="subitem.subMenuItems"
                :key="subitem.url"
              ></nav-menu-submenu>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="subitem.url" @click="menuItemClick(subitem)">
              <span :title="subitem.url">{{ subitem.caption }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.url" @click="menuItemClick(item)">
        <svg class="ali-icon" aria-hidden="true">
          <use xlink:href="#icon-s-home"></use>
        </svg>
        <span>{{ item.caption }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.ali-icon{
  margin-right: 6px;
  font-size: 16px;
}
</style>
