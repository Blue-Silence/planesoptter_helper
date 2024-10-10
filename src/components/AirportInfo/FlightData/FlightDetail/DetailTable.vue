<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>Detailed Info</h2>
    </div>

    <!-- 航班信息 -->
    <el-divider>Flight Information</el-divider>
    <el-descriptions :column="3" border label-position="left" label-width="150px">
      <el-descriptions-item label="Flight Date">
        {{ props.flight_info.flight_date }}
      </el-descriptions-item>

      <el-descriptions-item label="Flight Status">
        {{ props.flight_info.flight_status }}
      </el-descriptions-item>

      <!-- 航空公司信息 -->
      <el-descriptions-item label="Airline Name">
        {{ props.flight_info.airline.name }}
      </el-descriptions-item>
      <el-descriptions-item label="Airline IATA">
        {{ props.flight_info.airline.iata }}
      </el-descriptions-item>
      <el-descriptions-item label="Airline ICAO">
        {{ props.flight_info.airline.icao }}
      </el-descriptions-item>

      <!-- 航班号 -->
      <el-descriptions-item label="Flight Number">
        {{ props.flight_info.flight.number }}
      </el-descriptions-item>
      <el-descriptions-item label="Flight IATA">
        {{ props.flight_info.flight.iata }}
      </el-descriptions-item>
      <el-descriptions-item label="Flight ICAO">
        {{ props.flight_info.flight.icao }}
      </el-descriptions-item>
    </el-descriptions>


    <!-- 飞机信息 -->
    <el-divider>Aircraft Information</el-divider>
    <el-descriptions :column="3" border label-position="left" label-width="150px">
      <el-descriptions-item label="Aircraft Model">
        {{ props.flight_info.aircraft ? props.flight_info.aircraft.icao : 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="Registration">
        {{ props.flight_info.aircraft ? props.flight_info.aircraft.registration : 'N/A' }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 出发信息 -->
    <el-divider>Departure Information</el-divider>
    <el-descriptions :column="3" border label-position="left" label-width="150px">
      <el-descriptions-item label="Airport">
        {{ props.flight_info.departure.airport }}
      </el-descriptions-item>
      <el-descriptions-item label="Timezone">
        {{ props.flight_info.departure.timezone }}
      </el-descriptions-item>
      <el-descriptions-item label="IATA">
        {{ props.flight_info.departure.iata }}
      </el-descriptions-item>

      <el-descriptions-item label="ICAO">
        {{ props.flight_info.departure.icao }}
      </el-descriptions-item>
      <el-descriptions-item label="Terminal">
        {{ props.flight_info.departure.terminal || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="Gate">
        {{ props.flight_info.departure.gate || 'N/A' }}
      </el-descriptions-item>

      <el-descriptions-item label="Delay (minutes)">
        {{ props.flight_info.departure.delay || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="Scheduled">
        {{ formattedScheduledDeparture }}
      </el-descriptions-item>
      <el-descriptions-item label="Actual">
        {{ formattedActualDeparture }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 到达信息 -->
    <el-divider>Arrival Information</el-divider>
    <el-descriptions :column="3" border label-position="left" label-width="150px">
      <el-descriptions-item label="Airport">
        {{ props.flight_info.arrival.airport }}
      </el-descriptions-item>
      <el-descriptions-item label="Timezone">
        {{ props.flight_info.arrival.timezone }}
      </el-descriptions-item>
      <el-descriptions-item label="IATA">
        {{ props.flight_info.arrival.iata }}
      </el-descriptions-item>

      <el-descriptions-item label="ICAO">
        {{ props.flight_info.arrival.icao }}
      </el-descriptions-item>
      <el-descriptions-item label="Terminal">
        {{ props.flight_info.arrival.terminal || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="Baggage">
        {{ props.flight_info.arrival.baggage || 'N/A' }}
      </el-descriptions-item>

      <el-descriptions-item label="Scheduled">
        {{ formattedScheduledArrival }}
      </el-descriptions-item>
      <el-descriptions-item label="Actual">
        {{ formattedActualArrival }}
      </el-descriptions-item>
      <el-descriptions-item label="Delay (minutes)">
        {{ props.flight_info.arrival.delay || 'N/A' }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup>
import { reactive, computed } from 'vue';


const props = defineProps({
  flight_info: {
    type: Object,
    required: true,
  },
});


// 格式化日期时间

var my_time_zone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]

const formatTime = (t) => {
  return t ? ((new Date(t).toLocaleString()) + ` ${my_time_zone}`) : 'N/A';
};

const formattedScheduledDeparture = computed(() => {
  return formatTime(props.flight_info.departure.scheduled);
});

const formattedActualDeparture = computed(() => {
  return formatTime(props.flight_info.departure.actual);
});

const formattedScheduledArrival = computed(() => {
  return formatTime(props.flight_info.arrival.scheduled);
});

const formattedActualArrival = computed(() => {
  return formatTime(props.flight_info.arrival.actual);
});
</script>

<style scoped>
.box-card {
  width: 100%;
  margin: 20px auto;
}
</style>