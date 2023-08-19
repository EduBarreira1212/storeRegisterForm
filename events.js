const input = document.getElementsByTagName("input");
const form = document.getElementById("formCadastro");
const btn = document.getElementById("submitBtn");
const recoverBtn = document.getElementById("recoverBtn");



function focusInput(event) {
    event.target.style.borderWidth = "0.50vw";
    event.target.style.borderColor = "purple";
}
function blurInput(event) {
    event.target.style.borderWidth = "0.1vw";
    event.target.style.borderColor = "black";
    console.log(event.target.value);
}
function recoverData(event) {
    for (const item of input) {
      if(item.className != "workDays"){
        console.log(window.localStorage.getItem(item.className));
        item.value = window.localStorage.getItem(item.className);
      }
      else{
        if(item.className == "workDays"){
          let stringWorkDays = window.localStorage.getItem("workDays")
          if (stringWorkDays.includes(item.value)) {
            console.log(item.value);
            item.checked = true;
          }
        }
      }
    }
}
function submitLog(event) {
    event.preventDefault();
    let checkedArray = [];
    let inputArray = [];
    for (const valor of input) {
        if(valor.className == "workDays"){
            if(valor.checked){
                console.log(valor.value);
                checkedArray.push(valor.value)
            }
        }
        else{
            console.log(valor.value);
            inputArray.push(valor.value);
        }
    }
    console.log("Preparando envio...")
    window.localStorage.setItem("nameStore", inputArray[0]);
    window.localStorage.setItem("adressStore", inputArray[1]);
    window.localStorage.setItem("workDays", checkedArray);
    window.localStorage.setItem("openTime", inputArray[2]);
    window.localStorage.setItem("closeTime", inputArray[3]);

    /*postData(inputArray, checkedArray)
  
    .then((data) => {
  
      console.log(data);  
  
  });*/
}
async function postData(inputArray, checkedArray) {

    const response = await fetch("https://apigenerator.dronahq.com/api/7nNuWuhV/Store", {
  
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "name" : inputArray[0],
        "adress" : inputArray[1],
        "workDays" : checkedArray,
        "opentime" : inputArray[2],
        "closeTime" : inputArray[3]
      })
    });
    return response.json();
  }
  
  

form.addEventListener("submit", submitLog);
recoverBtn.addEventListener("click", recoverData);
for (const item of input) {
    item.addEventListener("focus", focusInput);
    item.addEventListener("blur", blurInput);
}
