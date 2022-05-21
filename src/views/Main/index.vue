<script setup>
import NavMenu from "@/components/common/nav-menu";
import NavBanner from "@/components/common/nav-banner";
import { useLoginStore } from "@/store";
import { storage } from "@/utils";
import { watch } from "vue";


// init
const loginStore = useLoginStore();
loginStore.setLoginValue();
const router = useRouter();
const route = useRoute();

// data
const menuList = ref([]);
const collapse = ref(false);
const isOverflow = ref(false)

// methods
loginStore.getMenuList().then((data) => {
  menuList.value = data;
});

const logout = () => {
  storage("localStorage", "clear", "zwjd-token");
  router.push({ name: "Login" });
};

const collapseClick = () => {
  collapse.value = !collapse.value;
};

const aaa = (aaa) => {
  console.log(aaa, 'aaaaaaaaaaaaa')
}



</script>

<template>
  <el-container>
    <el-header>
      <h1 class="el-header-title">政务服务监督在线系统数据录入系统</h1>
      <div class="el-header-operation">
        <span class="el-header-operation-item el-header-operation-changePassword">修改密码</span>
        <span class="el-header-operation-item el-header-operation-logout" @click="logout">
          {{ loginStore.userInfo.loginName }}
          <svg class="ali-icon" aria-hidden="true">
            <use xlink:href="#icon-dengchu"></use>
          </svg>
        </span>
      </div>
    </el-header>
    <el-container style="height: 0px">
      <el-aside :width="collapse ? '64px' : '200px'">
        <p class="el-aside-title" @click="collapseClick">
          <svg class="ali-icon" aria-hidden="true">
            <use :xlink:href="collapse ? '#icon-s-fold' : '#icon-s-unfold'"></use>
          </svg>
        </p>
        <el-scrollbar view-style="height: 100%;">
          <nav-menu :menus="menuList" :collapse="collapse"></nav-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <nav-banner></nav-banner>
        </el-header>
        <el-main :style="{ overflow: isOverflow ? 'auto' : 'hide' }">
          <router-view v-slot="scope">
            <transition name="fade-transform" mode="out-in">
              <component :is="scope.Component" :key="scope.route.key" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  .el-header {
    font-size: 14px;
    --el-header-height: 50px;
    background-color: var(--el-color-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--el-color-white);
    padding-right: 0;

    &-title {
      margin: 0;
      font-size: 22px;
      line-height: var(--el-header-height);
    }

    &-operation {
      height: 100%;
      display: flex;
      align-items: center;

      &-item {
        padding: 0 20px;
        border-left: 1px solid;
        cursor: pointer;
        height: 100%;
        line-height: var(--el-header-height);

        &:hover {
          background-color: var(--el-mask-color-extra-light);
        }
      }
    }
  }

  &>.el-container {
    .el-aside {
      background-color: var(--el-aside-bg-color);
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: all var(--el-transition-duration);

      &-title {
        margin: 2px 0;
        text-align: center;
        color: var(--el-aside-text-color);
        cursor: pointer;
      }

      .el-scrollbar {
        flex: 1;
        height: 0;
      }
    }

    &>.el-container {
      flex: 1;

      .el-header {
        --el-header-height: 40px;
        padding-left: 0;
        background-color: unset;
      }

      .el-main {
        position: relative;
        background-color: var(--el-bg-color-page);
        overflow-x: hidden;
        & > section {
          height: 100%;
          padding: 16px;
          box-sizing: border-box;
          overflow-y: auto;
          min-height: 500px;
        }
      }
    }
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: var(--el-transition-all);
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
