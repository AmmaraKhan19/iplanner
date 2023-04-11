import React, { useState } from 'react';
import NoteContext from './noteContext'; // to use the created context

// function to return created context
const NoteState = (props) => {
  const host = "http://localhost:5000"
  // hard coding to fetch all notes of a user
  const notesInitial = []
  // view notes
  const [notes, setNotes] = useState(notesInitial);

  // Get all user 
  const getNotes = async () => {
    // Fetch API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMTc3MDY2MjIzYjQwZmJmNGIxM2E1In0sImlhdCI6MTY3OTIzOTM1N30.a6kIBr1gXckYDNnDuPbb3O7rvPLu_4ZOkwPWcs0pY2E"
      }, 
    });
    //  recieveall notes of user from db
    const allNotes = await response.json();
    // display all the recieved notes on client side
    setNotes(allNotes);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // Fetch API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMTc3MDY2MjIzYjQwZmJmNGIxM2E1In0sImlhdCI6MTY3OTIzOTM1N30.a6kIBr1gXckYDNnDuPbb3O7rvPLu_4ZOkwPWcs0pY2E"
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = await response.json();
    console.log(json);
    // add note on client side
    console.log("Adding a new note")
    const note = {
      "_id": "641569a133910cbc6c3c6184",
      "user": "641177066223b40fbf4b13a5",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-18T07:34:57.424Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  // Delete a note
  const deleteNote = async (id) => {
    // Fetch API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMTc3MDY2MjIzYjQwZmJmNGIxM2E1In0sImlhdCI6MTY3OTIzOTM1N30.a6kIBr1gXckYDNnDuPbb3O7rvPLu_4ZOkwPWcs0pY2E"
      },
    });
    const json = await response.json();
    console.log(json);
    // delete note client side
    console.log("Note deleted")
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Fetch API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxMTc3MDY2MjIzYjQwZmJmNGIxM2E1In0sImlhdCI6MTY3OTIzOTM1N30.a6kIBr1gXckYDNnDuPbb3O7rvPLu_4ZOkwPWcs0pY2E"
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = response.json();
    console.log(json);
    // to edit on client side
    console.log("Note edited")
    const updatednote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = updatednote[index];
      if (element._id === id) {
        updatednote[index].title = title;
        updatednote[index].description = description;
        updatednote[index].tag = tag;
      break;
      }
    }
    setNotes(updatednote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;