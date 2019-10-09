<template>
  <div class='recom-swiper-container'>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="v in img" :key='v.src'> 
        <img width="100%" :src="v.src" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      img: [
        {
          src:require("./swiperimage/lunbo01.jpg")
        },
        {
          src: require("./swiperimage/lunbo02.jpg")
        },
        {
          src: require("./swiperimage/lunbo03.jpg")
        },
        {
          src: require("./swiperimage/lunbo04.jpg")
        },
        {
          src: require("./swiperimage/lunbo05.jpg")
        }
      ]
    };
  }
};
</script>
<style lang='scss' scoped>
.recom-swiper-container{
    margin: 0 10px;
    // width: 50px;
}
</style>