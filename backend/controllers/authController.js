import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
    try {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
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
      
      if(newUser)
      

      
    } catch (error) {
      console.log(error);
    }
  };
  
  export const login = (req, res) => {
    res.send('login Route');
  };
  
  export const logout = (req, res) => {
    res.send('logout Route');
  };