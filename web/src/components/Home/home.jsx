import React, { useState, useRef } from 'react'
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'

import { Card, ListGroupItem, ListGroup } from "react-bootstrap"

import { Redirect } from "react-router-dom"


import './home.css'
import './css/style.css'






function Home() {


    const [newposts, setNewPosts] = React.useState([]);


    React.useEffect(() => {


        axios.get(`http://localhost:5000/getStudentDetails`)
            .then(res => {
                // console.log("response", res);
                // console.log("response", res.data.Details);
                // console.log("response", res.data.Details[0].studentName);
                setNewPosts(res.data.Details)
                // console.log(newposts);

            });



    }, []);

    // const [forImg, setForImg] = React.useState()
    // var imgDp = React.useRef()

    // setForImg([...forImg, imgDp.current.value])




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

                {
                    newposts.map((value, index) => {

                        return (

                                <div key={index} className='w-100'>
                                            <div className="post-bar">
                                                <div className="post_topbar">
                                                    <div className="usy-dt">
                                                        <img  style={{ width: "100px" }} 
                                                         src={value.studentDp} alt="" />
                                                        <div className="usy-name">
                                                            <h3>{value.studentName}</h3>
                                                            <h3>{value.studentEmail}</h3>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="epi-sec">
                                                    <ul className="descp">
                                                        {/* <li>Epic Coder</li> */}
                                                        <li>Pakistan</li>
                                                    </ul>
                                                    <ul className="bk-links">
                                                        <li>Space for QR Code</li>
                                                        <li></li>
                                                    </ul>
                                                </div>
                                                <div className="job_descp">
                                                    <h3>{value.studentCertificate}</h3>
                                                    <ul className="job-dt">
                                                        <li><a href="#" title>Experience</a></li>
                                                        <li><span>{value.studentExperience}</span></li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                                luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title>view more</a></p>
                                                    {/* <ul className="skill-tags">
                                                    <li><a href="#" title>HTML</a></li>
                                                    <li><a href="#" title>CSS</a></li>
                                                    <li><a href="#" title>Javascript</a></li>
                                                    <li><a href="#" title>Node.js</a></li>
                                                    <li><a href="#" title>React</a></li>
                                                    <li><a href="#" title>React Native</a></li>
                                                </ul> */}
                                                </div>

                                            </div>


                                </div>






                        )

                    })


                }

            </div>


            {/* <Card key={index} className="w-100">
                <Card.Body>
                    <Card.Img className=""
                        style={{ width: "100px" }}
                        variant="top" src={value.studentDp} />
                    <Card.Title>Name: {value.studentName}</Card.Title>
                    <Card.Title>Email: {value.studentEmail} </Card.Title>

                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{value.studentCountry}</ListGroupItem>
                    <ListGroupItem><b>Experience</b> : {value.studentExperience}</ListGroupItem>
                    <ListGroupItem>{value.studentCertificate} </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#"><b>Grand Date</b>: {value.studentGrandDate}</Card.Link>
                    <Card.Link href="#"><b>Expire Date</b>:{value.studentExpireDate}</Card.Link>
                </Card.Body>
            </Card> */}



            {/* Bottom Bar End  */}



            {/* Back to Top */}
            <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>



        </div>
    )

}
export default Home;;