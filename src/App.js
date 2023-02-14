import './App.css';
import ChessBoard from './components/ChessBoard';
import UserInterface from './components/UserInterface';
import Piece from './gameLogic/Piece';
import {Vector2, GameState} from './gameLogic/GameLogic';
import { useState } from 'react';





function App(props) {
  const [Pieces, setPieces] = useState([]);
  const [currentGameState, setGameState] = useState(new GameState());
  const [overlayMoves, setOverlayMoves] = useState([]);
  
  const ChessBoardSize = 8;

  function InitialiseChessBoard()
  {
    console.log("Test!");
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

    
    setGameState(new GameState());
    setPieces(newPieces);
    setOverlayMoves([]);
  }

  function GetIdFromPosition(position)
  {
    return position.y * ChessBoardSize + position.x;
  }

  function GetPositionFromTileId(tileID)
  {
    let y = Math.floor(tileID/ChessBoardSize);
    let x = tileID - y*ChessBoardSize;
    
    return new Vector2(x, y);
  }

  function isPositionInBoard(position)
  {
    return position.x>=0&&position.x<ChessBoardSize&&position.y>=0&&position.y<ChessBoardSize;
  }
  function DisplayAvailableMoves(e, player, image_name, position, pieceID )
  {
    console.log(`${pieceID}, (${position.x}, ${position.y})`);
    if(player!==currentGameState.turnOf)
    {
      return false;
    }

    currentGameState.currentlySelectedPieceID = pieceID;

    switch(image_name)
    {
      case "pawn.png":
        //can only move forwards, but if this is the first turn it can move two tiles forward
        setOverlayMoves([]);
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

            if(isPositionInBoard(positionToCheck))
            {
                let tileID = "Tile_" + GetIdFromPosition(positionToCheck);

                let noPieceHere = true;

                let tileChildren = document.getElementById(tileID).children;
                for(let j=0;j<tileChildren.length;j++)
                {
                  if(tileChildren[i]!==undefined)
                  {
                      if(tileChildren[i].tagName == "IMG")
                    {
                      noPieceHere = false;
                    }
                    else if(tileChildren[i].tagName=="DIV")
                    {
                      console.log("working");
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

          //let's check diagonals
          for(let i=-1;i<2;i+=2)
          {
            let positionToCheck = new Vector2(position.x+i, position.y+ownerMultiplier);
          
            if(isPositionInBoard(positionToCheck))
            {
              let tileID = "Tile_" + GetIdFromPosition(positionToCheck);
              let tileChildren = document.getElementById(tileID).children;
              
  
              for(let j=0;j<tileChildren.length;j++)
              {
                if(tileChildren[j] !== undefined && tileChildren[j].tagName == "IMG" && tileChildren[j].classList.contains("Piece") 
                && !tileChildren[j].classList.contains(currentGameState.turnOf))
                {
                    possibleMoves.push(positionToCheck);
                   
                    console.log(`found one: ${positionToCheck.x}, ${positionToCheck.y}`);
                    j=tileChildren.length;
                }
              }
            }
           

          }
        
        
        setOverlayMoves(possibleMoves);

        break;
      default:
        console.log("not handled yet");
    }

  }

  function MovePiece(tileID)
  {
    let newPieces = [...Pieces];

   
    let thisTile = document.getElementById("Tile_"+tileID);
    let thisPosition = GetPositionFromTileId(tileID);
    
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

    setPieces(newPieces);
    setOverlayMoves([]);
    changeTurnOwner();
  }

  function changeTurnOwner()
  {
    if(currentGameState.turnOf === "white")
    {
      currentGameState.turnOf = "black";
    }
    else
    {
      currentGameState.turnOf = "white";
    }
    setGameState(currentGameState);
  }

  let gameFunctions = {
    "InitialiseChessBoard" : InitialiseChessBoard, 
    "DisplayAvailableMoves" : DisplayAvailableMoves,
    "MovePiece" : MovePiece};


  
  return (
    <main>
          <ChessBoard Pieces={Pieces} gameFunctions = {gameFunctions} ChessBoardSize = {ChessBoardSize} overlayMoves = {overlayMoves}></ChessBoard>
          <UserInterface initFunction = {InitialiseChessBoard} currentGameState = {currentGameState}></UserInterface>
    </main>

  );
}

export default App;
