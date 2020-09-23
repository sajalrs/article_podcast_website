import navbarClickedReducer from './navbarClicked';
import sidebarClickedReducer from './sidebarClicked';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  navbarClicked: navbarClickedReducer,
  sidebarClicked: sidebarClickedReducer
})

export default rootReducer;