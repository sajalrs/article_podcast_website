import navbarClickedReducer from './navbarclicked';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  navbarClicked: navbarClickedReducer
})

export default rootReducer;