import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LOWER_PRICE, GET_SELECTED_POSTS, GET_SELECTED_RANGE, ADD_FILTER, REMOVE_FILTER } from './actions/actionTypes'

interface SortCheckboxProps {
  sortItem: string,
  index: number,
  name: string
}

export const SortCheckbox: React.FC<SortCheckboxProps> = ({sortItem, index, name}) => {
  const [isChecked, setIsChecked] = useState(false)

  const dispatch = useDispatch()

  function propertySort(fname: string, iname: string, e: React.MouseEvent<Element>) {
    let actualIsChecked = !isChecked
    console.log("This is fname: " + fname + " iname: " + iname)

    const el = e.target as HTMLInputElement
    console.log(el.getAttribute("checked"))

    if (actualIsChecked) {
      dispatch({
        type: ADD_FILTER, 
        payload: {
          fieldName: fname, 
          itemName: iname,
        }
      })
    } else {
      dispatch({
        type: REMOVE_FILTER, 
        payload: {
          fieldName: fname, 
          itemName: iname,
        }
      })
    }

    
    dispatch({
      type: GET_SELECTED_POSTS, 
      payload: {
        fieldName: fname, 
        itemName: iname,
      }
    })

    setIsChecked(actualIsChecked)
  }

  return (
    <li key={index} >
      <label htmlFor={"sort" + sortItem} >
        <input type="checkbox" name="" checked={isChecked}
          id={"sort" + sortItem} 
          onClick={ (e) => propertySort(name, sortItem, e)} />
        {sortItem}
      </label>
    </li>
  )
}
