const express = require('express');
const {
    getUsers,
    createUser,
    authUser,
    blockUsers,
    unblockUsers, deleteUsers
} = require("../contollers/user.controller");
const router = express.Router()
const verifyUser = require('../middlewares/verify.midleware')
router.get('/api/users/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: 'Success'})
})
router.get('/api/users/verify', verifyUser, (req, res) => {
    return res.json({Status: 'Success', name: req.name})
})
router.post('/api/users/register', createUser)
router.put('/api/users/block', verifyUser, blockUsers)
router.put('/api/users/unblock', verifyUser, unblockUsers)
router.delete('/api/users/delete', verifyUser, deleteUsers)
router.get('/api/users/', getUsers)
router.post('/api/users/login', authUser)

module.exports = router;