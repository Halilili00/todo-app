import React, { useState } from 'react'
import TableList from '../components/TableList'

const Home = () => {
  const [viewCompleted, setVieWCompleted] = useState(false);

  const displayCompleted = (status) => {
    if (status) {
      return setVieWCompleted(true);
    }

    return setVieWCompleted(false);
  }

  return (
    <main className="container">
      <h1 className="text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
              >
                Add task
              </button>
            </div>
            <ul className="list-group list-group-flush border-top-0">
              <TableList viewCompleted={viewCompleted} displayCompleted={displayCompleted}/>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
