<template>
  <el-card class="airport-card" shadow="hover" @click="goToWebsite">
    <div class="card-content">
      <h2>{{ props.airport.name }}</h2>
      <!-- <p>{{ props.airport.extra_info.municipality }}</p> -->
      <!-- <p>{{ props.airport.iataCode }} / {{ airport.icaoCode }}</p> -->
    </div>
  </el-card>
</template>

<script setup>
import { reactive, defineProps } from 'vue';
//import { useRouter } from 'vue-router';

// 机场信息

const props = defineProps({
  airport: {
    type: Object,
    required: true
  }
});

// 使用 Vue Router 进行跳转（如果不使用 Vue Router，可以直接使用 window.location.href）
//const router = useRouter();

// 名片点击跳转到机场官网
const goToWebsite = () => {
  //window.open(airport.extra_info.home_link, '_blank'); // 新标签页打开
};
</script>

<style scoped>
.airport-card {
  width: 400px;
  margin: 20px auto;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.card-content {
  padding: 20px;
  text-align: left;
}

.airport-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
