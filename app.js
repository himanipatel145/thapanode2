require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3333;
require('./db/connection');
const Register = require('./models/registers');
const auth = require('./middleware/auth');

/* 1st */
// const static_path = path.join(path.join(__dirname, "./public"))
// app.use(express.static(static_path));

/*2nd*/
const templates_path = path.join(__dirname, "templates", "views")
const partials_path = path.join(__dirname, "templates", "partials")

app.set('view engine', 'hbs');
app.set("views", templates_path)
hbs.registerPartials(partials_path)

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

//which file u want to render -->index
app.get('/', (req, res) => {
    res.render("index")
})
// app.use(studentRouter)
// app.get('/', (req, res) => {
//     res.send("hello")
// })

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/anotherPage', auth, (req, res) => {
    //console.log(` ::::::::::::: ${req.cookies.jwt}`);
    res.render('anotherPage');
})

app.get('/logout', auth, async (req, res) => {
    try {
        console.log("logout");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            //const User = new Register(req.body);
            const User = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
            });

            const token = await User.generateAuthToken();
            console.log("token", token);

            //for cookie
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            })
            //console.log("cookie", cookie);

            const createUser = await User.save()
            //res.status(200).send(createUser);
            /******if u want to locate other page then*****/
            res.status(201).render("index");
        } else {
            res.send("Password are not matching")
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

// app.post('/login', async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const userEmail = await Register.findOne({ email: email })

//         if (userEmail.password === password) {
//             res.status(201).render("index");
//         } else {
//             res.send("Invalid login details")
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({ email: email })

        const isMatch = await bcrypt.compare(password, userEmail.password);

        const token = await userEmail.generateAuthToken();
        console.log("login token", token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true,
            //secure: true
        })
        //console.log(" login cookie", cookie);


        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.send("Invalid login details")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log("Server is running");
})



// const createToken = async () => {
//     const token = await jwt.sign({ _id: "5fcf3510cda7a74706c210a8"},
//      "himanipatelhimanipatel",{expiresIn:3000})
//     console.log(token);

//     const userVerify = await jwt.verify(token,"himanipatelhimanipatel");
//     console.log(userVerify);
// }
// createToken()