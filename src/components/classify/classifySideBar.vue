<template>
  <div class="side-bar-comtainer">
    <van-sidebar v-model="activeKey" @change="change">
      <van-sidebar-item title="标签名称"></van-sidebar-item>
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
    <div class="book-scroll-wraper">
      <scroll>
        <div class="book-content-wraper" >
          <div class="book-content-item" v-for="v in 20" :key="v">
            <img src="../shelf/Cover.jpg" class="book-image" />
            <span class="book-desc">sdfsdfsd</span>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Sidebar, SidebarItem } from "vant";
import scroll from "../base/scroll";

Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {
  data() {
    return {
      activeKey: 0
    };
  },
  components: {
    scroll
  },
  methods: {
    change(i) {
      console.log(i);
    }
  }
};
</script>
<style lang='scss' scoped>
.side-bar-comtainer {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
}
.book-scroll-wraper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 85px;
  right: 0;
  .book-content-wraper {
    padding: 8px;
    overflow: hidden;
    .book-content-item {
      width: 50%;
      float: left;
      display: flex;
      align-items: center;
      font-size: 0;
      padding: 5px 0;
      .book-image {
        width: 50%;
      }
      .book-desc {
        font-size: 16px;
      }
    }
  }
}
</style>