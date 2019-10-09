<template>
  <div class='classify-header-container'>
    <search class='search-input' :lock='true' placeholder='输入书名或者作者名' @lockClick='click' />
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
.classify-header-container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 40px;
  background-color: #fff;
  overflow: hidden;
  .search-input{  
    height: 32px;
    // font-size: 20px;
    margin:4px 10px;
  }
}

</style>