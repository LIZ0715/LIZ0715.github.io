
const url = "https://raw.githubusercontent.com/LIZ0715/FileStorage/main/apple.json";
//取DOM元素
let price = document.querySelector(".price");
let applePicture = document.querySelector(".main-pic");
let color_row = document.querySelector(".color-row");
let color_template = document.querySelector("#color_button");
let storage_row = document.querySelector(".storage-row");
let storage_template = document.querySelector("#storage_button");
let network_row = document.querySelector(".network-row");
let network_template = document.querySelector("#network_button");
let ipadAirButton = document.getElementById("ipadAir");
let iphoneButton = document.getElementById("iphone");
let macButton=document.getElementById("Mac");
let appleButtonContainer = document.querySelector(".apple_btn");
let startpic=document.querySelector('.start-pic');
let home=document.getElementById('home');
let colorName = [], storageName = [], networkName = [];
let cb, sb, nb;
window.onload = function () {
    getJSONdata(url);
    document.querySelector(".network-text").textContent = "";
    document.querySelector(".color-text").textContent = "";
    document.querySelector(".storage-text").textContent = "";
    price.textContent="";
    startpic.src="./unnamed.jpg";
}

home.addEventListener("click",function(event){
    location.reload();
})

//取id
function getID(){
     //取id
    cb=document.querySelectorAll(".color-btn");
    cb.forEach(item=>{
        colorName.push(item.getAttribute("id"));
    });
    console.log(colorName);
    sb = document.querySelectorAll(".storage-btn");
    sb.forEach(item => {
        storageName.push(item.getAttribute("id"));
    });
    console.log(storageName)

    nb = document.querySelectorAll(".network-btn"); //SSD
    nb.forEach(item => {
        networkName.push(item.getAttribute("id"));
    });
    console.log(networkName)
}

let ppp;
macButton.addEventListener("click",function(event){
    clearAppleBtn();
    startpic.remove();
    generateMacButton();
    document.querySelector(".network-text").textContent = "SSD";
    document.querySelector(".color-text").textContent = "顏色";
    document.querySelector(".storage-text").textContent = "規格";
    p="";
    pp="";
    cb="";
    sb="";
    nb="";
    colorName.length=0;
    storageName.length=0;
    networkName.length=0;
    price.textContent=`NT$`;
    applePicture.src="./macbook.jpg";
    getID();
     //掛事件
     cb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentColor = colorName[index];
            appleColor("mac",currentColor);
        })
    })

    sb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentStorage = storageName[index];
            appleStorage(currentStorage);
        })
    })

    nb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentNetwork = networkName[index]; //SSD
            appleNetwork(currentNetwork);
            queryStorage.forEach(item=>{
            ppp=item.price;
             })
             price.textContent=`NT$${ppp}`;
            })
    })
})

let pp;
iphoneButton.addEventListener("click", function (event) {
    clearAppleBtn();
    startpic.remove();
    generateIphoneButton();
    p="";
    ppp="";
    cb="";
    sb="";
    nb="";
    colorName.length=0;
    storageName.length=0;
    networkName.length=0;
    price.textContent=`NT$`;
    applePicture.src="./1688225028502.jpg";
    document.querySelector(".network-text").textContent = "";
    document.querySelector(".color-text").textContent = "顏色";
    document.querySelector(".storage-text").textContent = "規格";
    getID();
    //掛事件
    cb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentColor = colorName[index];
            appleColor("iphone",currentColor);
        })
    })

    sb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentStorage = storageName[index];
            appleStorage(currentStorage);     
               queryStorage.forEach(item=>{
               pp=item.price;
            })
                price.textContent= `NT$${pp}`;              
         })
    })
})

let p;
ipadAirButton.addEventListener("click", function (event) {
    clearAppleBtn();
    startpic.remove();
    generateButton();
    sb="";
    cb="";
    nb="";
    pp="";
    ppp="";
    colorName.length=0;
    storageName.length=0;
    networkName.length=0;
    price.textContent=`NT$`;
    document.querySelector(".network-text").textContent = "網路";
    document.querySelector(".storage-text").textContent = "規格";
    document.querySelector(".color-text").textContent = "顏色";
    applePicture.src="./1688224883713.jpg";
    getID();
    //掛事件  
    //找出當前按的button是哪個顏色
    cb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentColor = colorName[index];
            appleColor("ipad",currentColor); //呼叫ipadColor方法，讓相對應的圖片顯示在畫面上
        })
    })

    sb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentStorage = storageName[index];
            appleStorage(currentStorage);
        })
    })

    nb.forEach((btn, index) => {
        btn.addEventListener("click", name => {
            let currentNetwork = networkName[index];
            appleNetwork(currentNetwork);
            queryStorage.forEach(item=>{
                p=item.price;
            })
            price.textContent= `NT$${p}`;              
        })
    })
});


function clearAppleBtn() {
    color_row.innerHTML = ""; // 清除 Apple 按鈕區域的內容
    storage_row.innerHTML = "";
    network_row.innerHTML = "";
}

//取JSON資料
let appleArray = [];
let xhr = new XMLHttpRequest();
function getJSONdata(uri) {
    xhr.onload = function () {
        if (xhr.readyState == 4 || xhr.status == 200) {
            appleArray = JSON.parse(this.responseText);
            console.log(appleArray);
        } else {
            console.log("Request failed with status:", xhr.status);
        }
    }
    xhr.open("GET", uri);
    xhr.send();
}

//ipadAir
function generateButton() {
    let query = appleArray.filter(item => item.storage == "64GB" && item.network == "Wi-Fi");

    //查詢容量
    let queryResult = [];
    let query64GB = appleArray.find(item => item.storage === "64GB");
    if (query64GB) {
        queryResult.push(query64GB);
    }
    let query256GB = appleArray.find(item => item.storage === "256GB");
    if (query256GB) {
        queryResult.push(query256GB);
    } console.log(queryResult)

    //查詢網路
    let queryNetwork = [];
    let queryW = appleArray.find(item => item.network === "Wi-Fi");
    if (queryW) {
        queryNetwork.push(queryW);
    }
    let queryC = appleArray.find(item => item.network === "Cellular");
    if (queryC) {
        queryNetwork.push(queryC);
    } console.log(queryNetwork)

    query.forEach((ipad, index) => {
        color_row.append(getColorButton(ipad.picture, ipad.color));
    })
    queryResult.forEach((ipad, index) => {
        storage_row.append(getStorageButton(ipad.storage));
    })

    queryNetwork.forEach((ipad, index) => {
        network_row.append(getNetworkButton(ipad.network));
    })

}

//iphone generate button
function generateIphoneButton() {
    //手機顏色
    let iphoneColors = appleArray.filter(item => item.price === 34900);
    console.log(iphoneColors);
    iphoneColors.forEach((iphone) => {
        color_row.append(getColorButton(iphone.picture, iphone.color))
    })

    //手機容量 128 256 512 1TB
    let queryResult = [];
    let query128GB = appleArray.find(item => item.storage === "128GB");
    if (query128GB) {
        queryResult.push(query128GB);
    }
    let query256GB = appleArray.find(item => item.storage === "256GB");
    if (query256GB) {
        queryResult.push(query256GB);
    }

    let query512GB = appleArray.find(item => item.storage === "512GB");
    if (query512GB) {
        queryResult.push(query512GB);
    }
    let query1TB = appleArray.find(item => item.storage === "1TB");
    if (query1TB) {
        queryResult.push(query1TB);
    }
    console.log(queryResult)
    queryResult.forEach((iphone, index) => {
        storage_row.append(getStorageButton(iphone.storage));
    })
}

function generateMacButton(){
    // clearAppleBtn();
    //Mac顏色
    let macColors=[];
    macColors1= appleArray.find(item => (item.id ==="mac"&& item.color==="銀色"));
    macColors.push(macColors1);
    macColors2=appleArray.find(item=>item.id==="mac" && item.color==="太空灰色");
    macColors.push(macColors2);
    console.log(macColors)
    macColors.forEach((mac) => {
        color_row.append(getColorButton(mac.picture, mac.color))
    })

    //Mac Storage
    let queryResult = [];
    let query8GB = appleArray.find(item =>item.id ==="mac" && item.storage === "8GB");
    if (query8GB) {
        queryResult.push(query8GB);
    }
    let query16GB = appleArray.find(item =>item.id ==="mac" && item.storage === "16GB");
    if (query16GB) {
        queryResult.push(query16GB);
    }

    let query24GB = appleArray.find(item =>item.id ==="mac" && item.storage === "24GB");
    if (query24GB) {
        queryResult.push(query24GB);
    }

    console.log(queryResult)
    queryResult.forEach((mac, index) => {
        storage_row.append(getStorageButton(mac.storage));
    })

    //Mac SSD 128GB 256GB 512GB 1TB 2TB
    let querySSD = [];
    let query128GB = appleArray.find(item => item.id ==="mac" && item.SSD === "128GB");
    if (query128GB) {
        querySSD.push(query128GB);
    }

    let query256GB = appleArray.find(item =>item.id ==="mac" && item.SSD === "256GB");
    if (query256GB) {
        querySSD.push(query256GB);
    }

    let query512GB = appleArray.find(item =>item.id ==="mac" && item.SSD === "512GB");
    if (query512GB) {
        querySSD.push(query512GB);
    }

    let query1TB=appleArray.find(item =>item.id ==="mac" && item.SSD === "1TB");
    if(query1TB){
        querySSD.push(query1TB);
    }

    let query2TB=appleArray.find(item =>item.id ==="mac" && item.SSD === "2TB");
    if(query2TB){
        querySSD.push(query2TB);
    }
             
    querySSD.forEach((mac, index) => {
        network_row.append(getNetworkButton(mac.SSD));
    })

}

//clone template樣板
//顏色的樣板
function getColorButton(circleUrl, name) {
    let cloneCard = color_template.content.cloneNode(true);//true會把節點下面的子節點一起複製起來
    let button = cloneCard.querySelector("a");
    button.id = name;//設id
    cloneCard.querySelector("img").src = `./${circleUrl}`;
    cloneCard.querySelector(".text").innerHTML = name;
    return cloneCard;//把製作好的卡片回傳給呼叫端
}

function getStorageButton(name) {
    let cloneCard = storage_template.content.cloneNode(true);
    cloneCard.querySelector(".text").innerHTML = name;
    let button = cloneCard.querySelector("a");
    button.id = name;
    return cloneCard;
}

function getNetworkButton(name) {
    let cloneCard = network_template.content.cloneNode(true);
    cloneCard.querySelector(".text").innerHTML = name;
    let button = cloneCard.querySelector("a");
    button.id = name;
    return cloneCard;
}

//掛事件呼叫的方法
let queryColor;
function appleColor(id,color) {
    queryColor = appleArray.filter(item =>item.id==id && item.color == color);
    applePicture.src = `./${queryColor[0].mainpic}`;
}
  
let queryStorage;
function appleStorage(storage){
    queryStorage=queryColor.filter(item=>item.storage==storage);
}

let queryInternet;
function appleNetwork(internet){
    queryInternet=queryStorage.filter(item=>item.network==internet);           
}