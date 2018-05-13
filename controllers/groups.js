const router = require('express').Router();
const Group = require('../models/group');
const Device = require('../models/device');
const Log = require('../models/log');
const fetchUrl = require('fetch').fetchUrl;

const sendGroups = async (res) => {
  await Group.find((err, docs) => {
    if(err){
      res.sendStatus(500);
      return;
    }
    const groups = docs.map(doc => ({
      id: doc._id,
      name: doc.name,
      isOn: doc.isOn,
      devices: doc.devices
    }));
    res.json(groups);
  });
};

// *** SEND ALL GROUPS ***
router.get('/', (req, res) => {
  sendGroups(res);
});
// *** *** ***

//  *** ADD GROUP ***
router.post('/', async(req, res) => {
  const group = req.body;

  await Group.create({
    name: group.name,
    isOn: false,
    devices: []
  });

  sendGroups(res);
});
// *** *** ***

// *** DELETE GROUP ***
router.delete('/:id', async(req, res) => {
  const id = req.params.id;

  try {
    await Group.findByIdAndRemove(id).exec();
    sendGroups(res);
  } catch(e) {
    res.sendStatus(500);
  }
});
// *** *** ***

// *** ADD DEVICE TO GROUP ***
router.put('/update/:groupId/:deviceId', async(req, res) => {
  const groupId = req.body.groupId;
  const deviceId = req.body.deviceId;

  const group = await Group.findById(groupId);
  const device = await Device.findById(deviceId);
  group.devices.push(device);
  await group.save();

  sendGroups(res);
});
// *** *** ***

// *** REMOVE DEVICE FROM GROUP ***
router.delete('/update/:groupId/:deviceId', async(req, res) => {
  const groupId = req.body.groupId;
  const deviceId = req.body.deviceId;

  const group = await Group.findById(groupId);
  group.devices = group.devices.filter(device => device !== deviceId);;
  await group.save();

  sendGroups(res);
});
// *** *** ***

// *** SET GROUP STATUS ***
router.put('/on-off', async (req, res) => {
  const id = req.body.id;
  const nextState = req.body.isOn;
  const group = await Group.findById(id);

  if (group.isOn === !!nextState) {
    res.sendStatus(304);
    return;
  }
  group.isOn = !!nextState;
  await group.save();
  await updateDevices(group.devices, nextState);

  Group.find((err, docs) => {
    if(err){
      res.sendStatus(500);
      return;
    }
    const groups = docs.map(doc => (
      {
        id: doc._id,
        name: doc.name,
        isOn: doc.isOn,
        devices: doc.devices
      })
    );

    Device.find((err, docs) => {
      if(err){
        res.sendStatus(500);
        return;
      }
      const devices = docs.map(doc => (
        {
          id: doc._id,
          name: doc.name,
          ip: doc.ip,
          isOn: doc.isOn
        })
      );
      res.json({groups, devices});
    });
  });


});
// *** *** ***

module.exports = router;

//
// async function updateDevices (deviceIds, isOn) {
//   const pArray = deviceIds.map(async device => {
//     const device = await Device.findById(device.id);
//     device.isOn = isOn;
//     await device.save();
//   });
//   const updatedDevices = await Promise.all(pArray);
//   return users;
// }

function updateDevices(devicesIds, nextState) {
  let previousState;
  const command = '/cm?cmnd='+(nextState? 'Power On': 'Power off');

  return Promise.all(devicesIds.map(async deviceId => {
    let currentDevice;
    return Device.findById(deviceId)
      .then(device => {
        previousState = device.isOn;
        device.isOn = nextState;
        currentDevice = device;
        return device;
      })
      .then(device => device.save())
      .then(() => {
        fetchUrl(currentDevice.ip + command, function () {
          Log.create({
            name: currentDevice.name,
            ip: currentDevice.ip,
            previousState,
            nextState,
            creation: Date.now()
          })
        })
      })
      .catch(err => console.log(err));
  }));
}
