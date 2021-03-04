


var mongoose = require('mongoose')


let dbURI = 'mongodb+srv://legend:legend123@cluster0.2c3x6.mongodb.net/testdb?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose is conected");
});
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconected");
});
mongoose.connection.on('error', function (err) {
    console.log("Mongoose connection error: ", err);
    process.env(1)
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    role:String,
    createdOn: { type: Date, 'default': Date.now }
});
var userModel = mongoose.model("users", userSchema);

var optSchema = new mongoose.Schema({
    email: String,
    optCode: String,
    createdOn: { "type": Date, "default": Date.now }
})

var optModel = mongoose.model("opta", optSchema);



var uploadStudentSchema = new mongoose.Schema({
    studentName: String,
    studentEmail: String,
    studentDp: String,
    studentCountry: String,
    studentExperience: String,
    studentCertificate: String,
    studentGrandDate: String,
    studentExpireDate: String,
    isActive: Boolean,
    createdOn: { "type": Date, "default": Date.now },


})
var studentDetailModel = mongoose.model("studentDetailModel" , uploadStudentSchema)

module.exports = {
    userModel: userModel,
    optModel: optModel,
    studentDetailModel : studentDetailModel

}
