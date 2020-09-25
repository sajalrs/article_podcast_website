import navbarReducer from './navbarReducer';
import sidebarReducer from './sidebarReducer';
import audioPlayerReducer from './audioPlayerReducer'
import videoPlayerReducer from './videoPlayerReducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer,
  audioPlayer: audioPlayerReducer,
  videoPlayer: videoPlayerReducer
})

export default rootReducer;