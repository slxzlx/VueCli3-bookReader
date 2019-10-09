<template>
  <div class="set-font-wraper">
    <div class="title">
      <div class="back" @click="hide">
        <span class="el-icon-back"></span>
      </div>
      <span class="text">{{title}}</span>
    </div>
    <div class="list">
      <bt-scroll>
        <dl>
          <dd class='item' v-for="(v,i) in dataList" :key="i" @click='click(v,i)'>
            <span class="text" :style="{'font-family':v.fontVal ||''}">{{v.text}}</span>
            <span class="check el-icon-check" v-show='checkIndex===i'></span> 
          </dd>
        </dl>
      </bt-scroll>
    </div>
  </div>
</template>
<script>
import btScroll from "../base/scroll";
export default {
  data() {
    return {
      visible: false,
      checkIndex:0
    };
  },
  props: {
    title: {
      type: String,
      default: "列表"
    },
    dataList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    show() {
      // this.visible = true;
    },
    hide() {
      // this.visible = false;
      this.$emit('hide')
    },
    click(v,i){
       this.checkIndex=i
       this.$emit('checkItem',v)
    },
    setChecked(i){
       this.checkIndex = i
    }
  },
  components:{
      btScroll
  }
};
</script>
<style lang='scss' scoped>
.set-font-wraper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 20;
  .title {
    height: 50px;
    background-color: rgb(236, 236, 236);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .back {
      display: inline-block;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 20px; 
    }
    .text {
      line-height: 50px;
      font-size: 22px;
    }
  }
  .list {
    height: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    dd{
      height: 50px;
      line-height: 50px;
      margin: 0 10px;
      border-bottom: 1px solid #ccc;
      &:last-child{
          border: none
      }
      .text {
        font-size: 24px;
      }
      .check {
        float: right;
        font-size: 18px;
        line-height: 50px;
        margin-right: 10px;
      }
    }
  }
}
</style>
