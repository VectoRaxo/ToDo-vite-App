(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();let y;const C=new Uint8Array(16);function L(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function S(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:P};function E(e,t,i){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||L)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return S(d)}class m{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[new m("Piedra del alma"),new m("Piedra del infinito"),new m("Piedra del tiempo"),new m("Piedra del poder"),new m("Piedra de realidad")],filter:c.All},A=()=>{v(),console.log("InitStore")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filters:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},I=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},k=e=>{if(!e)throw new Error("Description is required");l.todos.push(new m(e)),f()},U=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},O=()=>{l.todos=l.todos.filter(e=>!e.done),f()},q=(e=c.All)=>{l.filter=e,f()},D=()=>l.filter,a={addTodo:k,deleteCompleted:O,deleteTodo:x,getCurrentFilter:D,getTodos:I,initStore:A,loadStore:v,setFilter:q,toggleTodo:U},F=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let b;const M=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=a.getTodos(c.Pending).length},H=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:i,id:d}=e,o=`<div class="view">
        <input class="toggle" type="checkbox" ${t?"checked":""}>
        <label>${i}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),t&&n.classList.add("completed"),n};let g;const N=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e}not found`);g.innerHTML="",t.forEach(i=>{g.append(H(i))})},p={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoImput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const s=a.getTodos(a.getCurrentFilter());N(p.TodoList,s),i()},i=()=>{M(p.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=F,document.querySelector(e).append(s),t()})();const d=document.querySelector(p.NewTodoImput),o=document.querySelector(p.TodoList),n=document.querySelector(p.ClearCompleted),u=document.querySelectorAll(p.TodoFilters);d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().lenght!==0&&(a.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const h=s.target.closest("[data-id]");a.toggleTodo(h.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{if(s.target.getAttribute("class")==="destroy"){const w=s.target.closest("[data-id]");a.deleteTodo(w.getAttribute("data-id")),t()}}),n.addEventListener("click",()=>{a.deleteCompleted(),t()}),u.forEach(s=>{s.addEventListener("click",h=>{switch(u.forEach(w=>w.classList.remove("selected")),h.target.classList.add("selected"),h.target.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}t()})})};a.initStore();V("#app");
