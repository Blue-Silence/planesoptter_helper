<template>
    <el-row justify="center">
        <el-col :span="1">
            <!-- <AirportCard v-if="airport && false" :airport="airport" /> -->
            <el-button type="primary" @click="openDialog">Config</el-button>
        </el-col>
        <el-col :span="11">
        </el-col>
        <el-col :span="12">
            <Search @send-airport-selected="airportSelect" />
        </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="Config" width="800">
        <Config />
    </el-dialog>
</template>


<script setup>
import { ref } from 'vue';
import AirportCard from './TopBar/AirportCard.vue';
import Search from './TopBar/Search.vue';
import Config from './TopBar/Config.vue';
const emit = defineEmits(['sendAirportSelected']);

const airport = ref(null);
const dialogVisible = ref(false);

const airportSelect = (airport_n) => {
    airport.value = airport_n;
    emit('send-airport-selected', airport_n);
};


const openDialog = () => {
    dialogVisible.value = true;
    console.log("click!");
};

</script>