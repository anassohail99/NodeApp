const express = require("express");
const router = express.Router();

// @desc Login/Landing Page
router.get("/", (req, res) => {
  // res.send("Login");
  res.render("login", {
    layout: "login",
  });
});

// @desc Dashboard Page
// @route GET dashboard
router.get("/dashboard", (req, res) => {
  // res.send("dashboard");
  res.render("dashboard");
});

module.exports = router;
