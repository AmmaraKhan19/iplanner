import React, { useState } from 'react'; 
import NoteContext from './noteContext'; // to use the created context

// function to return created context
const NoteState = (props)=>{
    // hard coding to fetch all notes of a user
    const notesInitial = [
        {
          "_id": "641569a133910cbc6c433c6184",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up Call 1",
          "description": "Please wake up at 6 am",
          "tag": "personal",
          "date": "2023-03-18T07:34:57.424Z",
          "__v": 0
        },
        {
          "_id": "641725f35bcc7b71a782003083",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up",
          "description": "Abbe uth bhi ja",
          "tag": "personal",
          "date": "2023-03-19T15:10:43.482Z",
          "__v": 0
        },
        {
          "_id": "641726115bcc7b71a5642003085",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up Please",
          "description": "Abbe uth bhi ja yaar",
          "tag": "personal",
          "date": "2023-03-19T15:11:13.047Z",
          "__v": 0
        },
        {
          "_id": "641726455bcc7b7124a2003088",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up Please",
          "description": "Tum ko 6 uthne bola",
          "tag": "personal",
          "date": "2023-03-19T15:12:05.106Z",
          "__v": 0
        },
        {
          "_id": "641726625bcc7b71a90200308a",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up by god",
          "description": "Tum ko 6 uthne bola manta",
          "tag": "personal",
          "date": "2023-03-19T15:12:34.770Z",
          "__v": 0
        },
        {
          "_id": "6417282eefea13c56bda5cc290",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up by god",
          "description": "Tum ko 6 uthne bola manta",
          "tag": "personal",
          "date": "2023-03-19T15:20:14.553Z",
          "__v": 0
        },
        {
          "_id": "6417295befea13cb56da5cc294",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up by god paleeaassee",
          "description": "Tum ko 6 uthne bola manta",
          "tag": "personal",
          "date": "2023-03-19T15:25:15.356Z",
          "__v": 0
        }
      ]
      // view notes
      const [notes, setNotes] = useState(notesInitial);

      // Add a note
      const addNote = (title, description, tag) =>{
        // TODD API calls
        console.log("Adding a new note");
        const note = {
          "_id": "6417295befea13cbd56kjhka5jcc294",
          "user": "641177066223b40hjhfbf4b13a5",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-03-19T15:25:15.356Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }
      // Delete a note
      const deleteNote = (id) =>{
        // TODD API calls
        console.log("Deleting note with id " + id);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      // Edit a note
      const editNote = (id) =>{
        // TODD API calls
        // console.log("Updating note with id " + id);
        // const updateNote = notes.filter((note)=>{return note._id===id});
        // setNotes(updateNote);
      }

    return(
     <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
          { props.children }
     </NoteContext.Provider>
    )
}

export default NoteState;