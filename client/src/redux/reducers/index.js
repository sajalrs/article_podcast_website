import audioPlayerReducer from './audioPlayerReducer'
import videoPlayerReducer from './videoPlayerReducer'
import blogReducer from './blogReducer'
import headerReducer from './headerReducer'
import jwtTokenReducer from './jwtTokenReducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
  videoPlayer: videoPlayerReducer,
  blog: blogReducer,
  header: headerReducer,
  jwtToken: jwtTokenReducer
})

export default rootReducer;