<template>
  <transition name="slide-up">
    <div class="setPro-wraper" v-show="!showMeau && showSettingPanel === 2">
      <div class="desc">
        <p class="directory">{{sectionTitle}}</p>
        <p class="process-info">{{curPercent | formatePercent}}%</p>
      </div>
      <div class="process-bottom">
        <div class="arrow el-icon-arrow-left" @click="prev"></div>
        <process @onChange="onChange" @onEnd="onEnd" class="process-bar" :percent="curPercent"></process>
        <div class="arrow el-icon-arrow-right" @click="next"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ebook } from "../../utils/mixin";
import process from "../base/process";
export default {
  mixins: [ebook],
  components: {
    process
  },
  filters:{
    formatePercent(v){
       if(v==0)  return 0
       else if (v==100) return 100
       else return v
    }
  },
  created(){
    this.canNext=true
  },
  methods: {
    onChange(v) {
      this.set_curPercent(v);
      this.set_section(this.curBook.section(this.curBook.locations.cfiFromPercentage(v / 100)).index)
    },
    onEnd(v) {
      this.jumpPage(v);
    },
    jumpPage(v) {
      let cfi = this.curBook.locations.cfiFromPercentage(v / 100);
      this.display(cfi)
    },

    prev() {
      if (this.section > 0 && this.canNext) {
        this.set_section(this.section - 1);
        this.displaySection();
      }
    },
    next() {    
      if (this.section < this.nav.length - 1 && this.canNext) {
        this.set_section(this.section + 1);
        this.displaySection();
      }
    },
    //跳转章节并刷新进度百分比
    displaySection() {
      this.canNext=false
      // let sectionInfo = this.curBook.section(this.section);
      // console.log(sectionInfo)
      let href =this.nav[this.section].href
      console.log(this.section)
      console.log(href)
      if (href) {
        this.display(href,()=>{
          this.canNext=true
        })
      }
    },
  },
  computed:{
    sectionTitle(){
       let sectionInfo = this.nav[this.section]
      if(sectionInfo && sectionInfo.label){
       
        // let sectionInfo = this.curBook.section(this.section
          //  return this.curBook.navigation.get(sectionInfo.href).label
          return sectionInfo.label
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.setPro-wraper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .desc {
    margin-bottom: 6px;
    max-width: 80%;
    background-color: rgba(15, 15, 15, 0.568);
    font-size: 16px;
    color: #fff;
    padding: 6px;
    border-radius: 4px;
    p {
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .process-bottom {
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    .arrow {
      flex: 0 0 50px;
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      display: inline-block;
    }
    .process-bar {
      flex: 1;
    }
  }
}
</style>
