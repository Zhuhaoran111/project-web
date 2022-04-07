<template>
  <div class="login-wrap">
    <el-form
      label-position="top"
      label-width="80px"
      :model="formdata"
      class="login-form"
    >
      <!--  :model绑定当前表单的数据 -->
      <!-- :label-position="top"形式是赋值，要在data中引用，不加：则表示字符串。
     通过设置 label-position 属性可以改变表单域标签的位置，
     可选值为 top、left，当设为 top 时标签会置于表单域的顶部
       -->
      <h2>用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" type="primary" class="login-btn"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //登陆请求
    handleLogin() {
      console.log("1111111111");
      //下面就是简单的路由跳转，现在数据库没有建立。
      // this.$router.push({ name: "home" });
      console.log(this.formdata);
      this.$http.post("login", this.formdata).then((res) => {
        /* 登陆成功
         1.跳转home
         2.提示成功
         3.不成功  提示消息
         */
        console.log(res);
        console.log(res.status);
        console.log(res.data.status);
        const {
          data,
          meta: { msg, status },
        } = res.data;

        if (status === 200) {
          console.log("成功了");
          this.$router.push({ name: "home" });
          this.$message.success(msg);
        } else {
          console.log("不成功");
          this.$message.warning(msg);
        }
      });
    },
  },
};
</script>
<style>
/* 整个大盒子的样式 */
.login-wrap {
  height: 100%;
  background-color: #324152;
  /*以下适用弹性盒模型进行居中垂直对齐 */
  display: flex;
  justify-content: center; /* 居中对齐 */
  align-items: center; /* 垂直对齐 */
}
/* 大盒子里面的登陆表单样式 */
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 30px 30px 30px;
}
/* 设置按钮的宽度占100% */
.login-wrap .login-btn {
  width: 100%;
}
</style>