<template>
    <div class="flight-schedule">
      <el-input
        v-model="arrivalFilter"
        placeholder="按航班号过滤到达航班"
        clearable
        class="filter-input"
        @keyup.enter="confirmArrivalFilter"
      />
      <el-input
        v-model="departureFilter"
        placeholder="按机型过滤出发航班"
        clearable
        class="filter-input"
        @keyup.enter="confirmDepartureFilter"
      />
  
      <el-table :data="filteredArrivals" @row-click="showDetails('arrival')" class="table">
        <el-table-column prop="flight" label="到达航班" />
        <el-table-column prop="aircraft" label="机型" />
      </el-table>
  
      <el-table :data="filteredDepartures" @row-click="showDetails('departure')" class="table">
        <el-table-column prop="flight" label="出发航班" />
        <el-table-column prop="aircraft" label="机型" />
      </el-table>
  
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <template #title>{{ dialogTitle }}</template>
        <div>{{ dialogContent }}</div>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    icaoCode: {
      type: String,
      required: true,
    },
  });
  
  const arrivalFilter = ref('');
  const departureFilter = ref('');
  const dialogVisible = ref(false);
  const dialogTitle = ref('');
  const dialogContent = ref('');
  const arrivals = ref([]);
  const departures = ref([]);
  const arrivalConfirmation = ref(false);
  const departureConfirmation = ref(false);


  const api_key = "dw8VGAurHr4F2fgkdMRKRh2QAOA6LIJr" 
  
  const fetchFlights = async () => {
  if (!props.icaoCode) return;

  try {
    const arrivalResponse = await axios.get(`/flightaware/aeroapi/airports/${props.icaoCode}/flights/scheduled_arrivals`, {
      headers: { 
        'Authorization': `Bearer ${api_key}`,
        'Cache-Control': 'no-cache', // 禁用缓存
       },
    });
    arrivals.value = arrivalResponse.data.flights || [];

    const departureResponse = await axios.get(`/flightaware/aeroapi/airports/${props.icaoCode}/flights/scheduled_departures`, {
        headers: { 
        'Authorization': `Bearer ${api_key}`,
        'Cache-Control': 'no-cache', // 禁用缓存
       },
    });
    departures.value = departureResponse.data.flights || [];
  } catch (error) {
    console.error('Error fetching flight data:', error);
    arrivals.value = [];
    departures.value = [];
  }
};

  
  onMounted(fetchFlights);
  
  const confirmArrivalFilter = () => {
    arrivalConfirmation.value = !arrivalConfirmation.value; // 切换确认状态
  };
  
  const confirmDepartureFilter = () => {
    departureConfirmation.value = !departureConfirmation.value; // 切换确认状态
  };
  
  const filteredArrivals = computed(() => {
    if (!arrivalConfirmation.value || !arrivalFilter.value) return arrivals.value; // 不过滤
    return arrivals.value.filter(flight => 
      flight && new RegExp(arrivalFilter.value, 'i').test(flight.flight || '')
    );
  });
  
  const filteredDepartures = computed(() => {
    if (!departureConfirmation.value || !departureFilter.value) return departures.value; // 不过滤
    return departures.value.filter(flight => 
      flight && new RegExp(departureFilter.value, 'i').test(flight.aircraft || '')
    );
  });
  
  const showDetails = (type) => {
    dialogTitle.value = type === 'arrival' ? '到达航班详情' : '出发航班详情';
    dialogContent.value = '待定内容'; // 根据需求填充具体内容
    dialogVisible.value = true;
  };
  </script>
  
  <style scoped>
  .flight-schedule {
    max-width: 800px; /* 控制最大宽度 */
    margin: 0 auto;   /* 居中对齐 */
    padding: 20px;
  }
  
  .filter-input {
    margin-bottom: 10px;
  }
  
  .table {
    margin-bottom: 30px;
  }
  
  .el-dialog__header {
    background-color: #f2f2f2;
  }
  
  .el-dialog {
    border-radius: 8px;
  }
  </style>
  