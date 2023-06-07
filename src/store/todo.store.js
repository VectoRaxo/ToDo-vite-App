import { Todo } from "../todos/models/todo.model"

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de realidad'),

    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const {todos = [], filters = Filters.All} = JSON.parse(localStorage.getItem('state')); // del objeto 'state' destructuro 'todos como []' y filters con todos los filtros.
    state.todos = todos;
    state.filter = filters;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch (filter){
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error (`Option ${filter} is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');

    state.todos.push ( new Todo(description));

    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId); //guarda el array con todos los que no coinciden con el parametro q le pasamos

    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}