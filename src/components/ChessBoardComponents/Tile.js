import Piece from "../../gameLogic/Piece";

function Tile(props) {
   const tileStyle = {
     width: "5rem",
     height: "5rem"
   };

   let whatToRender = <div> </div>;
   
   if(typeof props.player == "string")
   {
    whatToRender =  <img className={"Piece "+props.player} src={process.env.PUBLIC_URL+"/images/chessPieces/"+props.image_name} />; 
    
   }



    return (
      <div className={props.color+"Tile"} style={tileStyle}>
         {whatToRender}
      </div>
  
    );
  }
  
 export default Tile;
  