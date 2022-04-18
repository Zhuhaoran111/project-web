<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <!-- 提示el-alert -->
    <el-alert
      class="alert"
      title="添加商品信息"
      center
      type="success"
      show-icon
    >
    </el-alert>

    <!-- 3、步骤条 -->
    <!--  :active="abc"  如果abc的值是2表示当前的第几步 -->
    <!-- 这里强转为数字 :active="1 * active"-->
    <el-steps
      :active="1 * active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 4、tabs标签 -->
    <!-- 其中label标签是左边的tabs栏，右边的是点击左边而显示的值 
    这里绑定了v-model的值，就是选项卡中name的值，当点击哪个tab时候对应的actice值就是多少
    当点击第4个，active中的值就是4，所以上面绑定的active的值就是4，就是显示第四步商品图片
    
    -->

    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height: 500px; overflow: auto"
    >
      <!-- @tab-click tab改变时触发-->
      <el-tabs v-model="active" tab-position="left" @tab-click="tabChange">
        <el-tab-pane name="1" label="基本信息">
          <!-- 1、基本信息里面表单数据 -->

          <el-form-item label="商品名称" style="margin-top: 5px">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <!-- 级联选择器 
            1、expand-trigger="hover" 表示触发条件,这里默认是鼠标滑过
            2、v-model="selectedOptions" 最终选择的lable对应的value值会在selectedOptions数组中[1,3,6]
            3、:props="{label:'label",value:'id',children:'children'}"这个后面的label就是defaultProp里面的label
            4、 @change选择改变时触发
            5、 clearable清除级联选择器里面的内容
            -->
            <el-cascader
              clearable
              expand-trigger="hover"
              v-model="selectedOptions"
              :options="options"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          <!-- 2、显示该三级分类的商品参数 -->

          <!-- item1是每个数组对象 -->
          <el-form-item
            :label="item1.attr_name"
            :key="i"
            v-for="(item1, i) in arrDyparams"
          >
            <!-- 复选框组 el-checkbox中加  border表示复选框外层套一个边框-->
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox
                border
                :label="item2"
                v-for="(item2, i) in item1.attr_vals"
                :key="i"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <!-- 3、静态参数的数据 -->
          <!-- item.atrr_name其中的label值就是就饿会死每个对象的attr_name
           v-for="(item, i) in arrStaticparams"注意这里的i别挨着括号太近，会报错-----细节
           -->
          <el-form-item
            :label="item.attr_name"
            v-for="(item, i) in arrStaticparams"
            :key="i"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <!-- 4、上传图片 
            1、action：全路径
            2、headers:头部
            3、:on-remove="移除触发的方法"
            4、:on-preview="handlePreview"
            5、 list-type上传的类型
            -->
            <!-- baseUrl axios发的请求 -->
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <!-- 这里面最外层都要包裹一个el-form-item -->
          <el-form-item style="margin-top: 5px">
            <!-- 表单元素 -->
            <el-button type="primary" @click="addGoods()"
              >点我-添加商品</el-button
            >
            <!-- 富文本编辑器 -->
            <quill-editor
              style="margin-top: 5px"
              v-model="form.goods_introduce"
            ></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
/* 引入富文本编辑器 
引入地址:https://www.npmjs.com/package/vue-quill-editor
1、npm install vue-quill-editor --save先安装插件
2、引入import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
  components: {
    quillEditor,
  },    注册引入组件
3、在组件中 <quill-editor></quill-editor>即可显示富文本编辑器
*/
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      //下面这行及其重要，没有会报错
      //下面数组中放的是打勾的label值，而label就是来自与item1.attr_vals,
      // checkList: ["选中且禁用", "复选框 A"],
      active: "1",

      //添加商品的表单数据
      //attrs 商品的参数
      //动态参数和静态参数->数组
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",

        goods_cat: "",
        pics: [],
        attrs: [],
      },
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
      //动态参数的数据数组
      arrDyparams: [],
      //静态参数的数据数组
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    //添加商品发送请求
    async addGoods() {
      //1、goods_cat==>分类
      this.form.goods_cat = this.selectedOptions.join(",");

      //2、pics在上传和哟出图片时进行赋值和删除[].findIndex

      //在发送请求之前，处理this.form中未处理的数据
      const res = await this.$http.post(`goods`, this.form);
      console.log(res);
    },

    //图片上传用到的方法
    //file形参里面的是当前操作的图片的相关信息(图片名/图片路径)
    //1、预览的时候调用
    handlePreview(file) {},

    //2.点击叉号的时候调用
    handleRemove(file) {
      //file.response.data.tmp_path
      console.log("移除");
      console.log(file);

      //对this.form.pics 移除当前点击叉掉的图片
      //1、先获取该的索引
      //2、findIndex(item=>{})遍历 数组自带的方法，把符合条件的索引进行返回
      //3、[{pic:图片路径}，{pic:图片路径2}]
      let Index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path;
      });
      this.form.pics.splice(Index, 1);
      console.log(this.form.pics);
    },

    //3.上传成功触发
    handleSuccess(file) {
      //file.data.tmp_path  图片临时上传的路径
      console.log("上传成功");
      console.log(file);
      //给this.form.pics
      this.form.pics.push({
        pic: file.data.tmp_path,
      });
    },

    //级联选择器 @change触发的方法
    handleChange() {},

    //获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      console.log("下面打印的数三级分类的数据");
      console.log(res);
      this.options = res.data.data;
    },

    //点击不同的tab值触发该方法
    async tabChange() {
      //如果点击的是第二个tab才会触发，三级分类要要有值，没值要提示
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          //提示必须要有三级分类
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        //获取数据
        //id->分类id
        //sel=many获取的是动态参数的数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        //下面的是获取商品参数的信息
        console.log("下面的是获取商品参数的信息");
        console.log(res);
        this.arrDyparams = res.data.data;
        //因为后台传过来的是字符串，所以要转换成数字和对象，把this.arrDyparams数组中的
        //每个对象.attr_vals字符串->数组->v-for遍历
        this.arrDyparams.forEach((item) => {
          //并不是所有的三级分类都有动态参数
          // if (item.attr_vals.length !== 0) {
          //trim去掉字符串两边的空格，split(",")转换成数组
          //为了防止遍历空字符串会报错，所以遍历字符串不会报错
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
          // }
        });
      } else if (this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          //提示必须要有三级分类
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        //代码走到这里，表示有三级分类，获取静态参数的数据
        /* sel=only表示获取静态参数 */
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        console.log("下面是获取静态参数的数据");
        console.log(res);
        this.arrStaticparams = res.data.data;
      }
    },
  },
};
</script>

<style>
.alert {
  margin-top: 20px;
}
.ql-editor {
  min-height: 300px;
}
</style>