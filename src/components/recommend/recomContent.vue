<template>
  <div>
    <goods-show title='今日精选' subTitle='够格的才叫精选！手动阀手动阀撒旦' />
    <goods-show title='今日秒杀' text='97000人已抢' >
      <show-time />
    </goods-show>
    <!-- <goods-show title='今日秒杀' text='97000人已抢' /> -->

  </div>
</template>
<script>
import goodsShow from './goodsShowPanel'
import showTime from '../base/showTime'
export default {
    components:{
      goodsShow,
      showTime
    }   
}
</script>
<style lang='scss' scoped>
</style>