import todoStore, {Filters} from "../store/todo.store";
import  html  from "./app.html?raw";
import { renderPending } from "./use-cases/render-pending";
import { renderTodos } from "./use-cases/render-todos";



const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list', // usamos "." porque estamos usandolo desde la clase
    NewTodoImput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count', // usamos almohadilla porque estamos usandolo desde el ID
}

/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionImput = document.querySelector(ElementIDs.NewTodoImput); // guardamos el recuadro del imput
    const todoListUL = document.querySelector( ElementIDs.TodoList ); // guardamos elementos de la lista
    const ClearCompletedButton = document.querySelector(ElementIDs.ClearCompleted); // guardamos el estado del clear completed
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);



    // Listeners
    newDescriptionImput.addEventListener('keyup', (event) => { // escuchamos cada vez que escribo en el recuadro de imputs
        if ( event.keyCode !== 13 ) return; // solo sigue si pulso enter
        if ( event.target.value.trim().lenght === 0) return; // solo sigue si el imput no está vacío

        todoStore.addTodo(event.target.value); //guardamos el imput
        displayTodos(); //renderizamos el imput
        event.target.value = ''; // vaciamos la caja de imput para que no se repita el resultado
    })

    todoListUL.addEventListener('click', (event) => { //escuchamos cada vez que clickeo en la lista
        const element = event.target.closest('[data-id]'); //buscamos el elemento padre que tenga "data-id"
        todoStore.toggleTodo(element.getAttribute('data-id')); //cambiamos el estado del ToDo buscado por su "data-id"
        displayTodos(); // renderizamos el click
    })

    todoListUL.addEventListener('click', (event) => { //escuchamos cada vez que clickeo en la lista
        
        const elementButton = event.target.getAttribute('class');
            
            if (elementButton === 'destroy'){                
                const element = event.target.closest('[data-id]');
                todoStore.deleteTodo(element.getAttribute('data-id'));
                displayTodos(); // renderizamos el click
            }
       
    })

    ClearCompletedButton.addEventListener('click', () => {
        
        todoStore.deleteCompleted();
        displayTodos();   

    })

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected')); //borramos todos los selected antes de darselo al que clickemos
            element.target.classList.add('selected'); // añadimos la clase 'selected' al elemento que seleccionamos
            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;
            }
            displayTodos();
        })
    })



}