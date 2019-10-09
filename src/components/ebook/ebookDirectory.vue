<template>
<transition name=opacity>
  <div class="directory-wraper" v-show="!showMeau && showSettingPanel === 3" >
      <div class="mask" @click="hide">
        <transition name='slide-left'>
          <div class="slide-content" @click.stop v-if="!showMeau && showSettingPanel === 3">
            <div class="header">
              <span class="icon el-icon-back" @click.stop="hide"></span>
              <span class="title" v-if="meta">{{meta.title}}</span>
            </div>
            <div class="tab">
              <div class="tab-item" :class="{selected:tab==0}" @click.stop="check(0)">目录</div>
              <div class="tab-item" :class="{selected:tab==1}" @click.stop="check(1)">标签</div>
              <!-- <div class="tab-item" :class="{selected:tab==2}" @click.stop="check(2)">笔记</div> -->
            </div>
            <div class="content" @click.stop>
                <component :is="selected"></component>
            </div>
          </div>
        </transition>
      </div>
  </div>
</transition>
</template>

<script>
import { ebook } from "../../utils/mixin";
import directory from "./ebookDirContent";
import ebookmark from "./ebookBookmark";
import bookNote from "./ebookNote";
import scroll from '../base/scroll'
export default {
  mixins: [ebook],
  components:{
    ebookmark,directory,scroll
  },
  data() {
    return {
      tab: 0,
      ebookmark,
      directory,
      bookNote,
      opitions:{
        probeType:2,
        scrollX:true,
        scrollY:false,
        snap:true,
        listenScroll:true,
      }
    };
  },
  methods: {
    hide() {
      this.showReaderMeau();
    },
    check(i) {
      this.tab=i
    },
    scroll(pos){
      console.log(pos)
    }
  },
  computed: {
    selected() {
      switch (this.tab) {
        case 0:
          return this.directory;
        case 1:
          return this.ebookmark;
        case 2:
          return this.bookNote;
        default:
          return this.directory;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.directory-wraper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(36, 36, 36, 0.13);
    .slide-content {
      width: 85%;
      height: 100%;
      background-color: #fff;
      position: relative;
      .header {
        height: 50px;
        background-color: rgb(214, 214, 214);
        display: flex;
        align-items: center;
        // justify-content: start;
        .icon {
          flex: 0 0 36px;
          line-height: 50px;
          width: 36px;
          text-align: center;
          font-size: 20px;
        }
        .title {
          font-size: 16px;
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 0 5px 0 0;
        }
      }
      .tab {
        height: 40px;
        background-color: rgb(214, 214, 214);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        .tab-item {
          flex: 0 0 50px;
          width: 80px;
          margin: 0 5px;
          text-align: center;
          line-height: 26px;
          &.selected {
            border-bottom: 2px solid rgb(32, 185, 231);
            color: rgb(32, 185, 231);
          }
        }
      }
      .content {
        position: absolute;
        top: 90px;
        bottom: 0;
        width: 100%;
        .row-wraper{
          width: 200%;
          height: 100%;
          display: flex;
          .item{
           flex: 1
          }
        }
      }
    }
  }
}
</style>