const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

router.post("/", async (req, res, next) => {
  const { user, pw, mail } = req.body;

  try {
    const hashedPw = await bcrypt.hash(pw, 10);

    const result = await prisma.user.create({
      data: {
        username: user,
        password: hashedPw,
        email: mail,
      },
    });
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.post("/login", async (req, res, next) => {
  const { user, pw } = req.body;
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: user,
      },
    });
    const hashedCheck = await bcrypt.compare(pw, result.password);
    res.json({ loginResult: hashedCheck ? "Access Granted" : "Login Failed" });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
