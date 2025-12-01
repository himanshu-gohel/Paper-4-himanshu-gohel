const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  try {
    const user = await User.create({ name, email, password: hash });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch {
    res.status(400).json({ error: "User exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "No user" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Wrong password" });
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { id } });
  res.json({ id: user.id, name: user.name, email: user.email });
});

module.exports = router;
