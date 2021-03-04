import React from 'react'
import axios from 'axios';
import { Button} from "react-bootstrap"



import '../Home/css/style.css'


import { useGlobalState } from "../../context/globelContext"

function AdminDashboard() {



    const [posts, setPosts] = React.useState([]);
    const [newposts, setNewPosts] = React.useState([]);
    const [userName, setuserName] = React.useState();
    const [userProducts, setuserProducts] = React.useState();


    const globalState = useGlobalState()


    React.useEffect(() => {
        setuserName(globalState.role)
        console.log("user", globalState.role);


    }, []);

    function handleUploadPro(e) {
        e.preventDefault();
        console.log("function running");

        
        let studentName = document.getElementById("name").value;
        let studentEmail = document.getElementById("email").value;
        let studentCountry = document.getElementById("country").value;
        let studentExperience = document.getElementById("Experience").value;
        let studentCertificate = document.getElementById("certificate").value;
        let studentGrandDate = document.getElementById("granDate").value;
        let studentExpireDate = document.getElementById("expireDate").value;
        var fileInput = document.getElementById("choseFile");
        console.log("imgggg" , fileInput);


        let formData = new FormData();

        formData.append("myFile", fileInput.files[0]);
        formData.append("studentName", studentName);
        formData.append("studentEmail", studentEmail);
        formData.append("studentCountry", studentCountry);
        formData.append("studentExperience", studentExperience);
        formData.append("studentCertificate", studentCertificate);
        formData.append("studentGrandDate", studentGrandDate);
        formData.append("studentExpireDate", studentExpireDate);
        


      
        axios({
            method: 'post',
            url: "http://localhost:5000/uploadStudenDetail",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
            console.log("response", response);
            alert(response.data.message)

        }, (error) => {
            alert(error.response.data.message)
        }
        )
        document.getElementById('name').value = ""
        document.getElementById('email').value = ""
        document.getElementById('country').value = ""
        document.getElementById('Experience').value = ""
        document.getElementById('certificate').value = ""
        document.getElementById('granDate').value = ""
        document.getElementById('expireDate').value = ""
        document.getElementById('choseFile').value = ""

        return false;

    }



    return (
        <div>
            


            <div className="bottom-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo">
                              <a href="#" className="nav-link -toggle" >{userName}</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search">
                                <input type="text" placeholder="Search" />
                                <button><i className="fa fa-search"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <div className="cart-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">


                            <form onSubmit={(e)=>(handleUploadPro(e))}>

                                <div className="form-group row">
                                    <label for="name" className="col-sm-3 col-form-label">Student Name</label>
                                    <div className="col-sm-9">
                                        <input type="name" className="form-control" id="name" placeholder="Enter Product Name" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="email" className="col-sm-3 col-form-label">Student Email</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" id="email" placeholder="Enter Student Email" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="country" className="col-sm-3 col-form-label">Student Country</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="country" placeholder="Enter Student Country" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="Experience" className="col-sm-3 col-form-label">Student Experience</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="Experience" placeholder="Enter Student Experience" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="certificate" className="col-sm-3 col-form-label">Certificate Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="certificate" placeholder="Enter Certificate Name" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="granDate" className="col-sm-3 col-form-label">Grand Date</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="granDate" placeholder="Enter Certificate Grand Date" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="expireDate" className="col-sm-3 col-form-label">Expire Date</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="expireDate" placeholder="Enter Certificate Expiry Date" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="choseFile" className="col-sm-3 col-form-label">Choose File</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" id="choseFile" placeholder="Choose file" />

                                    </div>
                                </div>

                                <Button className="w-100" type="submit">Add</Button>


                            </form>


                        </div>

                        <div className="col-lg-3"></div>


                    </div>
                </div>
            </div>

            {/* Back to Top */}
            <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>




        </div>
    )
}

export default AdminDashboard;