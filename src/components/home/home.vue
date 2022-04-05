
<template>
  <el-container class="container">
    <el-header class="header">
      <!--首页标题导航栏 -->
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
      <el-aside class="aside" width="200px">
        <!-- 只保持一个子菜单展开 -->
        <el-menu :unique-opened="true">
          <!-- 这里的index主要是控制打开，如果都一样，则打开一个全部都会展开 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-s-custom"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="2-1">
              <i class="el-icon-s-custom"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-s-custom"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="3-1">
              <i class="el-icon-s-shop"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-s-shop"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-s-shop"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="4-1">
              <i class="el-icon-s-grid"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>

            <el-menu-item index="5-1">
              <i class="el-icon-s-data"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
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