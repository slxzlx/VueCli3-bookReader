<template>
  <div class='fresh-container'>
        <loading title='正在刷新..' direction='row' :size=12 v-show="isLoading" />
        <p class="info" v-show="!isLoading">
            <span ref='arrow' class="icon el-icon-bottom"></span>
            <span class="desc">{{desc}}</span>
        </p>
        <p class="time">上次更新时间：刚刚</p>
  </div>
</template>
<script>
import loading from './loading'
export default {
    components:{
        loading
    },
    data(){
       return{
           desc:'下拉刷新'
       }
    },
    props:{
        offsetY:{
            type:Number,
            default:0
        },
        isLoading:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        offsetY(v){
           if(v>0 && v<=70){
              //刷新页面刚出现
              this.desc='下拉刷新'
              if(this.$refs.arrow.style.transform==='rotate(180deg)')
                 this.$refs.arrow.style.transform='rotate(0deg)'
           }else if(v>70){
              //提示可以松手刷星
              this.desc ='松开刷新数据'
              this.$refs.arrow.style.transform='rotate(180deg)'
              this.$emit('isRefreshing')
           }
        }
    }
}
</script>
<style lang='scss' scoped>
@import 'styles/variable.scss';
.fresh-container{
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    // background-color: rgb(68, 59, 59);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    line-height: 16px;
    padding-bottom: 20px;
    box-sizing: border-box;
    color:$fontcolorG;
    .icon{
        transition: all .2s linear;
    }
    .desc{
        margin-left: 5px;
    }
    .time{
        font-size: 10px;
    }
}
</style>