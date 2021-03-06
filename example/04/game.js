(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  context.font = 'normal 16px monospace'
  
  // Variable que almacena el delta time
  var deltaTime  = 0

  // Almacena el tiempo transcurrido 
  // en cada frame
  var timeElapse = 0

  // Almacena el fps actual
  var _fps = 0
  // Cuenta los frames
  var _frames = 0

  // Constante, un segundo en milisegundos
  var SECOND = 1000

  // Almacena el tiempo transcurrido
  var _timeCount = 0


  // Funcion que se ejecuta cada paso de ciclo maquina
  function exec(timestamp){

    // Si el timeElapse es 0, quiere decir que va iniciando
    // el juego y se asigna el valor de timestamp de caso
    // contrario se mantiene su valor
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
  
    // Se calcula el delta time
    deltaTime  = timestamp - timeElapse

    // Se actualiza el tiempo transcurrido
    timeElapse = timestamp

    // Se calcula el tiempo transcurrido
    _timeCount += deltaTime

    // Si ya ha pasado mas de un segundo
    // actualizamos los datos
    if (_timeCount > SECOND){
      _fps = _frames
      _frames = 0
      _timeCount -= SECOND
    }

  }

  // Funcion que se encarga de dibujar toda la escena
  function draw(){
    _frames++
    // Importante se limpia toda la pantalla del canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
    // Se dibujan las variables en pantalla
    context.fillText( 'FPS: '+ _fps, 10, 20 )
  }

  // El loop de juego 
  function loop(timestamp){

    exec(timestamp)
    draw()

    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)


  // La funcion init es una funcion que solo
  // se ejecuta una vez y corremos el juego
  function init(){

    run(loop)
  }

  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
