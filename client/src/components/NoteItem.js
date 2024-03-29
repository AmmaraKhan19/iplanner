import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'; // to use functions in notecontext

const NoteItem = (props) => {
     const context = useContext(noteContext);
     const { deleteNote } = context;
     const { note, updateNote } = props;
     return (
          // destructuring
          <div className='col-md-3'>
               <div className="card my-3">
                    <div className="card-body">
                         <div className="d-flex align-items-center">
                              <h5 className="card-title">{note.title}</h5>
                              <i className="far fa-trash-can mx-2" onClick={() => { deleteNote(note._id);props.showAlert("Note Deleted Successfully!", "success"); }}></i> {/* for delete icon */}
                              <i className="far fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i> {/* for edit icon */}
                         </div>
                         <p className="card-text">{note.description} <br/>
                         <strong>Tag: </strong>{note.tag}</p>
                    </div>
               </div>
          </div>
     )
}

export default NoteItem;