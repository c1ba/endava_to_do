
//Checks if any data has been saved before, if it was saved it would create a to-do item and add it to the list, taking the innerText as variable. 
//Then, it selects all checkboxes to provide them the checked states saved in the other key from localStorage.
let loadLocalStorage = ()=>{
    const tdList = localStorage.getItem("todoList");
    if(tdList){
        let addFromLocalStorage = (text)=>{
            let todoList = document.getElementById("todo_list");
            let todoWish = document.createElement("div");
            todoWish.className = "wishDiv";
            let todoWords = document.createElement("label"), checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = `cb`;
            todoWords.textContent = text;
            
            todoWords.addEventListener("click",()=>{todoWish.remove();});
            todoWish.appendChild(checkbox);
            todoWish.appendChild(todoWords);
            todoList.appendChild(todoWish);
        }

        const checkedboxList = localStorage.getItem("checkboxStates");
        checkedboxList ? console.log(`Exists`) : console.log(`Error at retrieving the checkbox states: Do not exist`) ;
        let tdListArr = tdList.split(",");
        let checkboxStatesArr = checkedboxList.split(",");
        for(i of tdListArr){
            addFromLocalStorage(i);
        }
        let checkboxes = document.getElementsByClassName(`cb`);
        for(i = 0; i < checkboxStatesArr.length; i++){
            checkboxes[i].checked = (checkboxStatesArr[i].toLowerCase() === 'true');
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
checkbox.className = `cb`;
todoWords.textContent = todoInput;

todoWords.addEventListener("click",()=>{todoWish.remove();});
todoWish.appendChild(checkbox);
todoWish.appendChild(todoWords);
todoList.appendChild(todoWish);
}

let suggestToList = ()=> {
fetch("https://www.boredapi.com/api/activity/")
.then(response =>{ 
    console.log(response);
    return response.json();})
.then(response =>{
    let toDoInput = document.getElementById("todo_input");
    toDoInput.value = response.activity;
})
.catch(()=>{console.log(`Error, I could not return. Stage: fetch`)})
}

//Saves the innerText from the to-do item div and looks for the elements with a classs set to the checkboxes to collect their states
let saveToLocalStorage = ()=>{
let wishes = document.getElementsByClassName("wishDiv"), checkers = document.getElementsByClassName(`cb`);
let tdList = [], checkersList = Array.from(checkers), cl = [];
for(i of wishes){
    tdList.push(i.innerText);
}
for(i of checkersList){
cl.push(i.checked);
}
localStorage.setItem('todoList', tdList);
localStorage.setItem('checkboxStates', cl);
}

let submitButton = document.getElementById("submit_button");
submitButton.onclick = addToList;

let suggestButton = document.getElementById("todo_suggest");
suggestButton.onclick = suggestToList;

let saveLS = document.getElementById("save_ls");
saveLS.onclick = saveToLocalStorage;