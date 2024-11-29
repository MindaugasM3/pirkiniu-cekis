const date = data => {
    const Date = document.querySelector('[date]')
    let dateData = `
        <div Number>Numeris: ${data.number}</div>
        <div Date>Data: ${data.date}</div>
        <div Due-date>Atlikimo Data: ${data.due_date}</div>
    `
    Date.innerHTML = dateData
}

const produktai = data => {
    const Produktai = document.querySelector('[produktai]')
    let produktuHtml =  `
    <table>
            <tr>
                <th><h2>Aprasymas</h2></th>
                <th><h2>Kiekis</h2></th>
                <th><h2>Kaina</h2></th>
                <th><h2>Akcija</h2></th>
                <th><h2>Kaina pagal kieki</h2></th>
            </tr>
    `
    //for (let i = 0; i < (data.items).length; i++) {
    data.items.forEach(item => {
        let discountType = ''
        if (item.discount !== undefined && item.discount.type === 'fixed'){
            discountType += '-'+item.discount.value
        } else if (item.discount !== undefined && item.discount.type === "percentage") {
            discountType += '-'+(item.price/item.discount.value).toFixed(2)
        } else {
            discountType += '0'
        }
        produktuHtml += `
            <tr>
                <td description>${item.description}</td>
                <td quantity>${item.quantity}</td>
                <td price>${item.price}</td>
                <td discount>${discountType}</td>
                <td full-price>${(item.quantity*(item.price-discountType)).toFixed(2)}</td>
            </tr>
        `
    })
    Produktai.innerHTML = produktuHtml+'</table>'  
        
    }

const priceForEverything = data => {
    let fullAmount = 0
    const priceData =  document.querySelector('[data-price]')
    const allPriceData = document.querySelectorAll('[full-price]')
    allPriceData.forEach(amount => {
        fullAmount += parseInt(amount.innerText)
    })
    const priceHtml = `
        <div shipping><h5>Atsiuntimo kaina:</h5> ${data.shippingPrice}</div>
        <div full-price-data><h5>Kaina uz daiktus:</h5> ${fullAmount}</div>
        <div full-price-data><h3>Bendra kaina:</h3> ${fullAmount+data.shippingPrice}</div>
    `
    priceData.innerHTML = priceHtml
}

const sellerBuyer = data => {
    const seller = document.querySelector('[seller]')
    const buyer = document.querySelector('[buyer]')
    const sutrumpinimas = data.company
    const sellerHtml = `
        <div><h2>Pardavejas:</h2></div>
        <div seller-name>vardas: ${sutrumpinimas.seller.name}</div>
        <div seller-adress>adresas: ${sutrumpinimas.seller.adress}</div>
        <div seller-code>pasto kodas: ${sutrumpinimas.seller.code}</div>
        <div seller-vat>var: ${sutrumpinimas.seller.vat}</div>
        <div seller-phone>telefono nr.: ${sutrumpinimas.seller.phone}</div>
        <div seller-email>el. pastas: ${sutrumpinimas.seller.email}</div>
    `
    const buyerHtml = `
        <div><h2>Pirkejas: </h2></div>
        <div buyer-name>vardas: ${sutrumpinimas.buyer.name}</div>
        <div buyer-adress>adresas: ${sutrumpinimas.buyer.adress}</div>
        <div buyer-code>pasto kodas: ${sutrumpinimas.buyer.code}</div>
        <div buyer-vat>var: ${sutrumpinimas.buyer.vat}</div>
        <div buyer-phone>telefono nr.: ${sutrumpinimas.buyer.phone}</div>
        <div buyer-email>el. pastas: ${sutrumpinimas.buyer.email}</div>
    `
    seller.innerHTML = sellerHtml
    buyer.innerHTML = buyerHtml
}


fetch('https://in3.dev/inv/')
.then(response => response.json())
.then(data => { 
    console.log(data.items)
    date(data)
    produktai(data)
    priceForEverything(data)
    sellerBuyer(data)
    // const allPriceData = document.querySelectorAll('[full-price]')
    // allPriceData.forEach(price => {
    //     console.log(price.innerText)
    // })
    // data.items.forEach(element => {
    //     console.log(element.discount.type)
    // });
    // console.log(data.items)
})