import api from "./http.js";

// 发送短信验证码
export function sendMsg(phoneNumber) {
  return api({
    url: "/auth/sendMsg",
    headers: {
      isToken: false,
    },
    method: "get",
    params: {
      phoneNumber,
    },
    timeout: 20000,
  });
}

// 修改密码 params: { phoneNumber, code, password }
export function updatePassword(params) {
  return api({
    url: "/auth/refreshPassword",
    method: "get",
    params,
  });
}
