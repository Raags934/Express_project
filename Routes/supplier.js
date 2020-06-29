
var express = require('express');
var router = express.Router();
const Joi = require(`joi`);
const Config = require('../Config');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Controller = require('../Controller')
// var UserService = require('../services/services');

router.post('/supplierRegistration', async function (req, res) {
    try {

        const schema = Joi.object().keys({
            name: Joi.string().trim().required(),
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(5).max(10).required()
        });

        let result = await schema.validate(req.body);
        // let creteria = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,

        // }
        var users = await Controller.supplierController.supplierRegistrationController(result);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log("check the ||||||||||||||| ooooooooooooo", e)
        return res.status(400).json({ status: 400, message: e.message });
    }
})



router.post('/supplierLogin', async function (req, res) {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(5).max(10).required()
        });
        let result = await schema.validate(req.body);

        // let creteria = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // }
        var users = await Controller.supplierController.supplierLoginController(result);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})

module.exports = router;