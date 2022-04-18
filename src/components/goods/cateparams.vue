<template>
  <el-card>
    <!-- 1、面包屑 -->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>

    <!-- 2、提示 -->
    <el-alert class="setparams" title="只允许为第三级分类设置参数" type="error">
    </el-alert>

    <!-- 3、级联选择器
    el-form-item单独使用可能会报错，所以最外层套一个el-form
     -->
    <el-form label-position="left" label-width="80px" style="margin-top: 10px">
      <el-form-item label="商品分类">
        <!-- 级联选择器 
            1、expand-trigger="hover" 表示触发条件,这里默认是鼠标滑过
            2、v-model="selectedOptions" 最终选择的lable对应的value值会在selectedOptions数组中[1,3,6]
            3、:props="{label:'label",value:'id',children:'children'}"这个后面的label就是defaultProp里面的label
            4、 @change选择改变时触发
            5、 clearable清除级联选择器里面的内容
            6、:show-all-levels="false"只显示最后一级
            -->
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          v-model="selectedOptions"
          :options="options"
          :props="defaultProp"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <!-- 4、tabs栏 -->
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <!-- 1、按钮 -->
        <el-button type="danger">设置动态参数</el-button>
        <!-- 2、表格 -->

        <el-table :data="arrDyparams" style="width: 100%">
          <el-table-column type="expand" label="序号">
            <template slot-scope="scope">
              <!-- 这里面有许多el-tag -->
              <el-tag></el-tag>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="操作" prop="name">
            <!-- 按钮 -->
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
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      //级联选择器绑定的数据
      options: [],

      //默认显示[1,3,6]的数据
      selectedOptions: [1, 3, 6],

      /* 这里怎么理解 */
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      //获取动态参数的数组
      arrDyparams: [],
      active: "1",

      //表格中的数据
      list: [],
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    //tab切换时
    handleClick() {},

    //级联选择器改变
    async handleChange() {
      //如果数组的长度为3即有选择了三级选择器就获取动态参数

      if (this.selectedOptions.length === 3) {
        //获取动态参数
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;

        this.arrDyparams.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
          // }
        });
        console.log("下面是获取动态参数的数据");
        console.log(this.arrDyparams);
      }
    },

    //获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      console.log("下面打印的数三级分类的数据");
      console.log(res);
      this.options = res.data.data;
    },
  },
};
</script>

<style>
.setparams {
  margin-top: 20px;
}
</style>