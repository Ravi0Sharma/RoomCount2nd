import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVueNextResolver } from 'bootstrap-vue-next';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      external: ['bootstrap-vue-next'], // This line ensures bootstrap-vue-next is not bundled in the production build
    },
  },
  optimizeDeps: {
    include: ['bootstrap-vue-next'], // Make sure bootstrap-vue-next is pre-bundled for development
  },
});