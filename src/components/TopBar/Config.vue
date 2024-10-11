<template>
  <el-form ref="apiForm">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="api" label="API" />
      <el-table-column prop="key" label="API Key">
        <template v-slot="scope">
          <el-input v-model="scope.row.key" placeholder="Please input the key."></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-upload accept=".json" :show-file-list="false" :before-upload="handleFileChange">
      <el-button type="info">Upload Config File</el-button>
    </el-upload>
    <el-button type="primary" @click="submitKeys">Set</el-button>
  </el-form>
</template>

<script setup>
import { ref, inject } from 'vue';

const api_keys = inject('api_keys');
// 生成表格数据
const tableData = ref(Object.entries(api_keys.value).map(([api, key]) => ({ api, key })));

// 文件处理
const handleFileChange = (file) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      // 更新表格数据
      Object.entries(data).forEach(([api, key]) => {
        const row = tableData.value.find(row => row.api === api);
        if (row) {
          console.log("Filling row:", row);
          row.key = key; // 填充字段
        } else {
          console.log("Fail filling row:", api);
        }
      });
    } catch (error) {
      console.error('Invalid JSON file.', error);
      alert('Invalid JSON file.');
    }
  };
  return false; // 阻止默认上传
};

// 提交键值
const submitKeys = () => {
  //console.log('提交的 API Keys:', tableData.value);
  var re = {};
  tableData.value.forEach((k, v) => { re[k.api] = k.key; console.log('Okkk:', k); });
  console.log('re: ', re);
  // 处理提交的 API Keys，比如发送到服务器
  api_keys.value = re;
};
</script>

<style scoped>
.el-table {
  margin-bottom: 20px;
}
</style>