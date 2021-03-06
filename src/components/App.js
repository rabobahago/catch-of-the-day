import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fishes: {},
      order: {},
    }
  }
  // componentWillMount() {
  //   this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
  //     context: this,
  //     state: 'fishes',
  //   })
  // }
  // componentWillUnmount() {
  //   base.removeBinding(this.ref)
  // }
  componentDidMount() {
    const { params } = this.props.match
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    console.log(this.state.order)
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order),
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }
  removeFish = (key) => {
    const fishes = { ...this.state.fishes }

    fishes[key] = null
    this.setState({ fishes })
  }
  removeOrder = (key) => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes }
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish
    this.setState({ fishes })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }
  loadSamples = () => {
    this.setState({ fishes: sampleFishes })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeOrder={this.removeOrder}
        />
        <Inventory
          loadSamples={this.loadSamples}
          addFish={this.addFish}
          removeFish={this.removeFish}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}
export default App
