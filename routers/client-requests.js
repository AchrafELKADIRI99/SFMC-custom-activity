const router = require('express').Router();
const sfmcAPI = require('../utils/sfmc-api');
const logger = require('../utils/logger');

router.post('/push-campaign-data', async (req, res) => {
  if (req.body.access_token) {
    try {
    
     
    } catch (err) {
      logger.error(`${req.url} endpoint: wrong access_token`);
      res.status(401).json({ status: 'error' });
    }
  } else {
    logger.error(`${req.url} endpoint: access token missing`);
    res.status(401).json({ status: 'error' });
  }
});

module.exports = router;
