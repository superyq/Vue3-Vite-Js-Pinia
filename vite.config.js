import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // 静态资源服务的文件夹
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    // 是否开启https
    https: false,
    // 端口号
    port: 3000,
    // 监听所有地址
    host: "0.0.0.0",
    // 启服务自动打开浏览器
    open: false,
    // 允许跨域
    cors: true,
    proxy: {
      "/dev-api": {
        // 本地环境
        // target: "http://10.28.60.184:8080",
        // 测试环境
        target: "http://119.3.188.114:8081",
        // 生产环境
        // target: "http://119.3.188.114:8080",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
      "/dev-api/file": {
        // 开发环境
        // target: `http://10.28.60.184:9300`,
        // 测试环境
        target: "http://119.3.188.114:9301",
        // 生产环境
        // target: "http://119.3.188.114:9300",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
  plugins: [
    vue({ reactivityTransform: true }), // 使用$ref语法糖
    // vue(), // 使用$ref语法糖
    createSvgIconsPlugin({
      // 指定缓存文件
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  build: {
    // 浏览器兼容目标 "esnext" | "modules"
    target: "modules",
    // 打包输出路径
    outDir: "dist",
    // 静态资源路径
    assetsDir: "assets",

    // 构建后是否生成 source map 文件
    sourcemap: false,
    //  chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
  },
  define: {
    // 解决 process.env 找不到 (process is not defined)
    // 使用 import.meta.env.VITE_APP_BASE_API 调用环境变量
    "process.env": {},
  },
});
