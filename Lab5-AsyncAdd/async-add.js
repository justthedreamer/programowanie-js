function pushErrorMessage(message) {
  const errorBox = document.querySelector("#error-message");
  errorBox.textContent = message;
  errorBox.classList.add("active");

  const rangeBoxes = document.querySelectorAll(".range-input");
  rangeBoxes.forEach((rangeBox) => rangeBox.classList.add("error"));
  setTimeout(() => {
    errorBox.classList.remove("active");
    rangeBoxes.forEach((rangeBox) => rangeBox.classList.remove("error"));
  }, 2000);
}

function validateRangeInputs() {
  const rangeInputs = document.querySelectorAll(".range-input");
  const val1 = Number.parseInt(rangeInputs[0].value);
  const val2 = Number.parseInt(rangeInputs[1].value);
  return val1 <= val2;
}

const rangeInputs = document.querySelectorAll(".range-input");
rangeInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const isValid = validateRangeInputs();

    if (!isValid) {
      rangeInputs.forEach((input) => input.classList.add("error"));
    } else {
      rangeInputs.forEach((input) => input.classList.remove("error"));
    }
  });
});

async function asyncAdd(a, b) {
  console.count("[async add operation]");
  if (typeof a !== "number" || typeof b !== "number") {
    console.log("err", { a, b });
    return Promise.reject("Arguments must be of type number!");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 10);
  });
}

async function sumAsync(args) {
  if (args.length === 0) {
    return 0;
  }
  let result = args[0];
  for (let i = 1; i < args.length; i++) {
    result = await asyncAdd(result, args[i]);
  }
  return result;
}

async function measurePerformance(name, cb) {
  console.log(`Start: ${name}`);
  performance.mark('mf-start');
  const result = await cb();
  performance.mark('mf-end');
  const runTime = performance.measure('Execution time', 'mf-start', 'mf-end');
  console.log(`Result from ${name}: ${result}`);
  console.log(`Execution time: ${runTime.duration.toFixed(2)}ms`);
  document.querySelector("#performance span").textContent = `${runTime.duration.toFixed(2)}ms`;
  return result;
}

const runBtn = document.querySelector("#run");
runBtn.addEventListener("click", async () => {
  const isInputsValid = validateRangeInputs();
  if (!isInputsValid) {
    pushErrorMessage("Invalid range!");
    return;
  }

  const input1 = Number.parseInt(document.querySelectorAll(".range-input")[0].value);
  const input2 = Number.parseInt(document.querySelectorAll(".range-input")[1].value);
  const count = Number.parseInt(document.querySelector("#settings input[type='range']").value);

  const numbers = Array.from({ length: count }, () => Math.floor(Math.random() * (input2 - input1 + 1)) + input1);
  
  document.querySelector("#generated-numbers").textContent = numbers.join(' ');

  document.querySelector("#executing-time").textContent = 'executing...';
  const result = await measurePerformance('sumAsync', async () => await sumAsync(numbers));
  document.querySelector("#result").textContent = result;
  document.querySelector("#executing-info").classList.add('active');
});

const rangeInput = document.querySelector("#settings input[type='range']");
rangeInput.addEventListener("input", (e) => {
  document.querySelector("#settings label span").textContent = e.target.value;
});
