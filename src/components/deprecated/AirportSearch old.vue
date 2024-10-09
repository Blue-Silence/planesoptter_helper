<template>
    <div>
      <h1>输入机场名称或代码</h1>
      <div class="search-container">
        <input
          type="text"
          v-model="search"
          @input="filterAirports"
          placeholder="输入机场名称或代码"
          class="search-input"
        />
        <ul v-if="filteredAirports.length && search" class="suggestions">
          <li
            v-for="airport in filteredAirports"
            :key="airport.code"
            @click="selectAirport(airport)"
          >
            {{ airport.name }} ({{ airport.code }})
          </li>
        </ul>
      </div>
      <AirportInfo v-if="selectedAirport" :airportCode="selectedAirport.code" />
    </div>
  </template>
  
  <script>
  import airportsData from '@/assets/airports.json'; // 根据实际路径导入
  import AirportInfo from '@/components/AirportInfo.vue'; // 导入新组件
  
  export default {
    name: 'AirportSearch',
    components: {
      AirportInfo, // 注册新组件
    },
    data() {
      return {
        search: '',
        airports: airportsData, // 从本地数据加载机场信息
        filteredAirports: [],
        selectedAirport: null, // 新增选中的机场
      };
    },
    methods: {
      filterAirports() {
        const query = this.search.toLowerCase();
        this.filteredAirports = this.airports.filter(airport =>
          airport.name.toLowerCase().includes(query) ||
          airport.code.toLowerCase().includes(query)
        );
      },
      selectAirport(airport) {
        //this.$forceUpdate();
        this.selectedAirport = airport; // 更新选中的机场
        this.search = airport.name; // 更新搜索框内容
        this.filteredAirports = []; // 清空建议列表
      },
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    position: relative;
    width: 300px; /* 根据需要调整宽度 */
  }
  
  .search-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .suggestions {
    position: absolute;
    top: 100%; /* 将建议列表放置在输入框下方 */
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto; /* 超出部分可滚动 */
    z-index: 10; /* 确保在输入框之上 */
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .suggestions li {
    padding: 8px;
    cursor: pointer;
  }
  
  .suggestions li:hover {
    background-color: #f0f0f0;
  }
  </style>
  