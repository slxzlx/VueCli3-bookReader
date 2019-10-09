<template>
  <div class='shelf-read-time-container'>
    <div class="left">
        <div class="circle">
            <span>签到</span>
        </div>
    </div>
    <div class="center">
        <p class='top'>本周阅读时长<span>1</span>分钟 </p>
        <p class='bot'>再继续都59分钟兑换书卷</p>
    </div>
    <div class="right">
        <span class='el-icon-arrow-right'></span>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang='scss' scoped>
@import 'styles/variable.scss';
.shelf-read-time-container{
    height: 86px;
    // width: 100%;
    margin:0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $colorthemeL;
    border-radius: 5px;
    .left{
        flex:0 0 72px;
        .circle{
            margin-left: 13px;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: $colortheme;
            font-size: 16px;
            text-align: center;
            line-height: 46px;
            color:antiquewhite;
            font-weight: bold
        }
    }
    .center{
        flex:1;
        border-left: 1px solid rgb(167, 167, 167);
        height: 60px;
        // display: table-cell;
        display: flex;
        justify-content:space-around;
        flex-direction: column;
        p{
            line-height: 18px;
            font-size: 12px;
            margin-left: 10px;
            // display: table-cell;
            // vertical-align:middle
        }
        .top span{
            color :$colorthemeH;
            font-weight: bold;
            margin: 0 2px;
        }
        .bot{
          color:$colortheme
        }
    }
    .right{
        flex: 0 0 30px;
        font-size: 18px;
        color:$colorthemeH;
        height: 60px;
        line-height: 60px;
        width: 20%;
        text-align: center;
    }
}
</style>