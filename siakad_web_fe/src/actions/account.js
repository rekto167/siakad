import {ADD_ACCOUNT_FAILED, ADD_ACCOUNT_SUCCESS} from "./type";
import axios from "axios";
import {setAlert} from "./alert";

export const add_account = (formData) => async dispatch =>{
    const consig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        const res = await axios.post('http://localhost:8000/api/user/tambah', formData);
        dispatch({
            type: ADD_ACCOUNT_SUCCESS,
            payload: res.data
        });


        dispatch(setAlert('Berhasil tambah akun.', 'success'));

    }catch (e){
        const errors = e.response.data.errors;
        if (errors){
            errors.forEach(error => console.log(error.message));
        }
        console.log(e.response.data);

        dispatch({
            type: ADD_ACCOUNT_FAILED
        })

        dispatch(setAlert('Gagal tambah akun', 'error'));
    }
}