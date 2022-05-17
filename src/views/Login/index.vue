
<script setup>
import { useLoginStore } from "@/store";
const loginStore = useLoginStore();
let loginForm, loginRules;

const form = ref(null),
  loginDisabled = ref(false);

class Login {
  constructor() {}

  // 初始化
  init() {
    this.initFormParams();
  }

  // 初始化表单参数
  initFormParams() {
    // 值
    loginForm = reactive({
      username: "",
      password: "",
    });

    // 验证
    loginRules = reactive({
      username: [
        {
          required: true,
          message: "请输入帐号",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    });
  }

  // 登录
  register() {
    form.value.validate(async (isValid) => {
      let formData = new FormData();
      formData.append("username", loginForm.username.trim());
      formData.append("password", loginForm.password.trim());
      if (isValid) {
        loginDisabled.value = true;
        await loginStore.getLogin({
          data: formData,
          method: "post",
          loading: {
            target: ".main-right-login",
          },
        });
        loginDisabled.value = false;
      }
    });
  }
}
const login = new Login();
login.init();
</script>

<template>
  <section class="login">
    <main class="main">
      <div class="main-left"></div>
      <div class="main-right">
        <h2 class="main-right-title">政务服务监督在线行数据录入系统</h2>
        <el-form
          ref="form"
          class="main-right-form"
          :model="loginForm"
          :rules="loginRules"
        >
          <el-form-item prop="username" class="main-right-form-item">
            <el-input placeholder="请输入帐号" v-model="loginForm.username">
              <template #prefix>
                <svg class="ali-icon" aria-hidden="true">
                  <use xlink:href="#icon-bianzubeifen"></use>
                </svg>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="main-right-form-item">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            >
              <template #prefix>
                <svg class="ali-icon" aria-hidden="true">
                  <use xlink:href="#icon-bianzubeifen4"></use>
                </svg>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          class="main-right-login"
          @click="login.register"
          :disabled="loginDisabled"
          >登录</el-button
        >
      </div>
    </main>
  </section>
</template>


<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/login/login_bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-width: 1200px;
  .main {
    width: 70%;
    height: 70%;
    min-height: 500px;
    background-color: var(--el-bg-color);
    display: flex;
    &-left {
      flex: 0 0 55%;
      background-image: url("@/assets/img/login/zhen-b.jpg");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 101%;
    }
    &-right {
      text-align: center;
      flex: 1;
      padding: 0 80px;
      &-title {
        font-size: 22px;
        letter-spacing: 2px;
        color: var(--el-color-primary);
        margin: 80px 0 60px;
      }
      &-form {
        &-item {
          margin: 40px 0;
          &::v-deep(.el-input__inner) {
            height: 42px;
            line-height: 42px;
          }
        }
      }
      &-login {
        display: block;
        width: 100%;
        font-size: 20px;
        padding: 23px 0;
        line-height: 0;
      }
    }
  }
}
</style>