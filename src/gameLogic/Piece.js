export default class Piece
{
    constructor(player, image_name, initial_position)
    {
        this.player = player;
        this.image_name = image_name;
        this.initial_position = initial_position;
        this.position = initial_position;
        this.pieceID = player.substr(0,1) + image_name.substr(0,1) + initial_position.x;
        
    }

}