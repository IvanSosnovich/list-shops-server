const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../model/main");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userSearch = await User.findOne({ email });
  if (userSearch) {
    const validatePassword = await bcrypt.compare(
      password,
      userSearch.password,
    );
    if (validatePassword) {
      req.session.userID = userSearch._id;
      res.status(200).json(userSearch);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(500);
  }
});

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email, password, name);

  const userSearch = await User.find({ email });
  if (userSearch.length !== 0) {
    res.sendStatus(500);
  } else {
    const passwordHash = await bcrypt.hash(password, 5);
    try {
      const newUser = await User.create({
        email,
        name,
        password: passwordHash,
      });
      req.session.userID = newUser._id;
      res.status(200).json(newUser);
    } catch (error) {
      res.sendStatus(500);
    }
  }
});

module.exports = router;
