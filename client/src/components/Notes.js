import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext'; // to use notecontext
import NoteItem from './NoteItem';

const Notes = () => {
     const context = useContext(noteContext);
     // destructuring
     const { notes, setNotes } = context;
     return (
          <div className="row my-3">
               <h1>Your Notes</h1>
               {notes.map((note) => {
                    return <NoteItem note={note} key={note._id}/>
               })}
          </div>
     )
}

export default Notes;