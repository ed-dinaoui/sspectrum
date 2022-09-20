import React, { useState, useEffect } from 'react';
import './main.css';
import audioMotionAnalyzer from './lib/audioMotion-analyzer';
import $ from 'jquery';
import options , { gradients , default_options , themes , theme_properties } from './lib/options' ;
import default_song from './music/aether-illusion.mp3' ;

var audioMotion ;

//
/// AUDIO PLAYER

var v_track, audio ;

function adjust_volume(e) {
  var set_def_vol ;
  e.preventDefault();
  let pos_3 = e.clientX;
  let le = v_track.parentNode.offsetLeft;
  let le_wi = parseFloat(getComputedStyle(v_track.parentNode).width);
  set_def_vol = le + le_wi ;

  document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  document.onmousemove = (e) => {
    e = e || window.event;
    e.preventDefault();
    let pos_1 = pos_3 - e.clientX;
    pos_3 = e.clientX;
    let lef = v_track.offsetLeft - pos_1;
    if (lef <= le) {
      lef = le;
    } else if (lef >= le + le_wi) {
      lef = set_def_vol ;
    }
    $(v_track).css('left', `${lef}px`);
    audio.volume = ((lef - le) / le_wi) * 1;
  };
}
var p_l = 'l>' , p_a = 'll' ;
function Play_btn() {
  const [play, is_playing] = useState(p_l);
  const click = () => {
    if (play === p_l) {
      is_playing(p_a);
      audio.play();
    } else {
      is_playing(p_l);
      audio.pause();
    }
  };
  return <p onClick={click}>{play}</p>;
}
const get_elem = (el) => {
  let elem = document.querySelector(el) ;
  return elem
}
const time_bar = () => {
  let s_tp = (audio.currentTime / audio.duration) * 100;
  $('.s_track > div').css('width', s_tp.toFixed(1) + '%');
};
function AudioPlayer() {
  var song_track , audio_btn ;
  useEffect(() => {
    v_track = get_elem('.v_track > div');
    audio = get_elem('#audio');
    audio_btn = get_elem('#audio_player > div > p')
  }, []);
  return (
    <div id="audio_player">
      <audio
        id="audio"
        src={default_song}
        onPlay={() => {
          $(audio_btn).text(p_a) ;
          song_track = setInterval(time_bar, 500) ;
        }}
        onPause={() => {
          $(audio_btn).text(p_l) ;
          window.clearInterval(song_track) ;
        }}
      ></audio>
      <div>
        <Play_btn />
        <div className="s_track">
          <div></div>
        </div>
        <div className="v_track" onMouseDown={adjust_volume}>
          <div></div>
        </div>
      </div>
    </div>
  );
}

//
/// MENU

var menu , css_var_sty ;
var pos_1, pos_2, pos_3, pos_4;

var songs = [
  {
    id : 0 ,
    name : 'Aether Illusion' ,
    src : default_song
  } ,
]

//
////
////// in case of storing audio srcs
const divide = (nam , str) => {
  for (let i = 0 ; i < str.length ; i += 200){
    localStorage.setItem( nam + '_' + i , str.slice( i , i + 200 ) )
  }
}
const count_to_it = ( nam , len ) => {
  var st = '' ;
  for ( let i = 0 ; i < len ; i += 200 ) {
    let ar = localStorage.getItem( nam + '_' + i ) ;
    if( ar.length == 200 && ar != null ) {
      st += ar ;
    }
  }
  return st
}
//////
////
//

const set_name = (i_d) => {
  var ac = new Array ;
  for( let i = 0 ; i < options.length ; i++ ){
    if ( options[i].id === i_d ){
      ac.push(options[i].name)
    }
  }
  return ac
}
const songs_names = () => {
  var arr = new Array ;
  songs.forEach(song => {
    arr.push(song.name) ;
  })
  return arr
}
function in_song(nam_e , sr_c , back){
  let obj = {
    id : songs.length ,
    name : nam_e ,
    src : sr_c
  }
  songs.push(obj) ;
  op_s[0].els = songs_names() ;
  back() ;
}

const song_upload = (e , call) => {
  var target = e.currentTarget ;
  var file = target.files[0] ;
  var reader = new FileReader() ;
  var nam_e = target.value.split("fakepath\\")[1].split('.m')[0] ;
  

  if(target.files && file) {
    var reader = new FileReader ;
    reader.onload = (e) => {
      in_song( nam_e , e.target.result , call )
    } ;
    reader.readAsDataURL(file) ;
  }
}

function S_upload(props){
  return (
    <div>
      <label htmlFor='input' ><p>Upload</p></label>
      <input id='input' type='file' onChange={(e)=>{
        song_upload(e , props.add) ;
      }}  />
    </div>
  )
}

const drag_mouse = (e) => {
  e.preventDefault();
  pos_3 = e.clientX ;
  pos_4 = e.clientY ;
  document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  } ;
  document.onmousemove = (e) => {
    e = e || window.event;
    e.preventDefault();
    pos_1 = pos_3 - e.clientX;
    pos_2 = pos_4 - e.clientY;
    pos_3 = e.clientX;
    pos_4 = e.clientY;
    $(menu).css('top' , `${(menu.offsetTop - pos_2)}px`)
    $(menu).css('left' , `${(menu.offsetLeft - pos_1)}px`)
  } ;
}


function Menu_head(props) {
  useEffect(()=>{
    $('#men_h p').click(props.cli)
  },[])
  return(
    <div id='men_h' onMouseDown={drag_mouse}  >
      <div>
        <p>s.</p>
        <p>p.</p>
        <p>c.</p>
        <p>m.</p>
        <p>t.</p>
      </div>
    </div>
  )
}

function Menu_content(props){
  const [ add , set_add ] = useState(false)
  function update() {
    add ? set_add(false) : set_add(true)
  }
  useEffect(()=>{
    $('.t_p').remove() ;
    props.p_s.els.forEach(_p => {
      let p_ = document.createElement('p') ;
      p_.textContent = _p ;
      p_.classList.add('t_p') ;
      $(p_).insertBefore('#men_co > div')
    }) ;
    if( props.p_s.up ) {
      $('.t_p').click((e) => {
        let aa = songs.find(obj => {
          return obj.name === e.currentTarget.textContent ;
        })
        audio.src = aa.src ;
        document.title =  "Sspectrum - "+ aa.name ;
        audio.play() ;
      })
    }else {
      $('.t_p').click(props.click) ;
    }
  })
  return (
    <div id='men_co' >
      <p onMouseDown={drag_mouse} >// {props.p_s.name}</p>
      { props.p_s.up ? <S_upload add={update} /> : <div  /> }
    </div>
  )
}

const op_s = [
  {
    id  : 's.' ,
    name : 'songs' ,
    els :  songs_names(),
    up : true
  } ,
  {
    id  : 'p.' ,
    name : 'presets' ,
    els : set_name('p')
  } ,
  {
    id  : 'c.' ,
    name : 'colors' ,
    els : set_name('c')
  } ,
  {
    id  : 'm.' ,
    name : 'mirrors' ,
    els : set_name('m')
  } ,
]
let which_theme = 0 ;

const set_theme = () => {
  which_theme++ ;
  if( which_theme >= themes.length ){
    which_theme = 0 ;
  }
  for ( let i = 0 ; i < themes[which_theme].length ; i++ ){
    css_var_sty.style.setProperty( '--' + theme_properties[i] , themes[which_theme][i] ) ;
  }
}

function Slide_btn () {
  var cha  = {
    l_ : '100%' ,
    co_ : '>' ,
    cc_ : '-15em' ,
  }
  const c_click = (e) => {
    if ( e.target.textContent === '>' ) {
      cha.l_ =  '95%' ; cha.co_ =   '<'  ; cha.cc_ = '0%'
    } else {
      cha.l_ = '100%' ; cha.co_ =  '>' ; cha.cc_ = '-15em'
    }

    $(e.target).css('left' , cha.l_)
    $(e.target).text(cha.co_) ;
    $(e.target.parentNode).css('left' , cha.cc_)
  }
  return <button onClick={c_click} >{'>'}</button>
}

function Menu(props){
  const [ w_m , set_w_m ] = useState(op_s[0]) ;
  useEffect(()=>{
    menu = get_elem('#menu') ;
    css_var_sty = get_elem(':root') ;
  },[])
  const head_ps_click = (e) => {
    let cur_txt = e.currentTarget.textContent ;
    if ( cur_txt === 't.' ) {
      set_theme()
    } else {
      set_w_m(
        op_s.find(obj => {
          return obj.id === cur_txt
        })
      );
    }
  }
  return (
    <div id='menu' className={ props.is ? 'menu_2' : '' } >
      <Menu_head cli={head_ps_click} />
      <Menu_content p_s={w_m} click={props.click} />
      { props.is ? <Slide_btn /> : <div/> }
    </div>
  )
}

//
/// CANVAS

function reg_gr () {
  for ( let i = 0 ; i < gradients.length ; i++ ) {
    audioMotion.registerGradient( 'gra_' + i , gradients[i] )
  }
  audioMotion.setOptions(default_options)
}

//
/// MOBILE

function Mobile_notif(){
  const [ first_tab , is_first_tab ] = useState(true) ;
  const [ is_vis , set_is_vis ] = useState(true) ;

  const set_direct_landscape = () => {
    if ( screen.orientation.type.slice(0 , 1) === 'p' ) {
      screen.orientation.lock('landscape').then(res => {
        ori_is_set() ;
      } , err => {
        set_indirect_landscape()
      })
    }else {
      set_is_vis(false)
    }
  }
  
  const indi_ori_is_set = () => {
    window.clearInterval(inter_v) ;
    ori_is_set()
  }
  
  const ori_is_set = () => {
    set_is_vis(false) ;
    screen.orientation.onchange = () => {
      set_is_vis(true) ;
      set_direct_landscape() ;
      full_screen()
    } ;
  }
  
  var inter_v ;
  const set_indirect_landscape = () => {
    inter_v = setInterval( () => {
      if ( window.innerWidth > window.innerHeight ) {
        indi_ori_is_set() ;
      }
    } , 5000)
  }

  function full_screen () {
    if ( !document.fullscreenElement ){
      let elem = get_elem('#display') ;
      let ful_l = elem.mozRequestFullScreen || elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullScreen ;
      ful_l.call(elem).then( res => {
        is_first_tab(false) ;
        set_direct_landscape() ;
      } , err => {
        set_is_vis(true)
      } )
    }
  }
  
  useEffect(()=>{
    return () => {
      screen.orientation.onchange = null
    }
  },[])

  return is_vis ? 
      <div id='mobile_notif' >
        { first_tab ? 
          (<div>
            <p>Go Full Screen!</p>
            <button onClick={full_screen} >Full Screen</button>
          </div>) : 
          (<div>
            <p className='rot_p' > Rotate your device for Best Perfomance </p>
          </div>)
        }
      </div> 
    : 
    <div/>
}

//
/// MAIN

function Container() {
  var sec_ac = {} , is_mobile ;

  is_mobile = navigator.userAgent.toLowerCase().match(/mobile/i) ? true : false ;

  function handle_click(e) {
    let ac = options.find( obj => {
      return obj.name === e.target.textContent ;
    } )
    if ( ac.id === 'p' ){
      audioMotion.setOptions(Object.assign(default_options , sec_ac)) ;
    }
    audioMotion.setOptions(ac.option) ;
    if ( ac.option.gradient !== undefined ){
      sec_ac.gradient = ac.option.gradient
    }
  }
  useEffect(()=> {
    document.title = 'Sspectrum' ;
    
    audioMotion = new audioMotionAnalyzer(
      get_elem('#ca_ntainer') ,
      {
        source : audio , 
      }
    ) ;
    reg_gr() ;
  } , [])
  return (
    <div id="display">
      <div id='ca_ntainer' ></div>
      <AudioPlayer />
      <Menu click={handle_click} is={is_mobile} />
      { is_mobile ? <Mobile_notif /> : <div/> }
    </div>
  );
}

function App() {
  return (
    <main>
      <Container />
    </main>
  );
}

export default App;
