import Rebase from 're-base'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyD8018_BAvlVA-Mv-xuTnkurqbhYs0mT70',
  databaseURL:
    'https://catch-of-the-day-rabo-yusuf-default-rtdb.firebaseio.com',
  authDomain: 'catch-of-the-day-rabo-yusuf.firebaseapp.com',
}
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
export default base
