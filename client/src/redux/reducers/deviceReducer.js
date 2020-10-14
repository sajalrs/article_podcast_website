const deviceReducer = (state = { isMobile: window.innerWidth <= 550 }, action) => {
  switch (action.type) {
    case "SET_IS_MOBILE":
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};

export default deviceReducer;
