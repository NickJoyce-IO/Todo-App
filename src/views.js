import { getTodos, removeTodo, saveTodos, toggleTodo } from './todos'
import { getFilters } from './filters'

const todos = getTodos()


// Renders the todos to the Dom
const renderTodos = () =>{
    const todoEl = document.querySelector('#todos')
    const filters = getFilters()
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length !== 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessageEl = document.createElement('p')
        emptyMessageEl.classList.add('empty-message')
        emptyMessageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(emptyMessageEl)
    }
}

// Generates an Element for each todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const text = document.createElement('span')
    const removeButton = document.createElement('button')
    text.textContent = todo.text


    // Setup the checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    containerEl.appendChild(text)


    // Setup container

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    todoEl.appendChild(removeButton)
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')

    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}


// Sets up the sumary for the page
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const sumTodo = incompleteTodos.length > 1 ? 'todos' : 'todo'
    summary.textContent = `You have ${incompleteTodos.length} ${sumTodo} left to do`
    return summary
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }