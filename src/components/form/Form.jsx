import React, {Component} from "react";
import "./form.css"
class Form extends Component{
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
  }

  addNote(){
    this.props.addNote(this.textinput.value);
    this.textinput.value="";
    this.textinput.focus();
  }
  render(){
    return(
      <div className="form">
        <input type="text" placeholder="Nueva Actividad" ref={input=>this.textinput = input}/>
        <button onClick={this.addNote}>Agregar</button>
      </div>
    );
  }
}

export default Form;
