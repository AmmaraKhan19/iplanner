import React from 'react'

export const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <br />
        <div className="row">
        <form>
          <div className="col-7 offset-md-2 align-self-center mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="col-7 offset-md-2 align-self-center mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="col-3 offset-md-3 align-self-center mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="col-2 offset-md-5 btn btn-primary">Submit</button>
        </form>
        </div>
      </div>
      
      <div className="container">
        <h1>Your Notes</h1>
      </div>
    </div>
  )
}

export default Home;