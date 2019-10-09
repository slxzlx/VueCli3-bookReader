import webStorage from 'web-storage-cache'
let storage = new webStorage()
const expired = 60 * 60 *24 *365
export function setObjInfo(objName,key,val){
  let obj = storage.get(`${objName}-info`) || {}
  obj[key] = val
  storage.set(`${objName}-info`,obj)
}
export function getObjInfo(objName,key){
    let obj = storage.get(`${objName}-info`)
    if(obj)
     return obj[key]
    else 
     return null
}
export function saveFontSize(name,v){
    setObjInfo(name,'font-size',v)
}
export function getFontSize(name){
   return getObjInfo(name,'font-size')
}
export function saveFontFamily(name,v){
    setObjInfo(name,'font-family',v)
}
export function getFontFamily(name){
    return getObjInfo(name,'font-family')
 }
export function saveColorTheme(name,v){
    setObjInfo(name,'theme',v)
}
export function getColorTheme(name){
    return getObjInfo(name,'theme')
 }
 export function saveLocation(name,v){
    setObjInfo(name,'location',v)
}
export function getLocation(name){
    return getObjInfo(name,'location')
 }
 export function saveReadTime(name,v){
    setObjInfo(name,'readTime',v)
}
export function getReadTime(name){
    return getObjInfo(name,'readTime')
 }
 export function saveBookmark(name,v){
    setObjInfo(name,'bookmark',v)
}
 export function getBookmark(name){
    return getObjInfo(name,'bookmark')
 }