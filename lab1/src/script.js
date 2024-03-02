const sumField = document.querySelector('#sum')
const avgField = document.querySelector('#avg')
const maxField = document.querySelector('#max')
const minField = document.querySelector('#min')

const inputsContainer = document.querySelector('#inputs')

const cleanButton = document.querySelector('#clean')

const calculateButton = document.querySelector('#calculate')

const addFieldButton = document.querySelector('#add-field')

const automodeButton = document.querySelector('#automode-switch')

const infoButton = document.querySelector('#info')

let automodeState = false;


function parseInputs(inputs)
{
    let result = [];
    for (let input of inputs) {
        
        let inputValue = input.value;
        
        if(!isNaN(inputValue) && inputValue !== '')
        {
            result.push(inputValue)
        }

    }
    
    return result;
}

function calcSum(array){
    let result = 0;
    for (const item of array) {
        result = parseInt(item) + result;
    }
    return result;
}

function calcAvg(array){
    let result = 0;
    for (const item of array) {
        result = parseInt(item) + result;
    }
    return result/array.length;
}

function inputFactory(){
    const index = inputsContainer.childElementCount + 1;

    let wrapper = document.createElement('div');
        wrapper.classList.add('input')
    
        
    let label = document.createElement('label');
        label.textContent = `Field ${index}`
        label.for = `input${index}`;

    let inputBox = document.createElement('div');
        inputBox.classList.add('input-box')

    let input = document.createElement('input');
        input.type = 'text'
        input.id = `input${index}`

    if(automodeState){
        input.addEventListener('input',calculate)
    }

    let img = document.createElement('img');
        img.src = 'bin.png';
        img.alt = 'delete';
        img.id = 'delete';
        img.addEventListener('click',()=>{
            inputsContainer.removeChild(wrapper);
        })

    inputBox.appendChild(input);
    inputBox.appendChild(img);
    
    wrapper.appendChild(label);
    wrapper.appendChild(inputBox);

    return wrapper;
}

function calculate(){
    let inputs = inputsContainer.querySelectorAll('input')

    let inputValues = parseInputs(inputs);

    //todo, consider explicite execption
    let sum = calcSum(inputValues)
    if (isNaN(sum)) sum =0;

    let avg = calcAvg(inputValues)
    if (isNaN(avg)) avg =0;

    let min = Math.min(...inputValues)
    if (isNaN(min) || min === Infinity) min = 0

    let max = Math.max(...inputValues)
    if (isNaN(max) || max === -Infinity) max = 0

    sumField.innerHTML = sum
    avgField.innerHTML = avg
    maxField.innerHTML = max
    minField.innerHTML = min
}

function toggleAutomode(){
    let inputs = inputsContainer.querySelectorAll('input')
    
    if(automodeState)
    {
        for (const input of inputs) {
            input.addEventListener('input', calculate)
        }
    }else{
        for (const input of inputs) {
            input.removeEventListener('input',calculate);
        }
    }

}

function inputsValidation(){
    let inputs = inputsContainer.querySelectorAll('input')
    for (const input of inputs) {

        input.addEventListener('input',()=>{
            let inputValue = input.value;

            if(isNaN(inputValue))
            {
                input.classList.add('error')
            }else{
                input.classList.remove('error')
            }
        })
    }
}

calculateButton.addEventListener('click',()=>{calculate()})

cleanButton.addEventListener('click',()=>{
    let inputs = inputsContainer.querySelectorAll('input')

    for (const input of inputs) {
        input.value = ''
    }
    calculate();
})

addFieldButton.addEventListener('click',()=>{
    let input = inputFactory()
    inputsContainer.appendChild(input);
    inputsValidation();
})

automodeButton.addEventListener('click',()=>{
    automodeButton.classList.toggle('on')
    automodeState = !automodeState;
    toggleAutomode();
    calculate();
})

infoButton.addEventListener('click',()=>{
    const infoCard = document.querySelector('#info-card')
    infoCard.classList.toggle('on')
})

inputsValidation();