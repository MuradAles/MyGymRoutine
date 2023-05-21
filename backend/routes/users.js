const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const validation = require('../validation');

router
    .route('/login')
    .post(async (req, res) => {
        let emailData = req.body.email
        let passwordData = req.body.password
        if (req.session.user != undefined) {
            return res.status(403).json({ error: "User already login" })
        }
        try {
            emailData = validation.validateEmail(emailData);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
        try {
            passwordData = validation.validatePassword(passwordData);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
        let loginIn;
        try {
            loginIn = await usersData.checkUser(emailData, passwordData);
            req.session.user = { id: loginIn.id, email: loginIn.email };
            res.status(200).json({ id: loginIn.id.toString(), email: loginIn.email });
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })
router
    .route('/signup')
    .post(async (req, res) => {
        let emailData = req.body.email
        let passwordData = req.body.password
        let uidData = req.body.uid
        if (req.session.user != undefined) {
            return res.status(403).json({ error: "User already login" })
        }
        try {
            emailData = validation.validateEmail(emailData);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
        try {
            passwordData = validation.validatePassword(passwordData);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
        let loginIn;
        try {
            loginIn = await usersData.createUser(emailData, passwordData, uidData);
            req.session.user = { id: loginIn.id, email: loginIn.email };
            res.status(200).json({ id: loginIn.id.toString(), email: loginIn.email });
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })
router
    .route('/logout')
    .get(async (req, res) => {
        req.session.destroy();
        res.json({ Authenticated: 'logout' })
    })

module.exports = router