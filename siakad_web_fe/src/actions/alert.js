import {v4 as uuidv4} from "uuid";
import {REMOVE_ALERT, SET_ALERT} from "./type";

export const setAlert = (message, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {message, alertType, id}
    })

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 3000);
}