<template>
  <div class='shelf-header-container'>
    <search class='search-input' :lock='true' placeholder='输入书名或者作者名' @lockClick='click' />
    <div class="more-wraper">
      <span class="more icon-more"></span>
    </div>
  </div>
</template>
<script>
import search from '../base/search'
export default {
    components:{
        search
    },
    methods:{
        click(){
            this.$router.push('/find')
        }
    }
}
</script>
<style lang='scss' scoped>
.shelf-header-container{
  // overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #fff;
  // position: relative;
  .search-input{
    flex :1;   
    height: 32px;
    margin-left: 10px;
  }
  .more-wraper{
    flex:0 0 40px;
    line-height: 24px;
    font-size: 24px;
    text-align: center;
  }
}

</style>