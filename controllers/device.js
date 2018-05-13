const router = require('express').Router();
const Device = require('../models/device');
const Log = require('../models/log');
const fetchUrl = require('fetch').fetchUrl;

const sendDevices = (res) => {
  Device.find((err, docs) => {
    if(err){
      res.sendStatus(500);
      return;
    }
    const devices = docs.map(doc => ({
      id: doc._id,
      name: doc.name,
      ip: doc.ip,
      isOn: doc.isOn
    }));

    res.json(devices);
  });
};

// *** GET ALL DEVICES ***
router.get('/', (req, res) => {
  sendDevices(res);
});
// *** *** ***

// *** CHANGE DEVICE STATUS ***
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const nextState = req.body.isOn;

  const device = await Device.findById(id);
  const command = '/cm?cmnd='+( nextState? 'Power On': 'Power off');

  const previousState = device.isOn;

  await fetchUrl(device.ip + command, async function(){
    device.isOn = nextState;
    await device.save();

    await Log.create({
      name: device.name,
      ip: device.ip,
      previousState,
      nextState,
      creation: Date.now()
    });

    sendDevices(res);
  });
});
// *** *** ***

// *** ADD NEW DEVICE ***
router.post('/', async(req, res) => {
  const device = req.body;

  await Device.create({
    name: device.name,
    ip: device.ip,
    isOn: false,
  });

  sendDevices(res);
});
// *** *** ***

// *** DELETE DEVICE ***
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Device.findByIdAndRemove(id).exec();
    sendDevices(res);
  } catch(e) {
    res.sendStatus(500);
 }
});
// *** *** ***

module.exports = router;