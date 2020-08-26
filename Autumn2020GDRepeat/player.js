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
    }
    update()
    {

    }
    draw(counter, canvas)
    {
      
       if(this.isActive)
       {
            canvas.drawImage(this.image, this.xStart + counter * 45 ,this.yStart,
            this.startWidth,this.startHeight,this.x,
            this.y, this.width, this.height);
       }
            
            
    }

    

   

    moveUp()
    {
        this.y -= 5;
    }
    moveDown()
    {
        this.y += 5;
    }


   

    startGameFix()
    {
        this.start = false;
    }


}