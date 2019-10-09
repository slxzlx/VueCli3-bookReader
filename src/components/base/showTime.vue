<template>
  <div class="show-time-container">
    <div class="item">
      <span>{{hours|formateNum(2)}}</span>
    </div>
    <span class="maohao">:</span>
    <div class="item">
      <span>{{minutes|formateNum(2)}}</span>
    </div>
    <span class="maohao">:</span>
    <div class="item">
      <span>{{secends|formateNum(2)}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalTime: {
      type: Number,
      default: 5470
    }
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      secends: 0
    };
  },
  mounted() {
    this.startGo()
  },
  filters: {
    formateNum(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    }
  },
  methods: {
    formateTime(time) {
      this.hours = Math.floor(time / 3600);
      this.minutes = Math.floor((time % 3600) / 60);
      this.secends = time - 3600 * this.hours - 60 * this.minutes;
    },
    startGo() {
      let _time = this.totalTime;
      let id = setInterval(() => {
        if (_time > 0) {
          _time--;
          this.formateTime(_time);
        } else {
          clearInterval(id);
        }
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.show-time-container {
  display: flex;
  align-items: center;
//   position: absolute;
  .item {
    // display: inline-block;
    width: 14px;
    height: 18px;
    background-color: rgb(29, 29, 29);
    font-size: 10px;
    color: #fff;
    line-height: 18px;
    // vertical-align: top;
  }
  .maohao {
    // vertical-align: top;
    // display: inline-block;
    line-height: 18px;
    text-align: center;
    font-size: 16px;
    width: 10px;
  }
}
</style>