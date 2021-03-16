import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import {BrowserRouter,Route} from "react-router-dom";
import CreateScheme from "./CreateScheme";
import CreateSchol from "./CreateSchol";
import ViewApp from "./ViewApp";
import RegAadhar from "./regAadhar";

class App extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <Route path="/scheme" component={CreateScheme} />
                <Route path="/schol" component={CreateSchol} />
                <Route path="/process" component={ViewApp} />
                <Route path="/regad" component={RegAadhar} />
            </BrowserRouter>
        )
    }


}

export default App;
