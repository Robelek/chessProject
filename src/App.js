import './App.css';
import ChessBoard from './components/ChessBoard';
import UserInterface from './components/UserInterface';
import Piece from './gameLogic/Piece';
import {Vector2, GameState, GetIdFromPosition, GetPositionFromTileId, isPositionInBoard, 
  makeNewChessBoard, handlePieceMovement, handlePawnMovement
} from './gameLogic/GameLogic';

import { useState } from 'react';





function App(props) {
  const [Pieces, setPieces] = useState([]);
  const [currentGameState, setGameState] = useState(new GameState());
  const [overlayMoves, setOverlayMoves] = useState([]);
  
  const ChessBoardSize = 8;

  function InitialiseChessBoard()
  {
    let newPieces = makeNewChessBoard();
    setGameState(new GameState());
    setPieces(newPieces);
    setOverlayMoves([]);
  }

  function DisplayAvailableMoves(e, player, image_name, position, pieceID )
  {
    setOverlayMoves([]);
    console.log(`${pieceID}, (${position.x}, ${position.y})`);
    if(player!==currentGameState.turnOf)
    {
      return false;
    }

    currentGameState.currentlySelectedPieceID = pieceID;
    let possibleMoves = [];

    switch(image_name)
    {
      case "pawn.png":
        possibleMoves = handlePawnMovement(Pieces, pieceID, currentGameState, ChessBoardSize, position);
        break;
      default:
        console.log("not handled yet");
    }

    setOverlayMoves(possibleMoves);
  }

  function MovePiece(tileID)
  {
    let newPieces = handlePieceMovement(Pieces, ChessBoardSize, currentGameState, tileID);


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
