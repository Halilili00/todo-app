import React, { useState, useEffect, useCallback } from 'react'
import { Button, Container, Typography, Paper } from '@mui/material'
import CustomModal from '../components/CustomModal';
import { Item, Items } from '../types/Item';
import TableList from '../components/TableList';
import { createTodo, getTodos, updateTodo } from '../apis/TodoApis'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const initialTodoState = { title: "", description: "", completed: false }

const Home = () => {
  const [todo, setTodo] = useState<Item>(initialTodoState);
  const [modal, setModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Items[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Items[]>([])

  const handleClose = () => {
    setTodo(initialTodoState)
    setModal(!modal)
  }

  const handleSubmit = useCallback((e: React.FormEvent, id?: number) => {
    e.preventDefault();
    if (id) {
      updateTodo(id, todo).then(data => setTodos(todos.map(t => t.id === data.id ? data : t)))
      setModal(!modal)
    }
    else {
      createTodo(todo).then(data => setTodos([...todos, data]))
    }
    setTodo(initialTodoState)
  }, [todo, todos, modal])

  console.log(todos)

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add: Items;
    let active = [...todos];
    let completed = [...completedTodos];

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      completed.splice(destination.index, 0, add)
    }

    if (source.droppableId === destination.droppableId) {
      setCompletedTodos(completed)
      setTodos(active)
    } else {
      //update when todo goes another box
      updateTodo(add.id, {...add, completed: !add.completed})
      setCompletedTodos(completed.map(c => c.id === add.id ? { ...add, completed: !add.completed } : c))
      setTodos(active.map(a => a.id === add.id ? { ...add, completed: !add.completed } : a))
    }
  }

  useEffect(() => {
    getTodos().then(data => data.map((d: Items) => d.completed ? setCompletedTodos(prev => [...prev, d]) : setTodos(prev => [...prev, d])))
  }, [])

  console.log(completedTodos)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Typography variant='h3'>Todo App</Typography>
        <Paper style={{ backgroundColor: "#282c34" }}>
          <Button variant='contained' onClick={() => setModal(!modal)} fullWidth style={{margin: "20px 0 10px 0"}}>Add new todo</Button>
          {modal && <CustomModal modal={modal} todo={todo} setTodo={setTodo} handleClose={handleClose} handleSubmit={handleSubmit} />}
          <TableList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} modal={modal} setModal={setModal} setTodo={setTodo} />
        </Paper>
      </Container>
    </DragDropContext>
  )
}

export default Home