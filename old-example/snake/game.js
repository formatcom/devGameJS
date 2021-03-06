(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var deltaTime  = 0
  var timeElapse = 0
  
  var _debugUpdate = 300

  var _seg  = 0
  var _fps  = 0
  var _x = 0
  var _y = 0

  var stage = null
  var head  = null
  var body  = []
  var particle = null
  var snake    = null

  var keyboard = {}

  function init(){
    stage = new DEVGAME.Container()
    stage.setContext(context)

    head = new DEVGAME.entity.Arc(canvas.clientWidth/2, canvas.clientHeight/2, 5, 0, DEVGAME.PI_2)
    head.color = '#D7DF01'
    head.fill  = true

    body = [
      head
    ]

    particle = new DEVGAME.entity.Arc(-100, -100, 4, 0, DEVGAME.PI_2)

    for (var i = 0; i < 400; i++){
      var x = particle.clone()
      x.color = '#424242'
      x.fill  = true
      body.push(x)
    }
    
    snake = new DEVGAME.Container()

    for ( var i = body.length-1; i >= 0; i-- ){
      snake.add(body[i])
    }

    snake.direction = 0
    snake.speed     = 0.15

    snake.move = function(){
      for ( var i = body.length-1; i > 0; i-- ){
        body[i].x = body[i - 1].x
        body[i].y = body[i - 1].y
      }

      var direction = this.direction

      if ( direction === 0 ){
        head.x += this.speed * -1 * deltaTime
      }

      if ( direction === 1 ){
        head.y += this.speed * -1 * deltaTime
      }

      if ( direction === 2 ){
        head.x += this.speed * +1 * deltaTime
      }
      
      if ( direction === 3 ){
        head.y += this.speed * +1 * deltaTime
      }

      if (head.getX() > canvas.clientWidth - head.radius){
        head.x = 0
      }

      if (head.getY() > canvas.clientHeight - head.radius){
        head.y = 0
      }

      if (head.getX() < 0){
        head.x = canvas.clientWidth - head.radius
      }

      if (head.getY() < 0){
        head.y = canvas.clientHeight - head.radius
      }
    }

    snake.logic = function(){
      if (keyboard[DEVGAME.KEY_LEFT]  && this.direction !== 0){
        this.direction = 0
      }

      if (keyboard[DEVGAME.KEY_UP]    && this.direction !== 1){
        this.direction = 1
      }

      if (keyboard[DEVGAME.KEY_RIGHT] && this.direction !== 2){
        this.direction = 2
      }

      if (keyboard[DEVGAME.KEY_DOWN]  && this.direction !== 3){
        this.direction = 3
      }

      this.move()

    }
    stage.add(snake)
    events()
    run(loop)

  }

  function exec(timestamp){
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    if (_seg >= _debugUpdate){
      
      _fps = (1/deltaTime)*1000
      _x   = head.x
      _y   = head.y
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

    context.fillStyle = '#8000FF'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'SNAKE DEVGAME', 10, 20 )
    context.fillText( 'FPS: '+ _fps,   10, 40 )
    context.fillText( 'x: '+ _x,   10, 60 )
    context.fillText( 'y: '+ _y,   10, 80 )
  }

  function events(){
    document.addEventListener('keydown', function(event){
      event.preventDefault()
      keyboard[event.keyCode] = true
    }, false)

    document.addEventListener('keyup', function(event){
      event.preventDefault()
      keyboard[event.keyCode] = false
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
