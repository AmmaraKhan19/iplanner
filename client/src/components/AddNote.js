import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'; // to use notecontext

const AddNote = () => {
     const context = useContext(noteContext);
     // destructuring
     const { addNote } = context;
     // create function to add note
     const handleAddNote = (e) => {
          // to prevent page reload
          e.preventDefault();
          // to take user input
          addNote(note.title, note.description, note.tag);
     }
     // onchange function to set user changes
     const [note, setNote] = useState({ title: "", description: "", tag: "" })
     const onchange = (e) => {
          setNote({ ...note, [e.target.name]: e.target.value });
     }
     
     return (
          <div>
               <div className="container my-3">
                    <h1>Add a Note</h1>
                    <form>
                         <div className="mb-3">
                              <label htmlFor="title" className="form-label">Title</label>
                              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                         </div>
                         <div className="mb-3">
                              <label htmlFor="description" className="form-label">Description</label>
                              <input type="text" className="form-control" id="description" name="description" onChange={onchange} />
                         </div>
                         <div className="mb-3">
                              <label htmlFor="tag" className="form-label" >Tag: </label>
                              <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} />
                         </div>
                         <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                    </form>
               </div>
          </div>
     )
}

export default AddNote;