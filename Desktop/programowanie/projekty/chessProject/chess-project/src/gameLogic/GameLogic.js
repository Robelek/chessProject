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