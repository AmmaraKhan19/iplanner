import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'; // to use notecontext

const AddNote = () => {
     const context = useContext(noteContext);
     // destructuring
     const { addNote } = context;
     // create function to add note
     const handleAddNote = (e)=>{
          // to prevent page reload
          e.preventDefault();
          // to take user input
          addNote(note.title, note.description, note.tag);
     }
     // onchange function toset user changes
     const [note, setNote] = useState({title: "", description: "", tag: ""})
     const onchange = (e) =>{
          setNote({...note, [e.target.name]: e.target.value });
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
                              <label className="form-label" htmlFor="tag">Tag</label>
                              <select id='tag'>
                                   <option name="general" value="general" defaultValue="general">General</option>
                                   <option name="personal" value="personal">Personal</option>
                                   <option name="learning" value="learning">Learning</option>
                                   <option name="personal" value="personal">Personal</option>
                              </select>
                         </div>
                         <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Submit</button>
                    </form>
               </div>
          </div>
     )
}

export default AddNote