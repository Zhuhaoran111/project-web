<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
      <el-col> <el-button type="info" disabled>添加角色</el-button></el-col>
    </el-row>

    <!-- 2.表格 -->
    <!-- el-tag颜色  type="success"
          closable   关闭按钮
         <i class="el-icon-arrow-right"></i>添加按钮        
     -->

    <el-table height="500px" :data="rolelist" style="width: 100%">
      <el-table-column prop="date" type="expand" width="130">
        <template slot-scope="scope">
          <!--el-row表示一行,el-col表示一列
          element是每行el-row划分24个分栏
           -->
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <!-- 一级权限：调用该方法时，传角色id(scope.row.id)和权限id(item.id) -->
              <el-tag
                @close="deleRight(scope.row, item1.id)"
                closable
                type="warning"
                >{{ item1.authName }}</el-tag
              >
              <!-- 下面利用class加图标 -->
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- item1.children这个指的就是 与这个item1.authName同级-->
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <el-col :span="4">
                  <!-- 二级权限：调用该方法时，传角色id(scope.row.id)和权限id(item.id) -->
                  <el-tag
                    @close="deleRight(scope.row, item2.id)"
                    closable
                    type="success"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <el-col :span="20">
                  <!-- 三级权限：调用该方法时，传角色id(scope.row.id)和权限id(item.id) -->
                  <el-tag
                    @close="deleRight(scope.row, item3.id)"
                    closable
                    type="danger"
                    v-for="(item3, i) in item2.children"
                    :key="i"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 无权限提示,用v-if判断scope.row.children==0则表示数组为空 -->
          <span v-if="scope.row.children.length === 0" style="margin-left: 20px"
            >未分配权限</span
          >
        </template>
      </el-table-column>

      <el-table-column prop="date" type="index" label="序号" width="130">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="220">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="220">
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

          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showSetRightDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形结构 
      data----数据源[]
      show-checkbox----展示选择框
      node-key------每个结点的唯一标识，通常是data本项目中treelist数据源中的key名id
      default-expanded-keys ----默认展开[要展开的结点id]
      default-checked-keys-----要选中的节点的id
      props 配置项{label children}
      lable节点中的文字标题和children节点的子节点值都来源与data数据中绑定的数据源的key名'label'和'children'

       :default-expanded-keys="[2, 3]"  :default-expanded-keys="arrexpand"   可以用 default-expand-all默认展开所有的节点展开"
        :default-checked-keys="[5]"             
      -->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="arrcheck"
        default-expand-all
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      treelist: [],
      defaultProps: {
        label: "authName",
        children: "children",
      },
      arrexpand: [],
      arrcheck: [],
      currRoleId: -1,
    };
  },
  created() {
    this.getRolelist();
  },
  methods: {
    //修改权限发送请求
    //roleId：当前要修改的权限角色的id
    //rids 树形结点中所有全选和半选的label的id[]
    //获取全选的id的数据Arr1  获取方法：getCheckedKeys()
    //获取半选的id的数据Arr2  获取方法：getHalfCheckedKeys()
    //arr=arr1+arr2;

    /* vue中获取Dom元素el-tree ——> js方法getCheckedKeys */
    //1.给要操作的dom元素 设置ref属性  input ref="txt"
    //2.在js中this.$refs.ref属性值.js 方法名() 来调用方法this.$refs.txt.focus()

    async setRoleRight() {
      //获取全选的id的数据Arr1  获取方法：getCheckedKeys()
      let arr1 = this.$refs.tree.getCheckedKeys();
      //获取半选的id的数据Arr2  获取方法：getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys();

      //链接两个数组(ES6模块语法(展开运算符...数组或者对象)，忘记了？？？？？？？？？？？？？？？)
      //展开运算法[...arr1]===[1,2,3,...arr2]===[1,2,3,4,5,6]
      let arr = [...arr1, ...arr2];

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(","),
      });

      //更新视图(必须要更新)
      this.getRolelist();

      //关闭对话框
      this.dialogFormVisibleRight = false;
    },

    //修改分配角色----打开对话框
    async showSetRightDia(role) {
      console.log(role);
      //给currRoleId赋值,把列表中已经有的权限赋值给currRoleId
      this.currRoleId = role.id;
      //打开对话框，获取树形结构中的数据
      const res = await this.$http.get(`rights/tree`);

      this.treelist = res.data.data;

      /*  1-----------------------------------------------------------这是默认展开所有结点的id */
      //从 this.treelist和item1.children和item2.children寻找id
      // var arrtemp1 = [];
      // this.treelist.forEach((item1) => {
      //   arrtemp1.push(item1.id);
      //   item1.children.forEach((item2) => {
      //     arrtemp1.push(item2.id);
      //     item2.children.forEach((item3) => {
      //       arrtemp1.push(item3.id);
      //     });
      //   });
      // });
      // console.log(arrtemp1);
      //arrexpand拿到全部的id值 default-expanded-keys="arrexpand"，就会把树形结构的数据全部展开
      // this.arrexpand = arrtemp1;

      /* 2.这是把列表中展开的数据显示到对话框里面的列表中，所以就要获取当前角色 role的id */
      let arrtemp2 = [];
      role.children.forEach((item1) => {
        // arrtemp2.push(item1.id);
        item1.children.forEach((item2) => {
          // arrtemp2.push(item2.id);
          /* 放最里层的id值，外面的自动会被选中 */
          item2.children.forEach((item3) => {
            arrtemp2.push(item3.id);
          });
        });
      });
      console.log(arrtemp2);
      this.arrcheck = arrtemp2;

      this.dialogFormVisibleRight = true;
    },

    //取消权限
    async deleRight(role, rightId) {
      //roles/:roleId/rights/:rightId
      //roleId:当前角色的id
      //rightId 要删除权限的id
      //这边传输为什么要这么写？？？？？？？？？？？？？？？？？
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // console.log(res);
      //下面是改角色的剩余权限,这里的role.children就是最一级权限的children，只更新当前角色的权限,
      role.children = res.data.data;
      //删除成功，返回200和改角色的剩余权限(下面是重新整个渲染数据)
      // this.getRolelist();
    },

    async getRolelist() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      this.rolelist = res.data.data;
    },
  },
};
</script>

<style>
.addrolebtn {
  margin-top: 20px;
}
</style>