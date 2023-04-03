<script setup>
import { ref, reactive, computed } from "vue";
import { NInput, NButton } from "naive-ui";
import { useRouter } from "vue-router";
import copeRight from "@/components/CopyRight.vue";
import { sendMsg, updatePassword } from "@/api/forget.js";
import { isPhone } from "@/utils/validate.js";

let router = useRouter();
// 表单
let params = reactive({
  phoneNumber: null,
  code: null,
  password: null,
});
let confirmPassword = ref(null);
let loginBtnState = computed(() => {
  return (
    validatPhone.value &&
    !!params.code &&
    !!params.password &&
    !!confirmPassword
  );
});
// 验证手机号
let validatPhone = computed(() => {
  return isPhone(params.phoneNumber);
});

// 获取验证码
let countCode = ref(60);
let haveFinish = ref(true);
function getCode() {
  if (!validatPhone.value) {
    return window.$msg.error("请正确输入手机号");
  }
  if (!haveFinish.value) {
    return;
  } else {
    haveFinish.value = false;
    let timeCode = setInterval(() => {
      countCode.value -= 1;
      if (countCode.value == 0) {
        clearInterval(timeCode);
        haveFinish.value = true;
        countCode.value = 60;
      }
    }, 1000);
    sendMsg(params.phoneNumber).then(({ code, msg }) => {
      if (code !== 200) {
        clearInterval(timeCode);
        haveFinish.value = true;
        countCode.value = 60;
        return window.$msg.error(msg);
      }
      window.$msg.success(msg);
    });
  }
}

// 登录账号
function handleUpdate() {
  if (params.password !== confirmPassword.value) {
    return window.$msg.error("两次输入密码不一致");
  }
  updatePassword(params).then(({ code, msg }) => {
    if (code !== 200) {
      return window.$msg.error(msg);
    }
    window.$msg.success(msg);
    router.push({ name: "login" });
  });
}

// 返回登录
function handleBack() {
  router.push({ name: "login" });
}
</script>

<template>
  <div class="login-bg">
    <div class="login-contain">
      <div class="login-title">修改密码</div>
      <n-input
        class="login-input"
        v-model:value="params.phoneNumber"
        placeholder="请输入手机号码"
      >
        <template #prefix>
          <svg-icon name="telephone" color="grey"></svg-icon>
        </template>
      </n-input>
      <div class="login-code">
        <n-input
          class="login-code_input"
          v-model:value="params.code"
          placeholder="请输入验证码"
        >
          <template #prefix>
            <svg-icon name="code" color="grey"></svg-icon>
          </template>
        </n-input>
        <n-button class="login-code_btn" @click="getCode">
          {{ haveFinish ? "获取验证码" : `${countCode}s` }}
        </n-button>
      </div>
      <n-input
        class="login-input"
        v-model:value="params.password"
        placeholder="请输入修改密码"
        type="password"
        show-password-on="mousedown"
      >
        <template #prefix>
          <svg-icon name="password" color="grey"></svg-icon>
        </template>
      </n-input>
      <n-input
        class="login-input"
        v-model:value="confirmPassword"
        placeholder="请再次输入修改密码"
        type="password"
        show-password-on="mousedown"
      >
        <template #prefix>
          <svg-icon name="password" color="grey"></svg-icon>
        </template>
      </n-input>
      <n-button
        class="login-btn_login"
        type="info"
        @click="handleUpdate"
        :disabled="!loginBtnState"
        >确认修改</n-button
      >
      <div class="login-btn_forget" @click="handleBack">返回登录页</div>
    </div>
    <cope-right></cope-right>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}

.login-title {
  text-align: center;
  font-size: 32px;
  font-weight: bolder;
  color: #404040;
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

.login-btn_login {
  margin-top: 20px;
  height: 40px;
  width: 100%;
}

.login-input {
  margin-top: 20px;
}

.login-btn_forget {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #71a1c5;
  cursor: pointer;
}

.login-code {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .login-code_input {
    width: 230px;
  }

  .login-code_btn {
    width: 100px;
    color: grey;
  }
}
</style>
