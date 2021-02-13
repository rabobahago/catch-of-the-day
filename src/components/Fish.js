import React from 'react'
import { formatPrice } from '../helpers'
const Fish = ({ details }) => {
  return (
    <li>
      <img src={details.image} alt={details.name} />
      <h3 className="fish-name">{details.name}</h3>
      <span className="price">{formatPrice(details.price)}</span>
      <p>{details.desc}</p>
      <button>Add To Order</button>
    </li>
  )
}
export default Fish
