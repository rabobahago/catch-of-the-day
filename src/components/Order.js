import React from 'react'
import { formatPrice } from '../helpers'

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const removeButton = (
      <button onClick={() => this.props.removeOrder(key)}>&times;</button>
    )
    const isAvailable = fish && fish.status === 'available'
    // Make sure the fish is loaded before we continue!
    if (!fish) return null

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available{removeButton}
        </li>
      )
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {removeButton}
        {formatPrice(count * fish.price)}
      </li>
    )
  }
  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Order Wrap</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}
export default Order
