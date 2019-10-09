<template>
  <scroll class="bookmark-wraper">
    <ul>
      <li v-for="(v,i) in bookmark" :key="i" @click="turn(v.cfi)">
        <p class="result-text">{{v.locationText}}</p>
        <p class="desc">
          <span class="time">{{v.time}}</span>
          <span class="percent">{{v.percent}}%</span>
        </p>
      </li>
    </ul>
  </scroll>
</template>

<script>
import { ebook } from "../../utils/mixin";
import scroll from "../base/scroll";
export default {
  mixins: [ebook],
  components:{
      scroll
  },
  methods:{
      turn(cfi){
          this.display(cfi,()=>{
            this.showReaderMeau()
          })
      }
  }
};
</script>
<style lang='scss' scoped>
ul {
  li {
    height: 64px;
    margin: 5px 10px;
    border-bottom: 1px solid #ccc;
    .result-text {
      font-size: 14px;
      height: 40px;
      line-height: 20px;
      color: rgb(0, 0, 0);
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .desc{
        height: 24px;
        line-height: 24px;
        color: rgba(104, 104, 104, 0.911);
        font-size: 12px;
        .percent{
            margin-left: 8px;
        }
    }
  }
}
</style>