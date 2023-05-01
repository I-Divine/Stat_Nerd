let buttons = document.querySelectorAll("button");
let table = document.querySelector("#tableContainer")
let frequencyDistribution = new Map();
let values = [];
let input = document.getElementById("inputValue");
let btn = document.getElementById("submit");
let sumBtn = document.getElementById("sum");
let valueDisplay = document.getElementById("valuesContainer");
let avgBtn = document.getElementById("avg");
let modeBtn = document.getElementById("mode");
let result = document.getElementById("resultContainer");
let medianBtn = document.getElementById("medianBtn");
let tablebtn = document.querySelector("#tblBtn");
buttons.forEach((btn)=>{
    btn.addEventListener("mouseover", ()=>{
        btn.style.backgroundColor = "rgba(94, 13, 13)";
    });
    btn.addEventListener("mouseout", ()=>{
        btn.style.backgroundColor = "rgba(20, 11, 11, 0.589)";
    });
})
tablebtn.addEventListener("click", ()=>{
    generateFrequencyTable();
})

btn.addEventListener("click", ()=>{
    submitValue();
    input.value = "";
});

sumBtn.addEventListener("click", ()=>{
    console.log(sum());
    displayResult(sum());
});

avgBtn.addEventListener("click", ()=>{
    displayResult(avg());
    console.log(avg());
    
});
medianBtn.addEventListener("click", ()=>{
    displayResult(findMedian(values));
});

modeBtn.addEventListener("click", ()=>{
    console.log(findMode(values));
    displayResult(findMode(values));
});

document.getElementById("clear list").onclick = ()=>{
    table.innerHTML = ""
    frequencyDistribution = new Map();
    values = [];
    displayValues();
}

document.getElementById("sort list").onclick = ()=>{
    values = sortValues(values);
    displayValues();   
}

function displayResult(answer){
    result.textContent = answer;
}
function submitValue(){
    if(charCheck(input.value)){
        if(input.value.indexOf(",") >= 1){
            let temp = input.value.split(",");
            temp.forEach(element => {
                values.push(Number(element))
            });
            console.log(input.value.split(","));

        }else{
            values.push(Number(input.value));
        }
        // console.log(frequencyDistribution.get(arr[1]))
        for(let i = 0; i<values.length ; i++){
            if(!frequencyDistribution.get(values[i])){
                frequencyDistribution.set(values[i], 1);
            }else{
                frequencyDistribution.set(values[i], frequencyDistribution.get(values[i])+1);
            }
        }
        console.log(frequencyDistribution);
    }else{  
        console.log("wrong");
    }

    displayValues();
    console.log(values);
}
function sortValues(arr){
    let sorted = arr.sort((a,b)=>a-b)
    // frequencyDistribution.sort((a,b)=>a-b)
    frequencyDistribution = new Map();
    sorted.forEach((x)=>{
        if(!frequencyDistribution.get(x)){
            frequencyDistribution.set(x, 1);
        }else{
            frequencyDistribution.set(x,frequencyDistribution.get(x) + 1);
        }
    })
    console.log(frequencyDistribution);
    
    return sorted;
}

function charCheck( str ){ 
    //this function checks for illegal character
    let expectedChar = [1,2,3,4,5,,6,7,8,9,0,","];
    let checked;
    for(char of str){
        checked = false;

        for(expChar of expectedChar){
            if(char == expChar){
                checked = true;
                break;
            }
        }

        if(!checked){
            return false;
        }
    }
    return true;
}


function displayValues(){
    valueDisplay.textContent= values.toString();
    // console(valueDisplay)
}
function avg(){
    // console.log(sum()/values.length);
    return sum()/values.length;
}
function sum(){
    let sum = 0;
    for(num of values){
        sum+=num;
    }
    // console.log(sum);
    return sum;
}
function findMode(arr){
    let modeFrequency = 1;
    //     console.log(frequencyDistribution.get(arr[1]))
    // for(let i = 0; i<arr.length ; i++){
    //     if(!frequencyDistribution.get(arr[i])){
    //         frequencyDistribution.set(arr[i], 1);
    //     }else{
    //         frequencyDistribution.set(arr[i], frequencyDistribution.get(arr[i])+1);
    //     }
    // }
    let mode = 0;
    for (const x of frequencyDistribution.entries()) {
        if(x[1]> modeFrequency){
            modeFrequency = x[1];
            mode = x[0]
        }
    }
        // console.log(frequencyDistribution.get(100))
        // console.log(frequencyDistribution);
    return mode != 0 ?mode : "no mode";
}
// console.log(findMedian([1,45,43,32,2,34343,3,43,1,23,2,43,76]));
function findMedian(arr){
    console.log(arr);
    arr.sort((a,b)=>a-b);
    console.log(arr);
    // arr = sortValues(arr);
    if(arr.length%2 == 0){
        return (arr[(arr.length/2)-1]+arr[arr.length/2])/2;
    }else{
        return arr[Math.ceil(arr.length/2)-1];
    }
}
function generateFrequencyTable(){
    let body = document.querySelector("#tableContainer");
    let table =document.createElement("table");
    let tbBody =document.createElement("tbody");
    let header = document.createElement("thead");
    let fhead = document.createElement("td")
    let xhead = document.createElement("td")
    let headRow = document.createElement("tr");
    if(body.firstChild){
        body.innerHTML = "";
    }
    header.textContent="Frequency Distribution";
    fhead.textContent = "frequency";
    xhead.textContent = "items(x)";
    headRow.appendChild(xhead);
    headRow.appendChild(fhead);
    tbBody.appendChild(header);
    tbBody.appendChild(headRow);
    for (const key of frequencyDistribution) {
        let row = document.createElement("tr");
        let x = document.createElement("td");
        let f = document.createElement("td");
        f.textContent= key[1]; 
        x.textContent = key[0];
        console.log(key);
        row.appendChild(x);
        row.appendChild(f);
        tbBody.appendChild(row);
        // if (frequencyDistribution.hasOwnProperty.call(frequencyDistribution, key)) {
            // const element = frequencyDistribution[key];       
        // }
    }
    table.appendChild(tbBody);
    body.appendChild(table);
    
}
