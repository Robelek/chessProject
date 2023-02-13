function UserInterface(props) {
    return (
      <div>
          <div> Turn of: {props.currentGameState.turnOf} </div>
          <button onClick={props.initFunction}> New game </button>
      </div>
  
    );
  }
  
  export default UserInterface;
  