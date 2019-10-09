<template>
  <div>
    <cls-header/>
    <side-bar />
  </div>
</template>
<script>
import clsHeader from 'cps/classify/classifyHeader'
import sideBar from 'cps/classify/classifySideBar'
export default {
    components:{
        clsHeader,
        sideBar
    }
}
</script>
<style lang='scss' scoped>
</style>