<template>
  <div class="process-wraper">
    <div class="bg-bar" ref="bgbar" @click="barClick">
      <div class="cur-bar" ref="curbar">
        <div
          class="btn-wraper"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <div class="btn" ref="btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      TempPercent: this.percent
    };
  },
  props: {
    percent: {
      type: String,
      default: "-1"
    }
  },
  methods: {
    changeWidth(present) {
      let persent = Math.floor(present);
      this.$refs.curbar.style.width = persent + "%";
    },
    touchstart(e) {
      this.$refs.btn.classList.add("scale");
      this.startX = e.touches[0].clientX;
      this.curWidth = this.$refs.curbar.clientWidth;
    },
    touchmove(e) {
      let offsetX = e.touches[0].clientX - this.startX;
      this.setPercent(this.curWidth + offsetX);
      if (this.TempPercent >= 0 && this.TempPercent <= 100)
        this.Change(this.TempPercent);
    },
    touchend() {
      this.$refs.btn.classList.remove("scale");
      this.End(this.TempPercent);
    },
    barClick(e) {
      let barLeft = this.$refs.bgbar.getBoundingClientRect().left;
      this.setPercent(e.clientX - barLeft);
      this.End(this.TempPercent);
    },
    setPercent(barWidth) {
      let needWidth = Math.max(
        0,
        Math.min(barWidth, this.$refs.bgbar.clientWidth)
      );
      this.TempPercent =((needWidth / this.$refs.bgbar.clientWidth) * 100).toFixed(2)
    },
    Change(v) {
      this.$emit("onChange", v);
    },
    End(v) {
      this.$emit("onEnd", v);
    }
  },
  watch: {
    TempPercent(v) {
      this.changeWidth(v);
    },
    percent(v) {
      if(v<0)
        return
      this.TempPercent = v;
    }
  }
};
</script>
<style lang='scss' scoped>
.process-wraper {
  .bg-bar {
    height: 4px;
    background-color: #ccc;
    position: relative;
    .cur-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 200px;
      background-color: #16af49;
      .btn-wraper {
        float: right;
        width: 40px;
        height: 40px;
        transform: translate(50%, -18px);
        .btn {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 4px solid #16af49;
          position: relative;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .scale {
          transform: translate(-50%, -50%) scale(1.1);
          transition: transform 0.3s;
        }
      }
    }
  }
}
</style>
