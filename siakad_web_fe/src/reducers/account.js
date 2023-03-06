import {ADD_ACCOUNT_FAILED, ADD_ACCOUNT_SUCCESS} from "../actions/type";

const initialState = [];

export default function (state = initialState, action){
    const {type, payload} = action
    switch (type){
        case ADD_ACCOUNT_SUCCESS:
            return [
                ...state,
                payload
            ]
        case ADD_ACCOUNT_FAILED:
        default:
            return state
    }
}