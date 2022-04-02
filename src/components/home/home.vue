
<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <span class="headerspan">过去无可挽回，未来可以改变</span>
          </div></el-col
        >
        <el-col :span="18" class="middle"
          ><div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a class="loginout" href="#">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: yellow;
}
.main {
  background-color: pink;
  height: 100%;
}

.grid-content span {
  height: 30px;
  width: 30px;
  background-color: red;
}

/*头部样式 */
.headerspan {
  line-height: 60px;
  font-size: 16px;
}

.middle {
  text-align: center;
}
.loginout {
  /* 去除下划线 */
  text-decoration: none;
  line-height: 60px;
}
</style>