const express = require("express");
const peopleController = require("../controllers/peopleController");
const peopleRouter = express.Router();
const {check} = require("express-validator/check");
const auth = require("../middleware/auth");
const {validationResult} = require("express-validator/check");

peopleRouter.post('/', auth, [], async (request, response) => {
    try {
        let body = {...request.body};
        if (!!request.files){
            body.files = request.files
        }

        const people = await peopleController.createPeople(body, request.user);

        response.status(200).json(people);
    } catch (err) {
        response.status(400).json(err)
    }
});

peopleRouter.put('/', auth, [], async (request, response) => {
    try {
        let body = {...request.body};
        if (!!request.files){
            body.files = request.files
        }

        const people = await peopleController.updatePeople(body);

        response.status(200).json(people);
    } catch (err) {
        response.status(400).json(err)
    }
});

peopleRouter.get('/', auth, [], async (request, response) => {
   try {
       const peoples = await peopleController.getPeopleAll(request.user.id);
       console.log(peoples)
       response.status(200).json(peoples)
   } catch (e) {
       response.status(500).json(e)
   }
});

peopleRouter.get('/:id', auth, [], async (request, response) => {
   try {
       const peoples = await peopleController.getPeopleId(request.params.id);
       response.status(200).json(peoples)
   } catch (e) {
       response.status(500).json(e)
   }
});

peopleRouter.delete('/:id', auth, [], async (request, response) => {
   try {
       const peoples = await peopleController.removePeople(request.params.id);
       response.status(200).json(peoples)
   } catch (e) {
       response.status(500).json(e)
   }
});

module.exports = peopleRouter
