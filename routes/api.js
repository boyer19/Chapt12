let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    Student.findAll().then( students => {
        return res.json(students)
    })
})

router.post('/students/', function(req, res, next){              // .post used to create a record on server
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')                   // Status code --- 404 NOT FOUND---, 500 error, successfull messages start at 200
    })
})

// to do edit a student
router.patch('/students/:id', function(req, res, next){
    // if request is to /student/100
    // studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID} })
    .then( () => {
        return res.send('OK')
    })
})

router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id
    Student.destroy( {where: { id: studentID } } )
        .then( () => {
            return res.send('OK, Deleted')
        })
})
// to do deletes student
module.exports = router
// don;t write code here - it will be ignored