
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getBooks, getSlots, test, bookSlot, loginUser, changeStatus, getDonar, loginDonar, addDonar, SignupDonar, SignupReceiver } = require('../controllers/authControllers');

router.use(
    cors({
        credentials : true,
        // origin : 'https://bloodbankmanagement.s3.ap-south-1.amazonaws.com/index.html'
        origin: 'http://localhost:3000'
    })
);

router.get('/',test);
router.get('/getdonar', getDonar)
router.post('/bookSlot',bookSlot);
router.post('/loginDonar', loginDonar)
router.post('/loginUser',loginUser);
router.post('/changeStatus',changeStatus);
router.post('/addDonar',addDonar);
router.post('/signupDonar', SignupDonar);
router.post('/signupReceiver', SignupReceiver);

module.exports = router;
