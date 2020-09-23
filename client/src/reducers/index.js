import navbarReducer from './navbarReducer';
import sidebarReducer from './sidebarReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer
})

export default rootReducer;