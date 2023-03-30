import api from "./http.js";

// 登录
export function login({ username, password, code, uuid }) {
  return api({
    url: "/auth/login",
    headers: {
      isToken: false,
    },
    method: "post",
    data: { username, password, code, uuid },
  });
}

// 登出
export function logout() {
  return api({
    url: `/auth/logout`,
    method: "delete",
  });
}

// 获取验证码
export function getCodeImg() {
  return api({
    url: `/code`,
    headers: {
      isToken: false,
    },
    method: "get",
    timeout: 20000,
  });
}
