export const fonts = [{
    text: '默认',
    fontVal: 'Default'
  },
  {
    text: 'Cabin',
    fontVal: 'Cabin'
  },
  {
    text: 'Days One',
    fontVal: 'Days One'
  },
  {
    text: 'Montserrat',
    fontVal: 'Montserrat'
  },
  {
    text: 'Tangerine',
    fontVal: 'Tangerine'
  },
  {
    text: '镇魂书法',
    fontVal: 'zhenhun'
  }
]
export const themes=[
  {
    alias:'默认',
    name:'default',
    style:{
      body:{
        'color': '#4c5059',
        'background': '#cecece',
      }
    }
  },
  {
    alias:'金色',
    name:'gold',
    style:{
      body:{
        'color': '#5c5b56',
        'background': '#c6c2b6',
      }
    }
  },
  {
    alias:'护眼',
    name:'eye',
    style:{
      body:{
        'color': '#404c42',
        'background': '#a9c1a9'
      }
    }
  },
  {
    alias:'夜间',
    name:'night',
    style:{
      body:{
        'color': '#cecece',
        'background': '#000000',
      }
    }
  }
]




export function getFontText(val){
  return fonts.find(e => {
    return e.fontVal ===val
  }).text
}
