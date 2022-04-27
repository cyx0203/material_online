import { defineConfig } from 'umi';
import { routes } from './src/routes';

const _MAIN_TITLE = '公用物料平台';
// const _TRADE_URL = 'http://127.0.0.1:7001';
const _TRADE_URL = 'http://106.12.24.238:7001';
const _VERSION = 'V1.0.2';
export default defineConfig({
  history: {
    type: 'hash',
  },
  define: {
    MAIN_TITLE: _MAIN_TITLE,
    TRADE_URL: _TRADE_URL,
    VERSION: _VERSION,
  },
  title: _MAIN_TITLE,
  nodeModulesTransform: {
    type: 'none',
  },
  request: {
    dataField: 'data',
  },
  // base: './',
  publicPath: './',
  alias: {
    GGGLOBAL: '@/core/global.ts',
    GGService: '@/core/service.ts',
  },
  routes: routes,
  fastRefresh: {},
  theme: {
    //
    'primary-color': '#36cfc9',
    //
    'light-color': '#e2fcfa',
    //
    'error-color': '#f759ab',
  },
});
