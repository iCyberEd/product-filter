import { ADD_FILTER, REMOVE_FILTER } from '../actions/actionTypes'

export interface FilterState {
  seller: string[],
  type: string[],
  brand: string[],
  os: string[], 
}

//type FilterType = FilterState | object

export const filters = {
  seller: [],
  // ready: [],
  type: [],
  brand: [],
  os: [],
  price: [],
  // status: [],
}


export interface ActionType {
  type: string, 
  payload: {
    fieldName: string, 
    itemName: string,
  },
}

export default function filterReducer(state: FilterState = filters, action: ActionType) {
  let filterKey
  let filterNewArr
  switch (action.type){
    case ADD_FILTER:
      filterKey = action.payload.fieldName as keyof typeof state
      filterNewArr = state[filterKey].slice()
      filterNewArr.push(action.payload.itemName)
      return {...state, [action.payload.fieldName]: [...filterNewArr]}
    case REMOVE_FILTER:
      filterKey = action.payload.fieldName as keyof typeof state
      filterNewArr = state[filterKey].slice()
      filterNewArr = filterNewArr.filter( item => item !== action.payload.itemName)
      return {...state, [action.payload.fieldName]: [...filterNewArr]}
    default:
      console.log(`unrecognized ${action.type}`)
      return {...state}
  }

}
