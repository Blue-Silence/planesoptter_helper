<template>
  <el-card shadow="hover">
    <!-- 大标题 -->
    <h2 class="airport-title">{{ props.airport.name }} ({{ props.airport.iata_code }} / {{ props.airport.icao_code }})
    </h2>

    <!-- 五颜六色的描述列表，展示机场的基础信息 -->
    <el-descriptions :column="2" border>
      <el-descriptions-item label="Name" label-class="desc-label">{{ props.airport.name }}</el-descriptions-item>
      <el-descriptions-item label="Code" label-class="desc-label">{{ props.airport.iata_code }} / {{
        props.airport.icao_code }}</el-descriptions-item>
      <el-descriptions-item label="Location" label-class="desc-label">{{ props.airport.municipality }}, {{
        props.airport.country.name }}</el-descriptions-item>
      <el-descriptions-item label="Continent" label-class="desc-label">{{ props.airport.continent
        }}</el-descriptions-item>
      <el-descriptions-item label="Scheduled Service" label-class="desc-label">{{ props.airport.scheduled_service
        }}</el-descriptions-item>
      <el-descriptions-item label="Elevation" label-class="desc-label">{{ props.airport.elevation_ft }}
        ft</el-descriptions-item>
      <el-descriptions-item label="Latitude" label-class="desc-label">{{ props.airport.latitude_deg
        }}</el-descriptions-item>
      <el-descriptions-item label="Longitude" label-class="desc-label">{{ props.airport.longitude_deg
        }}</el-descriptions-item>
      <el-descriptions-item label="Home Page" label-class="desc-label">
        <a :href="props.airport.home_link" target="_blank">{{ props.airport.home_link }}</a></el-descriptions-item>
      <el-descriptions-item label="Wikipedia" label-class="desc-label">
        <a :href="props.airport.wikipedia_link" target="_blank">{{ props.airport.wikipedia_link
          }}</a></el-descriptions-item>
    </el-descriptions>

    <el-divider></el-divider>

    <!-- 表格部分，通过点击相应列弹出详细信息 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="runway-card" shadow="always">
          <h3>Runways</h3>
          <el-table :data="props.airport.runways" stripe border style="width: 100%" @row-click="openRunwayDialog"
            height=100%>
            <el-table-column prop="le_ident" label="LE Ident" style="width: 33%"></el-table-column>
            <el-table-column prop="he_ident" label="HE Ident" style="width: 33%"></el-table-column>
            <el-table-column prop="length_ft" label="Length (ft)" style="width: 34%"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="freq-card" shadow="always">
          <h3>Frequencies</h3>
          <el-table :data="props.airport.freqs" stripe border style="width: 100%" @row-click="openFreqDialog"
            height=100%>
            <el-table-column prop="description" label="Description" style="width: 50%"></el-table-column>
            <el-table-column prop="frequency_mhz" label="Frequency (MHz)" style="width: 50%"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="navaid-card" shadow="always">
          <h3>Navaids</h3>
          <el-table :data="props.airport.navaids" stripe border style="width: 100%" @row-click="openNavaidDialog"
            height=100%>
            <el-table-column prop="name" label="Name" style="width: 50%"></el-table-column>
            <el-table-column prop="frequency_khz" label="Frequency (kHz)" style="width: 50%"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 对话框展示详细信息 -->
    <el-dialog v-model="runwayDialogVisible" title="Runway Details" width="50%">
      <el-descriptions :column="1" border v-if="selectedRunway">
        <el-descriptions-item label="LE Ident">{{ selectedRunway.le_ident }}</el-descriptions-item>
        <el-descriptions-item label="HE Ident">{{ selectedRunway.he_ident }}</el-descriptions-item>
        <el-descriptions-item label="Length (ft)">{{ selectedRunway.length_ft }}</el-descriptions-item>
        <el-descriptions-item label="Width (ft)">{{ selectedRunway.width_ft }}</el-descriptions-item>
        <el-descriptions-item label="Surface">{{ selectedRunway.surface }}</el-descriptions-item>
        <el-descriptions-item label="Lighted">{{ selectedRunway.lighted }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-dialog v-model="freqDialogVisible" title="Frequency Details" width="50%">
      <el-descriptions :column="1" border v-if="selectedFreq">
        <el-descriptions-item label="Description">{{ selectedFreq.description }}</el-descriptions-item>
        <el-descriptions-item label="Frequency (MHz)">{{ selectedFreq.frequency_mhz }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-dialog v-model="navaidDialogVisible" title="Navaid Details" width="50%">
      <el-descriptions :column="1" border v-if="selectedNavaid">
        <el-descriptions-item label="Name">{{ selectedNavaid.name }}</el-descriptions-item>
        <el-descriptions-item label="Frequency (kHz)">{{ selectedNavaid.frequency_khz }}</el-descriptions-item>
        <el-descriptions-item label="Latitude">{{ selectedNavaid.latitude_deg }}</el-descriptions-item>
        <el-descriptions-item label="Longitude">{{ selectedNavaid.longitude_deg }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  airport: {
    type: Object,
    required: true
  }
})

// 用于存储选中的数据
const selectedRunway = ref(null);
const selectedFreq = ref(null);
const selectedNavaid = ref(null);
const runwayDialogVisible = ref(false);
const freqDialogVisible = ref(false);
const navaidDialogVisible = ref(false);

// 点击事件，打开详细信息对话框
function openRunwayDialog(row) {
  console.log("Oops!");
  selectedRunway.value = row;
  runwayDialogVisible.value = true;
}

function openFreqDialog(row) {
  console.log("Oops!");
  selectedFreq.value = row;
  freqDialogVisible.value = true;
}

function openNavaidDialog(row) {
  console.log("Oops!");
  selectedNavaid.value = row;
  navaidDialogVisible.value = true;
}
</script>

<style scoped>
h2.airport-title {
  font-size: 28px;
  color: #409EFF;
  margin-bottom: 20px;
}

.desc-label {
  font-weight: bold;
  color: #606266;
}

.el-divider {
  margin: 20px 0;
}

.runway-card,
.freq-card,
.navaid-card {
  margin-bottom: 20px;
}

.el-descriptions__label {
  color: #67C23A;
}

.el-table {
  cursor: pointer;
}
</style>