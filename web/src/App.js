import React, { useContext } from "react";
import "./App.css";
// import axios from 'axios'
import axios from "axios";
import { HashRouter as Router, Switch, Link, Route, Redirect, useHistory } from "react-router-dom";
// import React, { useContext } from "react";
// import axios from "axios";

 
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Signup from "./components/signup/signup";

import AdminDashboard from "./components/adminDash/adminDash";

import { useGlobalState, useGlobalStateUpdate } from "./context/globelContext"



function App() {


  const globalstate = useGlobalState()
  const setGlobalstate = useGlobalStateUpdate()
  // const history = useHistory()
  const history = useHistory()
  const [userName, setuserName] = React.useState();


  function handleLogout() {
    axios({
      url: "http://localhost:5000/auth/logout",
      method: "POST",
      withCredentials: true
    })
      .then(function (response) {
        console.log("response: ", response.data);
        setGlobalstate(prev => {
          return { ...prev, loginStatus: false, user: null }
        })

        Redirect("/login")

      })

  }
  
  return (
    <div>
      <Router>

        <div className="nav container-fluid w-100">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark w-100" >
            <a href="#" className="navbar-brand">MENU</a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>

            {(globalstate.role === null) ?

              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto">

                  <Link to="/" >
                    <a className="nav-item nav-link ">Sysborg Developers Certification</a>
                  </Link>
                  <Link to="/login" >
                    <a className="nav-item nav-link " >Login</a>
                  </Link>
                  <Link to="/signup" >
                    <a className="nav-item nav-link " >Signup</a>
                  </Link>

                </div>

              </div>
              : null}

            {(globalstate.role === "admin") ?

              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto">
                  <Link to="/" >
                    <a className="nav-item nav-link " >Admin Daschboard</a>
                  </Link>
                  {/* <Link to="/AddProducts" >
                    <a className="nav-item nav-link " >Add Students</a>
                  </Link> */}

                  <Link to="/" >
                    <a className="float-right nav-item nav-link " onClick={handleLogout}>Log Out</a>
                  </Link>

                </div>
                

              </div>

              : null}
          </nav>

        </div>








        {/* public routes */}
        {( globalstate.role === null ) ?
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}

        {(globalstate.role === "admin") ?

          <>
            <Route exact path="/">
              <AdminDashboard />
            </Route>
            
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}





      </Router>
    </div>
  );
}

export default App;
