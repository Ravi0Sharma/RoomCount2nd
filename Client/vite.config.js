import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'


export default defineConfig({
 plugins: [ vue(),
   Components({
     resolvers: [BootstrapVueNextResolver()]  }) ],
 build: {
   rollupOptions: {
     external: ['bootstrap/dist/css/bootstrap.css']
   }
 },
 optimizeDeps: {
   include: ['bootstrap/dist/css/bootstrap.css']
 }
});
