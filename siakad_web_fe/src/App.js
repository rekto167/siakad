import './App.css';
import Login from './components/auth/Login'
import Navbar from './components/layouts/Navbar'
import {Fragment} from "react";


const App = () => {
    return(
        <Fragment>
            {/*<Navbar />*/}
            <Login />
        </Fragment>
    )
}

export default App;
