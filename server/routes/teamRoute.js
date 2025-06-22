const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Team Member Routes
router.post('/team', teamController.createTeamMember);
router.get('/team', teamController.getAllTeamMembers);
router.put('/team/:id', teamController.updateTeamMember);
router.delete('/team/:id', teamController.deleteTeamMember);

module.exports = router;