import React from 'react'
import img1 from './img/card-img-1.png'
import { CardState } from '../reducers/cardsData'

interface CardProps {
  product: CardState,
  clname: boolean,
}

export const Card: React.FC<CardProps> = ({ product, clname }) => {

  function isKey(keyName: string) {
    const keyTyped = keyName as keyof typeof product
    return product.hasOwnProperty(keyName) ? product[keyTyped] : ""
  }

  function priceRendering(price: number = product.price) {
    if (price > 999){
      let newPrice = new Intl.NumberFormat("ua", 
        { 
          style: 'currency',
          currency: 'UAH',
          minimumFractionDigits: 0,
          currencyDisplay: "code",
        })
      return newPrice.format(price).replace('UAH', "")
    }
    return price
  }

  function makingRatingStars() {
    let stars = []
    let starClass = "rating__star"
    let partialColor = 0
    for (let i = 0; i < 5; i++) {
      if (i < product.rating) {
        starClass = "rating__star_filled"
        if (product.rating - i > 0 && product.rating - i < 1) { // partial brushing
          starClass = "rating__star_partial"
          partialColor = (+(product.rating - i).toFixed(2)) * 100
          // console.log(partialColor)
        }
      } else {
        starClass = "rating__star"
      }
      stars.push(
      <svg key={i} height="15" width="15" viewBox="0 0 12 12" className={starClass}>
        {starClass === "rating__star_partial" &&
          <linearGradient id={"rating__partial-brushing_" + product.id} >
            <stop className="rating__partial-brushing_main" offset={partialColor + "%"} stopOpacity="1" />
            <stop className="rating__color" offset={partialColor + 1 + "%"} stopOpacity="1" />
            <stop className="rating__color" offset={"100%"} stopOpacity="1" />
          </linearGradient>
        }
        <path fill={starClass === "rating__star_partial" ? `url('#rating__partial-brushing_${product.id}')` : ""} d="m5.73433.173217c.10867-.2309559.42269-.2309559.53137 0l1.6246 3.452363c.04311.0917.12659.15527.22303.16998l3.63267.55361c.243.03703.34.35025.1642.53003l-2.62862 2.68729c-.06978.07139-.1017.17425-.08519.275l.62057 3.79451c.04148.2539-.21258.4475-.42991.3276l-3.24916-1.7915c-.08632-.0476-.18944-.0476-.27575 0l-3.24915 1.7915c-.21736.1199-.47141-.0737-.4299-.3276l.62054-3.79451c.01648-.10075-.01538-.20361-.08521-.275l-2.6286226-2.68729c-.1758488-.17978-.0788129-.493.1642076-.53003l3.632665-.55361c.0965-.01471.17992-.07828.22308-.16998z" />
      </svg>
      )
    }
    return stars
  }

  function calcDiscount() { // get % of discount
    return +(100 / (product.oldPrice / (product.oldPrice - product.price))).toFixed(0)
  }

  function getWordReviews() {
    let reviewsStr = product.reviews.toString()
    let from2to4 = +reviewsStr.slice(reviewsStr.length - 1) > 1 && +reviewsStr.slice(reviewsStr.length - 1) < 5 // ends 2 to 4
    let from5to20 = product.reviews > 4 && product.reviews < 21 // number from 5 to 20
    if (+reviewsStr.slice(reviewsStr.length - 1) === 1 && !from5to20) {
      return "отзыв"
    } else if (from2to4 && !from5to20) {
      return "отзыва"
    } else { return "отзывов"}
  }
  // console.log( product.added )

  return (
    <div className={"product-card "  + (!clname ? "product-card_sm" : "product-card_big")}>
      <div className="product-card__badges">
        {product.bought > 20 && <div className="product-card__badge product-card__badge-top">ТОП ПРОДАЖ</div>}
        {calcDiscount() >= 20 && <div className="product-card__badge product-card__badge-discount">-{calcDiscount()}%</div>}
        {product.added.getFullYear() === new Date().getFullYear() && <div className="product-card__badge product-card__badge-novelty">НОВИНКА</div>}
      </div>
      
      <img className="product-card__img" src={product.img} alt=""/>
      <div className="product-card__name">
        {
          isKey("type") + " " + isKey("brand") + " " + isKey("model") + "(" + isKey("serial") + ")" + " " + isKey("os")
        }
      </div>
      <div className="rating" data-rating={product.rating} >
        {makingRatingStars()}
        {/* {console.log(product.seller)} */}
        <span className="rating__reviews"><a href="#">{product.reviews} {getWordReviews()}</a></span>
      </div>
      <div className={"product-card__price " + (product.price != product.oldPrice ? "product-card__price_discount " : " ") + (!product.stockQuantity && "product-card__price_out-of-stock")} data-old-price={product.oldPrice > product.price ? priceRendering(product.oldPrice) + String.fromCharCode(0x20B4) : ""} >
        {priceRendering()}<span className="product-card__price__currency">{String.fromCharCode(0x20B4)}</span>
        <svg className="product-card__price__basket" viewBox="0 -13 456.75885 456" xmlns="http://www.w3.org/2000/svg">
          <path d="m150.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0" />
          <path d="m446.855469 94.035156h-353.101563l-7.199218-40.300781c-4.4375-24.808594-23.882813-44.214844-48.699219-48.601563l-26.101563-4.597656c-5.441406-.96875-10.632812 2.660156-11.601562 8.097656-.964844 5.441407 2.660156 10.632813 8.101562 11.601563l26.199219 4.597656c16.53125 2.929688 29.472656 15.871094 32.402344 32.402344l35.398437 199.699219c4.179688 23.894531 24.941406 41.324218 49.199219 41.300781h210c22.0625.066406 41.546875-14.375 47.902344-35.5l47-155.800781c.871093-3.039063.320312-6.3125-1.5-8.898438-1.902344-2.503906-4.859375-3.980468-8-4zm-56.601563 162.796875c-3.773437 12.6875-15.464844 21.367188-28.699218 21.300781h-210c-14.566407.039063-27.035157-10.441406-29.5-24.800781l-24.699219-139.398437h336.097656zm0 0" />
          <path d="m360.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0" />
        </svg>
      </div>
      <div className={product.stockQuantity ? "product-card__available" : "product-card__out-of-stock"}>{product.stockQuantity ? "Есть в наличии" : "Товар отсутствует"}</div>
    </div>
  )
}
