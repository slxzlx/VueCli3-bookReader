<template>
  <div id="app">
    <router-view></router-view>
    <!-- <div class="bottom-tab" v-show="appFooterVisible">
      <router-link to='/shelf' class="item">
        <span class="icon  el-icon-reading"></span>
        <p class="desc">书架</p>
      </router-link>
      <router-link to='/recommend' class="item">
        <span class="icon  el-icon-receiving"></span>
        <p class="desc">推荐</p>
      </router-link>
      <router-link to='/classify' class="item">
        <span class="icon el-icon-menu"></span>
        <p class="desc">分类</p>
      </router-link>
      <router-link to='/find' class="item">
        <span class="icon el-icon-bangzhu "></span>
        <p class="desc">发现</p>
      </router-link>
    </div> -->
  </div>
</template>
<script>
document.addEventListener("DOMContentLoaded", () => {
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  const html = document.querySelector("html");
  html.style.fontSize = fontSize + "px";
});
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      tabbarList:[
        {text:'书架',iconClass:"el-icon-reading",to:'/ebook'},
        {text:'推荐',iconClass:"el-icon-reading",to:'/'},
        {text:'分类',iconClass:"el-icon-reading",to:'/'},
        {text:'发现',iconClass:"el-icon-reading",to:'/'},
      ]
    }
  },
  created(){
     window.addEventListener('hashchange',e=>{
       console.log(e)
     })
  },
  computed:{
    ...mapGetters(['appFooterVisible'])
  }
};
</script>
<style lang='scss' scoped>
@import './styles/variable.scss';
.bottom-tab {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  width: 100%;
  display: flex;
  background-color: $bgcolorA;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: $fontcolor;
    .icon{
      font-size: 22px;
    }
    .desc{
      font-size: 12px;
      line-height: 16px
    }
    &.router-link-exact-active{
      color:$fontcolorH
    }
  }
}
</style>
