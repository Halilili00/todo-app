import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IconButton, ListItem, ListItemText, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Item, Items } from '../types/Item';

interface Props {
    todo: Items
    index: number
    handleDelete: (id: number, completed: boolean) => void
    handleEdit: (todo: Item) => void
    handleComplete: (todo: Items) => void
}

const TableItem = ({ todo, index, handleDelete, handleEdit, handleComplete }: Props) => {
    return (
        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <ListItem className='list' key={todo.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    secondaryAction={
                        <Stack direction="row">
                            <IconButton onClick={() => handleDelete(todo.id, todo.completed)}>
                                <DeleteIcon />
                            </IconButton>
                            {!todo.completed && <IconButton onClick={() => handleEdit(todo)}>
                                <EditIcon />
                            </IconButton>}
                            <IconButton onClick={() => handleComplete(todo)}>
                                <DoneIcon />
                            </IconButton>
                        </Stack>
                    }

                >
                    {todo.completed ? <ListItemText primary={<s>{todo.title}</s>} secondary={<s>{todo.description}</s>} />
                        : <ListItemText primary={<span>{todo.title}</span>} secondary={<span>{todo.description}</span>} />}
                </ListItem>
            )}
        </Draggable>
    )
}

export default TableItem