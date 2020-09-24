import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import axios from 'axios'
import {setAudioPlayerPodcasts} from './redux/actions'

const fetchUsers = () => {

  return function(dispatch){
    axios.get("/podcasts")
      .then(response => {
        dispatch(setAudioPlayerPodcasts({ items: response.data["items"], currentlyPlaying: 0 }))
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
store.dispatch(fetchUsers())



ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
