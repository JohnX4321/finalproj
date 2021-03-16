import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import UserPage from "./user/UserPage";
import AdminPage from "./admin/AdminPage";
import Applicants from "./admin/Applicants";
import 'bootstrap/dist/css/bootstrap.min.css'
import SuccessPage from "./user/success";

function App() {
  return (
      <BrowserRouter>

    <div className="App">
      <Route path="/:id/:lan/:village/user" component={UserPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/:id/app" component={Applicants} />
      <Route path="/:lang/success" component={SuccessPage} />
    </div>
      </BrowserRouter>
  );
}

export default App;
