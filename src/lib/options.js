
export const gradients = [
  {
    dir:'v',
    colorStops: [
      'rgb(200,200,200)',
      'transparent',
    ],
  },{
    dir:'v',
    colorStops:[
      'brown',
      'transparent'
    ]
  },{
    dir:'v',
    colorStops:[
      '#4361ee',
      'transparent'
    ]
  },{
    dir:'v',
    colorStops:[
      "#D4A373",
      "#D4A373",
      'transparent'
    ]
  },{
    dir:'v',
    colorStops:[
      '#7209b7',
      'transparent'
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
  showBgColor: true ,
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
    name: 'default' ,
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

export default options ;