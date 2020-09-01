class Game
{
    
    constructor()
    {
		this.boundRecursiveUpdate = this.update.bind(this);
		this.ctx = {};
		this.spriteCounter;
		this.animationDelay;
		this.jumpDelay;
		this.jumpNow = false;
		this.fallNow = false;
		this.TOTAL_OBSTACLES = 3;
		this.speed = 5;
		this.obstacleWidth = 30;
		this.obstacleHeight = 50;
		this.audio = new AudioContext();
		//this.ws = new WebSocket("ws://localhost:8080/index.html");
		this.soundBuffer;
		this.playerSetup();
		this.obstacleSetup();
		this.atMainMenu = true;
		this.menu = new Menu();
		this.endMenu = new EndMenu();
		this.score = new Score();
		this.ground = new Ground(0,300, window.innerWidth, window.innerHeight);
		//this.loadSound('pickup.ogg');
		var sound;
		this.loadSound("jump.wav");
		this.initCanvas();
		this.player.initGame();
		

    }
    initCanvas()
    {
		this.audioBuffer = 
		this.spriteCounter = 0;
		this.animationDelay = 0;
		this.jumpDelay = 0;
		this.jumpNow = false;
		this.fallNow = false;
	    var canvas = document.createElement("canvas");
	    // Assign the canvas an id so we can reference it elsewhere.
	    canvas.id = 'mycanvas';
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	    // We want this to be a 2D canvas.
	    this.ctx = canvas.getContext("2d");
	    // Adds the canvas element to the document.
		document.body.appendChild(canvas);	   
        console.log("Initialising game world")
        
		document.addEventListener("keydown", this.keyDownHandler.bind(null,this.player));
		canvas.addEventListener("touchstart", on_touch_start);
    	canvas.addEventListener("touchend", on_touch_end);
		   canvas.addEventListener("touchmove", on_touch_move.bind(null,this.ctx));
		  // this.ws.onopen = function() {
			//this.ws.send("Game has begun");
			//};
			var context;



    }
    keyDownHandler(player,e)
    {
		
    // triggers when up arrow is pressed
	 if(e.keyCode === 38)
	 {
			player.jump();
		
	 }

	 // triggers when the down arrow key is pressed
	 if(e.keyCode === 40 && player.tutorial)
	 {	
		 player.exitTutorial();
	 }
	 if(e.keyCode === 40 && player.achievement)
	 {
		 player.exitAchieve();
		 player.start = true;
	 }
	 if(e.keyCode == 32 && player.start )
	 {
		player.start = false;
	 }
	 //restart game
	 if(e.keyCode == 32 && player.end)
	 { 
		 player.resetPosition();
		 player.end = false;
		 player.tutorial = false;
	 }
	 if(e.keyCode == 13 && player.start)
	 {
		 player.colourChange();
	 }
	 //return to menu
	 if(e.keyCode == 13 && player.end)
	 {
		player.start = true;
		player.end = false;
		player.tutorial = false;
	 }
	 if(e.keyCode == 32 && player.start)
	 {
		 player.start = false;
	 }
	 if(e.keyCode == 84)
	 {
		 console.log("Keypress");
		player.tutorial = true;
		player.start = false;
	 }
	 if(e.keyCode == 65)
	 {
		 player.achievement = true;
		 player.start = false;
		 console.log("achieved");
	 }
	

	}
	
    update()
	{
		var format = '.' + (new Audio().canPlayType('wav/mp3') !== '' ? 'wav' : 'mp3');
		//called when the client receives a message
	//	this.ws.onmessage = function (evt) {
	//		console.log("Event trigger");
	//		alert(evt.data);
	//		};
		if(this.lives <= 0)
		{
			this.ResetGame();
			this.player.end = true;
		}
		window.requestAnimationFrame(this.boundRecursiveUpdate);
		this.draw();
		this.animationDelay++;
		if(this.animationDelay >= 10)
		{
			this.spriteCounter++;
			this.animationDelay = 0;
		}
		if(this.spriteCounter >= 6)
		{
			this.spriteCounter = 0;
		}
		if(this.player.fallNow || this.player.jumpNow)
		{
		this.player.Jump();
		}
		else
		{
			this.player.y = 260;
		}
		if(!this.player.start && this.player.end == false && !this.player.achievement)
		{
			for(var i = 0; i < 3 ; i++)
			{
				this.obstacleArray[i].move();
			}
			if(!this.player.tutorial)
			{
				this.score.update();
			}
		}
		this.playerCollider();
	}
	draw()
	{
		this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        if(!this.player.start && this.player.end == false && !this.player.achievement)
		{
			this.player.draw(this.spriteCounter,this.ctx);
			this.ground.draw(this.ctx);
			if(!this.player.tutorial)
			{
				this.score.displayScore(this.ctx)
			}
			for(var i = 0; i < 3 ; i++)
			{
				this.obstacleArray[i].draw(this.ctx,this.player.colourChanger);
			
			}

		}
		else if(this.player.start)
		{
			
			this.menu.screenMenu(this.ctx);
		}
		else
		{
			if(this.player.achievement)
			{
				this.score.displayAchievements(this.ctx);
			}
			else
			{
				
				if(!this.player.tutorial)
				{
					this.endMenu.screenMenuEnd(this.ctx);
					this.ResetGame();
					this.score.resetScore();
				}
				else
				{
					this.endMenu.tutorialEnd(this.ctx);
					this.ResetGame();
				}
			}
		}
		
		

	}
	
	loadSound(url) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
	  
		request.onload = function() {
		  // request.response is encoded... so decode it now
		  context.decodeAudioData(request.response, function(buffer) {
			sound = buffer;
		  }, function(err) {
			throw new Error(err);
		  });
		}
	  
		request.send();
	  }

	playSound(sound)
	{
		var playSound = this.audio.createBufferSource();
		playSound.buffer = audio;
		playSound.connect(this.audio.destination);
		playSound.start(0);
	}
	



	obstacleSetup()
	{
		this.obstacle = new Obstacle(300,250, this.obstacleWidth, this.obstacleHeight, this.speed);
		this.obstacle2 = new Obstacle(700,250,this.obstacleWidth,this.obstacleHeight,this.speed);
		this.obstacle3 = new Obstacle(1100,250,this.obstacleWidth,this.obstacleHeight,this.speed);
		this.obstacleArray = [this.obstacle,this.obstacle2,this.obstacle3];
	}
	

	playerSetup()
	{
		this.imageStuff1 = {image: 'player sprite sheet.jpg', xStart: 0, yStart: 0
		, startWidth: 30, startHeight:40,  
		x: 100, y: 260,width: 30, height: 40, opacity: 1};
		this.player = new Player(this.ctx, this.imageStuff1);
		
	}

	playerCollider()
	{
		
		for (var i = 0; i < this.TOTAL_OBSTACLES; i++)
		{
			
			if(this.player.x < this.obstacleArray[i].x + this.obstacleWidth &&
				this.player.x + this.player.width > this.obstacleArray[i].x &&
				this.player.y + this.player.height > this.obstacleArray[i].y)
				{
					if(!this.player.tutorial)
					{
						this.player.end = true;
					}
					else
					{
						console.log("tutorial wall hit");
					}
				}
		}
	}
	

	

	ResetGame()
	{
		this.player.resetPosition();
		this.obstacleSetup();
		this.player.colourChanger = false;
	}
}