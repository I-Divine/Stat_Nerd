let buttons = document.querySelectorAll("button");
let table = document.querySelector("#tableContainer");
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

buttons.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.style.backgroundColor = "rgba(94, 13, 13)";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.backgroundColor = "rgba(20, 11, 11, 0.589)";
  });
});
tablebtn.addEventListener("click", () => {
  generateFrequencyTable();
});

btn.addEventListener("click", () => {
  submitValue();
  input.value = "";
});

sumBtn.addEventListener("click", () => {
  console.log(sum());
  displayResult(sum());
});

avgBtn.addEventListener("click", () => {
  displayResult(avg());
  console.log(avg());
});
medianBtn.addEventListener("click", () => {
  displayResult(findMedian(values));
});

modeBtn.addEventListener("click", () => {
  console.log(findMode(values));
  displayResult(findMode(values));
});

document.getElementById("clear list").onclick = () => {
  table.innerHTML = "";
  frequencyDistribution = new Map();
  values = [];
  displayValues();
};

document.getElementById("sort list").onclick = () => {
  values = sortValues(values);
  displayValues();
};

function displayResult(answer) {
  result.textContent = answer;
}

function submitValue() {
  if (charCheck(input.value)) {
    if (input.value.indexOf(",") >= 1) {
      let temp = input.value.split(",");
      temp.forEach((element) => {
        const num = Number(element);
        values.push(num);

        if (!frequencyDistribution.has(num)) {
          frequencyDistribution.set(num, 1);
        } else {
          frequencyDistribution.set(num, frequencyDistribution.get(num) + 1);
        }
      });
    } else {
      const num = Number(input.value);
      values.push(num);

      if (!frequencyDistribution.has(num)) {
        frequencyDistribution.set(num, 1);
      } else {
        frequencyDistribution.set(num, frequencyDistribution.get(num) + 1);
      }
    }
  }
  displayValues();
}
function sortValues(arr) {
  let sorted = arr.sort((a, b) => a - b);
  frequencyDistribution = new Map();
  sorted.forEach((x) => {
    if (!frequencyDistribution.get(x)) {
      frequencyDistribution.set(x, 1);
    } else {
      frequencyDistribution.set(x, frequencyDistribution.get(x) + 1);
    }
  });

  return sorted;
}
function charCheck(str) {
  let expectedChar = [1, 2, 3, 4, 5, , 6, 7, 8, 9, 0, ","];
  let checked;
  for (char of str) {
    checked = false;

    for (expChar of expectedChar) {
      if (char == expChar) {
        checked = true;
        break;
      }
    }
    if (!checked) {
      return false;
    }
  }
  return true;
}
function displayValues() {
  valueDisplay.textContent = values.toString();
}
function avg() {
  return sum() / values.length;
}

function sum() {
  let sum = 0;
  for (num of values) {
    sum += num;
  }
  return sum;
}
function findMode(arr) {
  let modeFrequency = 1;
  let mode = 0;
  for (const x of frequencyDistribution.entries()) {
    if (x[1] > modeFrequency) {
      modeFrequency = x[1];
      mode = x[0];
    }
  }
  return mode != 0 ? mode : "no mode";
}
function findMedian(arr) {
  arr.sort((a, b) => a - b);
  if (arr.length % 2 == 0) {
    return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
  } else {
    return arr[Math.ceil(arr.length / 2) - 1];
  }
}
function generateFrequencyTable() {
  let body = document.querySelector("#tableContainer");
  let table = document.createElement("table");
  let tbBody = document.createElement("tbody");
  let header = document.createElement("thead");
  let fhead = document.createElement("td");
  let xhead = document.createElement("td");
  let headRow = document.createElement("tr");
  if (body.firstChild) {
    body.innerHTML = "";
  }
  header.textContent = "Frequency Distribution";
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
    f.textContent = key[1];
    x.textContent = key[0];
    console.log(key);
    row.appendChild(x);
    row.appendChild(f);
    tbBody.appendChild(row);
  }
  table.appendChild(tbBody);
  body.appendChild(table);
}
