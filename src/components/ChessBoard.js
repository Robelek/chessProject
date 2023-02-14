import Tile from "./ChessBoardComponents/Tile";
import {Vector2} from "../gameLogic/GameLogic"



function ChessBoard(props) {
    let TileArray = [];

    let Pieces = props.Pieces;



    const ChessBoardSize = props.ChessBoardSize;

    for(let y=0;y<ChessBoardSize;y++)
    {
        for(let x=0;x<ChessBoardSize;x++)
        {

            let color = "white";
            if(y%2==1)
            {
                if(x%2==0)
                {
                    color="black";
                }
            }
            else
            {
                if(x%2==1)
                {
                    color="black";
                }
            }

            let id = y*ChessBoardSize+x;


            let thisPosition = new Vector2(x, y);

            let PieceOnThisTile = [];

            for(let i=0;i<Pieces.length;i++)
            {
                if(Pieces[i].isAlive && Pieces[i].position.isEqualTo(thisPosition))
                {
                    PieceOnThisTile = Pieces[i];
                    i = Pieces.length;
                }
            }

            let possibleMove = false;

            if(props.overlayMoves.find((position) =>
            {
                return position.x == x && position.y == y;
            }))
            {
                possibleMove = true;

            }

            TileArray.push(
            <Tile key={id} id={id} color={color} {...PieceOnThisTile} gameFunctions = {props.gameFunctions} possibleMove = {possibleMove}>
            </Tile>);
        }
    }
    
  
  return (
    <div className="ChessBoard">
       {TileArray}
    </div>

  );
}

export default ChessBoard;
