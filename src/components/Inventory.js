import React from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import base from '../base'

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null,
  }
  authenticate = (provider) => {
    console.log(`Try to login with ${provider}`)
    base.signInWithEmailAndPassword(provider, this.authHandler)
  }
  authHandler = (err, authData) => {
    console.log(authData)
  }
  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign In to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with GitHub
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate('facebook')}
        >
          Log In with facebook
        </button>
      </nav>
    )
  }
  render() {
    const logout = <button>Log Out</button>
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store !!</p>
          {logout}
        </div>
      )
    }
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory
