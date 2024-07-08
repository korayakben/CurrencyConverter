//Prepares the URL according to the REST API
function url_preparer(default_money) {
    return `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7oVywT4qJytPc33Ty5XJrNrKHqYB7bT34Pw5Czgn&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR&base_currency=${default_money}`;
}

//Returns the values ​​of the given currency in other currencies.
async function getCurrencies(default_money, target_money) {
    const newURL = url_preparer(default_money);
    const datas = await (await fetch(newURL)).json();
    const currency = datas.data;
    console.log(currency[target_money]);

    entered_amount = getAmount();

    return entered_amount * currency[target_money];

}


//Gets the amount from the input.
function getAmount() {
    const amount = document.getElementById("enterAmount").value;
    // console.log(amount);
    return amount;
}



const exchange_arrow = document.getElementById("exchange-button");
let temp = "";

//When the arrow is clicked, it replaces the values ​​with each other.
exchange_arrow.addEventListener("click", () => {

    temp = from_value;
    from_value = to_value;
    to_value = temp;

    document.getElementById("from-value").value = from_value;
    document.getElementById("to-value").value = to_value;
    console.log("From value is " + from_value);
    console.log("To value is " + to_value);
});


//Calculates the current rate when the from-value changes.
document.querySelector("#from-value").addEventListener("change", () => {
    from_value = document.querySelector("#from-value").value;
    to_value = document.querySelector("#to-value").value;
    getCurrencies(from_value, to_value);
});


//Calculates the current rate when the to-value changes.
document.querySelector("#to-value").addEventListener("change", () => {
    from_value = document.querySelector("#from-value").value;
    to_value = document.querySelector("#to-value").value;
    getCurrencies(from_value, to_value);
});


//When you press the Get Exchange Rate button, it calculates the rate.
const get_exchange_button = document.getElementById("get-exchange-button");

get_exchange_button.addEventListener("click", async () => {

    from_value = document.getElementById("from-value").value;

    to_value = document.getElementById("to-value").value;
    const result_div = document.getElementById("result-div");
    exchange_rate = await getCurrencies(from_value, to_value);

    result_div.innerHTML = `${getAmount()} ${from_value} = ${exchange_rate.toFixed(3)} ${to_value}`
});


let from_value = document.querySelector("#from-value").value;
console.log("First value is " + from_value); //to check

let to_value = document.querySelector("#to-value").value;
console.log("Second value is " + to_value); //to check


// getCurrencies(from_value, to_value);



