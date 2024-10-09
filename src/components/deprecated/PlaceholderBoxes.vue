<template>
    <div class="placeholder-container">
      <div class="info-box" v-for="index in 4" :key="index">
        占位符 {{ index }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlaceholderBoxes',
  };
  </script>
  
  <style scoped>
  .placeholder-container {
    display: flex;
    margin-top: 20px;
  }
  
  .info-box {
    width: 70px; /* 根据需要调整宽度 */
    height: 70px; /* 根据需要调整高度 */
    background-color: #e0e0e0; /* 占位符颜色 */
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  