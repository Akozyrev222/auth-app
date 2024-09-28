const express = require('express');
const {
    getUsers,
    createUser,
    authUser,
    blockUsers,
    unblockUsers, deleteUsers, verifyUser
} = require("../contollers/user.controller");
const {
    validateUser
} = require("../middlewares/validate.midleware");
const router = express.Router()
router.get('/api/users/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: 'Success'})
})
router.get('/api/users/verify', verifyUser)
router.post('/api/users/register', createUser)
router.put('/api/users/block', validateUser, blockUsers)
router.put('/api/users/unblock', validateUser, unblockUsers)
router.delete('/api/users/delete', validateUser, deleteUsers)
router.get('/api/users/', validateUser, getUsers)
router.post('/api/users/login', authUser)

module.exports = router;