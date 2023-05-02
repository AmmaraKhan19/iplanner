import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext'; // to use notecontext
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
     const context = useContext(noteContext);
     // destructuring
     const { notes, getNotes, editNote } = context;
     useEffect(() => {
          getNotes();
          // eslint-disable-next-line
     }, [])
     // to use toggle
     const ref = useRef(null);
     // to close modal window
     const refClose = useRef(null);
     // destructuring
     const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
     // Update note
     const updateNote = (currentnote) => {
          ref.current.click();
          setNote({
               id: currentnote._id,
               etitle: currentnote.title,
               edescription: currentnote.description,
               etag: currentnote.tag
          });
     }
     // create function to show updated note
     const handleNote = (e) => {
          editNote(note.id, note.etitle, note.edescription, note.etag)
          // to close modal on clicking update
          refClose.current.click();
          // to prevent page reload
          e.preventDefault();
          props.showAlert("Note Updated Successfully!", "success");
     }
     // onchange function to set user changes
     const onchange = (e) => {
          setNote({ ...note, [e.target.name]: e.target.value });
     }

     return (
          <>
               <AddNote showAlert={props.showAlert} />
               {/* Modal for edit note */}
               <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
               </button>
               <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                   <form>
                                        <div className="mb-3">
                                             <label htmlFor="title" className="form-label">Title</label>
                                             <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} minLength={3} required />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="description" className="form-label">Description</label>
                                             <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} minLength={3} required />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="tag" className="form-label" >Tag: </label>
                                             <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} minLength={1} required />
                                        </div>
                                   </form>
                              </div>
                              <div className="modal-footer">
                                   <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                   <button disabled={note.etitle.length < 3 || note.edescription.length < 3 || note.etag.length < 1} type="button" className="btn btn-primary" onClick={handleNote}>Update</button>
                              </div>
                         </div>
                    </div>
               </div>
               {/* Show all user notes */}
               <div className="row my-3">
                    <h3>Your Notes</h3>
                    <div className='container'>
                         {notes.length === 0 && 'You have no notes to display'}
                    </div>
                    {notes.map((note) => {
                         return <NoteItem showAlert={props.showAlert} note={note} updateNote={updateNote} key={note._id} />
                    })}
               </div>
          </>
     )
}

export default Notes;