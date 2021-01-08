const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
//when we use instance we have to write methods()
//token generate for registration
employeeSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
       // await this.save();
        return token
    } catch (error) {
        res.send("Error", error);
        console.log("error", error);
    }
}

employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        //console.log(`password:::${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
        // console.log(`hash password:::${this.password}`);
        //this.confirmpassword = undefined;
    } 
    next();
})

const Employee = new mongoose.model('New Employee', employeeSchema);

module.exports = Employee;