import * as types from './mutationType'
export default {
  [types.SET_BOOKNAME]: (state, val) => {
    state.bookName = val
  },
  [types.SET_CURBOOK](state,val){
    state.curBook = val
  },
  [types.SET_SHOWMEAU](state,val){
   state.showMeau=val
  },
  [types.SET_SETTINGPANEL](state,val) {
    state.showSettingPanel = val
  },
  [types.SET_FONTFAMILY](state,val){
    state.fontFamily = val
  },
  [types.SET_FONTSIZE](state,val){
    state.fontSize = val
  },
  [types.SET_COLORTHEME](state,val){
    state.colorTheme = val
  },
  [types.SET_LOCATION](state,val){
    state.location=val
  },
  [types.SET_SECTION](state,val){
    state.section=val
  },
  [types.SET_CURPERCENT](state,val){
    state.curPercent = val
  },
  [types.SET_META](state,val){
    state.meta = val
  },
  [types.SET_NAV](state,val){
    state.nav = val
  },
  [types.SET_BOOKMARK](state,val){
    state.bookmark = val
  }
}
