import React, { useState } from 'react'; 
import NoteContext from './noteContext'; // to use the created context

// function to return created context
const NoteState = (props)=>{
    // hard coding to fetch all notes of a user
    const notesInitial = [
        {
          "_id": "641569a133910cbc6c3c6184",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up Call 1",
          "description": "Please wake up at 6 am",
          "tag": "personal",
          "date": "2023-03-18T07:34:57.424Z",
          "__v": 0
        },
        {
          "_id": "641725f35bcc7b71a2003083",
          "user": "641177066223b40fbf4b13a5",
          "title": "Wake Up",
          "description": "Abbe uth bhi ja",
          "tag": "personal",
          "date": "2023-03-19T15:10:43.482Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);


    return(
     <NoteContext.Provider value={{notes, setNotes}}>
          { props.children }
     </NoteContext.Provider>
    )
}

export default NoteState;