import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext';

export const About = () => {
  // data from usecontext assigned to a variable
  const a = useContext(NoteContext);
  // to use the update function in notecontext
  useEffect(() => {
    a.update(); // calling the update function to change values
  }, )
  
  return (
     <div>
      {/* displaying thhe called values */}
          This is About {a.state.name} and they are in {a.state.class}
     </div>
  )
}

export default About;