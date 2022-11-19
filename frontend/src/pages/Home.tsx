import React, {useState} from 'react'
import { Button, Container, Typography, Paper} from '@mui/material'
import CustomModal from '../components/CustomModal';
import { Item } from '../types/Item';
import TableList from '../components/TableList';

const Home = () => {
  const [todo, setTodo] = useState<Item>({
    id: 0,
    title: "",
    description: "",
    completed: false
  });
  const [modal, setModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Item[]>([]);

  const handleClose = () => {
    setModal(!modal)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo){
      if(todo.id !== 0){
        let updatedTodos = todos.map(t => (
          t.id === todo.id ? todo : t
        ))
        setTodos(updatedTodos)
      }
      else {
        setTodos([...todos, {...todo, id: Date.now()}])
      }
      setTodo({
        id: 0,
        title: "",
        description: "",
        completed: false
      })
    }
  }

  console.log(todos)
  return (
    <Container fixed>
        <Typography variant='h3'>Todo App</Typography>
        <Paper style={{backgroundColor: "#282c34"}}>
            <Button variant='contained' onClick={() => setModal(!modal)}>Add new todo</Button>
            {modal && <CustomModal modal={modal} todo={todo} setTodo={setTodo} handleClose={handleClose} handleSubmit={handleSubmit}/>}
            <TableList todos={todos} setTodos={setTodos} modal={modal} setModal={setModal} setTodo={setTodo}/>
        </Paper>
    </Container>
  )
}

export default Home