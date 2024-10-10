<template>
    <el-tooltip placement="top">
        <template #content>
            Condition: {{ props.weather.text }}<br />
            Wind Direction: {{ props.weather.windDir }}
        </template>
        <div>
            <el-row :style="{ backgroundColor: helper.weatherColor(props.weather) }">
                <el-col :span="16">
                    <span>{{ formatTime(props.weather.fxTime) }}</span>
                </el-col>
                <el-col :span="8">
                    <i :class="`qi-${props.weather.icon}`" class="weather-icon"></i>
                </el-col>
            </el-row>
            <el-row :style="{ backgroundColor: helper.weatherColor(props.weather) }">
                <el-col :span="24"><span>{{ props.weather.text }}</span></el-col>
            </el-row>
        </div>
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