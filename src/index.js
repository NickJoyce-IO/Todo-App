import { renderTodos } from './views'
import { setFilters, getFilters } from './filters'
import { createTodo, loadTodos } from './todos'
renderTodos()

// Sets the filters and passes the text to the filter object
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Creates the new todo
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()

    const text = e.target.elements.newTodo.value.trim()

    if (text.length !== 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.newTodo.value = ''

    }
})


// Hides completed todos
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})
