import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import {saveLocation} from '../utils/caches'
export const ebook = {
  methods: {
    ...mapMutations(['set_showMeau', 'set_showSettingPanel', 'set_fontFamily', 'set_fontSize', 'set_colorTheme'
      , 'set_location', 'set_section', 'set_curBook', 'set_curPercent','set_meta','set_nav','set_bookmark']),
    ...mapActions(['set_bookName','showReaderMeau','add_bookmark','remove_bookmark']),
    //得到当前页面的cfi和进度备百分比
    refreshLocation() {
      let curLocation = this.curBook.rendition.currentLocation();
      console.log(curLocation)
      let cfi = curLocation.start.cfi
      let percent = curLocation.start.percentage;
      percent = (percent * 100).toFixed(2);
      //如果
      if(this.section !==curLocation.end.index){
        this.set_section(curLocation.end.index)
      }
      console.log(curLocation.start.index)
      this.set_curPercent(percent)
      saveLocation(this.bookName, cfi)
    },
    display(target, callback) {
      if (target) {
        this.curBook.rendition.display(target).then(() => {
         
          this.refreshLocation()      
          if (callback) callback()
        })
      } else {
        this.curBook.rendition.display().then(() => {
          
          this.refreshLocation()    
          if (callback) callback()    
        })
      }
    },
    getCurText(reduce){
      const currentLocation = this.curBook.rendition.currentLocation()
      const cfibase = currentLocation.start.cfi.replace(/!.*/, '').replace('epubcfi(', '')
      const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)/, '')
      const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)/, '')
      const cfiRange = `epubcfi(${cfibase}!,${cfistart},${cfiend})`
      return new Promise((resolve,reject)=>{
        this.curBook.getRange(cfiRange).then(range =>{
          let text =range.toString()
          if(reduce){
            let text = range.toString()
            text = text.replace(/\s\s/g, '')
            text = text.replace(/\r/g, '')
            text = text.replace(/\n/g, '')
            text = text.replace(/\t/g, '')
            text = text.replace(/\f/g, '')
            resolve(text)
          }else{
            resolve(text)
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters(['bookName', 'showMeau', 'showSettingPanel', 'curBook', 'fontFamily', 'fontSize', 'colorTheme',
      'location', 'section', 'curPercent','meta','nav','bookmark'])
  },
}
