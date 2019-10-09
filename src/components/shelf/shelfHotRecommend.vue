<template>
  <div class="shelf-hot-recommend-container" v-show='newsArr.length>0'>
    <dl ref='slide-wraper'>
      <dd ref='item' v-for="(item, index) in newsArr" :key="index">
        <span class="img"></span>
        <span class="text">{{item.text}}</span>
      </dd>
    </dl>
    <span class="right el-icon-arrow-right"></span>
  </div>
</template>
<script>
export default {
  data(){
    return{
      newsArr:[{href:'',text:'0手动阀手动阀手动阀手动阀手动阀手动阀手动阀手动阀手动阀手动阀手动阀'},
      {href:'',text:'1 发士大夫士大夫手动阀手动阀手动阀手动阀手动阀撒旦'},
      {href:'',text:'2就flask技法卢卡斯大家分厘卡技法卢卡斯解放拉萨就的分厘卡即使法律实践来看'},
      {href:'',text:'3撒犯得上电风扇发士大夫啊噶士大夫撒旦飞洒地方'},
      {href:'',text:'4啊的法国阿斯顿噶飞洒地方手动阀啊噶撒发射点发的'},
      {href:'',text:'5手动阀阿斯蒂阀手动噶啥的发噶士大夫撒地方阿斯蒂'}],
    }
  },
  mounted(){
    this.initSlide()
    this.startSlide() 
  },
  methods:{
    initSlide(){
      let firtItem = this.$refs.item[0]
      this.itemHeight=firtItem.clientHeight  
      this.parent = this.$refs['slide-wraper']
      this.parent.appendChild(firtItem.cloneNode(true))   
      this.index=0  
      this.parent.addEventListener('transitionend',(e)=>{
        if(this.index===this.newsArr.length){
          this.index=0
          this.parent.style.transform='translate3d(0,0,0)' 
          this.parent.style.transition='none'
        }
      })
    },
    startSlide(){
      setInterval(() => {
       this.index++
       this.parent.style.transition='all .2s linear'
       this.parent.style.transform=`translate3d(0,-${this.index*this.itemHeight}px,0)`     
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.shelf-hot-recommend-container {
  height: 28px;
  position: relative;
  overflow: hidden;
  dl {
    margin-right: 20px;
    dd {
      display: flex;
      align-items: center;
      font-size: 16px;
      .img {
        flex:0 0 14px;
        width: 14px;
        height: 20px;
        display: inline-block;
        background: url("fire.png");
        background-size: 14px 20px;
        margin:0 10px;
        
      }
      .text{
        flex:1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 28px;
      }
    }
  }
  .right {
    position: absolute;
    right: 0;
    width: 20px;
    top: 0;
    font-size: 16px;
    line-height: 28px;
  }
}
</style>