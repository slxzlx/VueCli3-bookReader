<template>
  <div class="search-wraper" v-if='visibile' >
    <div class="header">
      <div class="back el-icon-back" @click="hide"></div>
      <book-search :auto='true' class='search' ref="searchInput" @onSearch='startSearch' />
    </div>
    <div class="content">
      <div class="init" v-show="!searching && searchList.length===0">
        <div class="icon el-icon-search"></div>
        <p>{{searchDesc}}</p>
      </div>
      <div class="search-result">
        <div
          class="search-title"
          v-if="searchList.length>0 || searching"
        >当前共计搜索到{{searchList.length}}条结果</div>
        <div class="result-list" v-show='!searching'>
          <scroll>
            <ul>
              <li v-for="(v,i) in searchList" :key="i" @click="turn(v.cfi)">
                <p class="result-text" v-html="v.excerpt"></p>
                <p class="result-location">{{v.percent}}%</p>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
      <loading class="loading" size='16' title="正在搜索.." v-show="searching" />
    </div>
  </div>
</template>
<script>
import scroll from "../base/scroll";
import { ebook } from "../../utils/mixin";
import loading from "../base//loading";
import bookSearch from '../base/search'
export default {
  mixins: [ebook],
  data() {
    return {
      searchDesc: "输入要搜索的词，看看TA在哪？",
      searchList: [],
      searching: false,
      visibile: false
    };
  },
  mounted() {
    this.searchDesc = "输入要搜索的词，看看TA在哪？";
  },
  computed: {},
  methods: {
    startSearch(text) {
      this.searching = true;
      this.searchList=[]
      this.$refs.searchInput.blur();
      let reg = new RegExp(text, "ig");
      this.doSearch(text).then(result => {
        this.searchList = result.map(item => {
          item.excerpt = item.excerpt.replace(reg, i => i.fontcolor("red"));
          item.percent = (
            this.curBook.locations.percentageFromCfi(item.cfi) * 100
          ).toFixed(1);
          return item;
        });
        this.searching = false;
        if (result.length === 0) {
          this.searchDesc = "没有找到结果，尝试换一换关键词";
        }
        
      });
    },
    doSearch(q) {
      return Promise.all(
        this.curBook.spine.spineItems.map(item =>
          item
            .load(this.curBook.load.bind(this.curBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)));
    },
    turn(cfi) {
      this.display(cfi,() =>{     
        this.getCurText(1).then(text=>{
          console.log(text)
        })
      });
      this.hide();
    },
    hide() {
      this.visibile = false;
      this.showReaderMeau();
    },
    show() {
      this.visibile = true;
      this.searchDesc = "输入要搜索的词，看看TA在哪？";
    }
  },
  components: {
    scroll,
    loading,
    bookSearch
  }
};
</script>
<style lang='scss' scoped>
.search-wraper {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  .header {
    height: 48px;
    background-color: rgb(228, 228, 228);
    display: flex;
    align-items: center;
    .back {
      font-size: 22px;
      flex: 0 0 40px;
      line-height: 40px;
      text-align: center;
    }
    .search {
      flex: 1;
      height: 24px;
      margin-right: 10px;
    }
  }
  .content {
    position: absolute;
    top: 48px;
    bottom: 0;
    width: 100%;
    .init {
      position: relative;
      width: 70%;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: rgb(190, 190, 190);
      .icon {
        font-size: 60px;
        width: 100%;
        text-align: center;
      }
      p {
        font-size: 16px;
        text-align: center;
        line-height: 20px;
      }
    }
    .search-result {
      height: 100%;
      position: relative;
      .search-title {
        position: absolute;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
        background-color: rgb(228, 228, 228);
      }
      .result-list {
        height: 100%;
        padding-top: 36px;
        font-size: 14px;
        box-sizing: border-box;
        li {
          height: 64px;
          margin: 5px 10px;
          border-bottom: 1px solid #ccc;
          .result-text {
            height: 40px;
            line-height: 20px;
            color: rgb(0, 0, 0);
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .content-search-text {
              color: red;
            }
          }
          .result-location {
            height: 24px;
            line-height: 24px;
            color: rgba(104, 104, 104, 0.911);
            font-size: 12px;
          }
        }
      }
    }
    .loading {
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>