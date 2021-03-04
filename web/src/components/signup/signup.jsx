import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'

import {Redirect } from "react-router-dom"

import axios from 'axios'
import './signup.css'


function Signup() {

    // var [SignUped , setSignUped] = useState(false)
    var [loggedIn, setLogin] = useState(false);

    var url = "http://localhost:5000";

    function signUpForm(e) {
        e.preventDefault();

        console.log("function running");

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value.toLowerCase();
        let password = document.getElementById("password").value;

        var user = {
            name: name,
            email: email,
            password: password,
        }

        axios({
            method: 'post',
            url: url + "/auth/signup",
            data: user
        }).then((response) => {
            console.log("response", response);
            // setSignUped((prevValue)=> !prevValue)
            setLogin((prevValue) => !prevValue);

            alert(response.data.message)
        }, (error) => {
            alert(error.response.data.message)
        }
        )
        document.getElementById('name').value = ""
        document.getElementById('email').value = ""
        document.getElementById('password').value = ""

        return false;

    }





    return (
        <div className="signupDiv">
            <h1>
                Signup
            </h1>
            <div>
                <form onSubmit={(e) => signUpForm(e)}>
                    <div className="mb-3 ">
                        <label for="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" placeholder="Name" />
                    </div>
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
                SignUped? <Redirect to="/login" /> : ""
            } */}
            {
                    loggedIn ? <Redirect to="/login" /> : ""
                }
            </div>
        </div>
    )

}
export default Signup;