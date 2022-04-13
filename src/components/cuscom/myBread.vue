
<template>
  <!-- 下面的代码进行面包屑的封装 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ level1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ level2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "my-bread",
  data() {
    return {
      // level1:"",
      // level2:"",
    };
  },
  //props  值是字符串数组
  //props中的值的用法和data数据用法一样
  //props中的数据的值来源使用组件传的值
  //props中的数据也是该组件的属性，
  props: ["level1", "level2"],
};
</script>

<style>
</style>