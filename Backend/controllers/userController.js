import { User } from "../models/userSchema.js";
import { Todo } from "../models/todoSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Feilds cannot be left empty",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email Already In Use!!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fields cannot be left empty!!",
        success: false,
      });
    }

    const user = await User.findOne({ email }).populate("todo");

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const tokenData = {
      userID: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const loggedInUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      todo: user.todo,
    };

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}!!`,
        success: true,
        loggedInUser,
      });
  } catch (error) {
    console.log(error);
  }
};
