<template>
  <el-card>
    <!-- 1、面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- 封装好的面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <!-- 2、表格 -->
    <!-- 给el-table加一个height高度,固定表头 -->
    <el-table
      height="500"
      :data="rightlist"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="index" prop="date" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightlist: [],
    };
  },
  created() {
    this.getRightlist();
  },
  methods: {
    async getRightlist() {
      const res = await this.$http.get(`rights/list`);
      console.log(res);
      this.rightlist = res.data.data;
    },
  },
};
</script>

<style>
</style>