const router = require("express").Router();
const User = require("../db/models/user");

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    } else {
      await req.login(user, err =>
        err ? next(err, "error line 15") : res.json(user)
      );
    }
  } catch (err) {
    next(err, "error line 18");
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body)
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(401).send("Fill out all fields");
    }
    if (!req.body.email.includes("@") || !req.body.email.includes(".com")) {
      res.status(401).send("Invalid Email");
    } else {
      const user = await User.create(req.body);
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("Email already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

// router.use("/google", require("./google"));
