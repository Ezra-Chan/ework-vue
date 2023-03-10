import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import * as path from "path";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".json", ".ts", ".vue"],
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router"],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      // port: 8080,
      // hmr: {
      //   host: "127.0.0.1",
      //   port: 8080,
      // },
      proxy: {
        "/api": {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
