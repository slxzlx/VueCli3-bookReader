<template>
  <div>
    <recom-header />
    <div class="scroll-wraper">
        <scroll :opitions='opitions' ref='btscroll' @scrollVal='scroll' @pullingDown='pullingDown' >
          <div class='content-wraper'>
            <top-fresh :isLoading='isLoading' ref='topfresh' :offsetY='offsetY' />
            <recom-swiper />
            <recom-grid />
            <recom-content />
          </div>
        </scroll>
    </div>
  </div>
</template>
<script>
import recomHeader from "cps/recommend/recomHeader";
import recomSwiper from "cps/recommend/recomSwiper";
import recomGrid from "cps/recommend/recomGrid";
import recomContent from "cps/recommend/recomContent";
import topFresh from 'cps/base/topfresh'
import scroll from "cps/base/scroll";

export default {
  components: {
    recomHeader,
    recomSwiper,
    recomGrid,
    recomContent,
    scroll,
    topFresh
  },
  data() {
    return {
      isLoading: false,
      offsetY:0,
      opitions:{
        listenScroll:true,
        probeType:2,
        pullDownRefresh:{
          threshold:70,
          stop:60
        }
      }
    };
  },
  methods: {
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
<style lang='scss' scoped>
.scroll-wraper {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  .content-wraper{
    // overflow: hidden;
    padding-top: 10px

  }
}
</style>