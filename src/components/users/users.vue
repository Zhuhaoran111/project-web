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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="mailBox" label="邮箱"> </el-table-column>
      <el-table-column prop="createData" label="创建日期"> </el-table-column>
      <el-table-column prop="userStatus" label="用户状态"> </el-table-column>
      <el-table-column prop="operate" label="操作"> </el-table-column>
    </el-table>

    <!-- 4.分页 
    1.@size-change ----每页显示条数变化时触发
    2.current-change ----当前页改变时触发
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
      :total="400"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,

      /* 表格绑定的数据 */
      tableData: [
        {
          date: "2016-05-02",
          name: "沐红鲤",
          address: "北京上海",
          mailBox: "774861369@qq.com",
          createData: "2022-4-5",
          userStatus: "活跃",
          operate: "",
        },
        {
          date: "2016-05-02",
          name: "沐红鲤",
          address: "北京上海",
          mailBox: "774861369@qq.com",
          createData: "2022-4-5",
          userStatus: "活跃",
          operate: "",
        },
        {
          date: "2016-05-02",
          name: "沐红鲤",
          address: "北京上海",
          mailBox: "774861369@qq.com",
          createData: "2022-4-5",
          userStatus: "活跃",
          operate: "",
        },
        {
          date: "2016-05-02",
          name: "沐红鲤",
          address: "北京上海",
          mailBox: "774861369@qq.com",
          createData: "2022-4-5",
          userStatus: "活跃",
          operate: "",
        },
      ],
    };
  },
  created() {
    this.getUserList();
  },

  methods: {
    /* 分页方法开始 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /* 分页方法结束 */

    async getUserList() {
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      console.log("aaaaaaaaa");
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