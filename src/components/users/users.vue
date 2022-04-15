<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <!-- 首页/用户管理/用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.搜索 ,一行显示，有许多列el-row，el-col,  clearable表示清除表单内容-->
    <el-row class="searchRow">
      <el-col>
        <el-input
          placeholder="请输入内容"
          clearable
          @clear="loadUserList()"
          v-model="query"
          class="inputSearch"
        >
          <el-button
            @click="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
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
        <!-- {{ this.create_time }} -->
      </el-table-column>

      <el-table-column prop="mg_state" label="用户状态">
        <!-- 显示的组件，而不是字符串 ，外层包裹一个容器
         v-model="scope.row.mg_state" 
         v-model双向数据绑定-----数据变化，视图变化改变了数据，数据变化也影响了视图
        -->
        <template slot-scope="scope">
          <el-switch
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <!--  -->
        <template slot-scope="scope">
          <!-- 编辑小按钮 -->
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>

          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleUserMsgDia(scope.row.id)"
          ></el-button>
          <!-- scope.$index这是获取当前的索引值-------------------非常好用 -->
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showSetUserRoleDia(scope.row, scope.$index)"
          ></el-button>
        </template>
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

    <!-- 第一个添加用户的弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 第一个添加用户弹框结束 -->

    <!--第二个编辑用户列表的弹框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <!-- el-input中加disabled表示不允许修改 -->
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!--第二个编辑用户的弹框束 -->

    <!-- 第三个分配角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!-- 1.如果el-select的绑定数据的值和option中value值一样，就会显示改option的值 
               2.如果el-select的绑定数据的值和lable的值一样，就显示的是什么，
               3.当在页面中改变lable值，上面el-select值就会自动减1               
          -->
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <!--for循环遍历要熟练运用(这里不是很熟悉) -->
            <!-- item第每个数组的对象.通过item.roleName 
            value值是当前角色名roleName对应的id值
            -->
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item, i) in roles"
              :key="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 第三个分配弹框结束 -->
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
      create_time: "",
      // mg_state: true
      // id: 500
      // role_name: "超级管理员"

      userlist: [],

      /* 分页相关的数据 */
      total: 1,
      pagenum: 1,
      pagesize: 2,

      /* 添加对话框有关的数据 */
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      //添加用户的表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //分配角色
      currUserId: -1, //当前用户的Id
      currRoleId: 1,
      roles: [], //保存所有的角色数据
      currUsername: "",

      //当添加用户时获取当前系统的时间
      // nowYear: "",
      // nowMouth: "",
      // nowDate: "",
    };
  },
  created() {
    this.getUserlist();
  },

  methods: {
    //修改用户角色-----发送请求
    async setRole() {
      //：id 要修改的的用户id的值
      //请求体中的rid修改的新值角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId,
      });

      //上面设置角色成功，关闭对话框
      this.dialogFormVisibleRol = false;
    },

    //分配角色打开对话框
    async showSetUserRoleDia(user) {
      //赋值当前的用户名
      this.currUsername = user.username;
      this.currUserId = user.id;

      //获取所有的角色
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;

      //打开显示框，获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`);
      console.log(res);
      console.log("这是获取当前用户角色的id");
      //下面的代码是获取用户角色的rid
      // res.data.data.rid
      this.currRoleId = res.data.data.rid;
      this.dialogFormVisibleRol = true;
    },

    /* 修改用户状态(switch 开关) */
    async changeMgState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      // console.log(res);
    },

    //编辑用户--发送请求(确定按钮)
    async editUser() {
      /* 下面的form表单数据已经被复制，所以能拿到id */
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      //1.关闭对话框
      this.dialogFormVisibleEdit = false;
      //2.更新视图
      this.getUserlist();
    },

    //显示编辑用户弹框(修改操作)
    //出发编辑按钮，dialogFormVisibleEdit设置为true即可打开对话框
    showEditUserDia(user) {
      //获取用户数据
      // console.log(user);
      this.form = user;

      this.dialogFormVisibleEdit = true;
    },

    //删除用户打开一个消息盒子(消息确认弹框)
    showDeleUserMsgDia(userId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          /* 发送删除的请求:id------->用户id
             1.data中找userId
             2.把userId以参数的showDeleUserMsgBox形式传进来
             3.注意；asyc卸载await最近函数的位置
           */
          const res = await this.$http.delete(`users/${userId}`);
          // console.log(res);

          if (res.data.meta.status === 200) {
            //删除后从第1页显示
            this.pagenum = 1;
            //更新视图
            this.getUserlist();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //添加用户---发送请求
    async addUser() {
      //2.关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(`users`, this.form);
      console.log(res);
      const {
        meta: { status, msg },
        data,
      } = res.data;

      if (status == 201) {
        //1.提示成功
        this.$message.success(msg);
        //3.更新数据列表
        this.getUserlist();
        //4.清空文本框
        this.form = {};
      } else {
        this.$$message.warning(msg);
      }

      //添加用户时获取当前系统的时间

      this.getdate();
    },

    //添加用户,点击让它显示为true,显示功能
    showAddUserDia() {
      //由于编辑用户时把from表单给改了，所以添加用户时要把数据清清除
      this.form = {};

      this.dialogFormVisibleAdd = true;
    },

    /* 搜索用户开始 */
    //按照input绑定的值query参数发送请求
    searchUser() {
      console.log("aaa");
      this.getUserlist();
    },

    /*清空搜索框，重新获取数据  */
    loadUserList() {
      this.getUserlist();
    },

    /* 搜索用户结束 */

    /* 分页方法开始 */
    handleSizeChange(val) {
      //当选择每页显示多少条数据时，触发这个方法，然后每次都给pagenum赋值为1,,
      //即每次选择第几页，pagenum都会重置，而不保留上一次的代码。
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

    //获取当前时间的方法
    // getdate() {
    //   const year = new Date().getFullYear();
    //   const mounth =
    //     new Date().getMonth() + 1 < 10
    //       ? "0" + (new Date().getMonth() + 1)
    //       : new Date().getMonth() + 1;
    //   const date =
    //     new Date().getDate() < 10
    //       ? "0" + new Date().getDate()
    //       : new Date().getDate();

    //   const hh = new Date().getHours();
    //   const mf =
    //     new Date().getMinutes() < 10
    //       ? "0" + new Date().getMinutes()
    //       : new Date().getMinutes();
    //   const ss =
    //     new Date().getSeconds() < 10
    //       ? "0" + new Date().getSeconds()
    //       : new Date().getSeconds();

    //   this.nowYear = year;
    //   this.nowMouth = mounth;
    //   this.nowDate = date;
    //   this.create_time =
    //     this.nowYear +
    //     "-" +
    //     this.nowMouth +
    //     "-" +
    //     this.nowDate +
    //     "-" +
    //     hh +
    //     ":" +
    //     mf +
    //     ":" +
    //     ss;
    //   console.log(this.create_time);
    // },
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
.el-pagination {
  margin-left: 230px;
}
</style>