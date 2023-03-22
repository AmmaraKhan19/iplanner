import React from 'react'; 
import NoteContext from './noteContext'; // to use the created context

// function to return created context
const NoteState = (props)=>{
    return(
     <NoteContext.Provider value={{}}>
          { props.children }
     </NoteContext.Provider>
    )
}

export default NoteState;