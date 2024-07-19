import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // src文件夹配置别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname,'src')
    }
  },
})
