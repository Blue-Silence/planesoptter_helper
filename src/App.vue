<template>
  <div id="app">
    <!-- <AirportSearch /> -->
    <Home />
  </div>
</template>

<script>
//import AirportSearch from './components/AirportSearch.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    //AirportSearch,
    Home
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
