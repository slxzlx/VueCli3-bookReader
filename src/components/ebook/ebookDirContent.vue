<template>
  <scroll ref="ss" class="content-wraper">
    <ul>
      <li @touchstart='touchstart(i)' @touchmove='touchmove(i)' @touchend='touchend(i)' v-for="(v,i) in nav" ref="item" :key="i" @click="turn(v.href)">
        <span class="text" v-html="v.label" :class="{highlight:i == section}"></span>
        <span class="count"></span>
      </li>
    </ul>
  </scroll>
</template>

<script>
import { ebook } from "../../utils/mixin";
import scroll from "../base/scroll";
export default {
  mixins: [ebook],
  components: {
    scroll
  },
  methods: {
    turn(href) {
      this.display(href,()=>{
          this.showReaderMeau()
      });
    },
    touchstart(i){
      this.$refs.item[i].style.background = '#ccc'  
    },
    touchmove(i){
        // this.$refs.item[i].style.background = '#fff'  
    },
    touchend(i){
        this.$refs.item[i].style.background = '#fff'
    }
  },
  watch: {
    section(v) {
      //   if(!showMeau && showSettingPanel === 3)
      console.log("??");
      this.$refs.ss.scrollTo(this.$refs.item[v], 100);
    }
  }
};
</script>

<style lang='scss' scoped>
ul {
  li {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(211, 211, 211, 0.486);
    font-size: 18px;
    .text {
      flex: 1;
      padding: 0 8px;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      //    word-wrap: break-word;
      word-break: break-all;
      &.highlight {
        color: rgb(32, 185, 231);
      }
    }
    .count {
      flex: 0 0 38px;
    }
  }
}
</style>