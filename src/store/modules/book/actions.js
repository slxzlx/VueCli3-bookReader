import * as types from './mutationType'
export default {
  set_bookName ({ commit }, val) {
    return commit(types.SET_BOOKNAME, val)
  },
  showReaderMeau({commit,state}){
    if(state.showSettingPanel<0){
      commit(types.SET_SHOWMEAU,true)
      commit(types.SET_SETTINGPANEL,0)
    }
     else{
      commit(types.SET_SHOWMEAU,false)
      commit(types.SET_SETTINGPANEL,-1)
     } 
  },
  add_bookmark({commit,state},bookmark){
    let bms =state.bookmark.slice()
    bms.push(bookmark)
    return commit(types.SET_BOOKMARK,bms)
  },
  remove_bookmark({commit,state},index){
    let bms=state.bookmark.slice()
    bms.splice(index,1)
    return commit(types.SET_BOOKMARK,bms)
  }
}
