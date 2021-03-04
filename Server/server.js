var express = require('express');
var cors = require('cors')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-inzi');
var path = require('path')
var http = require("http");
var SERVER_SECRET = process.env.SECRET || "1234";



const fs = require('fs')
const multer = require("multer");
const admin = require("firebase-admin");

const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })

var serviceAccount = require("./firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://upload-photo-a5769.firebaseio.com"
});

const bucket = admin.storage().bucket("gs://upload-photo-a5769.appspot.com");








var app = express()
    // var server = http.createServer(app);
var { userModel, studentDetailModel } = require('./dbrepo/index')
var authRoutes = require("./auth/auth")

console.log("userModel ====", userModel);


var app = express();
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin: http://localhost:3000");
    res.header("Access-Control-Allow-Credentials: true");
    res.header("Access-Control-Allow-Methods: GET, POST");
    res.header("Access-Control-Allow-Headers: Content-Type, *");
    next();


})




app.use("/", express.static(path.resolve(path.join(__dirname, "../web/build"))));
app.use("/auth", authRoutes)

app.get("/getStudentDetails", (req, res, next) => {

    studentDetailModel.find({}, (err, data) => {
        if (!err) {
            // console.log("data is orders = > " , data);
            res.status(200).send({
                Details: data,
            });
        } else {
            console.log("error : ", err);
            res.status(500).send("error");
        }
    })
});

app.use(function(req, res, next) {
    console.log("req.cookies: ", req.cookies)
    console.log("cookies: ");



    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }


    jwt.verify(req.cookies.jToken, SERVER_SECRET, function(err, decodedData) {
        if (!err) {
            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate;

            if (diff > 300000) {
                res.status(401).send("token expired")
            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    phone: decodedData.phone,
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                next();

            }

        } else(
            res.status(401).send("Invalid Token")
        )
    })

})



app.get("/profile", (req, res, next) => {
    console.log(req.body)

    userModel.findById(req.body.jToken.id, 'name email role createdOn',
        function(err, doc) {
            if (!err) {
                res.send({
                    profile: doc

                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})








app.post("/uploadStudenDetail", upload.any(), (req, res, next) => {


    bucket.upload(
        req.files[0].path,

        function (err, file, apiResponse) {
            if (!err) {

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        studentDetailModel.create({ 
                            studentName: req.body.studentName,
                            studentEmail: req.body.studentEmail,
                            studentDp:urlData[0],
                            studentCountry: req.body.studentCountry,
                            studentExperience: req.body.studentExperience,
                            studentCertificate: req.body.studentCertificate,
                            studentGrandDate: req.body.studentGrandDate,
                            studentExpireDate: req.body.studentExpireDate,
                            isActive: true,
                         }).then((studentCreated) =>{
                             res.send({
                                 message: "Student Certificate has been created",
                                 studentCreated: studentCreated
                             })
                         }).catch((err) =>{
                             res.send({
                                 message: "an error occured"
                             })
                         })
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                            return;
                        } catch (err) {
                            console.error(err)
                        }
                        // res.send("Ok");/
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})









const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on: ", PORT);
})