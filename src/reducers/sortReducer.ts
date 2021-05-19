import { LOWER_PRICE } from '../actions/actionTypes'
import { compTypes, brandArr, osArray } from './cardsData'

export interface SortState {
  seller: string[],
  type: string[],
  brand: string[],
  os: string[], 
}

const sort = {
  seller: ["Rozetka", "Other sellers"],
  ready: ["Готов к отправке"],
  type: compTypes,
  brand: brandArr,
  os: osArray,
  price: [],
  status: ["Are available", "Not available", "Ended up"]
}

export default function sortReducer(state: SortState = sort, action: { type: string}) {
  switch (action.type){
    case LOWER_PRICE:
      return {...sort}
    default:
      console.log(`unrecognized ${action.type}`)
      return {...sort}
  }
}