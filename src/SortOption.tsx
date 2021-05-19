import React, { DOMElement, useState, MouseEvent } from 'react'
import { useDispatch } from 'react-redux';
import { SortState } from './reducers/sortReducer';

import { SortCheckbox } from './SortCheckbox';
import SortSearch from './SortSearch';

interface SortProps {
  name: string,
  sortBlock: string[],
}



export const SortOption: React.FC<SortProps> = ({ name, sortBlock }) => {
  const [show, setShow] = useState(true)
  





  const sortNames = {
    seller: "Продавец",
    ready: "Готов к отправке",
    type: "Вид",
    brand: "Бренд",
    os: "ОС",
    price: "Цена",
    status: "Статус",
  }
  let sortBlockName = name as keyof typeof sortNames

  return (
    <li className="sort-block">
      <input className="sort-block__switcher" type="checkbox" name="" id={name} checked={show} onClick={ () => setShow(!show) } />
      <div className={"sort-block__nested " + (show ? "sort-block__nested_open" : "sort-block__nested_closed")} data-name={name} >
        <label className="sort-block__header" htmlFor={name}>
          {sortNames[sortBlockName]}
          <span className="sort-block__header__quantity" >{sortBlock.length > 0 && sortBlock.length}</span>
        </label>
        { sortBlock.length > 5 && <SortSearch />}
        <ul className="sort-block__list ssort-block__brands">
          {sortBlock.map( (sortItem, i:number) => <SortCheckbox sortItem={sortItem} index={i} name={name} /> )}
        </ul>
      </div>
      
    </li>
  )
}
