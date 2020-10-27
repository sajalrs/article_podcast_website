import audioPlayerReducer from './audioPlayerReducer'
import videoPlayerReducer from './videoPlayerReducer'
import blogReducer from './blogReducer'
import headerReducer from './headerReducer'
import loginReducer from './loginReducer'
import deviceReducer from './deviceReducer'
import socketReducer from './socketReducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
  videoPlayer: videoPlayerReducer,
  blog: blogReducer,
  login: loginReducer,
  header: headerReducer,
  device: deviceReducer,
  network: socketReducer
})

export default rootReducer;