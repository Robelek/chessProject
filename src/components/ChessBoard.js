import Tile from "./ChessBoardComponents/Tile";
import {Vector2} from "../gameLogic/GameLogic"



function ChessBoard(props) {
    let TileArray = [];

    let Pieces = props.Pieces;



    const ChessBoardSize = 8;

    for(let x=0;x<ChessBoardSize;x++)
    {
        for(let y=0;y<ChessBoardSize;y++)
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


            let thisPosition = new Vector2(y, x);

            let PieceOnThisTile = [];

            for(let i=0;i<Pieces.length;i++)
            {
                if(Pieces[i].position.isEqualTo(thisPosition))
                {
                    PieceOnThisTile = Pieces[i];
                    i = Pieces.length;
                }
            }

            TileArray.push(
            <Tile key={id} color={color} {...PieceOnThisTile} >
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
