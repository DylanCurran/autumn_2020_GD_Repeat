class Player
{
    constructor(canvas, imageOptions)
    {
        this.image = new Image();
        this.xStart = imageOptions.xStart;
        this.yStart = imageOptions.yStart;
        this.startWidth = imageOptions.startWidth;
        this.startHeight = imageOptions.startHeight;
        this.x = imageOptions.x;
        this.y = imageOptions.y;
        this.width = imageOptions.width;
        this.height = imageOptions.height; 
        this.ctx = canvas;
        this.image.src = imageOptions.image;
        this.image.style.opacity = imageOptions.opacity;
        this.isActive = true;
        this.firstCollisonCheck = false;
        this.jumpNow = false;
        this.fallNow = false;
        this.jumpDelay = 0;

    }
    update()
    {

    }
    draw(counter, canvas)
    {
      
       
            canvas.drawImage(this.image, this.xStart + counter * 30 ,this.yStart,
            this.startWidth,this.startHeight,this.x,
            this.y, this.width, this.height);
       
            
            
    }

    
    jump()
    {
        if(!this.fallNow)
        {
        this.jumpNow = true;
        }
    }
   
    startGameFix()
    {
        this.start = false;
    }

    Jump()
    {
        if(this.jumpDelay >= 2 && this.jumpNow)
        {        
            this.y -= 10;
            this.jumpDelay = 0;
        }
        if(this.y <= 160)
        {
            this.jumpNow = false;
            this.fallNow = true;
        }
        if(this.jumpDelay >= 2 && this.fallNow)
        {
            this.y += 10;
            this.jumpDelay = 0;
        }
        if(this.y >= 260 && !this.jumpNow)
        {
            this.fallNow = false;
            this.y = 260;
        }
        if(!this.jumpNow && !this.fallNow)
        {
            this.jumpDelay = 0;
        }
        else{
            this.jumpDelay++;
        }
    }
    exitTutorial()
    {
        this.end = true;
    }

    initGame()
    {
        this.start = true;
        this.end = false;
        this.tutorial = false;
    }

    resetPosition()
    {
        this.y = 260
        this.jumpNow = false;
        this.fallNow = false;
    }
}