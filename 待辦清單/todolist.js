//宣告Modal
let myEditModal = new bootstrap.Modal('#editModal', {
    keyboard: false
})

//宣告DOM
const addItemButton = document.getElementById('AddButton');
let userInputData = document.getElementById('inputData');
const data_row = document.querySelector('.row');
const modalEditButton = document.getElementById('revise');
const modalContent = document.getElementById('edit-content');
let key = 'LIZ'; //我只有設一個key

window.onload = function () {
    init();//先做初始化頁面(重新渲染)
}

//事件註冊
//新增按鈕
addItemButton.addEventListener("click", function () {
    if (!userInputData.value.trim()) { //判斷如果使用者輸入的是空值的話，就會跳出alert提醒!
        alert(`請輸入待辦事項`);
        return;
    }
    addDataToLocalStorage(userInputData.value); //阿如果不是空值的話，使用者輸入的資料就會放進我的local storage裡面
    init();//然後畫面還需要重新渲染一次
    userInputData.value = '';//把畫面上的input清空
})
//enter註冊
userInputData.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        if (!userInputData.value.trim()) { //判斷如果使用者輸入的是空值的話，就會跳出alert提醒!
            alert(`請輸入待辦事項`);
            return;
        }
        addDataToLocalStorage(userInputData.value);
        init();
        userInputData.value = '';
    }
})

//enter註冊
modalContent.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        editModalButton();
        init();
    }
})

// ----------------------------------------------------------------------

//function
//如果local storage本身就存在資料，在畫面重載或進入時，需要渲染出來
//初始化的概念
function init() {
    let boxItem = document.querySelector('.boxItem');
    boxItem.innerHTML = ""
    let findData = getLocalStorage(key);
    if (findData != null) {
        findData.forEach((item, index) => {
            renderToDoList(item.content, index, item.checked)
        })
    }
    deleteAndEditButtonEventListeners()
    checkboxIsCheckOrNot();
}
//動態渲染畫面 我init()呼叫renderToDoList()
function renderToDoList(userInput, index, isChecked) {
    //當按下add button，將使用者輸入的資料以html形式逐一動態渲染出來，當checkbox被打勾時，他的狀態可以透過HTML的checked來表示，所以在刷新頁面時，勾勾還會在
    let toDoList = `
    <div class="check-input">
    <input name="${index}" class="form-check-input" type="checkbox" value="${index}" id="flexCheckDefault" ${isChecked ? 'checked' : ''}>
    <label class="form-check-label" for="${index}">
            ${userInput}
        </label>
    </div>
    <div class="edit-revise-button">
        <button type="button" class="edit" data-index="${index}">編輯</button>
        <button type="button" class="delete" data-index="${index}">刪除</button>
    </div>
    `;

    let div = document.createElement('div');
    div.setAttribute("class", "form-check");
    let boxItem = document.querySelector('.boxItem');
    div.innerHTML = toDoList;
    boxItem.append(div);
    data_row.append(boxItem);

}

//delete and edit button addEventListener
function deleteAndEditButtonEventListeners() {
    let editButtons = document.querySelectorAll('.edit');
    let deleteButtons = document.querySelectorAll('.delete');
    editButtons.forEach(editButton => {
        editButton.addEventListener("click", function (e) {
            myEditModal.show();
            let currentIndex = e.target.getAttribute('data-index');
            let formCheckLabels = document.querySelectorAll('.form-check-label');
            let dataArray = []
            formCheckLabels.forEach(item => {
                dataArray.push(item.innerText);
                setModal(dataArray[currentIndex], currentIndex)
            })
            modalEditButton.addEventListener("click", function () {
                editModalButton(currentIndex);
                init();
            });
        });
    });

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", function (e) {
            let currentIndex = e.target.getAttribute('data-index');
            let getLocalStorageArray = getLocalStorage(key);
            getLocalStorageArray.splice(currentIndex, 1);
            localStorage.setItem(key, JSON.stringify(getLocalStorageArray));
            setLocalStorage(key,getLocalStorageArray);
            init();
        });
    });
}

//localStorage設定及設計
//設計key跟value在localstorage的樣子，阿存在ls一定都會是字串
function addDataToLocalStorage(v) {
    let data = [];
    let storedData = { content: v, checked: 0 }; //設計放在local Storage的樣子，checked預設值都會是0
    let originalData = getLocalStorage(key);
    //判斷如果ls原本有資料的話，就把原本的資料放進data陣列裡面
    if (originalData != null) {
        data =originalData;
    }
    data.push(storedData);//然後把新的資料也放到data陣列後面接續下去
    // localStorage.setItem(key, JSON.stringify(data));//再存進去ls
    setLocalStorage(key,data);
}

//取得localStorage資料
function getLocalStorage(key) {
    //型態為string<----localStorage parse成陣列       
    //把資料return回呼叫端
    let data = JSON.parse(localStorage.getItem(key));
    return data;
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)) //放字串 做轉型
}

//Modal input欄位的設定以及修改那顆按鈕的html設定
function setModal(content, index) {
    const modalContent = document.getElementById('edit-content');
    modalEditButton.setAttribute('data-index', index);//這邊也設定modal裡面的修改按鈕自訂意屬性
    modalContent.value = content; //設定modal內容的預設值，我放在編輯那個按鈕，打開才需要看到
}

//modal修改按鈕的要做的事情
function editModalButton() {
    let getLocalStorageArray = getLocalStorage(key);
    let editScheduleItem = modalContent.value; //modalContent.value是使用者要修改的內容值
    let currentIndex = modalEditButton.getAttribute('data-index');//
    getLocalStorageArray[currentIndex].content = editScheduleItem;//把原本的input內容修改為編輯後的內容值
    setLocalStorage(key,getLocalStorageArray);
    myEditModal.hide();
}

//checkbox判斷以及註冊事件
function checkboxIsCheckOrNot() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", function (e) {
            let getLocalStorageArray = getLocalStorage(key);
            let currentIndex = checkbox.getAttribute('name');
            //array裡面的checked屬性我設定0或1，來表示是否被勾選，所以我就判斷說如果我點擊的那個box有被打勾的話，原本設定的值就會變1，反之為0
            getLocalStorageArray[currentIndex].checked = e.target.checked ? 1 : 0;
            setLocalStorage(key,getLocalStorageArray);
        });
    });

}

