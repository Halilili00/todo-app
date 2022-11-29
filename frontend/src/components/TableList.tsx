import React, { memo } from 'react'
import { Item, Items } from '../types/Item'
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { removeTodo, updateTodo } from '../apis/TodoApis';
import { Droppable } from 'react-beautiful-dnd';
import "./style.css"
import TableItem from './TableItem';


interface Props {
    todos: Items[];
    setTodos: React.Dispatch<React.SetStateAction<Items[]>>;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTodo: React.Dispatch<React.SetStateAction<Item>>
    completedTodos: Items[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Items[]>>
}

const TableList = ({ todos, setTodos, modal, setModal, setTodo, completedTodos, setCompletedTodos }: Props) => {

    const handleComplete = (todo: Items) => {
        if (todo.id) {
            const newTodo = { ...todo, completed: !todo.completed }
            updateTodo(todo.id, newTodo)
            if (!todo.completed) {
                setCompletedTodos(completedTodos => {
                    return [...completedTodos, newTodo]
                })
                setTodos(todos => {
                    return todos.filter(td => td.id !== newTodo.id)
                })
            } else {
                setTodos(todos => {
                    return [...todos, newTodo]
                });
                setCompletedTodos(completedTodos => {
                    return completedTodos.filter(ctd => ctd.id !== newTodo.id)
                })
            }
        }
    }

    const handleDelete = (id: number, completed: boolean) => {
        if (id) {
            removeTodo(id)
            if (completed) {
                setCompletedTodos(completedTodos.filter(todo => todo.id !== id))
            } else {
                setTodos(todos.filter(todo => todo.id !== id));
            }
        }
    }

    const handleEdit = (todo: Item) => {
        setModal(!modal)
        setTodo(todo)
    }

    console.log("tablelist")
    return (
        <Grid container>
            <Grid item xs={6} style={{ backgroundColor: "white" }}>
                <Card style={{ backgroundColor: "red" }}>
                    <CardHeader style={{ color: "white" }} title="Incompleted" />
                    <CardContent>
                        <Droppable droppableId='TodosList'>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {todos.map((todo, index) => (
                                        <TableItem key={todo.id} todo={todo} index={index} handleDelete={handleDelete} handleEdit={handleEdit} handleComplete={handleComplete} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card style={{ backgroundColor: "green" }}>
                    <CardHeader style={{ color: "white" }} title="Completed" />
                    <CardContent>
                        <Droppable droppableId='TodosRemove' >
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {completedTodos.map((todo, index) => (
                                        <TableItem key={todo.id} todo={todo} index={index} handleDelete={handleDelete} handleEdit={handleEdit} handleComplete={handleComplete} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    )
}

export default memo(TableList)