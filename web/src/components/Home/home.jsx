import React, { useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom'
// var QRCode = require('qrcode.react');

import { Card, ListGroupItem, ListGroup } from "react-bootstrap"

import { Redirect } from "react-router-dom"


import './home.css'
import './css/style.css'




let data = [];


function Home() {



    // const [allEmails, setAllEmails] = React.useState([]);
    const [filteredUser, setFilteredUser] = React.useState([]);
    // const [result, setResult] = React.useState(true);
    
    const searchText = React.useRef(null);
    
    // console.log(searchEmail);
    // console.log(filteredUser);


    React.useEffect(() => {


        axios.get(`http://localhost:5000/getStudentDetails`)
            .then(res => {
                // console.log("response", res);
                // console.log("response", res.data.Details);
                // console.log("response", res.data.Details[0].studentName);
                data = res.data.Details;
                setFilteredUser (data)
                // console.log(newposts[0].studentEmail);
                // console.log(newposts);
            });

            
    }, []);
    
    function handleSearchBtn() {
        // filterPosts.map((e, i) => {
        //     console.log(e.studentName);
        //     setFilteredUser(e)

        // })

        if(!searchText.current.value) return;


        const filterPosts = data.filter((post) => {
            // return post.studentEmail === searchEmail
          return post.studentEmail.toLowerCase().includes(searchText.current.value)
        }
        
        )
        setFilteredUser(filterPosts)
        if(!searchText.current.value) return;




    }


console.log('filter posts',filteredUser);


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
                                {/* <input type="text" placeholder="Search" onChange={(e)=>console.log(e.target.value)}/> */}
                                <input type="text" onChange={handleSearchBtn} placeholder="Search" ref={searchText} />
                                {/* <button onClick={handleSearchBtn}><i className="fa fa-search"></i></button> */}
                            </div>
                        </div>
                        <div className="col-md-3">

                        </div>
                    </div>
                </div>
            </div>


            <div className="container">

                {filteredUser.map((value, index) => {


                  return (
                      <div key={index} className='w-75 mx-auto'>
                          <div className="post-bar">
                              <div className="post_topbar">
                                  <div
                                      style={{
                                          display: "flex",
                                          justifyContent: "space-between"
                                      }}>
                                      <div>
                                          <img style={{ width: "125px", borderRadius: "50%" }}
                                              src={value.studentDp} alt="" />
                                          <div className="usy-name">
                                              <h3>{value.studentName}</h3>
                                              <h3>{value.studentEmail}</h3>
                                          </div>
                                      </div>
                                      <div >
                                          <QRCode
                                              value={"https://facebook.com/muddassir.perfect"}
                                              size={128}
                                              bgColor={"#ffffff"}
                                              fgColor={"#000000"}
                                          />
                                      </div>
                                  </div>

                              </div>
                              <div className="epi-sec">
                                  <ul className="descp">
                                      <li>Pakistan</li>
                                  </ul>
                              </div>
                              <div className="job_descp">
                                  <div style={{ lineHeight: "1.4em" }}>
                                      <h6>Course Title: </h6>
                                      <h6>Issue Date: {value.studentGrandDate} </h6>
                                      <h6>Expiry Data: {value.studentExpireDate}</h6>
                                  </div>
                                  <ul className="job-dt">
                                      <li><a >Experience</a></li>
                                      <li><span>{value.studentExperience}</span></li>
                                  </ul>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                      luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet...
                                      
                                  </p>
                                  <ul className="skill-tags">
                                      <li><a>HTML</a></li>
                                      <li><a>CSS</a></li>
                                      <li><a>Javascript</a></li>
                                      <li><a>Node.js</a></li>
                                      <li><a>React</a></li>
                                      <li><a>React Native</a></li>
                                  </ul>
                              </div>

                          </div>


                      </div>)

                  })}
                              
                
















                {/* {
                    filteredUser === {} ? 

                    (newposts.map((value, index) => {


                        return (

                            <div key={index} className='w-75 mx-auto'>
                                <div className="post-bar">
                                    <div className="post_topbar">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}>
                                            <div>
                                                <img style={{ width: "125px", borderRadius: "50%" }}
                                                    src={value.studentDp} alt="" />
                                                <div className="usy-name">
                                                    <h3>{value.studentName}</h3>
                                                    <h3>{value.studentEmail}</h3>
                                                </div>
                                            </div>
                                            <div >
                                                <QRCode
                                                    value={"https://facebook.com/muddassir.perfect"}
                                                    size={128}
                                                    bgColor={"#ffffff"}
                                                    fgColor={"#000000"}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="epi-sec">
                                        <ul className="descp">
                                            <li>Pakistan</li>
                                        </ul>
                                    </div>
                                    <div className="job_descp">
                                        <div style={{ lineHeight: "1.4em" }}>
                                            <h6>Course Title: </h6>
                                            <h6>Issue Date: {value.studentGrandDate} </h6>
                                            <h6>Expiry Data: {value.studentExpireDate}</h6>
                                        </div>
                                        <ul className="job-dt">
                                            <li><a >Experience</a></li>
                                            <li><span>{value.studentExperience}</span></li>
                                        </ul>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                            luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet...
                                            
                                        </p>
                                        <ul className="skill-tags">
                                            <li><a>HTML</a></li>
                                            <li><a>CSS</a></li>
                                            <li><a>Javascript</a></li>
                                            <li><a>Node.js</a></li>
                                            <li><a>React</a></li>
                                            <li><a>React Native</a></li>
                                        </ul>
                                    </div>

                                </div>


                            </div>






                        )

                    }))
                    :
                    (
                        <div className='w-75 mx-auto'>
                        <div className="post-bar">
                            <div className="post_topbar">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}>
                                    <div>
                                        <img style={{ width: "125px", borderRadius: "50%" }}
                                            src={filteredUser.studentDp} alt="" />
                                        <div className="usy-name">
                                            <h3>{filteredUser.studentName}</h3>
                                            <h3>{filteredUser.studentEmail}</h3>
                                        </div>
                                    </div>
                                    <div >
                                        <QRCode
                                            value={"https://facebook.com/muddassir.perfect"}
                                            size={128}
                                            bgColor={"#ffffff"}
                                            fgColor={"#000000"}
                                        />
                                    </div>
                                </div>
    
                            </div>
                            <div className="epi-sec">
                                <ul className="descp">
                                    <li>Pakistan</li>
                                </ul>
                            </div>
                            <div className="job_descp">
                                <div style={{ lineHeight: "1.4em" }}>
                                    <h6>Course Title: </h6>
                                    <h6>Issue Date: {filteredUser.studentGrandDate} </h6>
                                    <h6>Expiry Data: {filteredUser.studentExpireDate}</h6>
                                </div>
                                <ul className="job-dt">
                                    <li><a >Experience</a></li>
                                    <li><span>{filteredUser.studentExperience}</span></li>
                                </ul>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                    luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet...

                                </p>
                                <ul className="skill-tags">
                                    <li><a>HTML</a></li>
                                    <li><a>CSS</a></li>
                                    <li><a>Javascript</a></li>
                                    <li><a>Node.js</a></li>
                                    <li><a>React</a></li>
                                    <li><a>React Native</a></li>
                                </ul>
                            </div>
    
                        </div>
    
    
                    </div>
    
                    )
                
                } */}

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