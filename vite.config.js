import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [createVuePlugin()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 四季配色系统
          'primary-color': '#2C5F8D',      // 冬·深蓝
          'success-color': '#5A8A65',      // 森林绿
          'error-color': '#B94D3D',        // 砖瓦红
          'warning-color': '#C67A28',      // 秋·深橙
          'info-color': '#4A8FBF',         // 夏·湖蓝
          'border-radius-base': '8px',
          'font-size-base': '14px',
          'text-color': '#2A2A2A',
          'text-color-secondary': '#6B6B6B',
          'border-color-base': '#E5E5E5',
          'background-color-base': '#F8F6F3'
        }
      }
    }
  },

  server: {
    port: 3000,
    host: true
  },

  build: {
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },

  optimizeDeps: {
    include: ['moment', 'moment/locale/zh-cn']
  }
})
