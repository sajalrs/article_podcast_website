const deviceReducer = (
  state = {
    isMobile: window.innerWidth <= 550,
    isTablet: window.innerWidth > 550 && window.innerWidth <= 1350,
    isDesktop: window.innerWidth > 1350
  },
  action
) => {
  switch (action.type) {
    case "SET_IS_MOBILE":
      return { ...state, isMobile: action.payload };
    case "SET_IS_TABLET":
      return { ...state, isTablet: action.payload };
    case "SET_IS_DESKTOP":
      return { ...state, isDesktop: action.payload };
    default:
      return state;
  }
};

export default deviceReducer;
