import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cesiumSource = 'node_modules/cesium/Build/Cesium';
const cesiumBaseUrl = 'cesiumStatic';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl, rename: {stripBase: 4}},
          {src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl, rename: {stripBase: 4}},
          {src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl, rename: {stripBase: 4}},
          {src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl, rename: {stripBase: 4}},
        ],
      }),
    ],
    define: {
      CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
