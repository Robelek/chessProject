import Piece from "../../gameLogic/Piece";

function Tile(props) {
   const tileStyle = {
     width: "5rem",
     height: "5rem"
   };

   let whatToRender = null;
   
   if(typeof props.player == "string")
   {
    whatToRender =  <img className={"Piece "+props.player} 
      src={process.env.PUBLIC_URL+"/images/chessPieces/"+props.image_name} 
      onClick = {e => props.gameFunctions["DisplayAvailableMoves"](e.target, props.player, props.image_name, props.position , props.pieceID)}
      />; 
    
   }

   let possibleMoveIndicator = null;

   if(props.possibleMove === true)
   {
    possibleMoveIndicator = <div className="moveIndicator" onClick={() => props.gameFunctions["MovePiece"](props.id)}> 
    <div>
      
    </div>
    </div>
   }


    return (
      <div id={"Tile_"+props.id} className={props.color+"Tile"} style={tileStyle}>
         {whatToRender}
         {possibleMoveIndicator}
      </div>
  
    );
  }
  
 export default Tile;
  