const prisma = require("../models/prisma");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
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
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { user, pw } = req.body;
  console.log(user, pw);
  if (!user || !pw) {
    return next(new Error("Please input both username and password"));
  }
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: user,
      },
    });
    if (!result) {
      return res.json({ loginResult: `No user named "${user}" found` });
    }
    const hashedCheck = await bcrypt.compare(pw, result.password);
    res.json({ loginResult: hashedCheck ? "ok" : "Wrong Password" });
  } catch (error) {
    next(error);
  }
};
