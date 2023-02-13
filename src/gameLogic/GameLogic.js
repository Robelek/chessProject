export class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    isEqualTo(secondVector)
    {
        return this.x == secondVector.x && this.y == secondVector.y;
    }

    add(secondVector)
    {
        this.x+=secondVector.x;
        this.y+=secondVector.y;
    }
}

export class GameState
{
    constructor()
    {
        this.white_points = 0;
        this.black_points = 0;
        
        this.turnOf = "white";

        this.currentlySelectedPieceID = null;
    }
}