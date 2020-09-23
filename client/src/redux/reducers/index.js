import navbarReducer from './navbarReducer';
import sidebarReducer from './sidebarReducer';
import audioPlayerReducer from './audioPlayerReducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer,
  audioPlayer: audioPlayerReducer
})

export default rootReducer;