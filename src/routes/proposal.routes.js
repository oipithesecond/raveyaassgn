const express = require('express');
const { createB2BProposal } = require('../controllers/proposal.controller');

const router = express.Router();

router.post('/', createB2BProposal);

module.exports = router;