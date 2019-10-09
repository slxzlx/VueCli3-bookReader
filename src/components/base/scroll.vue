<template>
  <div ref="wraper" class="wraper" @touchstart='touchstart' @touchmove="touchmove" @touchend="touchend">
    <slot></slot>
  </div>
</template>

<script>
import bscroll from "better-scroll";
import { match } from "minimatch";
// import bscroll from "../../../node_modules/iscroll/build/iscroll-probe.js";
export default {
  props: {
    opitions: {
      type: Object,
      default() {
        return {};
      }
    },
    pullDownRefresh: {
      type: [Boolean, Object],
      default: false
    },
    moveY: Number
  },
  data() {
    return {
      maxY: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 30);
  },
  computed: {
    freeze() {
      return this.scroll.maxScrollY === 0;
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wraper) return;
      this.scroll = new bscroll(this.$refs.wraper, {
        probeType: this.opitions.probeType || 0,
        scrollX: this.opitions.scrollX || false,
        scrollY: this.opitions.scrollY || true,
        click: this.opitions.click || true,
        snap: this.opitions.snap || false,
        pullDownRefresh: this.opitions.pullDownRefresh || false,
        pullUpLoad: this.opitions.PullUpLoad || false
      });
      // this.maxY = this.scroll.maxScrollY;
      if (this.opitions.listenScroll) {
        this.scroll.on("scroll", pos => {
          // console.log(this.scroll.y,this.scroll.maxScrollY,pos)
          this.$emit("scrollVal", pos.y);
        });
      }
      if (this.opitions.onScrollEnd) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y < this.scroll.maxScrollY + 50) {
            this.$emit("onScrollend");
          }
        });
      }
      if (this.opitions.pullDownRefresh) {
        this.scroll.on("pullingDown", () => {
          this.$emit("pullingDown");
        });
      }
      if (this.opitions.pullUpLoad) {
        this.scroll.on("pullUpLoad", () => {
          this.$emit("pullUpLoad");
        });
      }
    },
    refresh() {
      if (this.scroll) {
        this.scroll.refresh();
        // this.maxY = this.scroll.maxScrollY;
      }
    },
    scrollTo(el, time) {
      this.scroll.scrollToElement(el, time);
    },
    finishPullDown() {
      if (!this.freeze) {
        this.scroll.finishPullDown();
      } else {
        let slideDom = this.$refs.wraper.firstChild;
        slideDom.style.transform = "translate3d(0,0,0)";
        slideDom.style.transition = "all .3s";
      }
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    touchstart(){
        let slideDom = this.$refs.wraper.firstChild;
        slideDom.style.transition = "";
    },
    //当子元素的高度不够父容器导致scroll组件无法滑动的时候
    touchmove(e) {
      if (this.opitions.pullDownRefresh && this.freeze) {
        if (!this.startY) this.startY = e.touches[0].clientY;
        this.offsetY = Math.round(e.touches[0].clientY - this.startY) / 3;
        if (this.offsetY <= 0) {
          return;
        }
        // offsetY = offsetY < 100 ? offsetY : 100;
        //让实际滑动距离减半 手感比较好
        let slideDom = this.$refs.wraper.firstChild;
        slideDom.style.transform = `translate3d(0,${this.offsetY}px,0)`;
        //将移动的距离派发出去
        this.$emit("scrollVal", this.offsetY);
        e.preventDefault();
        e.stopPropagation();
      }
    },
    touchend(e) {
      if (this.opitions.pullDownRefresh && this.freeze) {
        let slideDom = this.$refs.wraper.firstChild;
        if (this.offsetY < this.opitions.pullDownRefresh.threshold) {
          slideDom.style.transform = "translate3d(0,0,0)";
          slideDom.style.transition = "all .5s";
        } else {
          slideDom.style.transform = `translate3d(0,${this.opitions.pullDownRefresh.stop}px,0)`;
          slideDom.style.transition = "all .4s";
          this.$emit("pullingDown");
        }
        this.startY = 0;
        e.preventDefault();
        // e.stopPropagation();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wraper {
  height: 100%;
  overflow: hidden;
}
</style>