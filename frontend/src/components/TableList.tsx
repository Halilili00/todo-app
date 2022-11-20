import React from 'react'
import { Item } from '../types/Item'
import { IconButton, List, ListItem, ListItemText, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

interface Props {
    todos: Item[];
    setTodos: React.Dispatch<React.SetStateAction<Item[]>>;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTodo: React.Dispatch<React.SetStateAction<Item>>
}

const TableList = ({todos, setTodos, modal, setModal, setTodo}: Props) => {

    const handleComplete = (id:number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }
    
    const handleDelete = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleEdit = (todo:Item) => {
        setModal(!modal)
        setTodo(todo)
    }

  return (
    <List style={{margin: "10px"}}>
    {todos.map((todo) => (
        <ListItem key={todo.id} style={{backgroundColor: "whitesmoke", marginBottom: "10px", borderRadius: "10px"}}
        secondaryAction={
            <Stack direction="row">
                <IconButton onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton onClick={() => handleEdit(todo)}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={() => handleComplete(todo.id)}>
                    <DoneIcon/>
                </IconButton>
            </Stack>
        }
        >
            {todo.completed ? <ListItemText primary={<s>{todo.title}</s>} secondary={<s>{todo.description}</s>}/> 
            : <ListItemText primary={<span>{todo.title}</span>} secondary={<span>{todo.description}</span>}/>}
        </ListItem>
    ))}
</List>
  )
}

export default TableList