<template>
  <div id="app">
    <LeftNav></LeftNav>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import LeftNav from './components/common/LeftNav.vue'
export default {
  name: 'App',
  components: {
    LeftNav
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}
.main{
  width:95%;
  float:left;
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
}
</style>
