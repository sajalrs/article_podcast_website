const deviceReducer = (
  state = {
    screen: "desktop"
      // window.innerWidth <= 550
      //   ? "mobile"
      //   : window.innerWidth > 550 && window.innerWidth <= 1350
      //   ? "tablet"
      //   : "desktop",
  },
  action
) => {
  switch (action.type) {
    case "SET_SCREEN":
      return { ...state, screen: action.payload };
    default:
      return state;
  }
};

export default deviceReducer;
