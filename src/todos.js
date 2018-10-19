import uuidv4 from 'uuid/v4'
import renderTodos from './views'

// Setup the empty todos array
let todos = []

// Gets the todos from local storage, parses them to an array
const loadTodos = () =>{
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON) {
        todos = JSON.parse(todosJSON)
    } else {
        todos = []
    }
}

loadTodos()

// Saves the todos to local storage (takes the whole string)
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Creates a function to allow to the todos to be exported
const getTodos = () => todos

// Creates a todo and adds it to the list using push
const createTodo = (todoText) => {
    const text = todoText.trim()
    if (text.length !== 0) {
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveTodos()
    
    }
}

// Removes a todo based on its ID
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}


// Sets the ID to be completed or not
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

// Make sure to call loadTodos and setup the exports

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo}