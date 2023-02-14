import Piece from "./Piece";
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

export function GetIdFromPosition(position, ChessBoardSize)
{
  return position.y * ChessBoardSize + position.x;
}

export function GetPositionFromTileId(tileID, ChessBoardSize)
{
  let y = Math.floor(tileID/ChessBoardSize);
  let x = tileID - y*ChessBoardSize;
  
  return new Vector2(x, y);
}

export function isPositionInBoard(position, ChessBoardSize)
{
  return position.x>=0&&position.x<ChessBoardSize&&position.y>=0&&position.y<ChessBoardSize;
}



export function makeNewChessBoard()
{
    let newPieces = [];
    newPieces.push(
      new Piece("black", "tower.png", new Vector2(0,0)),
      new Piece("black", "horse.png", new Vector2(1,0)),
      new Piece("black", "bishop.png", new Vector2(2,0)),
      new Piece("black", "queen.png", new Vector2(3,0)),
      new Piece("black", "king.png", new Vector2(4,0)),
      new Piece("black", "bishop.png", new Vector2(5,0)),
      new Piece("black", "horse.png", new Vector2(6,0)),
      new Piece("black", "tower.png", new Vector2(7,0)),
      
    );

    let currentSize = newPieces.length;

    for(let i=0;i<currentSize;i++)
    {
      let modifiedPiece = new Piece("white", newPieces[i].image_name, new Vector2(newPieces[i].position.x, newPieces[i].position.y));
      modifiedPiece.position.add(new Vector2(0,7));

      newPieces.push(modifiedPiece);
    }

    for(let i=0;i<8;i++)
    {
      newPieces.push(new Piece("black", "pawn.png", new Vector2(i, 1)));
    }

      for(let i=0;i<8;i++)
    {
      newPieces.push(new Piece("white", "pawn.png", new Vector2(i, 6)));
    }
    return newPieces;
}
export function handlePawnMovement(Pieces, pieceID, currentGameState, ChessBoardSize, position)
{
    let possibleMoves = [];

    let thisPieceIndex = Pieces.findIndex((currentPiece) =>
    {
      return currentPiece.pieceID === pieceID;
    }
    )

    //console.log(thisPieceIndex);
    let checkHowMany = 1;
    if(Pieces[thisPieceIndex].initial_position.isEqualTo(position))
    {
      checkHowMany = 2;
    }
    
    let ownerMultiplier = 1;
    if(currentGameState.turnOf==="white")
    {
      ownerMultiplier = (-1);
    }
      //pawn hasn't moved
      for(let i=0;i<checkHowMany;i++)
      {
        let positionToCheck = new Vector2(position.x, position.y + ownerMultiplier*(i+1));

        if(isPositionInBoard(positionToCheck, ChessBoardSize))
        {
            let tileID = "Tile_" + GetIdFromPosition(positionToCheck, ChessBoardSize);

            let noPieceHere = true;

            let tileChildren = document.getElementById(tileID).children;
            for(let j=0;j<tileChildren.length;j++)
            {
              if(tileChildren[i]!==undefined)
              {
                  if(tileChildren[i].classList.contains("Piece"))
                {
                  noPieceHere = false;
                }
                
              }
              
            }

            if(noPieceHere)
            {
              possibleMoves.push(positionToCheck);
            }
            else
            {
              
              i=2;
            }

        }
        

      }

      //let's check captures
      for(let i=-1;i<2;i+=2)
      {
        let positionToCheck = new Vector2(position.x+i, position.y+ownerMultiplier);
      
        if(isPositionInBoard(positionToCheck, ChessBoardSize))
        {
          let tileID = "Tile_" + GetIdFromPosition(positionToCheck, ChessBoardSize);
          let tileChildren = document.getElementById(tileID).children;
          

          for(let j=0;j<tileChildren.length;j++)
          {
            if(tileChildren[j] !== undefined && tileChildren[j].classList.contains("Piece") 
            && !tileChildren[j].classList.contains(currentGameState.turnOf))
            {
                possibleMoves.push(positionToCheck);
               
                console.log(`found one: ${positionToCheck.x}, ${positionToCheck.y}`);
                j=tileChildren.length;
            }
          }
        }
       

      }
    return possibleMoves;
    
}
export function handlePieceMovement(Pieces, ChessBoardSize, currentGameState, tileID)
{
    let newPieces = [...Pieces];

   
    let thisTile = document.getElementById("Tile_"+tileID);
    let thisPosition = GetPositionFromTileId(tileID, ChessBoardSize);
    
    let indexToRemove = newPieces.findIndex((currentPiece) =>
    {
      return currentPiece.position.isEqualTo(thisPosition);
    })
    if(indexToRemove>0)
    {
      newPieces.splice(indexToRemove,1);
    }
    
  
  

    let pieceIndex = newPieces.findIndex(thisPiece => {
      return thisPiece.pieceID == currentGameState.currentlySelectedPieceID;
    })

    newPieces[pieceIndex].position = thisPosition;
    
    console.log(`${currentGameState.currentlySelectedPieceID} to ${tileID}`);

    return newPieces;
}