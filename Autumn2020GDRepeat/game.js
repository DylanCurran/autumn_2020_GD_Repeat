class Game
{
    
    constructor()
    {
		this.boundRecursiveUpdate = this.update.bind(this);
		this.ctx = {};
		this.spriteCounter;
		this.animationDelay;
		this.ws = new WebSocket("ws://localhost:8080/index.html");
		this.soundBuffer;
		this.audioCtx = new AudioContext();

		this.atMainMenu = true;
		this.menu = new Menu();
		//this.loadSound('pickup.ogg');
		this.initCanvas();
		

    }
    initCanvas()
    {
		this.spriteCounter = 0;
		this.animationDelay = 0;
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
		   this.ws.onopen = function() {
			this.ws.send("Game has begun");
			};

    }
    keyDownHandler(player,e)
    {
		
    // triggers when up arrow is pressed
	 if(e.keyCode === 38)
	 {
		
		player.moveUp();
	 }

	 // triggers when the down arrow key is pressed
	 if(e.keyCode === 40)
	 {
		
		 player.moveDown();
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
	 //return to menu
	 if(e.keyCode == 13 && player.end)
	 {
		player.start = true;
		player.end = false;
		player.tutorial = false;
		player.hardMode = false;
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
	 if(e.keyCode == 72 && player.start)
	 {
		player.hardMode = true;
	 }

	}
	
    update()
	{
		
		//called when the client receives a message
		this.ws.onmessage = function (evt) {
			console.log("Event trigger");
			alert(evt.data);
			};
		if(this.lives <= 0)
		{
			this.ResetGame();
			this.player.end = true;
		}
		window.requestAnimationFrame(this.boundRecursiveUpdate);
		this.draw();

	}
	draw()
	{
        
		this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		this.playerDraw();
		this.player.draw(this.ctx);
		

	}
	
	/*
	loadSound(url)
	{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var context = new AudioContext();
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			// request.response is encoded... so decode it now
			context.decodeAudioData(request.response, function(buffer) {
			  this.pickupSound = buffer;
			}, function(err) {
			  throw new Error(err);
			});
		  }
		
		  request.send();
	}
	playSound(sound)
	{
		const playSound = this.audioCtx.createBufferSource();
		playSound.buffer = audio;
		playSound.connect(this.audioCtx.destination);
		playSound.start(this.audioCtx.currentTime);
	}
	*/




	

	playerSetup()
	{
		this.imageStuff1 = {image: 'banana sprite sheet.png', xStart: 0, yStart: 0, startWidth: 45, startHeight:75,  
		x: 300, y: 125,width: 45, height: 75 , opacity: 1};


		this.player = new Player(this.ctx, this.imageStuff1);
		
	}

	playerDraw()
	{
		/*if(this.spriteCounter >= 10)
		{
			this.spriteCounter = 0;
		}
			for(var i = 0; i < this.bananaArray.length; i++)
			{
				this.player.draw(this.spriteCounter, this.ctx);
			}
			this.animationDelay++;
			if(this.animationDelay >= 5)
			{
			this.spriteCounter++;
			this.animationDelay = 0;
			}

		*/
	}

	playerCollider()
	{
			if(this.player.x < this.obstacle[i].x + this.obstacle[i].startWidth &&
					this.player.x + this.player.width > this.obstacle[i].x &&
					this.player.y < this.obstacle[i].y + this.obstacle[i].startHeight &&
					this.player.y + this.player.height > this.obstacle[i].y)
					{
						
					}
	}
	

	

	ResetGame()
	{
		// reset score and speed of game here
	}
}