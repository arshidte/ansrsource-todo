import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// POST: Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!email || !password || !userName) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  } else {
    // Check if the user has already registered
    const user = await User.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      const createUser = await User.create({
        email,
        userName,
        password,
      });

      if (createUser) {

        const token = jwt.sign({ userId: user._id }, process.env.JWTSecret, {
          expiresIn: "1d",
        });

        res.status(201).json({
          sts: "01",
          msg: "User created successfully.",
          email: createUser.email,
          userName: createUser.userName,
          access_token: token,
        });

      } else {

        res.status(400);
        throw new Error("Account creation failed!");
        
      }
    }
  }
});

// POST: Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  } else {
    // Look for the user in DB
    const user = await User.findOne({ email });

    if (user) {
      if (await user.matchPassword(password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWTSecret, {
          expiresIn: "1d",
        });

        if (token) {
          res.status(200).json({
            sts: "01",
            msg: "Success",
            email: user.email,
            userName: user.userName,
            access_token: token,
          });
        } else {
          res.status(400);
          throw new Error("Token sign failed!");
        }
      } else {
        res.status(400);
        throw new Error("Password doesn't match!");
      }
    } else {
      res.status(404);
      throw new Error("User not found, Check your credentials!");
    }
  }
});
