import React, { Component } from 'react';
import './App.css';
import Note from "./components/note/Note";
import Form from "./components/form/Form";
import firebase from "firebase";
import {DB_CONFIG} from "./config/config";
import "firebase/database";
class App extends Component {

  constructor(props){
    super(props)
    this.state={
        notes:[]
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child("notes");
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount(){
    const {notes} = this.state;
    this.db.on("child_added", snap=>{
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({notes})
    });
    this.db.on("child_removed",snap=>{
      for(let i=0; i<notes.length; i++){
        if(notes[i].noteId=snap.key){
          notes.splice(i,1);
        }
      }
      this.setState({notes});
    })
  }
  removeNote(noteId){
    this.db.child(noteId).remove();
  }
  addNote(note){
    this.db.push().set({noteContent: note});
  }
  render() {
    const notes = this.state;
    return (
      <div className="notes-container">

       <div className="notes-header">
        <h1>React & Firebase App</h1>
       </div>
       <div className="notes-body">
       <ul>
          {this.state.notes.map(note=>{
            return(
            <Note removeNote={this.removeNote} noteContent={note.noteContent} key={note.noteId} noteId={note.noteId}/>
          );
          })}
       </ul>
       </div>

       <div className="notes-footer">
        <Form addNote={this.addNote}/>
       </div>

      </div>
    );
  }
}

export default App;
