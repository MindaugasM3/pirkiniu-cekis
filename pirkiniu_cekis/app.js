// // let cekisUrl = 'https://in3.dev/inv/'
// 
// // fetch(cekisUrl)
// 
// // fetch('https://in3.dev/inv/')
// //   .then(response => response.text())
// //   .then(html => console.log(html))
// //   .catch(error => console.error('Error:', error));
// 
// const cekisUrl = 'https://in3.dev/inv/'
// 
// const headas = data => {
//   let kvitoInfo = []
//   const headeris = document.querySelectorAll('header div span')
//   kvitoInfo.push(data['number'])
//   kvitoInfo.push(data['date'])
//   kvitoInfo.push(data['due_date'])
//   //headeris.map(spanas, index => spanas.innerHtml = kvitoInfo[index])
//   for (let i = 0; i < headeris.length; i++) {
//     headeris[i].innerHTML = kvitoInfo[i]
//   }
// }
// 
// //const footeris = data => {
// //   let sellerinfo = []
// //   let buyererinfo = []
// //   const sellfooteris = document.querySelectorAll('#pardavejo-info span')
// //   const buyerfooteris = document.querySelectorAll('#pirkejo-info span')
// //  
// //   }
// //    }
// 
// 
// 
// async function Getdata() {
//    const response = await fetch(cekisUrl)
//    const data = await response.json()
//    const obj = JSON.parse(data)
//    //headas(data)
//    //footeris(data)
//    console.log(obj)
//    //for(let i = 0; i < data['company'].lenght; i++){
//    //  console.log(data['company'])
//    //}
//      }
//   
//    Getdata()

const headeris = data => {
    const headeris = document.querySelectorAll('header div span')
    for (let i = 0; i < headeris.length; i++) {
        headeris[i].innerHTML = data[Object.keys(data)[i]]
    }
}

const footeris = data => {
    const headerispard = document.querySelectorAll('#pardavejo-info div span')
    const headerispirke = document.querySelectorAll('#pirkejo-info div span')
    const buyer = data.company[Object.keys(data.company)[0]]
    const seller = data.company[Object.keys(data.company)[1]]
        for (let i = 0; i < Object.keys(seller).length; i++) {
            let htmlbuyer = buyer[Object.keys(buyer)[i]]
            let htmlseller = seller[Object.keys(seller)[i]]
            headerispard[i].innerHTML = htmlseller
            headerispirke[i].innerHTML = htmlbuyer
          

  }
}

const items = data => {
    const table = document.querySelector('.pirkiniai table tbody')
    const items = data.items
    for (let i = 0; i < items.length; i++) {
        let newtablerow = document.createElement('tr')
        table.appendChild(newtablerow)
        let tablerow = document.querySelector(`.pirkiniai table tbody tr:nth-of-type(${i+2})`)
        let item = items[Object.keys(items)[i]]
        
            for (let j = 0; j < 5; j++) {
                if (j < 4) {
                    let iteminfoHTML = item[Object.keys(item)[j]]
                    let newtabledata = document.createElement('td')
                    newtabledata.innerHTML = iteminfoHTML;
                    tablerow.appendChild(newtabledata)
                } else {
                    let fullprice = item[Object.keys(item)[1]] * item[Object.keys(item)[2]]
                    let newtabledata = document.createElement('td')
                    newtabledata.innerHTML = fullprice;
                    tablerow.appendChild(newtabledata)
                }
          } 
    }
}

const price = data => {
    let price = 0
    for (let i = 0; i < data['items'].length; i++) {
        price += parseFloat(document.querySelector(`tr:nth-of-type(${i+2}) td:nth-of-type(5)`).innerText)
    }
    const visakaina = document.querySelector('.pirkiniai h3 span')
    visakaina.append(price.toFixed(2))
}
    

fetch('https://in3.dev/inv/')
.then(response => response.json())
.then(data => { 
    headeris(data)
    footeris(data)
    items(data)
    price(data)
    console.log(data['items'].length)
})
