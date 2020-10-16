import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

export function renderWithRedux(component, {initialState = initialStateOriginal} = {}){

    const mockStore = configureStore([]);
    store = mockStore(initialState);

    const utils = {
        dispatch(action){
            return store.dispatch(action);
        },
        getDispatchedActions(){
            return store.getActions();
        },
        getState(){
            return store.getState();
        },
    };

    return {
        ...render(<Provider store={store}>{component}</Provider>),
        ...utils
    }

}