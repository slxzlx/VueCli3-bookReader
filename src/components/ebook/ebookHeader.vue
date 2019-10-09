<template>
  <div>
    <transition name="slide-down">
      <div class="header-wraper" v-show="showMeau && showSettingPanel === 0">
        <div class="back-icon">
          <span class="icon-back"></span>
        </div>
        <div class="more-icon">
          <span class="icon-more" @click="toggle"></span>
        </div>
      </div>
    </transition>
    <transition name="shelf">
      <dl class="shelf" v-show="showShelf">
        <dd @click='addBookmark'>{{mark}}</dd>
        <dd @click="searchShow">全文搜索</dd>
      </dl>
    </transition>
    <!-- <keep-alive> -->
      <book-search  ref='search' />
    <!-- </keep-alive> -->
     <transition name='slide-down' >
       <div class="bookmark-wraper" v-show="showmark">
         <p style="writing-mode : tb-rl ;">我读到了你</p>
         <p style="writing-mode : tb-rl ;">那一年</p>
       </div>
     </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import bookSearch from './ebookSearch'
import {ebook} from '../../utils/mixin'
import getTime from '../../utils/timeFormate'
import {saveBookmark} from '../../utils/caches'
class BookMark{
  constructor(cfi,locationText,time,percent){
    this.cfi =cfi
    this.locationText=locationText
    this.time=time
    this.percent=percent
  }
}
export default {
  mixins:[ebook],
  computed: {
     mark(){
       return this.hasBookmark?'取消书签':'添加书签'
     }
  },
  components:{
    bookSearch
  },
  data() {
    return {
      showShelf: false,
      hasBookmark:false,
      showmark:false
    };
  },
  methods: {
    toggle() {
      if(this.showShelf){
        this.showShelf=false
        return
      }
      this.showShelf=true
      let curLocation = this.curBook.rendition.currentLocation()
      this.cfi = curLocation.start.cfi
      this.index = this.bookmark.findIndex(i =>i.lacation == curLocation.start.cfi)
      this.getCurText(1).then(text=>{
        this.locationText = text
      })
      this.percent = (curLocation.start.percentage*100).toFixed(1)
      this.hasBookmark = this.index===-1?false:true
    },
    searchShow(){
      this.$refs.search.show()
    },
    addBookmark(){
         this.mask && clearTimeout(this.mask)
        if(this.hasBookmark){
          this.remove_bookmark(this.index)
          this.showReaderMeau()
        }else{
          let mark =new BookMark(this.cfi,this.locationText,getTime(),this.percent)
          this.add_bookmark(mark).then(()=>{
            saveBookmark(this.bookName,this.bookmark)
          })
          this.showReaderMeau()
          this.showmark=true;
          this.mask = setTimeout(() => {
          this.showmark=false
          }, 800);
        }
    }
  },
  watch: {
    showMeau(v) {
      if (!v) this.showShelf = false;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/mixin.scss";
.shelf-enter {
  transform: scale3d(0, 0, 0);
}
.shelf-enter-active {
  transform-origin: right top;
  transition: all 0.2s;
}
.shelf-leave-active {
  transition: all 0.4s;
}
.shelf-leave-to {
  opacity: 0;
}
.header-wraper {
  position: absolute;
  top: 0;
  left: 0;
  height: 46px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  font-size: 24px;
  .back-icon,
  .more-icon {
    width: 46px;
    line-height: 46px;
    text-align: center;
  }
}
dl {
  position: absolute;
  top: 51px;
  right: 5px;
  width: 100px;
  height: 100px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  font-size: 16px;
  dd{
    line-height: 50px;
    text-align: center;
  }
  dd:first-child {
    border-bottom: 1px solid rgb(218, 218, 218);
  }
}
.bookmark-wraper{
  position: absolute;
  top: 0;
  left: 50px;
  width: 50px;
  height: 108px;
  background-color: #fff;
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  p{
    // text-align: center;
    padding: 5px;
  }
}
</style>
