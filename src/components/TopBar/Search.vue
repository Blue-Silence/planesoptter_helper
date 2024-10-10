<template>
  <div>
    <el-autocomplete v-model="search" :fetch-suggestions="filterAirports" :trigger-on-focus="false" clearable
      :style="{ width: '100%' }" class="custom-input" placeholder="Input Airport name or code"
      @select="selectAirport" />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import airportsData from '@/assets/airports.json'; // 根据实际路径导入

// 定义搜索框输入的内容
const search = ref('');
const emit = defineEmits(['send-airport-selected']);

// 筛选机场方法
const filterAirports = (search, cb) => {
  const query = search.toLowerCase();
  const results = airportsData.filter(
    airport =>
      airport.name.toLowerCase().includes(query) ||
      airport.iata_code.toLowerCase().includes(query)
  ).map(
    airport => {
      airport.value = `${airport.name} (${airport.iata_code})`;
      return airport;
    }
  )
  console.log("Results:", results);
  cb(results);
};

// 选择机场后更新输入框内容
const selectAirport = airport => {
  console.log("Select:", airport);
  emit('send-airport-selected', airport);
};
</script>

<style>
.custom-input .el-input {
  height: 5vh !important;
  /* 设置输入框高度 */
}
</style>