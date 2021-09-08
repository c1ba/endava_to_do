let loadLocalStorage = ()=>{
    const tdList = localStorage.getItem("todoList");
    if(tdList){
        let addFromLocalStorage = (text)=>{
            let todoList = document.getElementById("todo_list");
            let todoWish = document.createElement("div");
            todoWish.className = "wishDiv";
            let todoWords = document.createElement("label"), checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            todoWords.textContent = text;
            
            todoWords.addEventListener("click",()=>{todoWish.remove();});
            todoWish.appendChild(checkbox);
            todoWish.appendChild(todoWords);
            todoList.appendChild(todoWish);
        }
        let tdListArr = tdList.split(",");
        for(i of tdListArr){
            addFromLocalStorage(i);
        }
    }
    else{
        console.log("Error at retrieving: Does not exist");
    }
}

loadLocalStorage();

let addToList = ()=>{
let todoList = document.getElementById("todo_list");
let todoInput = document.getElementById("todo_input").value;
let todoWish = document.createElement("div");
todoWish.className = "wishDiv";
let todoWords = document.createElement("label"), checkbox = document.createElement("input");
checkbox.type = "checkbox";
todoWords.textContent = todoInput;

todoWords.addEventListener("click",()=>{todoWish.remove();});
todoWish.appendChild(checkbox);
todoWish.appendChild(todoWords);
todoList.appendChild(todoWish);
}

let suggestToList = ()=> {
fetch("http://www.boredapi.com/api/activity/")
.then(response =>{ 
    console.log(response);
    return response.json();})
.then(response =>{
    let toDoInput = document.getElementById("todo_input");
    toDoInput.value = response.activity;
})
.catch(()=>{console.log(`Error, I could not return. Stage: fetch`)})
}

let saveToLocalStorage = ()=>{
let wishes = document.getElementsByClassName("wishDiv");
console.log(checks);
let tdList = [];
for(i of wishes){
    tdList.push(i.innerText);
}
localStorage.setItem('todoList', tdList);
localStorage.setItem('checkedToDos', checkedList);
}

let submitButton = document.getElementById("submit_button");
submitButton.onclick = addToList;

let suggestButton = document.getElementById("todo_suggest");
suggestButton.onclick = suggestToList;

let saveLS = document.getElementById("save_ls");
saveLS.onclick = saveToLocalStorage;