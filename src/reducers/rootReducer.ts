import { combineReducers } from "redux";
import cardReducer from "./cardsReducer";
import sortReducer from "./sortReducer";
import filterReducer, { ActionType as FilterActionType, FilterState, filters } from "./filterReducer";

interface rootReducerTypes {
  products: any[],
  sort: object,
  filters: FilterState,
  reviews?: object,
  favorites?: object,
}
/*
export const rootReducer = combineReducers({
  products: cardReducer,
  sort: sortReducer,
  filters: filterReducer,
  // reviews: [],
  // favorites: [],
  
});
*/


interface PayloadType {
  fieldName: string, 
  itemName: string,
}

interface ActionType {
  type: string,
  payload?: PayloadType,
  activeFilters?: object,
}

const rootState = {
  products: [],
  sort: {},
  filters: filters,
  reviews: {},
  favorites: {},
}

export const rootReducer = (state: rootReducerTypes = rootState, action: any) => {
  const activeFilters = state.filters
  return {
    products: cardReducer(undefined, {...action, activeFilters}),
    sort: sortReducer(undefined, action),
    filters: filterReducer(state.filters, action),
  }
}

export type RootState = ReturnType<typeof rootReducer>