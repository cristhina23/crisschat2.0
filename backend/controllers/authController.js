import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
    try {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      if (!fullName || !email) {
        return res
          .status(400)
          .json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // create user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
      
      if(newUser) {
        // generate token
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(200).json({ 
          message: "User created successfully",
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
          
         });
      } else {
        res.status(400).json({ message: "User not created" });
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const login = async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await User.findOne({email}).select("+password");

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // generate token
      generateToken(user._id, res);

      res.status(200).json({ 
        message: "User logged in successfully",
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
       });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const logout = (req, res) => {
    try {
     res.cookie("jwt", "", {  maxAge: 0 });
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const updateProfile (req, res) => {
    
  }