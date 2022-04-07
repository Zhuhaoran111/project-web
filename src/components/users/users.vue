<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <!-- 首页/用户管理/用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.搜索 ,一行显示，有许多列el-row，el-col-->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 3.表格 
     1.el-table-column里面的属性: type="index-------表示按照1排序
    -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="date" type="index" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <!-- 如果内显示的内容不是字符串(文本),需要给被显示的内容包裹一个template容器 
        template内部想要使用数据 设置slot-scope属性
        该属性的值是要用数据create_time的数据源userlist
       
        -->
        <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
         userlist.row——>表示数组中的每个对象
          slot-scope自动的去找上一级的数据源,通常的命名当时scope
         -->
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtdate }}</template
        >
      </el-table-column>

      <el-table-column prop="mg_state" label="用户状态">
        <!-- 显示的组件，而不是字符串 ，外层包裹一个容器-->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <el-row>
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </el-row>
      </el-table-column>
    </el-table>

    <!-- 4.分页 
    1.@size-change ----每页显示条数变化时触发
    2.current-change ----当前页码改变时触发
    3.current-page -----设置当前页式第几页
    4.page-sizes=[2,4,6,8] -----每页多少条数据数组，
    5.page-size -------设置显示多少条
    6.total -----数据总数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      /* 表格绑定的数据 中的prop值一定要对应上*/
      // username: "admin"
      // email: "adsfad@qq.com"
      // mobile: "12345678"
      // create_time: 1486720211
      // mg_state: true
      // id: 500
      // role_name: "超级管理员"

      userlist: [],

      /* 分页相关的数据 */
      total: 1,
      pagenum: 1,
      pagesize: 2,
    };
  },
  created() {
    this.getUserlist();
  },

  methods: {
    /* 分页方法开始 */
    handleSizeChange(val) {
      //当选择每页显示多少条数据时，触发这个方法，然后每次都给pagenum赋值为1,,
      //即每次选择第几页，pagenum都会重置，而不保留上一次的代码
      this.pagenum = 1;
      //每页显示条数变化时，会发生变化，当每次选择每页多少条数据时，就会重新出发这个方法
      //然后让pagesize重新赋值，然后在重新渲染列表数据
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      //每次列表渲染前pagenum重新赋值为1

      this.getUserlist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;

      this.getUserlist();
    },
    /* 分页方法结束 */

    // async getUserList() {
    //   需要授权的API,必须在请求头中使用Authorization字段提供token令牌
    //   const AUTH_TOKEN = localStorage.getItem("token");

    //   this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    //   const res = await this.$http.get(
    //     `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
    //   );
    //   console.log(res);
    // },
    async getUserlist() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      //对象的解构赋值
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        //1.给表格数据赋值
        this.userlist = users;
        //2.给total赋值
        this.total = total;
        //3.提示
        this.$message.success(msg);
      } else {
        this.$$message.error(msg);
      }
    },
  },
};
</script>

<style>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 350px;
}
.searchRow {
  margin-top: 20px;
}
</style>