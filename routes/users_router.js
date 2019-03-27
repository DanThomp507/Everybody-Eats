const { Router } = require("express");
const { User, Event } = require("../models");
const { hash, compare, encode, restrict } = require("../auth");

const usersRouter = Router();
const buildAuthResponse = user => {
  const token_data = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = encode(token_data);
  return {
    user: token_data,
    token
  };
};

usersRouter.get("/verify", restrict, async (req, res) => {
  res.json({ user: res.locals.user });
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const password_digest = await hash(password);

    const user = await User.create({
      username,
      email,
      password_digest
    });
    const respData = buildAuthResponse(user);
    res.json({ ...respData });
  } catch (err) {
    next(err);
    console.log("did not register user");
    res.status(500).send(e.message);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username
      }
    });
    const isPassValid = await compare(password, user.password_digest);
    if (isPassValid) {
      const { password_digest, ...userData } = user;
      const respData = buildAuthResponse(user);
      res.json({ ...respData });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

usersRouter.put("/:user_id/edit", restrict, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    const newUser = await user.update(req.body);
    res.json({ newUser });
  } catch (e) {
    next(e);
  }
});

// find users events
usersRouter.get('/:user_id/events', restrict, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    const events = await user.getEvents();
    res.json(events)
  } catch (e) {
    next(e)
  }
});

// find specific user event
usersRouter.get('/:user_id/events/:event_id', restrict, async (req, res, next) => {
  try {
    const { user_id, event_id } = req.params;
    const user = await User.findByPk(user_id);
    const events = await user.getEvents();
    const event = await events.findByPk(event_id)
    res.json(event)
  } catch (e) {
    next(e)
  }
});

// find events hosted
usersRouter.get('/:user_id/events/host', restrict, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const events = await Event.findAll({
      where: {
        host_id: user_id
      }
    })
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter;
