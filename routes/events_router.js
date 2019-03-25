const { Router } = require('express');
const { Event, User } = require('../models');
const { restrict } = require('../auth');

const eventsRouter = Router();

// gets all events
eventsRouter.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events)
  } catch(err) {
    console.error({error: e});
  }
});

// finds one event
eventsRouter.get('/:event_id', async (req, res) => {
  try {
    const { event_id } = req.params;
    const event = await Event.findByPk(event_id);
    res.json(event)
  } catch(e) {
    console.error({error: e});
  }
})

// add user to event
eventsRouter.post('/:event_id/user/:user_id/add', async (req, res, next) => {
  try {
    const { event_id, user_id } = req.params
    const event = await Event.findByPk(event_id);
    const newUser = await User.findByPk(user_id)
    await event.addUser(newUser)
    res.json({ ...event.get(), users: newUser })
  }catch(e) {
    next(e)
  }
});

// remove user from event
eventsRouter.delete('/:id/user/:user_id/delete', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.user_id)
    console.log(user.dataValues);
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User
        }
      ]
    });
    await event.removeUser(user)
    await event.reload();
    res.json(event)

  }catch(e) {
    next(e)
  }
});

module.exports = eventsRouter
