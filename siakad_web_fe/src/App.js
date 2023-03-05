import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Login from './components/auth/Login'
import Navbar from './components/layouts/Navbar'
import Home from './components/Home'
import Account from "./components/auth/Account";
import {Fragment, useEffect, useId, useState} from "react";
import backgroundnya from "./assets/img/bg-img.png";
import {Provider} from "react-redux";
import store from "./store";
import PrivateRoute from "./routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";

if (localStorage.token){
    setAuthToken(localStorage.token)
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    },[])

    return(
        <Provider store={store}>
            <Router>
                <Fragment>
                    <div className={'h-screen'} style={{backgroundImage: `url(${backgroundnya})`, backgroundSize:'cover'}}>
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="login" element={<Login />} />
                            <Route exact path="akun" element={<PrivateRoute component={Account} />} />
                        </Routes>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    )
}

export default App;
