<template>
  <div class="loading" :style="{'flex-direction':direction}">
    <img :width="size" :height="size" src="./loading.gif" />
    <p class="desc"  :style='{"font-size":`${size}px`}'  >{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
import { deflate } from 'zlib';
export default {
  props: {
    title: {
      type: String,
      default: "正在载入..."
    },
    size:{
      type:[Number,String],
      default:24
    },
    direction:{
      type:String,
      default:'column'
    }
  }
};
</script>
<style scoped lang="scss" rel="stylesheet/stylus">
@import "styles/variable.scss";
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  .desc {
    line-height: 20px;
    font-size: 16px;
    color: $fontcolorG;
    margin: 4px 0 0 4px;
  }
}
</style>
