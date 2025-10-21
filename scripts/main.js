const addTodoBtn = document.querySelector(".addTodoBtn");
const todoInput = document.querySelector(".todoInput");
const taskContainer = document.querySelector(".taskContainer");
const addListBtn = document.getElementById("addListBtn");
const listContainer = document.querySelector(".listContainer");
const addListPopUp = document.querySelector(".addListPopUp");
const listInput = document.getElementById("listinput");
const listIconInput = document.getElementById("listIconInput");
const addBtn = document.querySelector(".add");
const bannerText = document.querySelector(".bannerText");
const editBannerbtn = document.getElementById("editBannerbtn");
const banner = document.querySelector(".banner");

let currentToDo = "My day";
let toDoInfoArr = [
    {
        toDoType: "My day",
        todoArr: [],
        img: "./imgs/myDay.png",
    },
    {
        toDoType: "To-Do",
        todoArr: [],
        img: "./imgs/to-do.png",
    },
    {
        toDoType: "Work",
        todoArr: [],
        img: "./imgs/work.png",
    },
    {
        toDoType: "Groceries",
        todoArr: [],
        img: "./imgs/groceries.png",
    },
];

function addTodoTask(value, completed, id, important) {
    if (toDoInfoArr.length != 0) {
        for (i in toDoInfoArr) {
            if (toDoInfoArr[i].toDoType == currentToDo) {
                toDoInfoArr[i].todoArr.push({
                    value: value,
                    completed: completed,
                    id: id,
                    important: important,
                });
            }
        }
        localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
    }
    return toDoInfoArr;
}

function cardSettings(id, value, completeBtnClass, importantBtnClass) {
    let card = `
                <div class="taskCard" id="c${id}">
                    <div class="completeBtn complete ${completeBtnClass}">
                        <img class="complete" src="./imgs/todoDone.png" alt="">
                    </div>
                    <div class="todoText">${value}</div>
                    <div class="addToImportanBtn ${importantBtnClass}">
                        <img class="filled imp" src="./imgs/importantFilledUp.png" alt="">
                        <img class="notFilled imp" src="./imgs/important.png" alt="">
                    </div>
                    <div class="deleteBtn delete">
                        <img class="delete" src="./imgs/bin.png" alt="">
                    </div>
                </div>
    `;
    return card;
}

function updateTasks() {
    taskContainer.innerHTML = "";
    for (i in toDoInfoArr) {
        if (toDoInfoArr[i].toDoType == currentToDo) {
            for (el of toDoInfoArr[i].todoArr) {
                if (el.completed == false && el.important == false) {
                    taskContainer.innerHTML += cardSettings(el.id, el.value, "", "");
                } else if (el.completed == true && el.important == false) {
                    taskContainer.innerHTML += cardSettings(el.id, `<s style="color: #777">${el.value}</s>`, "completeBtnActive", "");
                } else if (el.completed == false && el.important == true) {
                    taskContainer.innerHTML += cardSettings(el.id, el.value, "", "important");
                } else {
                    taskContainer.innerHTML += cardSettings(el.id, `<s style="color: #777">${el.value}</s>`, "completeBtnActive", "important");
                }
            }
        }
    }
    return;
}

if (localStorage.getItem("arr") != undefined) {
    toDoInfoArr = JSON.parse(localStorage.getItem("arr"));
    listContainer.innerHTML = "";
    for (el of toDoInfoArr) {
        listContainer.innerHTML += `
                    <li class="listContainerIteam listIteam">
                        <div class="listLeft listIteam">
                            <img class="listIteam" src="${el.img}" alt="" />
                            <span class="listIteam">${el.toDoType}</span>
                        </div>
                        <div class="deleteList">
                            <div></div>
                            <div></div>
                        </div>
                    </li>
            `;
    }
    updateTasks();
}

if(localStorage.getItem("bannerImage") != undefined){
    src = localStorage.getItem("bannerImage");
    banner.style.backgroundImage = `url(${src})`;
}

addTodoBtn.addEventListener("click", () => {
    if (todoInput.value != "") {
        for (i in toDoInfoArr) {
            if (toDoInfoArr[i].toDoType == currentToDo) {
                let arr = toDoInfoArr[i].todoArr;
                if (arr.length > 0) {
                    addTodoTask(todoInput.value, false, arr[arr.length - 1].id + 1, false);
                } else {
                    addTodoTask(todoInput.value, false, 1, false);
                }
                break;
            }
        }
        todoInput.value = "";
        updateTasks();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (todoInput.value != "") {
            for (i in toDoInfoArr) {
                if (toDoInfoArr[i].toDoType == currentToDo) {
                    let arr = toDoInfoArr[i].todoArr;
                    if (arr.length > 0) {
                        addTodoTask(todoInput.value, false, arr[arr.length - 1].id + 1, false);
                    } else {
                        addTodoTask(todoInput.value, false, 1, false);
                    }
                    break;
                }
            }
            todoInput.value = "";
            updateTasks();
        }
    }
});

taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("complete")) {
        let cardID = e.target.closest(".taskCard").id;
        if (!document.querySelector(`#${cardID} .complete`).classList.contains("completeBtnActive")) {
            e.target.closest(".completeBtn").classList.add("completeBtnActive");
            for (i in toDoInfoArr) {
                if (toDoInfoArr[i].toDoType == currentToDo) {
                    toDoInfoArr[i].todoArr.forEach((el) => {
                        if (el.id == cardID.slice(1)) {
                            el.completed = true;
                        }
                    });
                    localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
                    break;
                }
            }
            updateTasks();
        } else {
            e.target.closest(".completeBtn").classList.remove("completeBtnActive");
            for (i in toDoInfoArr) {
                if (toDoInfoArr[i].toDoType == currentToDo) {
                    toDoInfoArr[i].todoArr.forEach((el) => {
                        if (el.id == cardID.slice(1)) {
                            el.completed = false;
                        }
                    });
                    localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
                    break;
                }
            }
            updateTasks();
        }
    }
    if (e.target.classList.contains("delete")) {
        let cardID = e.target.closest(".taskCard").id.slice(1);
        for (i in toDoInfoArr) {
            if (toDoInfoArr[i].toDoType == currentToDo) {
                let arr = toDoInfoArr[i].todoArr;
                toDoInfoArr[i].todoArr = arr.filter((el) => el.id != cardID);
                updateTasks();
                localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
                break;
            }
        }
    }
    if (e.target.classList.contains("imp")) {
        let cardID = e.target.closest(".taskCard").id;
        if (!e.target.closest(".addToImportanBtn").classList.contains("important")) {
            e.target.closest(".addToImportanBtn").classList.add("important");
            for (i in toDoInfoArr) {
                if (toDoInfoArr[i].toDoType == currentToDo) {
                    toDoInfoArr[i].todoArr.forEach((el) => {
                        if (el.id == cardID.slice(1)) {
                            el.important = true;
                            card = el;
                        }
                    });
                    localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
                    break;
                }
            }
        } else {
            e.target.closest(".addToImportanBtn").classList.remove("important");
            for (i in toDoInfoArr) {
                if (toDoInfoArr[i].toDoType == currentToDo) {
                    toDoInfoArr[i].todoArr.forEach((el) => {
                        if (el.id == cardID.slice(1)) {
                            el.important = false;
                        }
                    });
                    localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
                    break;
                }
            }
            updateTasks();
        }
    }
});

addListBtn.addEventListener("click", () => {
    addListPopUp.style.display = "flex";
});

addBtn.addEventListener("click", () => {
    if (listInput.value != "") {
        let text = listInput.value;
        if (listIconInput.value == "") {
            toDoInfoArr.push({
                toDoType: text,
                img: "./imgs/to-do-list.png",
                todoArr: [],
            });
            localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
            listContainer.innerHTML += `
                    <li class="listContainerIteam listIteam">
                        <div class="listLeft listIteam">
                            <img class="listIteam" src="./imgs/to-do-list.png" alt="" />
                            <span class="listIteam">${text}</span>
                        </div>
                        <div class="deleteList">
                            <div></div>
                            <div></div>
                        </div>
                    </li>
            `;
        } else {
            const image = listIconInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                let src = e.target.result;
                listContainer.innerHTML += `
                    <li class="listContainerIteam listIteam">
                        <div class="listLeft listIteam">
                            <img class="listIteam" src="${src}" alt=""/>
                            <span class="listIteam" >${text}</span>
                        </div>
                        <div class="deleteList">
                            <div></div>
                            <div></div>
                        </div>
                    </li>
                `;
                toDoInfoArr.push({
                    toDoType: text,
                    img: src,
                    todoArr: [],
                });
                localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
            };
            reader.readAsDataURL(image);
        }
        addListPopUp.style.display = "none";
        listInput.value = "";
        listIconInput.value = "";
    }
});

document.querySelector(".cancel").addEventListener("click", () => {
    addListPopUp.style.display = "none";
    listInput.value = "";
    listIconInput.value = "";
});

listContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("listContainer")) {
        return;
    }
    if (e.target.classList.contains("deleteList")) {
        const li = e.target.closest(".listContainerIteam");
        const spanText = li.querySelector("span").textContent;
        for (i in toDoInfoArr) {
            if (toDoInfoArr[i].toDoType == spanText) {
                const index = toDoInfoArr.findIndex((item) => item.toDoType === spanText);
                if (index !== -1) {
                    toDoInfoArr.splice(index, 1);
                }
            }
            localStorage.setItem("arr", JSON.stringify(toDoInfoArr));
        }
        li.remove();
        if (li.classList.contains("liActive")) {
            document.querySelector(".listContainerIteam").classList.add("liActive");
            currentToDo = document.querySelector(".listContainerIteam span").textContent;
            updateTasks();
        }
        bannerText.textContent = currentToDo;
        bannerText.classList.remove("bannerTextAnimation");
        setTimeout(() => {
            bannerText.classList.add("bannerTextAnimation");
        }, 10);
    }
    if (e.target.classList.contains("liActive") || e.target.closest(".listContainerIteam").classList.contains("liActive")) {
        return;
    }
    if (e.target.classList.contains("listIteam")) {
        const activeli = document.querySelector(".liActive");
        activeli.classList.remove("liActive");
        e.target.closest(".listContainerIteam").classList.add("liActive");
        currentToDo = document.querySelector(".liActive span").textContent;
        bannerText.textContent = currentToDo;
        bannerText.classList.remove("bannerTextAnimation");
        setTimeout(() => {
            bannerText.classList.add("bannerTextAnimation");
        }, 10);
        updateTasks();
    }
});

document.querySelector(".listContainerIteam").classList.add("liActive");

editBannerbtn.addEventListener("change", () => {
    const image = editBannerbtn.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        let src = e.target.result;
        banner.style.backgroundImage = `url(${src})`;
        localStorage.setItem("bannerImage", src)
    };
    reader.readAsDataURL(image);

});
