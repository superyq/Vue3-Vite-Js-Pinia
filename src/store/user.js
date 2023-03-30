import { defineStore } from "pinia";
import { login, logout } from "@/api/login.js";
import { getToken, setToken, removeToken, setExpiresIn } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      token: getToken() || "",
      user: {},
      name: "yqcoder",
      avatar: "",
      roles: [],
      permissions: [],
      expires_in: -1,
    };
  },
  actions: {
    login({ username, password, code, uuid }) {
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password: password,
          code,
          uuid,
        }).then((res) => {
          if (res.code !== 200) {
            reject(res);
            return window.$msg.error(res.msg);
          }
          const { data } = res;
          // 保存token
          setToken(data.access_token);
          this.token = data.access_token;
          // 保存到期时间
          setExpiresIn(data.expires_in);
          this.expires_in = data.expires_in;

          resolve(data);
        });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.token = "";
            this.roles = [];
            this.permissions = [];
            removeToken();
            resetRouter();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    removeToken() {
      return new Promise((resolve) => {
        this.token = "";
        this.roles = [];
        removeToken();
        reject();
      });
    },
  },
});
