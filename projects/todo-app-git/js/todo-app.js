const todos = [
    {
        text: "Order Cat Food",
        completed: true
    }, {
        text: "Clean Kitchen",
        completed: false
    }, {
        text: "Buy Food",
        completed: true
    }, {
        text: "Do Work",
        completed: true
    }, {
        text: "Exercise",
        completed: false
    }
]
const filters={
    searchText:"",
    hideCompleted:false

}
    var renderTodos=function(todos, filters){       
        var filteredTodos = todos.filter(function (todo){
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        })
        filteredTodos=filteredTodos.filter(function(todo){
            if(filters.hideCompleted){
                return !todo.completed;
            }
            else{
                return true;
            }
        })
        // Incomplete Todos use the filtered todos array
        var incompleteTodos = filteredTodos.filter(function (todo) {
            if (todo.completed === false) {
                return todo;
            }
        })
        document.querySelector("#todoContainer").innerHTML = "";
        // console.log(incompleteTodos)
        var summary = document.createElement("h2");
        summary.textContent = `You have ${incompleteTodos.length} todos remaining.`
        document.querySelector("#todoContainer").appendChild(summary)
        // console.log(filteredTodos)
        filteredTodos.forEach(function(todo){
            var todoEl=document.createElement("p");
            todoEl.textContent=todo.text;
            document.querySelector("#todoContainer").appendChild(todoEl);
        })
    }
// filter
document.querySelector("#filter-todos").addEventListener("input",function(e){   
    filters.searchText=e.target.value;   
    renderTodos(todos, filters);
    // console.log(e.target.value);
})
renderTodos(todos, filters);

document.querySelector("#todo-form").addEventListener("submit",function(e){
    e.preventDefault();
    console.log(e.target.elements.addTodo.value);
    todos.push({
        text: e.target.elements.addTodo.value,
        completed: false
    })
    console.log(todos)
    renderTodos(todos, filters);
})

document.querySelector("#show-completed").addEventListener("change",function(e){
    filters.hideCompleted=e.target.checked;  
   renderTodos(todos,filters)
})