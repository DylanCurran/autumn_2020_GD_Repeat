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
            this.gotBronze();
            this.gotSilver();
            this.gotGold();
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
    displayAchievements(canvas)
    {
        canvas.save();
        canvas.fillStyle= "#000000";
		canvas.font = "italic 20pt Calibri";
        canvas.textBaseLine = "top";
        if(this.earnedBronze)
        {
            canvas.fillText("You earned a bronze medal", 50, 50);
        }
        if(this.earnedSilver)
        {
            canvas.fillText("You earned a silver medal", 50, 150);
        }
        if(this.earnedGold)
        {
            canvas.fillText("You earned a gold medal", 50, 250);
        }
        canvas.fillText("Press the down key to return to the menu",100,350);
        canvas.restore();
    }
    resetScore()
    {
        this.score = 0;
    }


}