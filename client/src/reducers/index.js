import navbarClickedReducer from './navbarclicked';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
  navbarClicked: navbarClickedReducer,  
})