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

    draw(ctx,colour)
    {
        if(colour)
        {
            ctx.fillStyle = "#00FF00";
        }
        else
        {
            ctx.fillStyle = "#FF0000";
        }
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    
}