import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'
import axios from 'axios'
import './login.css'
import {Redirect, useHistory } from "react-router-dom"
import {useGlobalState, useGlobalStateUpdate} from "../../context/globelContext"

axios.defaults.withCredentials = true



function Login() {


    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const history = useHistory()

    // var [loggedIn, setLogin] = useState(false);
    var url = "http://localhost:5000";

    function signIn(e) {

        console.log("signin function runnings");
        e.preventDefault();
        let email = document.getElementById("email").value.toLowerCase();
        let password = document.getElementById("password").value;

        var user = {
            email: email,
            password: password,
        }

        axios({
            method: 'post',
            url: url + "/auth/login",
            data: user,
            withCredentials: true

        }).then((response) => {
            // setLogin((prevValue) => !prevValue);
            // setGlobalState(pre =>({...pre, user: true}))
            // console.log("response", response);
            alert(response.data.user.role)

            setGlobalState(prev => {
                return { ...prev, loginStatus: true , user : {
                    email: response.data.user.email,
                    name: response.data.user.name,
                }, role : response.data.user.role }
            })
            history.push('/')
            
        }, (error) => {
            alert(error.response.data.message)
        }
        )

        return false;

    }



    return (
        <div className="loginDiv">
            <h1>
                Login</h1>


            <div>
                <form onSubmit={(e) => signIn(e)} >
                    <div className="mb-3 ">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3 ">
                        <label for="password" className="visually-hidden">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className='mb-3 '>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Submit</button>
                        </div>

                    </div>
                </form>
                {/* {
                    loggedIn ? <Redirect to="/dashboard" /> : ""
                } */}
            </div>
        </div>
    )

}
export default Login;;