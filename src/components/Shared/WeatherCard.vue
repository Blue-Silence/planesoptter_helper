<template>
    <el-tooltip placement="top">
        <template #content>
            Temperature: {{ props.weather.temp }}<br />
            Wind Direction: {{ props.weather.windDir }}<br />
            Wind Speed : {{ props.weather.windSpeed }}<br />
            Humidity: {{ props.weather.humidity }}
        </template>
        <el-row :style="{ backgroundColor: helper.weatherColor(props.weather) }">
            <el-col :span="10" justify="center">
                <el-row justify="center">
                    <span>{{ formatTime(props.weather.fxTime) }}</span>
                </el-row>
                <el-row justify="center">
                    <span>{{ props.weather.text }}</span>
                </el-row>
            </el-col>
            <el-col :span="14">
                <i :class="`qi-${props.weather.icon}`" class="weather-icon" style="font-size: 2em;"></i>
            </el-col>
        </el-row>
    </el-tooltip>

</template>

<script setup>
import helper from "@/global_func.js";

const props = defineProps({
    weather: {
        type: Object,
        required: true
    }
});

const formatTime = (time) => {
    const date = new Date(time);
    //return date.toLocaleString();
    const month = date.getMonth() + 1;  // Months are zero-indexed in JS
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    return `${month}/${day} ${hour}:${minutes}`;
};

</script>