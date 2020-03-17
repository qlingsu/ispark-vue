<template>
    <div class="kl-page kl-login-bg">
      <div class="kl-login-wrap">
        <div class="kl-login-title"><i class="el-icon-basketball"></i>{{title}}</div>
        <div class="kl-form-signin">
            <h2 class="kl-login-title">登录</h2>
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px" style="padding-bottom: 5px">
                <el-form-item label="" prop="userName">
                    <el-input 
                        v-model="loginForm.userName" 
                        placeholder="用户名" 
                        @keyup.native.enter="doSubmit"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input 
                        v-model="loginForm.password" 
                        type="password" 
                        placeholder="密码" 
                        @keyup.native.enter="doSubmit"></el-input>
                </el-form-item>
                <!-- <el-form-item label="" prop="verifyCode" v-show="isLoginVerifyCode">
                    <div class="verifycode-wrap">
                        <el-input 
                            v-model="loginForm.verifyCode"
                            placeholder="验证码" 
                            @keyup.native.enter="doSubmit"></el-input>
                    </div>
                    <div class="verifycode-img-wrap" @click="verifycodeRefresh">
                        <img :src="verifycodeImgSrc" />
                    </div>
                </el-form-item> -->
            </el-form>
            <div class="form-control">
                <el-button type="primary" style="width: 100%;" @click="doSubmit">登录</el-button>
            </div>
        </div>
      </div>
	  </div>
</template>
<script>
import loginApi from "@/api/loginApi"
export default {
  name:"LoginPage",
  data(){
    return{
      title:"星火篮球俱乐部",
      loading:false,
      tenantName:"",
      verifycodeImgSrc:"",
      verifycodeUUID:"",
      isLoginVerifyCode:false,
      token:"",
      redirect:"",
      loginForm:{
          verifyCode:"",
          userName:"",
          password:""  
      },
      rules:{
        //   verifyCode:[
        //       { required: false, message: '请输入验证码', trigger: 'blur' }
        //   ],
          userName: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'change' }
          ]
      }
    }
  },
  methods: {
    doSubmit(){
      let self = this;
      self.$refs['loginForm'].validate(async (valid) => {
          if (valid) {
              let res = await loginApi.login({
                  phone_id:self.loginForm.userName,
                  password:self.loginForm.password
              })
              console.log(res)
              if(res){
                  self.loading = false;
                  //进入主页面
                  self.$router.push({
                      name: 'student'
                  });
              }else{
                    self.loading = false;
                    console.log("登陆失败")
              }
          } else {
              return false;
          }
      });
		}
  }
}
</script>
<style lang="scss">
</style>
