<template>
  <div class="airport-details" :style="{ height: '100%'}">
    <div v-if="error">{{ error }}</div>
    <!-- <div v-if="airportInfo">
      <p>IATA 代码: {{ airportInfo.iata }}</p>
      <p>ICAO 代码: {{ airportInfo.icao }}</p>
      <p>机场名称: {{ airportInfo.name }}</p>
      <div v-if="airportInfo.extraInfo">
        <h4>额外信息</h4>
        <DetailTable :airport="airportInfo.extraInfo" />
        <pre>{{ airportInfo.extraInfo }}</pre>
      </div>
    </div>
    -->
    <DetailTable v-if="airportInfo && airportInfo.extraInfo" :airport="airportInfo.extraInfo" />
    <!-- <el-card v-else v-if="!error" v-loading="false" style="height: '1000px'"></el-card> -->
    <div v-else v-loading.fullscreen.lock="true"></div>
    

  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, watch } from 'vue';
import api_keys from '@/assets/api_keys.json';
import DetailTable from './AirportDetail/DetailTable.vue';

const props = defineProps({
  airportCode: {
    type: String,
    required: true,
  },
});

const emit = defineEmits();

const airportInfo = ref(null);
const error = ref(null);

const fetchAirportInfo = async () => {
  try {
    // 获取机场的 ICAO 代码
    const icaoResponse = await fetch(`https://fr24api.flightradar24.com/api/static/airports/${props.airportCode}/light`, {
      headers: {
        'Authorization': `Bearer ${api_keys['fr24api.flightradar24.com']}`,
        'Accept-Version': 'v1',
        'Accept': 'application/json',
      },
    });

    if (!icaoResponse.ok) {
      throw new Error(`HTTP error! status: ${icaoResponse.status}`);
    }

    const icaoData = await icaoResponse.json();
    if (icaoData) {
      const airport = icaoData;

      // 设置基本机场信息
      airportInfo.value = {
        iata: airport.iata || '未知',
        icao: airport.icao || '未知',
        name: airport.name || '未知',
        location: airport.location || '未知',
        flightCount: airport.flightCount || '未知',
        extraInfo: null, // 初始化额外信息
      };

      // 使用新的 API 获取额外信息
      const additionalResponse = await fetch(`https://airportdb.io/api/v1/airport/${airportInfo.value.icao}?apiToken=${api_keys['airportdb.io']}`);

      if (!additionalResponse.ok) {
        throw new Error(`HTTP error! status: ${additionalResponse.status}`);
      }

      const additionalData = await additionalResponse.json();
      // 处理额外信息
      airportInfo.value.extraInfo = additionalData || {}; // 记录额外信息
      console.log("Full info:", airportInfo.value.extraInfo);
    } else {
      error.value = '未找到机场信息';
    }
  } catch (err) {
    error.value = `获取机场信息失败: ${err.message}`;
  }

  // 发出事件
  emit('send-airport-detail', airportInfo.value);
};

onMounted(fetchAirportInfo);

watch(props, fetchAirportInfo);

</script>

<style scoped>

.transparent-square {
  width: 100%; /* 正方形的宽度 */
  height: 60vh; /* 正方形的高度 */
  opacity: 1;
  background-color: rgba(255, 255, 255, 0); /* 半透明背景 */
  margin: 0;  /* 去掉子元素的外边距 */
  padding: 0; /* 去掉子元素的内边距 */
}

</style>
