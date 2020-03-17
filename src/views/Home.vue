<template>
  <div>
    <div>
      <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect">
        <el-menu-item index="student">学员管理</el-menu-item>
        <el-menu-item index="coach">教练管理</el-menu-item>
        <el-menu-item index="class">课程管理</el-menu-item>
        <el-menu-item index="fee">费用管理</el-menu-item>
      </el-menu>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name:"homePage",
  data(){
    return{
      activeIndex:"student"
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({name:key})
    }
  }
}
</script>
<style lang="scss">
</style>
