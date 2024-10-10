<template>
    <el-row justify="center">
        <el-col :span="12">
            <AirportCard v-if="airport && false" :airport="airport" />
        </el-col>
        <el-col :span="12">
            <Search @send-airport-selected="airportSelect" />
        </el-col>
    </el-row>
</template>


<script setup>
import { ref } from 'vue';
import AirportCard from './TopBar/AirportCard.vue';
import Search from './TopBar/Search.vue';
const emit = defineEmits(['sendAirportSelected']);

const airport = ref(null);

const airportSelect = (airport_n) => {
    airport.value = airport_n;
    emit('send-airport-selected', airport_n);
};

</script>