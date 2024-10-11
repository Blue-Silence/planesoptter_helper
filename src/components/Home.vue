<template>
    <el-alert title="Before you start, click 'Config' to set your api keys." type="success" />
    <div :style="{ height: '100vh', backgroundColor: '#f0f0f1' }">
        <el-container class="main_info">
            <el-aside width="200px">
                <Menu @select-page="select_page" />
            </el-aside>
            <el-container :style="{ height: '100vh' }">
                <el-header :style="{ height: '5vh' }">
                    <TopBar @send-airport-selected="airportSelect" />
                </el-header>
                <el-main :style="{ height: '95vh' }">
                    <el-row justify="center" :style="{ height: '100%' }">
                        <el-col v-if="airport_code" :span="24" :style="{ height: '100%' }">
                            <AirportInfo v-if="airport_code" :airport-code="airport_code" :current_page="current_page"
                                :style="{ height: '100%' }" />
                        </el-col>
                        <el-col v-else :span="8" :style="{ height: '100%' }">
                            <el-card class="hint">
                                <h1> Please choose an airport.</h1>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script setup>
import { computed, ref, inject, provide, watch } from 'vue';
import AirportInfo from './AirportInfo.vue';
import TopBar from './TopBar.vue';
import Menu from './Menu.vue';


const current_page = ref(1);
const select_page = (v) => {
    current_page.value = v;
};

const airport_selected = ref(null)
const airport_code = computed(() => {
    return airport_selected.value ? airport_selected.value.iata_code : null;
});

const airportSelect = (airport) => {
    airport_selected.value = airport;
};

/*

import api_keys_template from '@/assets/api_keys_template.json';
const api_keys = ref(api_keys_template);
provide('api_keys', api_keys);
watch(api_keys, ()=>console.log(api_keys));

*/

</script>


<style>
.main_info {
    background-image: url('@/assets/images/DSC_1187.JPG');
    /* 使用本地图片 */
    background-size: cover;
    /* 使背景图覆盖整个卡片 */
    background-position: center;
    /* 居中背景图 */
    color: white;
    /* 根据背景图调整文本颜色 */
}

.hint>* {
    background-color: rgba(255, 255, 255, 0.2);
    /* 设置背景为半透明 */
    backdrop-filter: blur(10px);
    /* 应用模糊效果 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 可选，添加阴影 */
}
</style>