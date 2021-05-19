export default interface ActionContent {
  type: string,
  payload?: {
    fieldName: string, 
    itemName: string,
  },
}