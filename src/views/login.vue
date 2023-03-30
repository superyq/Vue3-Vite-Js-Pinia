<script setup>
import Cookies from "js-cookie";
import { NInput, NButton, NCheckbox } from "naive-ui";
import router from "@/router/index.js";
import { useUserStore } from "@/store/user.js";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { getCodeImg } from "@/api/login.js";
import CopeRight from "@/components/CopyRight.vue";

// 用户状态管理
let userStore = useUserStore();

// 是否需要验证码
let captchaEnabled = $ref(true);
let codeUrl = $ref("");
// 获取图形验证码
function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled) {
      codeUrl = "data:image/gif;base64," + res.img;
      uuid = res.uuid;
    }
  });
}
captchaEnabled && getCode();

// 登录账号
let username = $ref("");
let password = $ref("");
let code = $ref("");
let uuid = $ref("");
let rememberMe = $ref(false);
let loginBtnState = $ref(false);
function validate() {
  if (username == "admin") {
    window.$msg.error("用户名admin为特殊账号，不能作为用户名登录");
    username = "";
  }
}
function handleLogin() {
  // 验证输入
  if (!username || !password) {
    return window.$msg.error("用户名和密码不能为空！");
  }
  if (captchaEnabled && !code) {
    return window.$msg.error("验证码不能为空！");
  }

  // 记住密码
  if (rememberMe) {
    Cookies.set("username", username, { expires: 30 });
    Cookies.set("password", encrypt(password), {
      expires: 30,
    });
    Cookies.set("rememberMe", rememberMe, {
      expires: 30,
    });
  } else {
    Cookies.remove("username");
    Cookies.remove("password");
    Cookies.remove("rememberMe");
  }

  loginBtnState = true;
  userStore
    .login({ username, password, code, uuid })
    .then(() => {
      router.push({ name: "home" });
      loginBtnState = false;
    })
    .catch(() => {
      getCode();
      loginBtnState = false;
    });
}

// 获取默认登录账号
function getCookie() {
  username = Cookies.get("username") || "";
  password = decrypt(Cookies.get("password")) || "";
  rememberMe = Boolean(Cookies.get("remenberMe")) || false;
}
getCookie();

// 跳转 忘记密码页
function handleForget() {
  router.push({ name: "forget" });
}
</script>

<template>
  <div class="login-bg">
    <div class="login-contain">
      <div class="login-logo__box">
        <div class="login-logo">
          <img src="../assets/images/login_logo.png" />
        </div>
      </div>
      <div class="login-form__box">
        <n-input
          class="login-input"
          v-model:value="username"
          placeholder="请输入用户名/手机号"
          @blur="validate"
        >
          <template #prefix>
            <svg-icon name="username" color="grey"></svg-icon>
          </template>
        </n-input>
        <n-input
          class="login-input"
          v-model:value="password"
          placeholder="请输入密码"
          type="password"
          show-password-on="mousedown"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <svg-icon name="password" color="grey"></svg-icon>
          </template>
        </n-input>
        <div class="login-code" v-if="captchaEnabled">
          <n-input
            v-model:value="code"
            class="login-input login-input_code"
            placeholder="验证码"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <svg-icon name="code" color="grey"></svg-icon>
            </template>
          </n-input>
          <img class="login-code-img" :src="codeUrl" @click="getCode" />
        </div>
        <div class="login-checkbox_box">
          <n-checkbox
            class="login-checkbox"
            v-model:checked="rememberMe"
          ></n-checkbox>
          <span>记住密码</span>
        </div>
        <n-button
          class="login-btn_login"
          type="info"
          @click="handleLogin"
          :loading="loginBtnState"
          :disabled="loginBtnState"
          >登录</n-button
        >
        <div class="login-btn_forget" @click="handleForget">忘记密码</div>
      </div>
    </div>
    <cope-right></cope-right>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}

.login-title {
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 10px;
  font-size: 18px;
  color: #fff;
  opacity: 1;
}

.login-logo__box {
  display: flex;
  justify-content: center;
  align-items: center;

  text {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    color: #1d69a3;

    &::before {
      content: "";
      display: inline-block;
      margin: 0 5px;
      width: 5px;
      height: 5px;
      background: gray;
      border-radius: 50%;
    }
  }
}

.login-logo {
  width: 55%;

  img {
    width: 100%;
    object-fit: cover;
  }
}

.login-contain {
  margin: 30vh auto;
  width: 30%;
  padding: 2% 6%;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 30px rgba(191, 210, 225, 0.7);
  box-sizing: border-box;
}

.login-code {
  display: flex;
  justify-content: space-between;

  .login-input_code {
    width: 200px;
  }

  .login-btn_code {
    color: #fff;
    margin-left: 20px;
  }
}

.login-btn_login {
  height: 40px;
  width: 100%;
}

.login-input {
  margin-top: 20px;
}

.login-checkbox_box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
  color: #d7d7d7;
  font-size: 12px;
}

.login-checkbox {
  margin-right: 5px;
}

.login-btn_forget {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #71a1c5;
  cursor: pointer;
}

.login-code-img {
  margin-top: 20px;
  width: 30%;
  height: 35px;
  margin-left: 20px;
  object-fit: contain;
}
</style>
