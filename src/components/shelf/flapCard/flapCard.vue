<template>
  <div class="flap-card-container">
    <div class="flap-card-bg">
      <div class="flap-card-item" v-for="(v,i) in cardList" :key='i'>
        <div class="flap-card-circle-half flap-card-circle-left" ref='left' :style='setBg(v,"left")'></div>
        <div class="flap-card-circle-half flap-card-circle-right" ref='right' :style='setBg(v,"right")'></div>
      </div>
    </div>
    <div class="iii"></div>
  </div>
</template>
<script>
import { list } from "./cardList";
list.sort((a,b)=>{
    return b.zIndex-a.zIndex
})
export default {
    data(){
        return {
            cardList:list,
            front:0, //正面
            back:1   //反面
        }
    },
    mounted(){
      this.startRotate()
    },
    methods:{
        setBg(v,direction){
           return {
               backgroundColor:`rgb(${v.r},${v.g},${v.b})`,
               zIndex:v.zIndex,
               backgroundImage:direction === 'left'?v.imgLeft:v.imgRight,
               backgroundSize:v.backgroundSize
           }
        },
        startRotate(){
            this.setBack()
             setInterval(() => {
                this.rotateFrontAndBack()
             }, 30);
        },
        //翻页之前先把下一页的背面设置好
        setBack(){
           let nextBackDom = this.$refs.left[this.back]
           let nextBackData = this.cardList[this.back]
           nextBackData.rotateDegree = 180
           nextBackData._g-=90
           this.rotate(nextBackData,nextBackDom)
        },
        rotateFrontAndBack(){
           let curFrontDom = this.$refs.right[this.front]
           let curFrontData=this.cardList[this.front]
           let nextBackDom = this.$refs.left[this.back]
           let nextBackData = this.cardList[this.back]
           curFrontData.rotateDegree +=10
           nextBackData.rotateDegree -=10
           curFrontData._g-=5
           nextBackData._g+=5
           if(curFrontData.rotateDegree === 90 && nextBackData.rotateDegree === 90){
               nextBackData.zIndex+=2
           }
           if(curFrontData.rotateDegree === 180 && nextBackData.rotateDegree === 0){
                const frontFlapCard = this.cardList[this.front]
                const backFlapCard = this.cardList[this.back]
                const frontRightSemiCircle = this.$refs.right[this.front]
                const backLeftSemiCircle = this.$refs.left[this.back]
                frontFlapCard.rotateDegree = 0
                backFlapCard.rotateDegree = 0
                frontFlapCard._g = frontFlapCard.g
                backFlapCard._g = backFlapCard.g
                this.rotate(frontFlapCard, frontRightSemiCircle)
                this.rotate(backFlapCard, backLeftSemiCircle)
                this.front++
                this.back++
                if (this.front >= this.cardList.length) {
                this.front = 0
                }
                if (this.back >= this.cardList.length) {
                this.back = 0
                }
                const len = this.cardList.length
                this.cardList.forEach((item, index) => {
                item.zIndex = 100 - ((index - this.front + len) % len)
                })
                this.setBack()
           }
           this.rotate(curFrontData,curFrontDom)
           this.rotate(nextBackData,nextBackDom)
        },
        rotate(data,dom){
            dom.style.transform = `rotateY(${data.rotateDegree}deg)`
            dom.style.backgroundColor=`rgb(${data.r},${data._g},${data.b})`
        }

    }
};
</script>
<style lang='scss' scoped>
@import 'styles/variable.scss';
.flap-card-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
  .iii {
    width: 50px;
    height: 100px;
    background-color: #fff;
    border-radius: 50px 0 0 50px;
    animation: rightRoutate 1s ease 2s 2
  }
  .flap-card-bg {
    position: relative;
    top: 40%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    height: 80px;
    width: 80px;
    background-color: $colortheme;
    border-radius: 6px;
    .flap-card-item {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: 60px;
      width: 60px;
      display: flex;
      .flap-card-circle-half {
        flex: 1;
        width: 50%;
        height: 100%;
        background-repeat: no-repeat;
        backface-visibility: hidden;
      }
      .flap-card-circle-left {
        border-radius: 30px 0 0 30px;
        background-position: center right;
        transform-origin: right
      }
      .flap-card-circle-right {
        border-radius: 0 30px 30px 0;
        background-position: center left ;
        transform-origin: left
      }
    }
  }
}
</style>