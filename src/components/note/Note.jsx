import React, {Component} from "react";
import "./note.css"

class Note extends Component{
  constructor(props){
    super(props);
    this.noteId = props.noteId;
    this.noteContent = props.noteContent;
  }
  handleRemove(id){
    const sure = window.confirm("¿Deseas eliminar la actividad?");
    if(sure) this.props.removeNote(id)
    return;
  }
  render(){
    return(
      <div className="note">
      <span onClick={()=>this.handleRemove(this.noteId)}>&times;</span>
      <p>{this.noteContent}</p>
      </div>
    );
  }
}

export default Note;
