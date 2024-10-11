import { createApp, h } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { provide, ref, watch } from 'vue';
import api_keys_template from '@/assets/api_keys_template.json';
const api_keys = ref(api_keys_template);
watch(api_keys, () => update_keys());

const app = createApp({
  setup() {
    provide('api_keys', api_keys);
  },
  render: () => h(App) // 这里渲染根组件
});
app.use(ElementPlus);
//app.mount('#app');

///////////////////////////////////////////////////////////////
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const update_keys = () => {
  // 初始化高德地图 API Loader，注意替换为你自己的高德地图 key
  initAMapApiLoader({
    // 高德的key
    key: api_keys.value["Amap_api"],
    securityJsCode: api_keys["Amap_security"], // 新版key需要配合安全密钥使用
    lang: 'en',
    //Loca:{
    //  version: '2.0.0'
    //} // 如果需要使用loca组件库，需要加载Loca
  });
};


app.use(VueAMap);
app.mount('#app');

