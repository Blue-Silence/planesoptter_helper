<template>
    <div class="radar-container">
      <iframe
        :src="getRadarUrl(airportCode)"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RadarMap',
    props: {
      airportCode: {
        type: String,
        required: true,
      },
    },
    methods: {
      getRadarUrl(code) {
        return `https://globe.adsbexchange.com/?airport=${code.toUpperCase()}&hideSidebar&hideButtons&zoom=10`; // 使用提供的链接
      },
    },
  };
  </script>
  
  <style scoped>
  .radar-container {
    width: 400px; /* 根据需要调整宽度 */
    height: 300px; /* 根据需要调整高度 */
  }
  </style>
  