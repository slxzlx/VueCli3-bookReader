<template>
  <transition name="slide-up">
    <div class="setting-wraper" v-show="!showMeau && showSettingPanel === 1">
      <div class="top">
        <span class="el-icon-sunny icon"></span>
        <process class="process" />
      </div>
      <div class="middle">
        <div class="left">
          <span class="font">A</span>
          <el-input-number
            :min="min"
            :max="max"
            @change="setSize"
            v-model="num"
            :step="2"
            step-strictly
            size="mini"
          ></el-input-number>
        </div>
        <div class="right" @click="fontSet">
          <span class="text">{{fontFamily.text}}</span>
          <div class="more-wraper">
            <span class="el-icon-arrow-right more"></span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <bt-scroll ref="scroll" :opitions="obj">
          <ul class="theme-wraper" ref="sliderWraper">
            <li class="theme-item" v-for="(v,i) in themeList" :key="i" ref="themeItem">
              <div class="ball" :style='{background: v.style.body.background}' :class="{selected:v.name===colorTheme}" @click="selectTheme(v.name)">
                <span v-show="v.name===colorTheme" class="el-icon-check"></span>
              </div>
            </li>
          </ul>
        </bt-scroll>
      </div>
      <set-font ref="setFont" />
    </div>
  </transition>
</template>
<script>
import process from "cps/base/process";
import btScroll from "../base/scroll";
import { ebook } from "../../utils/mixin";
import setFont from "./ebookSetFont";
import {saveFontSize,saveFontFamily,saveColorTheme} from '../../utils/caches'
import {themes} from '../../utils/fontInfo'
export default {
  mixins: [ebook],
  data() {
    return {
      obj: {
        scrollX: true,
        scrollY: false,
        click:true
      },
      curSelected: -1,
      num: 5,
      min: 12,
      max: 40,
      themeList: themes
    };
  },
  mounted(){
    setTimeout(() => {
       this.num = this.fontSize
    }, 20);
    
  },
  methods: {
    setSize(font) {
      this.curBook.rendition.themes.fontSize(font);
      saveFontSize(this.bookName,font)
    },
    initSlider() {
      let width =
        this.themeList.length * this.$refs.sliderWraper.children[0].clientWidth;
      this.$refs.sliderWraper.style.width = width + "px";
      this.$refs.scroll.refresh();
    },
    selectTheme(v) {
      this.curBook.rendition.themes.select(v)
      this.set_colorTheme(v)
      saveColorTheme(this.bookName,v)
    },
    fontSet() {
      this.$refs.setFont.show();
    }
  },
  components: {
    btScroll,
    process,
    setFont
  },
  watch: {
    showSettingPanel(v) {
      if (v === 1 && !this.scroll) {
        this.$nextTick(() => {
          this.initSlider();
        });
      }
    }
  }
};
</script>
<style lang='scss' scope>
// @import '@/styles/mixin.scss';
.setting-wraper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  box-sizing: border-box;
  .top,
  .middle {
    height: 70px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top {
    .process {
      flex: 1;
      // padding: 0 20px
      margin-right: 40px;
    }
    .icon {
      flex: 0 0 60px;
      font-size: 32px;
      text-align: center;
    }
  }
  .middle {
    font-size: 20px;
    .font {
      margin: 0 12px;
    }
    .right {
      display: flex;
      align-items: center;
      .text {
        width: 150px;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .more-wraper {
        width: 38px;
        height: 70px;
        line-height: 70px;
        text-align: center;
      }
    }

    .el-input-number--mini {
      width: 120px;
      .el-input-number__increase,
      .el-input-number__decrease {
        height: 38px;
        line-height: 38px;
        font-size: 20px;
        width: 36px;
        background-color: #fff;
      }
      .el-input--mini {
        font-size: 20px;
        .el-input__inner {
          height: 40px;
        }
      }
    }
  }
  .bottom {
    height: 80px;
    width: 100%;
    .theme-wraper {
      height: 100%;
      .theme-item {
        height: 100%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        .ball {
          height: 60px;
          width: 60px;
          border-radius: 50%;
          background-color: #ccc;
          line-height: 60px;
          text-align: center;
          color:rgb(11, 146, 236);
          font-size: 24px;
          &.selected {
            border: 2px solid rgb(11, 146, 236);
          }
        }
      }
    }
  }
}
</style>
