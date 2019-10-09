<template>
 <transition name='slide-up'>
   <div class="footer-wraper" v-show='showMeau && showSettingPanel === 0'>
       <div class="directory" @click="showSetting(3)">
           <span class="icon-headphone"  ></span>
           <p class="text">目录</p>
       </div>
       <div class="process" @click="showSetting(2)">
           <span class="icon-headphone"  ></span>
           <p class="text">进度</p>
       </div>
       <div class="setting"  @click="showSetting(1)">
           <span class="icon-headphone"></span>
           <p class="text">设置</p>
       </div>
   </div>
 </transition>
</template>
<script>
import {ebook} from '../../utils/mixin'
 export default {
     mixins:[ebook],
     methods:{
       showSetting(i){
          this.set_showMeau(false)
          this.set_showSettingPanel(i)
       },
       end(){
         console.log('过渡完成')
       }
     }
 }
</script>
<style lang='scss' scoped>
@import '@/styles/mixin.scss';
 .footer-wraper{
     position: absolute;
     left: 0;
     bottom: 0;
     height: 46px;
     width: 100%;
     background-color: #fff;
     display:flex;
     font-size: 18px;
     .directory,.process,.setting{
       flex: 1;
       @include columnCenter;
     };
     .text{
       margin-top: 2px  
     }
 }
</style>
