<template>
  <div class="input-wraper" @click="lockClick">
    <span class="icon  search-icon el-icon-search"></span>
    <input class="input"  :disabled='lock' :placeholder="placeholder" type="text" v-model="searchText" ref="searchInput" @keyup.enter="search" />
    <span class="icon  clear-icon el-icon-close" v-show="searchText" @click="searchText=''"></span>
  </div>
</template>
<script>
import defounce from "../../utils/debounce";
export default {
  props: {
    auto: {
      type:Boolean,
      default:false
    },
    delay: {
      type: Number,
      default: 1000
    },
    lock:{
      type:Boolean,
      default:false,
    },
    placeholder:{
      type:String,
      default:''
    }
  },
  mounted() {
    if (this.auto) {
      this.$watch(
        "searchText",
        defounce(searchText => {
          this.search();
        }, this.delay)
      );
    }
  },
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    search() {
      if (this.searchText.match(/^[ ]*$/)) {
        console.log("不能为空");
        return;
      }
      this.$emit("onSearch", this.searchText);
    },
    blur() {
      this.$refs.searchInput.blur();
    },
    focuse(){
      this.$refs.searchInput.focuse()
    },
    lockClick(){
      if(this.lockClick)
        this.$emit('lockClick')
    }
  }
  //   watch:{
  //       searchText(v){

  //       }
  //   }
};
</script>
<style lang='scss' scoped>
@import '../../styles/variable.scss';
.input-wraper {
  position: relative;
  font-size: 16px;
  .input {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding: 0 30px;
    background-color: $bgcolor;
  }
  .icon {
    position: absolute;
    font-size: 16px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 24px;
    text-align: center;
    line-height: 100%;
  }
  .clear-icon {
    right: 0;
  }
  .search-icon {
    left: 0;
  }
}
</style>