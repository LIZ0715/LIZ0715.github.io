
//取DOM元素
let price = document.querySelector(".price");
let applePicture = document.querySelector(".main-pic");
let color_row = document.querySelector(".color-row");
let color_template = document.querySelector("#color_button");
let storage_row = document.querySelector(".storage-row");
let storageAndNetwork_template = document.querySelector("#storageAndnetWork_button");
let network_row = document.querySelector(".network-row");
let ipadAirButton = document.getElementById("ipadAir");
let iphoneButton = document.getElementById("iphone");
let macButton = document.getElementById("Mac");
let appleButtonContainer = document.querySelector(".apple_btn");
let startpic = document.querySelector('.start-pic');
let home = document.getElementById('home');
let colorName = [], storageName = [], networkName = [];

window.onload = function () {
    startpic.src = "./unnamed.jpg";
}
home.addEventListener("click", function (event) {
    location.reload();
})
let p
//掛事件
ipadAirButton.addEventListener("click", function () {
    clearAppleBtn();
    startpic.remove();
    p = "";
    colorName.length = 0;
    storageName.length = 0;
    networkName.length = 0;
    document.querySelector(".network-text").textContent = "網路";
    document.querySelector(".storage-text").textContent = "規格";
    document.querySelector(".color-text").textContent = "顏色";
    applePicture.src = "./1688224883713.jpg";
    price.textContent = `NT$`;
    generateBtn("ipad");
    getButtonID();

    //掛button事件
    colorbtn.forEach((color, index) => {
        color.addEventListener("click", name => {
            let currentColor = colorName[index];
            appleColor("ipad", currentColor);

        })
    })
    storagebtn.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentStorage = storageName[index];
            appleStorage(currentStorage);
        })
    })

    networkbtn.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentNetwork = networkName[index];
            appleNetwork(currentNetwork);
            _queryInternet.forEach(item => {
                p = item.price;
            })
            price.textContent = `NT$${p.toLocaleString('en-US', { useGrouping: true })}`
        })
    })
})

iphoneButton.addEventListener("click", function () {
    clearAppleBtn();
    startpic.remove();
    p = "";
    colorName.length = 0;
    storageName.length = 0;
    networkName.length = 0;
    document.querySelector(".network-text").textContent = "";
    document.querySelector(".storage-text").textContent = "規格";
    document.querySelector(".color-text").textContent = "顏色";
    applePicture.src = "./1688225028502.jpg";
    price.textContent = `NT$`;
    generateBtn("iphone");
    getButtonID();

    //掛button事件
    colorbtn.forEach((color, index) => {
        color.addEventListener("click", name => {
            let currentColor = colorName[index];
            appleColor("iphone", currentColor);
        })
    })
    storagebtn.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentStorage = storageName[index];
            appleStorage(currentStorage);
            _queryStorage.forEach(item => {
                p = item.price;
            })
            price.textContent = `NT$${p.toLocaleString('en-US', { useGrouping: true })}`
        })
    })
    network_row.innerHTML = ""
})
macButton.addEventListener("click", function (event) {
    clearAppleBtn();
    startpic.remove();
    generateBtn("mac");
    document.querySelector(".network-text").textContent = "SSD";
    document.querySelector(".color-text").textContent = "顏色";
    document.querySelector(".storage-text").textContent = "規格";
    p = "";
    colorName.length = 0;
    storageName.length = 0;
    networkName.length = 0;
    price.textContent = `NT$`;
    applePicture.src = "./macbook.jpg";
    getButtonID();
    //掛事件
    colorbtn.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentColor = colorName[index];
            appleColor("mac", currentColor);
        })
    })

    storagebtn.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentStorage = storageName[index];
            appleStorage(currentStorage);
        })
    })

    networkbtn.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentNetwork = networkName[index];
            appleNetwork(currentNetwork);
            _queryInternet.forEach(item => {
                p = item.price;
            })
            price.textContent = `NT$${p.toLocaleString('en-US', { useGrouping: true })}`
        })
    })
})

let _queryColor;
function appleColor(id, color) {
    _queryColor = appleArray.filter(item => item.id == id && item.color == color);
    applePicture.src = `./${_queryColor[0].mainpic}`;
}

let _queryStorage;
function appleStorage(storage) {
    _queryStorage = _queryColor.filter(item => item.storage == storage);
}

let _queryInternet;
function appleNetwork(internet) {
    _queryInternet = _queryStorage.filter(item => item.network == internet);
}

function clearAppleBtn() {
    color_row.innerHTML = "";
    storage_row.innerHTML = "";
    network_row.innerHTML = "";
}

let appleArray
//API
fetch('https://raw.githubusercontent.com/LIZ0715/FileStorage/main/apple1.json')
    .then(response => {
        return response.json();
    })
    .then(res => {
        // console.log(res)
        appleArray = res;
    })
    .catch(err => {
        console.log(err);
    })

// clone template
function getColorButton(circleUrl, name) {
    let cloneCard = color_template.content.cloneNode(true);//true會把節點下面的子節點一起複製起來
    let button = cloneCard.querySelector("a");
    button.id = name;//設id
    cloneCard.querySelector("img").src = `./${circleUrl}`;
    cloneCard.querySelector(".text").innerHTML = name;
    return cloneCard;//把製作好的卡片回傳給呼叫端
}
function getStorageButton(name) {
    let cloneCard = storageAndNetwork_template.content.cloneNode(true);
    cloneCard.querySelector(".text").innerHTML = name;
    let button = cloneCard.querySelector("a");
    button.id = name;
    button.classList.add("storage-btn");
    return cloneCard;
}
function getNetworkButton(name) {
    let cloneCard = storageAndNetwork_template.content.cloneNode(true);
    cloneCard.querySelector(".text").innerHTML = name;
    let button = cloneCard.querySelector("a");
    button.id = name;
    button.classList.add("network-btn");
    return cloneCard;
}


//generate color button
let queryColor;
let uniqueColors;
let filteredData;
let queryNetwork;
let uniqueNetwork;
let filteredData_Network;
let queryStorage;
let uniqueStorage;
let filteredData_Storage;

//產生button
function generateBtn(id) {
    //query顏色
    queryColor = appleArray.filter(item => item.id === id)
        .map(({ id, color, picture }) => ({ id, color, picture }));
    uniqueColors = new Set();
    filteredData = [];

    for (const item of queryColor) {
        if (!uniqueColors.has(item.color)) {
            uniqueColors.add(item.color);
            filteredData.push(item);
        }
    }

    filteredData.forEach((item, index) => {
        color_row.append(getColorButton(item.picture, item.color));
    })

    //query network
    queryNetwork = appleArray.filter(item => item.id === id)
        .map(({ id, network }) => ({ id, network }));
    uniqueNetwork = new Set();
    filteredData_Network = [];
    for (const item of queryNetwork) {
        if (!uniqueNetwork.has(item.network)) {
            uniqueNetwork.add(item.network);
            filteredData_Network.push(item);
        }
    }

    filteredData_Network.forEach((item, index) => {
        network_row.append(getNetworkButton(item.network));
    })

    //query storage
    queryStorage = appleArray.filter(item => item.id === id)
        .map(({ id, storage }) => ({ id, storage }));

    uniqueStorage = new Set();
    filteredData_Storage = [];
    for (const item of queryStorage) {
        if (!uniqueStorage.has(item.storage)) {
            uniqueStorage.add(item.storage);
            filteredData_Storage.push(item);
        }
    }
    console.log(filteredData_Storage);
    filteredData_Storage.forEach((item, index) => {
        storage_row.append(getStorageButton(item.storage))
    })
}

let colorbtn;
let storagebtn;
let networkbtn;

//取id
function getButtonID() {
    colorbtn = document.querySelectorAll(".color-btn");
    colorbtn.forEach(item => {
        colorName.push(item.getAttribute("id"));
    });
    console.log(colorName);

    storagebtn = document.querySelectorAll(".storage-btn");
    storagebtn.forEach(item => {
        storageName.push(item.getAttribute("id"));
    });
    console.log(storageName)

    networkbtn = document.querySelectorAll(".network-btn"); //SSD
    networkbtn.forEach(item => {
        networkName.push(item.getAttribute("id"));
    });
    console.log(networkName)
}





