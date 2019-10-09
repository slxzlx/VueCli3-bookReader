<template>
  <transition name="slide-right">
    <check-list v-show="visible" @hide='hide' @checkItem="check" ref="cl" title="字体" :dataList="dataList" />
  </transition>
</template>
<script>
import checkList from "../base/checkList";
import { ebook } from "../../utils/mixin";
import { fonts, getFontText } from "../../utils/fontInfo";
import { saveFontFamily } from "../../utils/caches";
export default {
  mixins: [ebook],
  data() {
    return {
      visible: false,
      dataList: fonts
    };
  },
  components: {
    checkList
  },
  mounted() {
    setTimeout(() => {
      let index = fonts.findIndex(e => {
        return e.fontVal === this.fontFamily.fontVal;
      });
      this.$refs.cl.setChecked(index);
    }, 20);
  },
  methods: {
    show() {
      // this.$refs.cl.show();
      this.visible=true
    },
    hide(){
      this.visible=false
    },
    check(v) {
      this.curBook.rendition.themes.font(v.fontVal);
      saveFontFamily(this.bookName, v);
      this.set_fontFamily(v);
    }
  }
};
</script>
<style lang='scss' scoped>
 @import '@/styles/mixin.scss';
</style>
