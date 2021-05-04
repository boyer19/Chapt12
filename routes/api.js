let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    Student.findAll( {order: ['present', 'name']} ).then( students => {                // .findAll( {order: ['name']} ) sets student list in order. ['present'] sets in order at end if present
        return res.json(students)
    }).catch( err => next(err) )
})

router.post('/students/', function(req, res, next){              // .post used to create a record on server
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')                   // Status code --- 404 NOT FOUND---, 500 error, successfull messages start at 200
    }).catch( err => {
                         // handle user errors, e.g. missing starID or name
        if ( err instanceof db.Sequelize.ValidationError ) {
            // respond with 400 Bad Request error code, include error messages
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        }

        // otherwise, something unexpected has gone wrong- Server error?
        return next(err)
    })
})

router.patch('/students/:id', function(req, res, next){
    // if request is to /student/100
    // studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID} })
    .then( ( rowsModified) => {
        let numberOfRowsModified = rowsModified[0]          // number of rows changed

        if (numberOfRowsModified == 1) {            // exactly one row
            return res.send('Ok')
        }
                                                           // no rows - student not found - return 404
        else {
        return res.status(404).json(['Student with that id not found'])
        }
    })
    .catch( err => {
        // if validation error, that's a bad request - e.g. modify student to have no name
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        } else {
            //unexpected error
            return next(err)
        }
    })
})

router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id
    Student.destroy( {where: { id: studentID } } )
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1) {
                return res.send('OK, Deleted')
            } else {
                return res.status(404).json(['Not Found'])
            }
        })
        .catch( err => next(err) ) //unexpected errors
})
// to do deletes student
module.exports = router
// don't write code here - it will be ignored