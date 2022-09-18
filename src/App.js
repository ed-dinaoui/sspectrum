import React, { useState, useEffect } from 'react';
import './main.css';
import audioMotionAnalyzer from './lib/audioMotion-analyzer';
import $ from 'jquery';
import options , { gradients , default_options } from './lib/options' ;
import default_song from './music/aether-illusion.mp3' ;

var audioMotion ;

//
/// AUDIO PLAYER

var v_track, audio;

function adjust_volume(e) {
  e.preventDefault();
  let pos_3 = e.clientX;
  let le = v_track.parentNode.offsetLeft;
  let le_wi = parseFloat(getComputedStyle(v_track.parentNode).width);

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
      lef = le + le_wi;
    }
    $(v_track).css('left', `${lef}px`);
    audio.volume = ((lef - le) / le_wi) * 1;
  };
}

function Play_btn() {
  const [play, is_playing] = useState('l>');
  const click = () => {
    if (play === 'l>') {
      is_playing('ll');
      audio.play();
    } else {
      is_playing('l>');
      audio.pause();
    }
  };
  return <p onClick={click}>{play}</p>;
}

function AudioPlayer() {
  var song_track;
  const time_bar = () => {
    let s_tp = (audio.currentTime / audio.duration) * 100;
    $('.s_track > div').css('width', s_tp.toFixed(1) + '%');
  };
  useEffect(() => {
    v_track = document.querySelector('.v_track > div');
    audio = document.getElementById('audio');
  }, []);
  return (
    <div id="audio_player">
      <audio
        id="audio"
        src={default_song}
        onPlay={() => {
          song_track = setInterval(time_bar, 500);
        }}
        onPause={() => {
          window.clearInterval(song_track);
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

var menu ;
var pos_1, pos_2, pos_3, pos_4;

var songs = [
  {
    id : 0 ,
    name : 'aether-illusion' ,
    src : default_song
  } ,
]

//
//// in case of storing audio hashed srcs
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
  let nam_e = target.value.split("fakepath")[1].slice(1,this.length).split('.m')[0];

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
        audio.oncanplay = (e) => {
          e.target.play()
        }
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

function Menu(props){
  const [ w_m , set_w_m ] = useState(op_s[0]) ;
  useEffect(()=>{
    menu = document.getElementById('menu') ;
    localStorage.clear() ;
  },[])
  const head_ps_click = (e) => {
    set_w_m(
      op_s.find(obj => {
        return obj.id === e.currentTarget.textContent
      })
    );
  }
  return (
    <div id='menu'>
      <Menu_head cli={head_ps_click} />
      <Menu_content p_s={w_m} click={props.click} />
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
/// MAIN

function Container() {
  function handle_click(e) {
    let ac = options.find( obj => {
      return obj.name === e.target.textContent ;
    } )
    audioMotion.setOptions(default_options)
    audioMotion.setOptions(ac.option) ;
    console.log(ac.option)
  }
  useEffect(()=> {
    audioMotion = new audioMotionAnalyzer(
      document.getElementById('ca_ntainer') ,
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
      <Menu click={handle_click} />
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
