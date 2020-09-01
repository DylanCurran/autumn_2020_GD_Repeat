class Menu
{
    constructor()
    {
        this.active = true;
    }

    startGame()
    {
        this.active = false;
    }

    returnToMenu()
    {
        this.active = true;
    }

    getActive()
    {
        return this.active;
    }

    screenMenu(canvas)
    {
        canvas.save();
		canvas.fillStyle= "#000000";
		canvas.font = "italic 30pt Calibri";
        canvas.textBaseLine = "top";
        canvas.fillText("Welcome to the main Menu", 100, 100);
        canvas.fillText("Press Space to start the game", 100, 200);
        canvas.fillText("Press t to start the tutorial", 100,300);
        canvas.fillText("Press A to View your achievements", 100,400)
        canvas.fillText("Press Enter to change player Colour", 100, 500);
		canvas.restore();
    }
}