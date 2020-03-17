<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name:"app",
  data(){
    return{
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
