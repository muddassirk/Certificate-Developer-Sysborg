import React, { useState } from 'react'
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'

import {  Card,ListGroupItem, ListGroup} from "react-bootstrap"

import { Redirect } from "react-router-dom"


import './home.css'
import './css/style.css'






function Home() {


    const [newposts, setNewPosts] = React.useState([]);

    React.useEffect(() => {


        axios.get(`http://localhost:5000/getStudentDetails`)
            .then(res => {
                console.log("response", res);
                console.log("response", res.data.Details);
                setNewPosts(res.data.orders)
                console.log(newposts);
                // console.log(newposts);

            });
        


    }, []);





    return (
        <div>



            {/* Bottom Bar Start  */}
            <div className="bottom-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo">
                                <a href="index.html">
                                    {/* <img src="img/logo.png" alt="Logo" /> */}
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search">
                                <input type="text" placeholder="Search" />
                                <button><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-md-3">

                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <Card className="w-100">
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                        <Card.Title>Name: Card Title</Card.Title>
                        <Card.Title>Email: Card Title</Card.Title>
                        
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Country</ListGroupItem>
                        <ListGroupItem><b>Experience</b> : Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem>Certificate </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#"><b>Grand Date</b>: Card Link</Card.Link>
                        <Card.Link href="#"><b>Expire Date</b>:Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>




            {/* Bottom Bar End  */}



            {/* Back to Top */}
            <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>



        </div>
    )

}
export default Home;;