class Score
{
    constructor()
    {
        this.bronze = 500;
        this.silver = 1000;
        this.gold = 2500;
        this.score = 0;
        this.highScore = 0;
        this.earnedBronze = false;
        this.earnedSilver = false;
        this.earnedGold = false;
        this.scoreDelay = 0;

    }

    gotBronze()
    {
        if(this.score >= this.bronze)
        {
            this.earnedBronze = true;
        }
    }

    gotSilver()
    {
        if(this.score >= this.silver)
        {
            this.earnedSilver = true;
        }
    }
    gotGold()
    {
        if(this.score >= this.gold)
        {
            this.earnedGold = true;
        }
    }

    update()
    {
        this.scoreDelay++;
        if(this.scoreDelay >= 5)
        {
            this.score++;
            this.scoreDelay = 0;
        }
        if(this.highScore < this.score)
        {
            this.highScore = this.score;
        }
    }
    displayScore(canvas)
    {
        canvas.save();
		canvas.fillStyle= "#000000";
		canvas.font = "italic 20pt Calibri";
        canvas.textBaseLine = "top";
        canvas.fillText("Current Score: " + this.score, 50, 50);
        canvas.fillText("High Score: " + this.highScore, 450, 50);
		canvas.restore();
    }
    resetScore()
    {
        this.score = 0;
    }


}