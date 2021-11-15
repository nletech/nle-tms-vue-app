import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置alias起别名: 在过去使用vue-cli的时候，我们总是使用@去引入某些文件，由于Vite没有提供类似的配置，所以我们需要手动的对其进行相关配置，才能继续使用@符号去快捷的引入文件。
    alias: [{
      find: "@",
      replacement: path.resolve(__dirname, './src')
    }],
  },
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  plugins: [vue(),
    styleImport({
      libs: [{
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      }, ],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        // autoprefixer(),
        // pxtorem({
        //   rootValue: 37.5,
        //   propList: ['*']
        // })
      ]
    }

  }
})