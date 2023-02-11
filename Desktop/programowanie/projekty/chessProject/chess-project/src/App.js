import './App.css';
import ChessBoard from './components/ChessBoard';
import UserInterface from './components/UserInterface';
import Piece from './gameLogic/Piece';
import {Vector2} from './gameLogic/GameLogic';
import { useState } from 'react';





function App(props) {
  const [Pieces, setPieces] = useState([]);

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

    function displayMoves()
    {
      console.log("here!");
    }

    for(let i=0;i<8;i++)
    {
      newPieces.push(new Piece("black", "pawn.png", new Vector2(i, 1)));
    }

    let currentSize = newPieces.length;

    for(let i=0;i<currentSize;i++)
    {
      let modifiedPiece = new Piece("white", newPieces[i].image_name, new Vector2(newPieces[i].position.x, newPieces[i].position.y));
      modifiedPiece.position.add(new Vector2(0,6));

      newPieces.push(modifiedPiece);
    }

    setPieces(newPieces);
  }


  return (
    <main>
          <ChessBoard Pieces={Pieces} ></ChessBoard>
          <UserInterface initFunction = {InitialiseChessBoard}></UserInterface>
    </main>

  );
}

export default App;
