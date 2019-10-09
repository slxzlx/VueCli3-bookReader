<template>
  <div class="shelf-container">
    <shelf-header />
    <div class="scroll-wraper">
      <scroll :opitions="opitions" class="bt-scroll" ref='btscroll' @scrollVal="scroll" @pullingDown="pullingDown">
        <div class="content-wraper" ref="content-wraper">
          <top-fresh :offsetY="offsetY" :isLoading='isLoading'  ref='topfresh' />
          <read-time />
          <hot-recommend />
          <book
            ref="bookshelf"
            @longClick="longClick"
            @isAllChecked="isAllChecked"
            @checkedCount="checkedCount"
          />
        </div>
      </scroll>
    </div>
    <div class="footer-control" v-show="controlVisible">
      <div class="item" :class="{disabled:checkCount!=1}" @click="top">
        <span class="icon el-icon-upload2"></span>
        <p class="desc">置顶</p>
      </div>
      <div class="item" @click="deleteBook" :class="{disabled:checkCount==0}">
        <span class="icon el-icon-delete-solid"></span>
        <p class="desc">删除</p>
      </div>
      <div class="item" @click="toggleSelect">
        <span class="icon el-icon-copy-document"></span>
        <p class="desc">{{isAll?'取消全选':'全选'}}</p>
      </div>
    </div>
    <div class="header-control" v-show="controlVisible">
      <span class="icon el-icon-close" @click="closeControl"></span>
      <span class="desc">已选择{{checkCount}}项</span>
    </div>
    <!-- <flap-card/> -->
  </div>
</template>
<script>
import scroll from "cps/base/scroll";
import topFresh from "cps/base/topfresh";
import shelfHeader from "cps/shelf/shelfHeader";
import readTime from "cps/shelf/shelfReadTime";
import hotRecommend from "cps/shelf/shelfHotRecommend";
import book from "cps/shelf/shelfBook";
import { mapMutations } from "vuex";
import { Dialog } from "vant";
import flapCard from 'cps/shelf/flapCard/flapCard'
export default {
  components: {
    scroll,
    shelfHeader,
    readTime,
    hotRecommend,
    book,
    topFresh,
    flapCard
  },
  data() {
    return {
      opitions: {
        probeType: 2,
        listenScroll: true,
        pullDownRefresh:{
          threshold:70,
          stop:60
        }
      },
      isLoading:false,
      offsetY: 0,
      controlVisible: false,
      isAll: false,
      checkCount: 0,
      checked: false
    };
  },
  methods: {
    ...mapMutations(["set_appFooterVisible"]),
    closeControl() {
      this.controlVisible = false;
      this.$refs.bookshelf.closeCheck();
      this.set_appFooterVisible(true);
    },
    longClick() {
      this.set_appFooterVisible(false);
      this.controlVisible = true;
    },
    isAllChecked(v) {
      this.isAll = v;
    },
    checkedCount(v) {
      this.checkCount = v;
    },
    top() {
      if (this.checkCount != 1) return;
      this.$refs.bookshelf.toTop();
    },
    deleteBook() {
      if (this.checkCount == 0) return;
      Dialog.confirm({ title: "是否删除选中的书？" }).then(() => {
        this.$refs.bookshelf.deleteItem();
      });
    },
    toggleSelect() {
      this.$refs.bookshelf.toggleCheckAll();
    },
    pullingDown(){
      this.isLoading=true
      setTimeout(() => {
        this.isLoading = false;
        this.$refs.btscroll.finishPullDown()
      }, 1000);
    },
    scroll(y){
      this.offsetY=y
    }
  }
};
</script>
<style lang='scss' >
.van-dialog {
  top: '';
  bottom: 0;
}
@import "styles/variable.scss";
.shelf-container {
  height: 100%;
  width: 100%;
  .scroll-wraper {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    .content-wraper {
      // overflow: hidden;
      padding-top: 10px;
      background-color: #fff;
      position: relative;
    }
  }
  .footer-control {
    height: 46px;
    background-color: $bgcolor;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .item {
      flex: 1;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: $fontcolor;
      &.disabled {
        color: $fontcolorG;
      }
      .icon {
        font-size: 22px;
      }
      .desc {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
  .header-control {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 46px;
    background-color: $bgcolor;
    z-index: 11;
    .icon {
      flex: 0 0 50px;
      font-size: 26px;
      line-height: 30px;
      text-align: center;
    }
    .desc {
      font-size: 16px;
    }
  }
}
</style>