// Sets up the filters 
const filters = {
    searchText: '',
    hideCompleted: false
}


// function to enable export of the filters object
const getFilters = () => filters

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }
    if (typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted
    }
}

export { getFilters, setFilters }