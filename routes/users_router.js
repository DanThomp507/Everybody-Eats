const { Router } = require("express");
const { User } = require("../models");
const { hash, checkPassword, genToken, restrict } = require("../auth");

const usersRouter = Router();
const buildAuthResponse = user => {
  const token_data = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = genToken(token_data);
  const userData = {
    username: user.username,
    id: user.id,
    email: user.email,
  };
  return {
    user: userData,
    token
  };
};

usersRouter.get("/verify", async (req, res) => {
  res.json({ user: res.locals.user });
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, avatar, isLocal } = req.body;
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
    const isPassValid = await checkPassword(password, user.password_digest);
    if (isPassValid) {
      const { password_digest, ...userData } = user;
      console.log("ISPASSVALID : user", user);
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

usersRouter.put("/:user_id/edit", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    const newUser = await user.update(req.body);
    console.log("newUser", newUser);
    res.json({ newUser });
  } catch (e) {
    next(e);
  }
});

// find users events
usersRouter.get('/:user_id/events', async (req, res, next) => {
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
usersRouter.get('/:user_id/events/:event_id', async (req, res, next) => {
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

module.exports = usersRouter;
