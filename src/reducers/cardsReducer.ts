import { LOWER_PRICE, GET_SELECTED_POSTS, GET_SELECTED_RANGE } from '../actions/actionTypes'
import { CardsState, cards } from './cardsData'

interface PayloadType {
  fieldName: string, 
  itemName: string,
}

interface Actiontype {
  type: string, 
  payload: PayloadType, 
  activeFilters: object
}

export default function cardReducer(state: CardsState = cards, action: Actiontype) {
  switch (action.type){
    case LOWER_PRICE:
      return [...cards]
    case GET_SELECTED_POSTS:
      let fieldName = action.payload.fieldName
      let itemName = action.payload.itemName

      let newCards = cards.filter( (cardItem: Object) => {
        let isTruthy = true

        // checking each key in filters
        for (let filterKey in action.activeFilters) {
          let fKey = filterKey as keyof typeof action.activeFilters
          let cardKey = filterKey as keyof typeof cardItem
          let keyFilterArr: [] = action.activeFilters[fKey]
          let cardValue = cardItem[cardKey]

          // if no parameters in keyArr, return true (isTruthy left true) 
          if (keyFilterArr.length > 0) {
            if (typeof cardValue == "string" || typeof cardValue == "number") {
              let includesValue = keyFilterArr.includes(cardValue)
              isTruthy = isTruthy && includesValue ? true : false
            }
          }
        }
        return isTruthy
      })

      return [...newCards]
    case GET_SELECTED_RANGE:
      return [...cards]
    default:
      console.log(`unrecognized in cardReducer: ${action.type}`)
      return [...cards]
  }
}
