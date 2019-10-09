<template>
  <div class="good-show-panel-container">
    <div class="top-header">
      <div class="left">
        <div class="desc">
          <p class="title">{{title}}</p>
          <p class="sub-title">{{subTitle}}</p>
        </div>
        <div class="extra">
           <slot></slot>
        </div>
      </div>   
      <div class="right">
        <span class="text">{{text}}</span>
        <span class="more-icon el-icon-arrow-right" v-show="icon"></span>
      </div>
    </div>
    <div class="content-show">
      <div class="item">
        <img width="100%" src="../shelf/Cover.jpg" />
        <p class="desc">全职高手</p>
        <p class="sub-desc">至尊特工</p>
      </div>
      <div class="item">
        <img width="100%" src="../shelf/Cover.jpg" />
        <p class="desc">全职高手</p>
        <p class="sub-desc"></p>
      </div>
      <div class="item">
        <img width="100%" src="../shelf/Cover.jpg" />
        <p class="desc">全职高手</p>
        <p class="sub-desc">手动阀手动阀手动阀手动阀手动阀手动阀撒旦</p>
      </div>
    </div>
  </div>
</template>
<script>
import { deflate } from "zlib";
export default {
  props: {
    title: String,
    subTitle: String,
    text: {
      type: String,
      default: "查看更多"
    },
    icon: {
      type: Boolean,
      default: true
    },
    contentData:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "styles/variable.scss";
.good-show-panel-container {
  margin-top: 30px;
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:0 10px;
    font-size: 12px;
    line-height: 16px;
    color: $fontcolorG;
    .left {
      flex:1;
      display: flex;
      align-items: center;
      .title {
        color: $fontcolor;
        font-size: 14px;
      }
      .extra{
        margin-left: 10px;
      }
    }
    .right {
      flex: 0 0 100px;
      text-align: right;
      .more-icon {
        font-size: 14px;
      }
    }
  }
  .content-show {
    display: flex;
    margin: 10px;
    .item {
      flex: 1;
      padding: 0 5px;
      font-size: 12px;
      color: $fontcolor;
      line-height: 14px;
      overflow: hidden;
      .desc,.sub-desc{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
      .sub-desc{
        color:$fontcolorG;
        font-size: 10px;
      }
    }
  }
}
</style>