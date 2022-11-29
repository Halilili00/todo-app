import { Item } from "../types/Item"

export async function getTodos() {
    try {
        const todos = await fetch("http://127.0.0.1:8000/api/todos/")
        return todos.json();
    } catch (error) {
        console.log(error)
    }
}

export async function createTodo(todo: Item) {
    try {
        const newTodo = await fetch("http://127.0.0.1:8000/api/todos/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
        return newTodo.json();
    } catch (error) {
        console.log(error)
    }
}

export async function updateTodo(id: number, todo: Item) {
    try {
        const updatedTodo = await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
        return updatedTodo.json();
    } catch (error) {
        console.log(error)
    }
}

export async function removeTodo(id: number) {
    try {
        await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error)
    }
}