import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(JSON.stringify(env));
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: env,
        },
      }),
    ],
    define: {
      ...env,
    },
    root: '.',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        '~': path.resolve(__dirname, '../..'),
      },
      extensions: ['.ts', '.json', '.vue', '.scss'],
    },
    build: {
      outDir: '../../dist/client',
      emptyOutDir: true,
      minify: env.VITE_ENV === 'production' ? 'esbuild' : false,
    },
    server: {
      port: 8000,
    },
  };
});
