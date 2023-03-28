import React from 'react'; // to use react 
import Notes from './Notes' // to use notes component

export const Home = () => {
  return (
    <div>
      {/* display all notes */}
      <Notes />
    </div>
  )
}

export default Home;