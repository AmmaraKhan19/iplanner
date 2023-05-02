import React from 'react'; // to use react 
import Notes from './Notes' // to use notes component


export const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      {/* display all notes */}
      <Notes showAlert = {showAlert} />
    </div>
  )
}

export default Home;