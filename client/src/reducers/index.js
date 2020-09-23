import navbarReducer from './navbarReducer';
import sidebarClickedReducer from './sidebarClicked';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  navbar: navbarReducer,
  sidebarClicked: sidebarClickedReducer
})

export default rootReducer;