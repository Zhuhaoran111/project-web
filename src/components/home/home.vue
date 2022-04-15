
<template>
  <el-container class="container">
    <el-header class="header">
      <!--首页标题导航栏 -->
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <!-- <span class="headerspan">过去无可挽回，未来可以改变</span> -->
          </div></el-col
        >
        <el-col :span="18" class="middle"
          ><div class="grid-content bg-purple-light">
            <!-- <h3>电商后台管理系统</h3> -->
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSignout" href="#">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!--:unique-opened="true"------- 只保持一个子菜单展开 
        :router="true"------开启路由模式
        -->
        <el-menu :unique-opened="true" :router="true">
          <!-- 这里的index主要是控制打开，如果都一样，则打开一个全部都会展开 -->
          <!-- item1.order表示每个index的值不同，所以去order作为标识 -->
          <el-submenu
            :index="'' + item1.order"
            v-for="(item1, index) in menus"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>

            <el-menu-item
              :index="item2.path"
              v-for="(item2, index) in item1.children"
              :key="index"
            >
              <i class="el-icon-s-custom"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- home.vue这里开启路由模式，index的值->path的值 -->
        <!--  home.vue main-> router-view-->
        <!-- router/index.js 在home中children配置users路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //获取菜单栏数据
  data() {
    return {
      menus: [],
    };
  },

  /* 下面的目的是：如果没有登录过，就不能进行home组件 */
  beforeCreate() {
    //获取token
    // const token = localStorage.getItem("token");
    // if (!token) {
    //if token没有 ——>登陆
    //   this.$router.push({ name: "login" });
    // } else {
    //if token有——>继续渲染组件
    // }
    //newVue之前自动触发
  },
  created() {
    this.getMenus();
  },
  methods: {
    //获取导航栏数据
    async getMenus() {
      const res = await this.$http.get(`menus`);
      console.log(res);
      this.menus = res.data.data;
    },

    handleSignout() {
      /* 1.清除token值 */
      localStorage.clear();
      /* 2.提示 */
      this.$message.success("退出成功");
      /* 3.退出即跳转到登陆的页面 */
      this.$router.push({ name: "login" });
    },
  },
};
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