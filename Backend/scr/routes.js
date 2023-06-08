const router = require('express').Router();

// import control
const UserControl = require('./controller/UserControl');

router.post('/login', UserControl.login);

router.post('/create', UserControl.create);

router.post('/delete', UserControl.delete);

router.post('/update', UserControl.update);

router.get('/getAll', UserControl.getAll);

module.exports = router;