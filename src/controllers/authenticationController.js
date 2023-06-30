import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleGetLoginPage = async (req, res) => {
  return res.render("loginPage.ejs");
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.find({ email: email });
    if (result.length === 0) return res.redirect("/login-page");
    const isPasswordCorrect = await bcrypt.compare(
      password,
      result[0].password
    );
    if (!isPasswordCorrect) return res.redirect("/login-page");

    //save jsonwebtoken into cookies
    const payload = {
      id: result[0]._id,
      username: result[0].username,
      email: result[0].email,
    };
    const jwtToken = handleCreateNewToken(payload);
    res.cookie("token", jwtToken);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

const handleLogout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login-page");
};

const handleRegisterNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user exist or not
    const user = await User.find({ email: email });
    if (user.length !== 0) {
      return res.redirect("/login-page");
    }
    //create new user
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await User.create({
      username,
      email,
      password: hashPassword,
    });

    //save jsonwebtoken into cookies
    const payload = {
      id: result._id,
      username: result.username,
      email: result.email,
    };
    const jwtToken = handleCreateNewToken(payload);
    res.cookie("token", jwtToken);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

const handleCreateNewToken = (payload) => {
  const token = jwt.sign(
    {
      ...payload,
    },
    "secret"
  );

  return token;
};

const handleDecodeToken = async (token) => {
  // invalid token - synchronous
  try {
    var decoded = jwt.verify(token, "secret");
    return decoded;
  } catch (err) {
    console.log(err.message);
  }
};
export {
  handleLogin,
  handleLogout,
  handleRegisterNewUser,
  handleGetLoginPage,
  handleDecodeToken,
};
