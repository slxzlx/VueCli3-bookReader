<template>
  <div class='recom-grid-container'>
    <van-grid :border='false'>
      <van-grid-item v-for="value in 4" :key="value" icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";

Vue.use(Grid).use(GridItem);
export default {};
</script>
<style lang='scss' scoped>
.recom-grid-container{
    margin: 10px;
}
</style>