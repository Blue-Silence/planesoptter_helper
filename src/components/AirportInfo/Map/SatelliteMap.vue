
  <template>
    <div class="map-container">
      <el-amap :zoom="zoom" :center="center" style="width: 100%; height: 800px">
        <el-amap-layer-satellite></el-amap-layer-satellite>
      </el-amap>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';

    // 接收传入的经纬度坐标和缩放级别作为 props
    const props = defineProps({
    coordinate: {
      type: Object,
      required: true,
      default: () => ({
        lat: 39.9042, // 北京的纬度
        lng: 116.4074, // 北京的经度
      }),
    },
    zoom: {
      type: Number,
      default: 13, // 默认缩放级别
    },
  });
  
  // 设置地图中心和缩放级别
  const center = computed(() => [props.coordinate.lng, props.coordinate.lat]); // 设置地图中心点
  const zoom = computed(()=> props.zoom); // 设置缩放级别

  </script>
  
  <style scoped>
  /* 地图容器样式 */


  .map-container {
    width: 100%; /* 根据需要调整宽度 */
    height: 100%; /* 根据需要调整高度 */
  }
  </style>