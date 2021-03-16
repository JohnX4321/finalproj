import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import UserPage from "./user/main";
import AdminPage from "./admin/main";
import {useParams} from "react-router";
import DispApplPage from "./admin/DispAppl";
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessPage from "./user/success";
/*
 <div>
                <ul>
                    <li>
                        <Link to="/user" />
                    </li>
                    <li>
                        <Link to="/admin" />
                    </li>
                </ul>
            </div>
 */

export function Main() {
    return (
        <Router>
        <Route path="/:id/:lang/user" component={UserPage}/>
        <Route path="/:id/appl" component={DispApplPage} />
            <Route path="/:lang/success" component={SuccessPage} />

    <Route path="/:id/admin" component={AdminPage}/>
    <Route exact path="/:id">
        <App/>
    </Route>

        </Router>
    )
}

class App extends React.Component{

    constructor(props) {
        super(props);

    }


    render() {
    var a = window.location.href.toString().substr(22) //useParams();

    return (
        <div className="App">

            <h2>Hello User {a}</h2>


            <Router>

            <Link to={"/"+a+"user"}>User</Link>
                <br/>
                <Link to={"/"+a+"admin"}>Admin</Link>
            </Router>




        </div>
    );
  }
}

export default App;
