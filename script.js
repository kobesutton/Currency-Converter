const select = document.querySelectorAll('select')
const input = document.querySelectorAll('input')
const API_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=d94ad0680b391d22c66b28e6be4d5d3d'
let html = '';

function errorHandler(mesage) {
 const error = new Error(mesage)
 let message = 'An errorr has occured'
 return error
}

currency()
async function currency () {
    try {
      errorHandler('Check API')
    const response = await fetch(API_URL)
    const currencyData = await response.json()
    const arrKeys = Object.keys(currencyData.rates)
    const rates = currencyData.rates
    arrKeys.map(item => {
        return html += `<option value=${item}>${item}</option>`
    })

    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = html
      }
    function convert(i, j) {
        input[i].value = input[j].value * rates[select[i].value] / rates[select[j].value]
        errorHandler('Error, check input');
    }
    //console.log(rates[select[1].value])
    input[0].addEventListener('keyup', () => convert(1, 0)) 
       
    input[1].addEventListener('keyup', () => convert(0, 1)) 
       
    select[0].addEventListener('change', () => convert(1, 0))

    select[1].addEventListener('change', () => convert(0, 1))
        
    //console.log(arrKeys)
    } catch (err) {
       errorHandler('An error occured') 
    }
}



