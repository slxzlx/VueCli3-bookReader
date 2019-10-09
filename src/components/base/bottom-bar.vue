<template>
  <div class='bottom-tab'>
    <div class="item" v-for='(v,i) in tabbarList' :style='colorstyle' ref='tabItem' :key='i' @click="itemClick(i)">
      <span class="icon" :class="v.iconClass"  ></span>
      <p>{{v.text}}</p>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        tabbarList:{
            type:Array,
            default(){
                return []
            },
            activeColor:{
                type:String,
                default:"red"
            },
            defaultColor:{
                type:String,
                default:'rgb(19, 19, 19)'
            },
            bgColor:{
                type:String,
                default:'#fff'
            }
        },
        route:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            colorstyle(isavtive){
               if(isavtive){
                   return{color:this.defaultColo}
               }else{

               }             
            }
        }
    },
    methods:{
        itemClick(i){
            console.log(i)
           if(this.route){
            //    this.$router.push(this.tabbarList[i].to)
           }else{
               this.$emit('itemClick')
           }
           this.$refs.tabItem[i].style.color = this.activeColor
        }
    }
};
</script>
<style lang='scss' scoped>
.bottom-tab {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  display: flex;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
}
</style>