class Obstacle
{
    constructor(x,y,width,height,speed)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    move()
    {
        this.x = this.x - this.speed;
        if(this.x <= -30)
        {
            this.x = 1500;
        }
    }

    draw(ctx)
    {
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    
}