import comp1 from '../img/card-img-1.png'
import comp2 from '../img/ThinkCentre M820z.jpg'
import comp3 from '../img/Vivo AiO V222FAK-BA100D.jpg'
import comp4 from '../img/ProDesk 600 G3 SFF.jpg'
import comp5 from '../img/Overlord X83 v09.jpg'
import comp6 from '../img/OptiPlex 3080 MFF.jpg'
import comp7 from '../img/Mac mini 2020.jpg'
import comp8 from '../img/IdeaCentre G5 Gaming 14IMB05.jpg'
import comp9 from '../img/IdeaCentre G5 Gaming 14AMR05.png'
import comp10 from '../img/IdeaCentre AIO 3 24ARE05.jpg'
import comp11 from '../img/I94F.16.S9.166.356.jpg'
import comp12 from '../img/Home 4090.jpg'
import comp13 from '../img/Home 4080.jpg'
import comp14 from '../img/Home 4070.jpg'
import comp15 from '../img/Gaming X51 v12.jpg'
import comp16 from '../img/Game 9010.jpg'
import comp17 from '../img/Cobra I14F.32.H2S4.26.086.jpg'
import comp18 from '../img/Business B25 v26.jpg'
import comp19 from '../img/Business M62 v12.jpg'

const compImgs: string[] = [comp1, comp2, comp3, comp4, comp5, comp6, comp7, comp8, comp9, comp10,
  comp11, comp12, comp13, comp14, comp15, comp16, comp17, comp18, comp19] // array of images

export const osArray: string[] = [
  "",
  "DOS",
  "Windows XP",
  "Windows 8",
  "Windows 10",
  "Windows 10 Pro",
  "Windows Server",
  "Linux",
  "Mac OS",
]

export const brandArr: string[] = ["AMD", "ARTLINE", "Acer", "Apple", "ASUS", "Cobra", "Dell", "Everest", "HP", "Lenovo", "Samsung",]
export const compTypes: string[] = ["Моноблок", "Компьютер", "Компьютер игровой", "Системный блок", "Тонкий клиент"]
const models: string[] = ["ThinkCentre M820z", "Home 4090", "290 G1 MT", "Home 4070", "Gaming X51 v12", "IdeaCentre AIO 3 24ARE05", "ProDesk 600 G3 SFF", "IdeaCentre G5 Gaming 14IMB05", "Vivo AiO V222FAK-BA100D", "Business B25 v26", "IdeaCentre G5 Gaming 14AMR05", "Mac mini 2020", "Game 9010", "I94F.16.S9.166.356", "OptiPlex 3080 MFF", "Home 4080", "Cobra I14F.32.H2S4.26.086", "Business M62 v12", "Overlord X83 v09"]
const sellers: string[] = ["D-TOP", "DonKarmani", "! E v r i c a", "Shop Stock", "Vendedor", "ALFA Render", "SVIT integration", "Sparch", "Red2Shop", "TechnoPromo", "Aiver", "Tigr", "DIGITALFPS", "BIG&FAST", "Techno department"]

export type CardState = {
  id: number,
  brand: string,
  type: string,
  model: string,
  serial: string,
  os?: string,
  rating: number,
  price: number,
  oldPrice: number,
  reviews: number,
  stockQuantity: number,
  bought: number,
  seller: string,
  img: string,
  added: Date,
}

export interface CardsState extends Array<CardState>{}

let id: number = 1
let priceArr: Array<number> = []

export const cards = new Array(50) // write how many cards you want to create

for (let i = 0; i < cards.length; i++) {
  cards[i] = {
    id: id++,
    brand: brandGenerate(),
    type: typeGaneration(),
    model: modelGenerate(),
    serial: serialGenerate(),
    os: osGenerate(),
    rating: ratingGenerate(),
    price: priceGenerate(),
    oldPrice: oldPriceGaneration(),
    reviews: reviewGenerate(),
    stockQuantity: stockQuantityGenerate(),
    bought: boughtGenerate(),
    seller: sellerGenerate(),
    img: imgGenerate(),
    added: new Date(dateGenerate()),
  }
}

// export const cards = [
//   {
//     id: id++,
//     brand: brandGenerate(),
//     type: typeGaneration(),
//     model: modelGenerate(),
//     serial: serialGenerate(),
//     os: osGenerate(),
//     rating: ratingGenerate(),
//     price: priceGenerate(),
//     oldPrice: oldPriceGaneration(),
//     reviews: reviewGenerate(),
//     stockQuantity: stockQuantityGenerate(),
//     bought: boughtGenerate(),
//     seller: sellerGenerate(),
//     img: imgGenerate(),
//     added: new Date(dateGenerate()),
//   },
//   {
//     id: id++,
//     brand: brandGenerate(),
//     type: typeGaneration(),
//     model: modelGenerate(),
//     serial: serialGenerate(),
//     os: osGenerate(),
//     rating: ratingGenerate(),
//     price: priceGenerate(),
//     oldPrice: oldPriceGaneration(),
//     reviews: reviewGenerate(),
//     stockQuantity: stockQuantityGenerate(),
//     bought: boughtGenerate(),
//     seller: sellerGenerate(),
//     img: imgGenerate(),
//     added: new Date(dateGenerate()),
//   },
//   {
//     id: id++,
//     brand: brandGenerate(),
//     type: typeGaneration(),
//     model: modelGenerate(),
//     serial: serialGenerate(),
//     os: osGenerate(),
//     rating: ratingGenerate(),
//     price: priceGenerate(),
//     oldPrice: oldPriceGaneration(),
//     reviews: reviewGenerate(),
//     stockQuantity: stockQuantityGenerate(),
//     bought: boughtGenerate(),
//     seller: sellerGenerate(),
//     img: imgGenerate(),
//     added: new Date(dateGenerate()),
//   },
//   {
//     id: id++,
//     brand: brandGenerate(),
//     type: typeGaneration(),
//     model: modelGenerate(),
//     serial: serialGenerate(),
//     os: osGenerate(),
//     rating: ratingGenerate(),
//     price: priceGenerate(),
//     oldPrice: oldPriceGaneration(),
//     reviews: reviewGenerate(),
//     stockQuantity: stockQuantityGenerate(),
//     bought: boughtGenerate(),
//     seller: sellerGenerate(),
//     img: imgGenerate(),
//     added: new Date(dateGenerate()),
//   },
// ]

function typeGaneration() {
  let min = Math.ceil(0)
  let max = Math.floor(compTypes.length - 1)
  return compTypes[Math.floor(Math.random() * (max - min + 1) + min)] //The maximum is inclusive and the minimum is inclusive
}


function priceGenerate(min: number = 5000, max: number = 100000) {
  min = Math.ceil(min)
  max = Math.floor(max)
  let price = Math.floor(Math.random() * (max - min + 1) + min)
  priceArr.push(price)
  return price //The maximum is inclusive and the minimum is inclusive
}

function oldPriceGaneration(max: number = 100000) {
  let isDiscount = Math.round(Math.random())  // 50% chance to get a discount or not
  let price: number = priceArr[id-2]  // -1 because index starts from 0, and -1 again because key "id" in object has id++ 
  if (isDiscount) {
    let min = Math.ceil(price)
    max = Math.floor(max)
    price = Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }
  return price
}

function ratingGenerate(min: number = 0, max: number = 5) {
  return +(Math.random() * (max - min) + min).toFixed(2) //Number limited to hundredths
}

function reviewGenerate(min: number = 0, max: number = 200) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function osGenerate() {
  let min = Math.ceil(0)
  let max = Math.floor(osArray.length)
  return osArray[Math.floor(Math.random() * (max - min) + min)] //The maximum is exclusive and the minimum is inclusive
}

function brandGenerate() {
  let min = Math.ceil(0)
  let max = Math.floor(brandArr.length)
  return brandArr[Math.floor(Math.random() * (max - min) + min)]
}

function stockQuantityGenerate(min: number = 0, max: number = 10) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}



function serialGenerate() {
  let min = Math.ceil(7)                                            // minimum characters in the serial number
  let max = Math.floor(10)                                          // maximum characters in the serial number
  let serialLength = Math.floor(Math.random() * (max - min + 1) + min)
  const ranges = [ ["A", "Z"], ["0", "9"] ]
  let serial = "";                                                       // the string (initialized to "")

  while(serialLength--) {                                             // repeat this length of times
    let ind = Math.floor(Math.random() * ranges.length);              // get a random range from the ranges object
    let startCharCode = ranges[ind][0].charCodeAt(0),                           // get the minimum char code allowed for this range
        endCharCode = ranges[ind][1].charCodeAt(0);                           // get the maximum char code allowed for this range
    let char = Math.floor(Math.random() * (endCharCode - startCharCode + 1)) + startCharCode;        // get a random char code between min and max
    serial += String.fromCharCode(char);                                    // convert it back into a character and append it to the string 
  }
  return serial
}

function modelGenerate() {
  let min = 0
  let max = models.length
  return models[Math.floor(Math.random() * (max - min) + min)]
}

function boughtGenerate(min: number = 0, max: number = 100) { // min and max must be integers
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function sellerGenerate() {
  let isRozetka = Math.round(Math.random() * (100 / 20) - Math.random()) // 20 is %, change it to set how often seller "Rozetka" will appear
  let randomSeller = "Rozetka"
  if (!isRozetka) {
    let min = 0
    let max = sellers.length - 1
    randomSeller = sellers[Math.floor(Math.random() * (max - min + 1) + min)] //The maximum is inclusive and the minimum is inclusive
  }
  return randomSeller 
}

function imgGenerate() {
  let min = 0
  let max = compImgs.length - 1
  return compImgs[Math.floor(Math.random() * (max - min + 1) + min)]
}

function dateGenerate() {
  let startYear = 2005 // edit just year to set start year (4 digits)
  let endYear = +(new Date().getFullYear()) // edit just year to set end year (4 digits)
  let startMonth = 0 // edit just month to set start month (from 1 to 2 digits)
  let endMonth = 12 // edit just month to set end month (from 1 to 2 digits)
  let startDay = 1 // edit just day to set start day (from 1 to 31) (if there are not so many days in a month, then the days will be carried over to the next month)
  let endDay = 31 // edit just day to set end day (from 1 to 31) (if there are not so many days in a month, then the days will be carried over to the next month)
  let startDate = +(new Date(startYear, startMonth, startDay))
  let endDate = +(new Date(endYear, endMonth, endDay))
  
  let randomDate = Math.floor(Math.random() * (endDate - startDate + 1) + startDate)
  return randomDate
//  let randomDate = new Date(3600 * 24 * 1000) // multiply by 1000 to set counter in seconds
}