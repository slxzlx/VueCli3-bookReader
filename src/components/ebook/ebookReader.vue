<template>
  <div class="reader-wraper">
    <div id="read"></div>
    <loading :size='18'  class='loading' title='正在加载电子书..'  v-show='visi' />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Epub from "epubjs";
import { ebook } from "../../utils/mixin";
import loading from '../base/loading'
import {
  getFontSize,
  getFontFamily,
  getColorTheme,
  getLocation,
  getReadTime,
  saveReadTime,
  getBookmark,
} from "../../utils/caches";
import { themes } from "../../utils/fontInfo";
global.epub = Epub;
export default {
  mixins: [ebook],
  components:{
    loading
  },
  data() {
    return {
      visi: true,
      ChangePage: false
    };
  },
  mounted() {
    this.set_bookName(this.$route.params.bookName).then(() => {
      this.initEpub();
      this.initFont();
      this.initThemes();
      this.parseBook()
      this.initBookmark()
    });
  },
  methods: {
    initEpub() {
      let url =
        process.env.VUE_APP_EPUB_SRC +
        this.bookName.split("|").join("/") +
        ".epub";
      this.book = new Epub(url);
      this.set_curBook(this.book);

      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default"
      });
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleMenuVisible();
        }
        event.preventDefault();
        event.stopPropagation();
      });
      let location = getLocation(this.bookName) || "";
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            ((750 * window.innerWidth) / 375) *
              (getFontSize(this.bookName || this.fontSize) / 16)
          );
        })
        .then(() => {
          this.display(location, () => {
            this.visi = false;
            this.ChangePage = true;
          });
        });
    },
    initFont() {
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_FONTS_SRC}cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_FONTS_SRC}zhenhun.css`),
          contents.addStylesheet(`${process.env.VUE_APP_FONTS_SRC}daysOne.css`),
          contents.addStylesheet(
            `${process.env.VUE_APP_FONTS_SRC}montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_FONTS_SRC}tangerine.css`
          )
        ]);
      });
      let size = getFontSize(this.bookName) || this.fontSize;
      this.set_fontSize(size);
      this.rendition.themes.fontSize(size);
      let fontFamily = getFontFamily(this.bookName);
      if (fontFamily) {
        this.set_fontFamily(fontFamily);
        this.rendition.themes.font(fontFamily.fontVal);
      } else {
      }
    },
    initThemes() {
      themes.forEach(e => {
        this.rendition.themes.register(e.name, e.style);
      });
      let theme = getColorTheme(this.bookName);
      if (theme) {
        this.rendition.themes.select(theme);
        this.set_colorTheme(theme);
      }
    },
    initBookmark(){
       let bookmark =getBookmark(this.bookName) ||[]
       this.set_bookmark(bookmark)
    },
    parseBook(){
      this.book.loaded.cover.then(cover =>{
        this.book.archive.createUrl(cover).then(url=>{
           //url为封面的图片
        })
      })
      this.book.loaded.metadata.then(metadata => {
        //meatadata为书的一些基本综合信息 如作者 书名
        this.set_meta(metadata)
        //  console.log(metadata)
      })
      this.book.loaded.navigation.then(nav =>{
        //navi 为章节信息
        const navItem = (function flatten(arr) {
            return [].concat(...arr.map(v => [v, ...flatten(v.subitems)]))
          })(nav.toc)
        function find(item,level=1){
           if(!item.parent) return level
           let parent = navItem.find(n => n.id === item.parent)
            return parent?find(parent,++level):level+1
        }
        navItem.forEach(item =>{
          item.level = find(item)
        })
        console.log(navItem)
        this.set_nav (navItem)
      })
    },
    prevPage() {
      if (this.rendition && this.ChangePage) {
        this.rendition.prev().then(() => {
          this.ChangePage = true;
          this.refreshLocation();
        });
      }
    },
    nextPage() {
      if (this.rendition && this.ChangePage) {
        this.rendition.next().then(() => {
          this.ChangePage = true;
          this.refreshLocation();
        });
      }
    },
    toggleMenuVisible() {
      this.showReaderMeau();
    },
    readTime(){
      let totalTime = getReadTime(this.bookName) || 0
      this.task = setInterval(() => {
         totalTime++
         if(totalTime % 30 ===0)
            saveReadTime(this.bookName,totalTime)
      }, 1000);
    },
    beforeDestory(){
      clearInterval(this.task)
    }
  }
};
</script>
<style lang='scss' scoped>
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0)
}
</style>
