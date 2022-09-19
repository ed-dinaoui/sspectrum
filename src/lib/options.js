
export const gradients = [
  {
    dir:'v',
    colorStops: [
      'rgb(200,200,200)',
      'rgb(200,200,200,0)',
    ],
  },{
    dir:'v',
    colorStops:[
      'brown',
      'rgba(165, 42, 42, 0)'
    ]
  },{
    dir:'v',
    colorStops:[
      '#4361ee',
      'rgba(67,97,238,0)'
    ]
  },{
    dir:'v',
    colorStops:[
      "#D4A373",
      "#D4A373",
      'rgba(212,263,115,0)'
    ]
  },{
    dir:'v',
    colorStops:[
      '#7209b7',
      'rgba(114,9,183,0)'
    ]
  },{
    dir:'v',
    colorStops:[
      "#4361ee",
      '#4361ee',
      '#7209b7'
    ]
  },
  {
    dir:'v',
    colorStops:[
      '#006466',
      '#006466',
      '#4d194d'
    ]
  }
]

export const default_options = {
  alphaBars: false ,
  barSpace: 1 , 
  showBgColor: false ,
  overlay: true ,
  bgAlpha: .2 ,
  fftSize: 256 ,
  fillAlpha: .1 ,
  gradient: 'gra_0' ,
  mode: 10 ,
  outlineBars: true ,
  lineWidth: 1 ,
  mirror: -1 ,
  radial: false ,
  smoothing: .8 ,
  stereo: false ,
  minFreq: 50 ,
  maxFres: 22000 ,
  minDecibels: -65 ,
  maxDecibels: 5 ,
  ledBars: false ,
  showPeaks: false ,
  showScaleX: false ,
  showScaleY: false
  // ...
}


var options = [
  {
    id : 'p' ,
    name: 'default' ,
    option : {
      mode : 10
    }
  }, 
  {
     id : 'p' ,
     name: 'preset 2' ,
     option : {
      fillAlpha:1,
      mode:3,
      outlineBars:false,
      minFreq:200,
      maxFres:10000,
      minDecibels:-70,
      maxDecibels:0,
     }
  }, 
  {
    id : 'p' ,
     name: 'preset 3' ,
     option : {
      fftSize:1024,
      barSpace:7,
      smoothing:.9,
      fillAlpha:.0,
      mode:7,
     }
  },
  {
    id : 'p' ,
     name: 'preset 4' ,
     option : {
      fillAlpha:.0,
      mode:6,
     }
  },
  {
    id : 'p' ,
     name: 'preset 5' ,
     option : {
      fftSize:4096,
      fillAlpha:.0,
      mode:10,
      showPeaks:true,
     }
  },
  {
    id : 'c' ,
    name: 'default c' ,
    option : {
      gradient : 'gra_0'
    }
  }, 
  {
    id : 'c' ,
    name: 'red' ,
    option : {
      gradient : 'gra_1'
    }
  }, 
  {
    id : 'c' ,
    name: 'blue' ,
    option : {
      gradient : 'gra_2'
    }
  },
  {
    id : 'c' ,
    name: 'Gold' ,
    option : {
      gradient : 'gra_3'
    }
  }, 
  {
    id : 'c' ,
    name: 'purple' ,
    option : {
      gradient : 'gra_4'
    }
  }, 
  {
    id : 'c' ,
    name: 'purple > blue' ,
    option : {
      gradient : 'gra_5'
    }
  },
  {
    id : 'c' ,
    name: 'purple > skobeloff' ,
    option : {
      gradient : 'gra_6'
    }
  },
  {
    id : 'm' ,
    name: 'Center' ,
    option : {
      mirror : -1
    }
  }, 
  {
    id : 'm' ,
    name: 'Left > Right' ,
    option : {
      mirror : 0
    }
  }, 
  {
    id : 'm' ,
    name: 'Sides' ,
    option : {
      mirror : 1
    }
  } ,
]

export const theme_properties = [
  'main-c' ,
  'second-c' ,
  'third-c' ,
  'background' ,
  'text' ,
  'txt'
]

export const themes = [
  [
    'rgb(10,10,10)' ,
    'rgb(6,6,6)' ,
    'rgb(8,8,8)' ,
    '#000' ,
    'rgb(100,100,100)' ,
    'rgb(60,60,60)'
  ] ,
  [
    'rgb(14,16,19)' ,
    'rgb(10,13,15)' ,
    'rgb(11,13,15)' ,
    'rgb(8,9,11)' ,
    'rgb(75,80,78)' ,
    'rgb(34,37,43)'
  ] ,
  [
    '#000' ,
    '#090909' ,
    '#020202' ,
    '#000' ,
    '#646464' ,
    '#3c3c3c'
  ] ,
]

export default options ;