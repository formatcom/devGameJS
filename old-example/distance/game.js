(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var mousex = 0
  var mousey = 0

  var stage  = null
  var center = null
  var mouse  = null

  function init(){
    stage = new DEVGAME.Container()
    stage.setContext(context)

    center = new DEVGAME.entity.Circle(canvas.clientWidth/2, canvas.clientHeight/2, 15)
    center.color = '#006'

    mouse = new DEVGAME.entity.Circle(mousex, mousey, 5)

    mouse.logic = function(){
      this.x = mousex
      this.y = mousey

      if (this.getX() < 0){
        this.x = 0
      }
      if (this.getX() > canvas.clientWidth){
        this.x = canvas.clientWidth
      }
      if (this.getY() < 0){
        this.y = 0
      }
      if (this.getY() > canvas.clientHeight){
        this.y = canvas.clientHeight
      }
    }

    stage.add(center, mouse)
    events()
    run(loop)
  
  }

  function exec(timestamp){
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    //debug refresh
    if (_seg >= debugRefresh){
      
      _fps = (1/deltaTime)*1000
      _seg = 0
    }
    
    if (deltaTime > 17){
      deltaTime = 0
    }


    stage.exec()
  }

  function draw(){
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    stage.render()
    
    //draw fps
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'FPS: '+ _fps, 10, 20 )
    context.fillText( 'MOUSE X: ' + mouse.x, 10, 40 )
    context.fillText( 'MOUSE Y: ' + mouse.y, 10, 60 )
    context.fillText( 'DISTANCE: '+ DEVGAME.distance.circleToCircle(mouse, center), 10, 80 )
  }

  function events(){
    document.addEventListener('mousemove', function(event){
      mousex = event.pageX - canvas.offsetLeft
      mousey = event.pageY - canvas.offsetTop
    }, false)
  }

  function loop(timestamp){
    exec(timestamp)
    draw()


    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)


})(window, document, DEVGAME)
