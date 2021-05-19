import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { Card } from './Card';
import { CardsState } from './reducers/cardsData';
import { RootState } from './reducers/rootReducer';
import { SortState } from './reducers/sortReducer';
import { FilterState } from './reducers/filterReducer';
import { SortOption } from './SortOption';

let mockState = {
  products: [],
  reviews: [],
  favorites: [],
  comparison: [],
}


const App: React.FC = () => {
  const products = useSelector<RootState, CardsState>( state => state.products )
  const filters = useSelector<RootState, FilterState>( state => state.filters )
  const sort = useSelector<RootState, SortState>( state => state.sort )
  const [tileState, setTileState] = useState(true)  
  const [quickSort, setQuickSort] = useState("rating")
  const [sortArrow, setSortArrow] = useState(false)

  const memoProducts = useMemo( () => { 
    switch (quickSort){
      case "rating":
        products.sort( (a, b) => (a.rating - b.rating) * -1)
        break
      case "lowest-price":
        products.sort( (a, b) => a.price - b.price)
        break
      case "highest-price":
        products.sort( (a, b) => (a.price - b.price) * -1) // reverse the array by multiplying by -1
        break
      case "most-bought":
        products.sort( (a, b) => (a.bought - b.bought) * -1)
        break
      case "largest-discount":
        products.sort( (a, b) => ( 100 / (a.oldPrice / (a.oldPrice - a.price)) - 100 / (b.oldPrice / (b.oldPrice - b.price))) * -1)
        break
      case "new-items":
        products.sort( (a, b) => (+a.added - +b.added) * -1)
        break
      default:
        console.log("undefined quickSort option")
    }
    return products.map( product => <Card key={product.id} product={product} clname={tileState} /> )
  }, [products, quickSort, tileState])

  function quickSortFunc(bool: boolean = false) {
    setSortArrow(!sortArrow)
  }
  
  const sortOptions = []

  for (let sortBlock in sort){ // create sort options on the left side
    let sortBlockArr = sortBlock as keyof typeof sort
    sortOptions.push(<SortOption key={sortOptions.length + 1} name={sortBlock} sortBlock={sort[sortBlockArr]} />)
  }

  function showFilters() {
    let filterSection = []
    for (let filter in filters) {
      let filterName = filter as keyof typeof filters
      let mapedFilter = filters[filterName].map( fltr => <span className="active-filters__item">{fltr}</span>)
      filterSection.push(...mapedFilter)
      console.log("Show filters")
      console.dir(filterSection)
    }

    return filterSection
  }

  return (
    <div className="wrapper">
      <h1 className="section-title">Компьютеры</h1>
      <div className="quick-sort">
        <div className="active-filters">Active filters: {showFilters()}</div>
        <label className="quick-sort__select-label" htmlFor="">
          <svg className={"quick-sort__select__arrow " + (sortArrow && "quick-sort__select__arrow_active")} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16"  fill="#449de1" stroke="#449de1">
          <g>
            <line x1="0" y1="0" x2="8" y2="8" strokeWidth="2" />
            <line x1="8" y1="8" x2="0" y2="16" strokeWidth="2" />
          </g>
          </svg> 
          <select className={"quick-sort__select " + (sortArrow && "quick-sort__select_active")} 
                  name={quickSort} id="" 
                  onChange={ (e) => setQuickSort(e.target.value)} 
                  onClick={ () => setSortArrow(!sortArrow) }
                  onBlur={ () => setSortArrow(false) } 
                  >
            <option value="lowest-price" selected={quickSort == "lowest-price"} >От дешевых к дорогим</option>
            <option value="highest-price" selected={quickSort == "highest-price"} >От дорогих к дешевым</option>
            <option value="most-bought" selected={quickSort == "most-bought"} >Популярные</option>
            <option value="new-items" selected={quickSort == "new-items"} >Новинки</option>
            <option value="largest-discount" selected={quickSort == "largest-discount"} >Акционные</option>
            <option value="rating" selected={quickSort == "rating"} >По рейтингу</option>
          </select>
        </label>
        
        <label className="quick-sort__radio-label" htmlFor="">
          <input className="quick-sort__radio quick-sort__radio_left" type="radio" name="quick-sort_size" id="" value="product-list_sm" checked={tileState} onChange={ e => setTileState(!tileState) } />
          <svg className="radio-img-less" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
            <circle cx="10" cy="5" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="20" cy="5" r="1" />
            <circle cx="10" cy="10" r="1" />
            <circle cx="15" cy="10" r="1" />
            <circle cx="20" cy="10" r="1" />
            <circle cx="10" cy="15" r="1" />
            <circle cx="15" cy="15" r="1" />
            <circle cx="20" cy="15" r="1" />
          </svg>
        </label>
        
        <label className="quick-sort__radio-label" htmlFor="">
          <input className="quick-sort__radio quick-sort__radio_right" type="radio" name="quick-sort_size" id="" value="product-list_big" checked={!tileState} onChange={ e => setTileState(!tileState) } />
          <svg className="radio-img-more" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 25">
            <circle cx="10" cy="5" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="20" cy="5" r="1" />
            <circle cx="25" cy="5" r="1" />
            <circle cx="10" cy="10" r="1" />
            <circle cx="15" cy="10" r="1" />
            <circle cx="20" cy="10" r="1" />
            <circle cx="25" cy="10" r="1" />
            <circle cx="10" cy="15" r="1" />
            <circle cx="15" cy="15" r="1" />
            <circle cx="20" cy="15" r="1" />
            <circle cx="25" cy="15" r="1" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="15" cy="20" r="1" />
            <circle cx="20" cy="20" r="1" />
            <circle cx="25" cy="20" r="1" />
          </svg>
        </label>
      </div>
      <div className="content">
        <ul className="sort-options">
          {sortOptions}
        </ul>
        <section>
          <div className="product-list ">
            {memoProducts}
          </div>
        </section>
      </div> 
    </div>
  );
}

export default App;
