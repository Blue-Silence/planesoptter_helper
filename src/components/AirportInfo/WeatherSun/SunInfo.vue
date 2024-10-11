<template>
  <el-card :style="{ height: '100%' }" class="sun_card">
    <div class="iframe-container">
      <h2> Sun Position</h2>
      <iframe ref="myIframe" :src="getUrl(coordinate)" width="100%" height="100%" frameborder="0" allowfullscreen
        sandbox="allow-same-origin allow-forms allow-scripts" class="clipped-iframe"></iframe>
    </div>
  </el-card>
</template>

<script setup>


const props = defineProps({
  coordinate: {
    type: Object,
    required: true,
  },
});


const getUrl = (coordinate) => {
  const latitude = coordinate[0];
  const longitude = coordinate[1];
  console.log("Coordinate as follows:", latitude, longitude);
  return `https://suncalc.org/#/${latitude},${longitude},12/null/null/null/null`;
};




</script>

<style scoped>
.sun_card :deep(.el-card__body) {
  height: 100%;
}

.iframe-container {
  position: relative;
  width: 100%;
  /* 减去黑条的宽度 */
  height: 70%;
  overflow: hidden;
  /* 隐藏多余内容 */
}

.clipped-iframe {
  position: absolute;
  left: 0;
  width: calc(100% + 300px);
  /* 扩展宽度以补偿左移部分 */
  height: 100%;
}
</style>