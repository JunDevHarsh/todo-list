let input_todo = document.getElementById('input-todo');
let todo_list = document.querySelector('.todo_list');
let theme_checkbox = document.querySelector('.theme_checkbox');

document.querySelector('.items_left').innerText = todos_stat();

theme_checkbox.addEventListener('change', function(){
    let html = document.querySelector('html');
    return (html.dataset.theme == 'dark') ? html.dataset.theme = 'light' : html.dataset.theme = 'dark';
})

input_todo.addEventListener('keyup', function(event){
    if(input_todo.value.trim() == '' || input_todo.value.length <= 0) return;
    if(event.keyCode == 13){
        let li = document.createElement('li');
        li.className = 'todo_list_item active';
        li.setAttribute('onclick', 'cons(this)');
        let input_value = create_list(input_todo.value);
        li.innerHTML = input_value;
        todo_list.appendChild(li);
        document.querySelector('.items_left').innerText = todos_stat();
        input_todo.value = '';
    }
})

function create_list(value){
    return `<div class="checkbox">
      <img src="./images/icon-check.svg" class="checkbox_img" alt="Competed todo" />
    </div>
    <p class="todo_list_item_text">${value}</p>
    <div class="deleted_todo" onclick="delete_todo(this)">
      <img src="./images/icon-cross.svg" alt="Delete Icon for todo" />
    </div>`
}

function cons(value){
    (value.classList.contains('active')) ? value.className = 'todo_list_item completed' : value.className = 'todo_list_item active';
    for(let element of value.children){
        element.classList.toggle('completed');
    }
    value.children[0].children[0].classList.toggle('completed')
    document.querySelector('.items_left').innerText = todos_stat();
}

// delete or remove selected todo
function delete_todo(ele){
    ele.parentElement.remove();
    document.querySelector('.items_left').innerText = todos_stat();
}

// remove all completed todos
function remove_all_todo(class_name){
    let all_todos = document.querySelectorAll('.todo_list_item');
    let filter_list = document.querySelectorAll('.filter_item');
    filter_list.forEach(item => {
        if(item.innerText.toLowerCase() == class_name){
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    });
    all_todos.forEach(ele_todo => {
        if(class_name == 'all'){
            ele_todo.style.display = 'flex';
        }
        else if(class_name == 'active'){
            if(ele_todo.classList.contains(class_name)){
                ele_todo.style.display = 'flex';
            }else{
                ele_todo.style.display = 'none';
            }
        }else if(class_name == 'completed'){
            if(ele_todo.classList.contains(class_name)){
                ele_todo.style.display = 'flex';
            }else{
                ele_todo.style.display = 'none';
            }
        }else if(class_name == 'remove'){
            if(ele_todo.classList.contains('completed')){
                ele_todo.remove();
            }
        }
    })
}

// show remaining todos
function todos_stat(){
    let total_todos = document.querySelectorAll('.todo_list_item');
    let result = 0;
    if(total_todos.length <= 0) return 0;
    total_todos.forEach((todo, index) => {
        if(todo.classList.contains('active')) result += 1;
    });
    return result;
}
