import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // we don't save the real password but the hashed one
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 400), //random value to simplify things
      impressions: Math.floor(Math.random() * 400),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // we send a success status of 201 to the front end to say that the user was created succesfully
  } catch (err) {
    res.status(500).json({ error: err.message }); // when something goes wrong with error msg whtever mongodb creates
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }); // mongodb functions
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
