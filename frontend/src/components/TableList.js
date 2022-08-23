import React from 'react'
import { useStateContext } from '../context/StateContext'

const TableList = ({displayCompleted, viewCompleted}) => {
    const { todoList } = useStateContext();
    const newtodoList = todoList.filter(item => item.completed === viewCompleted)
    
    return (
        <div>
            <div className="nav nav-tabs">
                <span
                    className={viewCompleted ? "nav-link active" : "nav-link"}
                    onClick={() => displayCompleted(true)}
                >
                    Complete
                </span>
                <span
                    className={viewCompleted ? "nav-link" : "nav-link active"}
                    onClick={() => displayCompleted(false)}
                >
                    Incomplete
                </span>
            </div>
            {newtodoList.map(item => (
                <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                >
                    <span
                        className={`todo-title mr-2`}
                        title={item.description}
                    >
                        {item.title}
                    </span>
                    <span>
                        <button
                            className="btn btn-secondary mr-2"
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </span>
                </li>
            ))}
        </div>
    )
}

export default TableList
