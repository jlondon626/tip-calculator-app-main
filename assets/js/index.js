
const regexCodes = {
    "decimalMoneyRegex": /^\d+(\.\d{1,2})?$/,
    "percentageRegex": /^\d+(\.\d)?$/,
    "wholePositiveNumberRegex": /^[1-9]\d*$/
}

const validations = {
    "bill-amount": (value) => regexCodes["decimalMoneyRegex"].test(value), 
    "custom-tip": (value) => regexCodes["percentageRegex"].test(value),
    "no-of-people": (value) => regexCodes["wholePositiveNumberRegex"].test(value)
}

const errorMessages = {
    "bill-amount": "Invalid amount", 
    "custom-tip": "Must be percentage",
    "no-of-people": "Must be +ve number"
}


function dataIsValid(name, value, validations) {
    return validations[name] ? validations[name](value) : true
}

function handleValidation (event) {
    const input = event.target;
    const name = input.name;
    const value = input.value;

    const isValid = dataIsValid(name, value, validations);

    updateErrorState(input, name, isValid)
}

function updateErrorState(input, name, isValid) {
    const errorMessage =  document.getElementById(`${name}__error-message`);

    errorMessage.style.visibility = isValid ? "hidden" : "visible";
    input.classList.toggle("invalid-input", !isValid);
}

function isFormValid(form, validations) {
    let isValid = true;
    const data = Object.fromEntries(new FormData(form));

    Object.keys(data).forEach((name) => {
        if(!dataIsValid(name, data[name], validations)) {
            isValid = false
        }
    })

    return isValid
}

function handleReset(event) {
    event.preventDefault();

    const form = event.target.closest("form");

    resetForm();
}

function resetForm() {
    document.getElementById("bill-amount").value = "0.00";
    document.getElementById("custom-tip").value = "";
    document.getElementById("no-of-people").value = "1";
    // const tipPerentageDiv = document.getElementsByClassName("tip-percentage")

    // tipPerentageDiv.forEach((input) => {
    //     input.classList.remove("active")
    // })

    // document.getElementsByName("10%-tip").classList.add("active")
}

function handleTipPercentage () {
    
}

document.getElementById("bill-amount").addEventListener('change', handleValidation)
document.getElementById("no-of-people").addEventListener('change', handleValidation)
document.getElementById("reset-button").addEventListener('click', handleReset)