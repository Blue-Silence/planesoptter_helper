<template>
    <el-menu default-active="1" @select="select_page" class="menu" style="height: 100%">
        <el-menu-item index="1">
            <el-icon>
                <House />
            </el-icon>
            <span>Gereral</span>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon>
                <MapLocation />
            </el-icon>
            <span>Map</span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
                <Sunrise />
            </el-icon>
            <span>Weather</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <List />
            </el-icon>
            <span>Flight Schedule</span>
        </el-menu-item>
        <el-menu-item index="5">
            <el-icon>
                <Notebook />
            </el-icon>
            <span>Spot Guide</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
const emit = defineEmits(['select-page']);
const select_page = (v) => {
    emit('select-page', v);
};
</script>


<style scoped>
.menu {
    background: rgba(255, 255, 255, 0.2);
    /* 设置背景为半透明 */
    backdrop-filter: blur(10px);
    /* 应用模糊效果 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 可选，添加阴影 */
}
</style>