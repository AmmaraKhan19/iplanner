import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'; // to use functions in notecontext

const NoteItem = (props) => {
     const context = useContext(noteContext);
     const { deleteNote, editNote } = context;
     const { note } = props;
     return (
     // destructuring
          <div className='col-md-3'>
               <div className="card my-3">
                    <div className="card-body">
                         <h5 className="card-title">{note.title}</h5>
                         <p className="card-text">{note.description}</p>
                         <p className="card-text"><b>Tag: </b>{note.tag}</p>
                         <i className="far fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i> {/* for delete icon */}
                         <i className="far fa-pen-to-square mx-2" onClick={()=>{editNote(note._id)}}></i> {/* for edit icon */}
                    </div>
               </div>
          </div>
     )
}

export default NoteItem;