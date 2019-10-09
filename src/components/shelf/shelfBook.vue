<template>
  <div class="shelf-book-container">
    <ul>
      <li
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        v-for="(item,index) in bookList"
        :key="item.id"
      >
        <div class="cover">
          <img :src="item.img" />
        </div>
        <div class="info" :index="index">
          <div class="left">
            <p class="bookname">{{item.bookName}}</p>
            <p class="location">{{item.readLocation}}</p>
          </div>
          <div class="right">
            <p class="operate">加入</p>
            <p class="time">{{item.addTime}}</p>
          </div>
          <div class="check-area" v-show="controlVisible">
            <!-- <div class="check-wraper" @click="item.checked=!item.checked"> -->
              <!-- <div class="border"  v-show="!item.checked"></div> -->
               <van-checkbox v-model="item.checked" :icon-size=24 checked-color='red'></van-checkbox>
              <!-- <span class="icon el-icon-success" v-show="item.checked"></span> -->
            <!-- </div> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      bookList: [
        {
          id: 0,
          img: require("./Cover.jpg"),
          bookName: "语文",
          readLocation: "岁月如歌——我的初中生活",
          addTime: "24小时前",
          checked: false
        },
        {
          id: 1,
          img: require("./Cover.jpg"),
          bookName:
            "大夫撒地方撒飞机阿里觉得分厘卡决定离开房间啊是独立开发就阿拉山口疯狂拉升大家阀手动阀手动旦",
          readLocation:
            "大是否就阿拉山口的解放立刻世界的分厘卡对方卢卡斯角度来看就神的撒旦",
          addTime: "撒旦发射点",
          checked: false
        },
        {
          id: 2,
          img: require("./Cover.jpg"),
          bookName: "",
          readLocation: "",
          addTime: "",
          checked: false
        },
        // {
        //   id: 3,
        //   img: require("./Cover.jpg"),
        //   bookName: "",
        //   readLocation: "",
        //   addTime: "",
        //   checked: false
        // },
        // {
        //   id: 4,
        //   img: require("./Cover.jpg"),
        //   bookName: "",
        //   readLocation: "",
        //   addTime: "",
        //   checked: false
        // },
        // {
        //   id: 5,
        //   img: require("./Cover.jpg"),
        //   bookName: "",
        //   readLocation: "",
        //   addTime: "",
        //   checked: false
        // },
        // {
        //   id: 6,
        //   img: require("./Cover.jpg"),
        //   bookName: "",
        //   readLocation: "",
        //   addTime: "",
        //   checked: false
        // },
        // {
        //   id: 7,
        //   img: require("./Cover.jpg"),
        //   bookName: "",
        //   readLocation: "",
        //   addTime: "",
        //   checked: false
        // }
      ],
      controlVisible: false,
      checked:false
    };
  },
  computed: {
    isAllChecked() {
      return this.bookList.every(i => i.checked == true);
    },
    checkedCount() {
      return this.bookList.reduce((pre, item) => {
        item.checked ? pre++ : pre;
        return pre;
      }, 0);
    }
  },
  watch: {
    isAllChecked(v) {
      this.$emit("isAllChecked", v);
    },
    checkedCount(v) {
      this.$emit("checkedCount", v);
      // this.$parent.checkCount=v
      // console.log(this.$parent)
    }
  },
  methods: {
    ...mapMutations(["set_appFooterVisible"]),
    closeCheck() {
      this.controlVisible = false;
    },
    toggleCheckAll() {
      let what = !this.isAllChecked;
      this.bookList.forEach(i => {
        i.checked = what;
      });
    },
    closeControl() {
      this.controlVisible = false;
      this.set_appFooterVisible(true);
    },
    toTop() {
      if (this.checkedCount != 1) return;
      let _list = this.bookList;
      let index = _list.findIndex(i => i.checked === true);
      let item = _list.splice(index, 1);
      item[0].checked = false;
      _list.unshift(item[0]);
    },
    deleteItem() {
      for (let i = 0; i < this.bookList.length; i++) {
        if (this.bookList[i].checked) {
          this.bookList.splice(i, 1);
          i--;
        }
      }
    },
    showControl(e) {
      if (this.controlVisible) return;
      this.$emit("longClick");
      this.controlVisible = true;
      console.log(e);
      console.log(e.target);
    },
    touchstart(e) {
      this.longClick = false;
      this.startX = e.targetTouches[0].clientX;
      this.startY = e.targetTouches[0].clientY;
      this.timeOutEvent = setTimeout(() => {
        this.longClick = true;
        this.showControl(e);
      }, 500);
    },
    touchmove(e) {
      let offsetY = Math.abs(e.targetTouches[0].clientY - this.startY);
      if (offsetY > 8) {
        clearTimeout(this.timeOutEvent);
        this.timeOutEvent = -1;
      }
    },
    touchend() {
      clearTimeout(this.timeOutEvent);
      if (!this.longClick && this.timeOutEvent != -1) {
        //单击事件
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "styles/variable.scss";
.shelf-book-container {
  ul {
    margin: 0 10px;
    overflow: hidden;
    li {
      display: flex;
      height: 92px;
      .cover {
        flex: 0 0 60px;
        img {
          width: 100%;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
      .info {
        flex: 1;
        margin-left: 10px;
        border-bottom: 1px solid #ccc;
        // font-size: 14px;
        line-height: 18px;
        overflow: hidden;
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          overflow: hidden;
          p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .bookname {
            color: $fontcolor;
            font-size: 16px;
          }
          .location {
            color: $fontcolorG;
            font-size: 12px;
          }
        }
        .right {
          flex: 0 0 50px;
          font-size: 12px;
          text-align: right;
          color: $fontcolorG;
        }
        .check-area {
          flex: 0 0 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 38px;
          .check-wraper {
            position: relative;
            height: 46px;
            .border,
            .icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
            .icon {
              font-size: 32px;
              color: hotpink;
            }
            .border {
              width: 26px;
              height: 26px;
              border-radius: 50%;
              border: 1px solid $fontcolorG;
            }
          }
        }
      }
    }
  }
}
</style>