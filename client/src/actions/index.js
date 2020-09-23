export const setNavbarClicked = (setTo) => {
    return{
        type: 'SET_NAVBAR_CLICKED',
        payload: setTo
    }
}

export const setSidebarClicked = (setTo) => {
    return{
        type: 'SET_SIDEBAR_CLICKED',
        payload: setTo
    }
}