<template>
  <div :style="{ height: '100%' }">
    <el-card :style="{ height: '100%' }">
      <div :style="{ height: '100%' }">
        <h1>Airport Flight Schedule</h1>

        <!-- 筛选输入 -->
        <el-row justify="space-even">
          <el-col :span="12">
            <label for="flightNumber">Filter by flight ICAO code: </label>
            <el-input v-model="flightNumberRegex" style="width: 240px" placeholder="Please input regex" />
          </el-col>
          <el-col :span="12">
            <label for="aircraftType">Filter by flight plane type: </label>
            <el-input v-model="aircraftTypeRegex" style="width: 240px" placeholder="Please input regex" />
          </el-col>
        </el-row>
      </div>
      <div :style="{ height: '90%' }">
        <el-row justify="space-around">

          <el-col :span="11">
            <h3>Outbound</h3>
            <el-card>
              <el-table :data="filteredOutboundFlights" style="width: 100%" height="600" :border="true"
                @row-click="r => display_flight(r, 'dep')" :row-style="rowStyle">
                <el-table-column fixed prop="flight.icao" label="Ident" width="100" />
                <el-table-column prop="aircraft.icao" label="Type" width="80" />
                <el-table-column prop="arrival.airport" label="To" width="200" />
                <el-table-column prop="aircraft.registration" label="Reg" width="100" />
                <el-table-column prop="display_time" label="Depart" />
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="11">
            <div>
              <h3>Inbound</h3>
              <el-card>
                <el-table :data="filteredInboundFlights" style="width: 100%" height="600" :border="true"
                  @row-click="r => display_flight(r, 'arr')" :row-style="rowStyle">
                  <el-table-column fixed prop="flight.icao" label="Ident" width="100" />
                  <el-table-column prop="aircraft.icao" label="Type" width="80" />
                  <el-table-column prop="departure.airport" label="From" width="200" />
                  <el-table-column prop="aircraft.registration" label="Reg" width="100" />
                  <el-table-column prop="display_time" label="Arrive" />
                </el-table>
              </el-card>
            </div>
          </el-col>

        </el-row>
      </div>

      <el-drawer v-model="drawer" title="Flight Detail" size="60%">

        <FlightDetail :flight_info="flight_selected" :coordinate="props.coordinate" />
      </el-drawer>

    </el-card>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';
import axios from 'axios';

import helper from '@/global_func.js'

const api_keys = inject('api_keys');

const drawer = ref(false)

// 接收 prop
const props = defineProps({
  icaoCode: {
    type: String,
    required: true,
  },
  coordinate: {
    type: Object,
    required: true,
  },
  hourlyWeather: {
    type: Object,
    required: true,
  },
  useDemoData: {
    type: Boolean,
    required: true,
  },
});


// 使用 ref 定义数据
const outboundFlights = ref([]);
const inboundFlights = ref([]);

// 筛选条件的输入框值
const flightNumberRegex = ref('');
const aircraftTypeRegex = ref('');

const key = api_keys.value['api.aviationstack.com']; // 替换为有效的 API Key

import demo_response_arr from '@/assets/api_demo_resp/arrival.json';
import demo_response_dep from '@/assets/api_demo_resp/departure.json';
import FlightDetail from './FlightData/FlightDetail.vue';
// Method：Get flight info
const fetchFlights = async () => {

  if (props.useDemoData) {
    outboundFlights.value = demo_response_dep.data;
    inboundFlights.value = demo_response_arr.data;
    return;
  }

  try {
    const response_arr = await axios.get(`https://api.aviationstack.com/v1/flights`, {
      params: {
        access_key: key,
        arr_icao: props.icaoCode,
      },
    });

    const response_dep = await axios.get(`https://api.aviationstack.com/v1/flights`, {
      params: {
        access_key: key,
        dep_icao: props.icaoCode,
      },
    });

    outboundFlights.value = response_dep.data.data;
    inboundFlights.value = response_arr.data.data;
  } catch (error) {
    console.error('Flight info fetch fail:', error);
  }
};

// Filter flight, get/choose weather and time.
const filteredOutboundFlights = computed(() => {
  return outboundFlights.value.filter((flight) => {
    const flightMatch = flightNumberRegex.value
      ? (flight.flight && new RegExp(flightNumberRegex.value, 'i').test(flight.flight.icao))
      : true;
    const aircraftMatch = aircraftTypeRegex.value
      ? (flight.aircraft && new RegExp(aircraftTypeRegex.value, 'i').test(flight.aircraft.icao))
      : true;
    return flightMatch && aircraftMatch;
  }).map((v) => {
    v.display_time = chooseTime(v.departure, true);
    v.related_local_time = chooseTime(v.departure, false);
    v.weather = chooseWeatherByHour(v.related_local_time);
    return v;
  }).sort((a,b) => {
    return (new Date(a.related_local_time))-(new Date(b.related_local_time));
  });
});

const filteredInboundFlights = computed(() => {
  return inboundFlights.value.filter((flight) => {
    const flightMatch = flightNumberRegex.value
      ? (flight.flight && new RegExp(flightNumberRegex.value, 'i').test(flight.flight.icao))
      : true;
    const aircraftMatch = aircraftTypeRegex.value
      ? (flight.aircraft && new RegExp(aircraftTypeRegex.value, 'i').test(flight.aircraft.icao))
      : true;
    return flightMatch && aircraftMatch;
  }).map((v) => {
    v.display_time = chooseTime(v.arrival, true);
    v.related_local_time = chooseTime(v.arrival, false);
    v.weather = chooseWeatherByHour(v.related_local_time);
    return v;
  }).sort((a,b) => {
    return (new Date(a.related_local_time))-(new Date(b.related_local_time));
  });
});


const flight_selected = ref(null);
const display_flight = (row, type) => {
  console.log("Row clicked! Row is:", row);
  flight_selected.value = row;
  drawer.value = true;
};

const chooseTime = (v, need_format) => {
  if (!v) {
    return need_format ? 'N/A' : null;
  }
  if (v.actual) {
    return need_format ? helper.formatTime(v.actual) : v.actual;
  }
  if (v.estimated) {
    return need_format ? helper.formatTime(v.estimated) + ' (EST)' : v.estimated;
  }
  if (v.scheduled) {
    return need_format ? helper.formatTime(v.scheduled) + ' (SCH)' : v.scheduled;
  }
  return need_format ? 'N/A' : null;
}

const hourlyWeather = computed(() => {
  var re = {};
  props.hourlyWeather.map((v) => {
    re[timeByHour(v.fxTime)] = JSON.parse(JSON.stringify(v));
  });
  return re;
});


const timeByHour = (time) => {
  const date = new Date(time);
  if (date.getMinutes() > 30) {
    date.setHours(date.getHours() + 1);
  }

  const month = date.getMonth() + 1;  // Months are zero-indexed in JS
  const day = date.getDate();
  const hour = date.getHours();
  return `${month}-${day}-${hour}`;
}

const chooseWeatherByHour = (time) => {
  if (props.useDemoData) {
    var now = new Date();
    now.setHours(now.getHours() + Math.floor(Math.random() * (22 - 1 + 1) + 1));
    var t = timeByHour(now);
    var re = hourlyWeather.value[t];
    return re;
  }
  return hourlyWeather.value[timeByHour(time)];
};


const rowStyle = ({ row }) => {
  //console.log("This row is: ",row);
  return {
    '--el-table-tr-bg-color': helper.weatherColor(row.weather)
  };
};

// 当组件挂载时，调用获取航班信息方法
onMounted(fetchFlights);

watch(props, fetchFlights);

</script>

<style scoped>
/* 添加你的样式 */
</style>