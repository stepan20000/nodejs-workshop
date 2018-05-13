const router = require('express').Router();
const Log = require('../models/log');

router.get('/', (req, res) => {
  Log.find((err, docs) => {
    if(err){
      res.sendStatus(500);
      return;
    }
    const logs = docs.map(doc => ({
      id: doc._id,
      name: doc.name,
      previousState: doc.previousState,
      nextState: doc.nextState,
      creation: doc.creation
    }));

    console.log(logs);
    res.json(logs);
  })
});

router.delete('/', async(req, res) => {

  try {
    await Log.remove({}, null);
    res.sendStatus(200);
  } catch(e) {
    res.sendStatus(500);
  }
});

module.exports = router;