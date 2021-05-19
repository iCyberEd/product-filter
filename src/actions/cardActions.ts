import React from 'react'
import ActionContent from './ActionContent'
import { LOWER_PRICE, HIGHER_PRICE, GET_SELECTED_POSTS, GET_SELECTED_RANGE } from './actionTypes'

export default function fromLowest(): ActionContent {
  return {
    type: LOWER_PRICE
  }
}

export function getSelectedPosts(fname: string, iname: string): ActionContent {
  return {
    type: GET_SELECTED_POSTS,
    payload: {
      fieldName: fname,
      itemName: iname
    }
  }
}