import React, {useState} from 'react'; 
import NoteContext from './noteContext'; // to use the created context

// function to return created context
const NoteState = (props)=>{
     // create an object to provide value
    const s1 = {
     "name": "Ann",
     "class": "5a"
    }
     // create a stste for object
     const [state, setstate] = useState(s1);
     // to change the state
     const update = ()=> {
     // to change value of state at a set time
          setTimeout(() =>{
               setstate({  // values to change
                    "name": "Ammara",
                    "class": "11a"
               })
          }, (10000)); // the time after which values will change
     }
    // component to return context value
    return(
     <NoteContext.Provider value={{state, update}}>
          { props.children }
     </NoteContext.Provider>
    )
}

export default NoteState;