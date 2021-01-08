// const express = require("express")
// const router = new express.Router();
// const Student = require('../models/students');

// //create student
// /* with the help of promises */
// router.post('/students', (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })
// // /* with the help of async await */
// // router.post('/students', async (req, res) => {
// //     console.log(req.body);
// //     try {
// //         const user = new Student(req.body);
// //         const createUser = await user.save();
// //         res.status(201).send(createUser);
// //     } catch (error) {
// //         res.status(400).send(error);
// //     }
// // })


// // //get students
// // router.get('/students', async (req, res) => {
// //     console.log(req.body);
// //     try {
// //         const studentsData = await Student.find();
// //         res.status(201).send(studentsData);
// //     } catch (error) {
// //         res.status(400).send(error);
// //     }
// // })


// // //find student by id
// // router.get('/students/:id', async (req, res) => {
// //     try {
// //         const _id = req.params.id;
// //         const studentData = await Student.findById({ _id: _id });
// //         console.log(studentData);
// //         if (!studentData) {
// //             return res.status(404).send()
// //         } else {
// //             res.send(studentData)
// //         }
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // })


// // //update student
// // router.patch('/students/:id', async (req, res) => {
// //     try {
// //         const _id = req.params.id;
// //         const updateStudent = await Student.findByIdAndUpdate(
// //             { _id: _id }, req.body, { new: true })
// //         res.status(500).send(updateStudent);
// //         console.log(updateStudent);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // })

// // //delete student
// // router.delete('/students/:id', async (req, res) => {
// //     try {
// //         const _id = req.params.id;
// //         const deleteStudent = await Student.findByIdAndDelete({ _id: _id })
// //         if (!_id) {
// //             return res.status(404).send()
// //         }
// //         else{
// //             res.send(deleteStudent)
// //         }
// //         console.log(deleteStudent);
// //     } catch (error) {
// //         res.status(500).send(error);
// //     }
// // })


// module.exports = router;