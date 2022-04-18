<template>
  <!-- 卡片视图 -->
  <el-card>
    <!-- 面包屑导航区 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <!-- 2.搜索 ,一行显示，有许多列el-row，el-col,  clearable表示清除表单内容-->
    <el-row :gutter="20" class="searchRow">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getGoodsList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getGoodsList"
          ></el-button>
        </el-input>
      </el-col>
      <!--路由跳转 @click="$router.push({ name: 'goodsadd' })" -->
      <el-col :span="4">
        <el-button type="primary" @click="$router.push({ name: 'goodsadd' })"
          >添加商品</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="goodsList" border stripe class="goodstable">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column
        label="商品价格(元)"
        prop="goods_price"
        width="110px"
      ></el-table-column>
      <el-table-column
        label="商品重量"
        prop="goods_weight"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="商品数量"
        prop="goods_number"
        width="80px"
      ></el-table-column>
      <el-table-column label="创建时间" prop="add_time" width="140px">
        <template slot-scope="scope">{{
          scope.row.add_time | dataFormat
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="130px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeById(scope.row.goods_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 6, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 6,
      },
      // 商品列表
      goodsList: [],
      // 商品总数
      total: 0,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表失败！");
      }
      this.goodsList = res.data.goods;
      //   console.log(this.goodsList)
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.getGoodsList();
    },
    // 通过Id删除商品
    async removeById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除！");
      }
      const { data: res } = await this.$http.delete("goods/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除商品失败！");
      }
      this.$message.success("删除商品成功！");
      this.getGoodsList();
    },
    // goAddPage() {
    //   this.$router.push("/goods/goodsadd");
    // },
  },
};
</script>

<style>
.searchRow {
  margin-top: 20px;
}
.goodstable {
  margin-top: 10px;
}
</style>
