<template>
  <div>
    <router-view></router-view>
    <book-footer/>
    <book-header/>
    <book-setting/>  
    <book-process/>
    <book-directory/>
  </div>
</template>
<script>
import bookHeader from 'cps/ebook/ebookHeader'
import bookFooter from 'cps/ebook/ebookFooter'
import bookSetting from 'cps/ebook/ebookSetting'
import bookProcess from 'cps/ebook/ebookProcess'
import bookDirectory from 'cps/ebook/ebookDirectory'
export default {
  components: {
    bookHeader,
    bookFooter,
    bookSetting,
    bookProcess,
    bookDirectory
  }
};
</script>
<style lang='scss' scoped>
</style>
