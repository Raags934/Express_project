
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Controller = require('../Controller');
var requireToken = require('../TokenManager/tokenManger');


router.post('/user', async function (req, res) {
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
        //     password: req.body.password
        // }
        var users = await Controller.userController.userRegistrationController(result);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})



router.post('/userLogin', async function (req, res) {
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
        var users = await Controller.userController.userLoginController(result);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})

router.get('/userGetProfile', requireToken.verifyToken, async function (req, res) {
    try {
        console.log("check the rjsdfkj",req.query);
        
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
        });

        let result = await schema.validate(req.body);
        // let creteria = {
        //     email: req.body.email,
        // }
        var users = await Controller.userController.getProfile(result);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "unauthrization"});
    }
})

router.post('/userSave', requireToken.verifyToken, async function (req, res) {
    try {
        
        // let creteria = {
        //     name: req.body.name,
        //     password: req.body.password
        // }
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
        });

        let result = await schema.validate(req.body);
        var users = await Controller.userController.userSave(result);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "unauthrization"});
    }
})



module.exports = router;
