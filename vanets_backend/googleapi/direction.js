const router = require('express').Router();
const { getDefaultDirection } = require('./directionLogic')

router.get('/', async (_, res) => {

    res.send(await getDefaultDirection())
})




module.exports = router;