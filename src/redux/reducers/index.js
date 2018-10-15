import { SELECT_PLAYGROUND } from "../constants/action-types";
const initialState = {
    playgrounds: [
        {id: '1', name: 'Linnaeushof', lat: 52.327292, lng: 4.603781, slug: this.name + ' Rookvrij'},
        {id: '2', name: 'Jan Miense Molenaerplein 12', lat: 52.359360, lng: 4.627239, slug: this.name + ' Rookvrij'}
    ],
    selectedPlayground: null
};
const rootReducer = (state = initialState, action) => {
    console.log('Reducing action', action, '. State is currently:', state);
    switch (action.type) {
        case SELECT_PLAYGROUND:
            console.log('Selecting playground with ID ' + action.payload);
            return { ...state, selectedPlayground: state.playgrounds.find(playground => playground.id === action.payload) };
        default:
            return state;
    }
};
export default rootReducer;