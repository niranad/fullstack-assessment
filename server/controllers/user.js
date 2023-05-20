import PatientModel from '../models/patient.js';
import jwt from 'jsonwebtoken';
import customEnv from 'custom-env';
import bcrypt from 'bcrypt';

customEnv.env(true);

const { IWS_SECRET } = process.env;

export const loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await PatientModel.findOne({ email }).lean();

    if (!user) {
      res.status(404).json({ error: 'User does not exist. Try signing up' });
    }
    // compare password entered by user with the encrypted version in db
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(user, IWS_SECRET, {
        expiresIn: String(30 * 24) + 'h',
        algorithm: 'SHA512',
      });

      if (rememberMe) {
        res.cookie('iwsUserSession', token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          signed: true,
        });
      }
      res.status(200).json({ message: 'Signed in' });
    } else {
      res.status(400).json({ message: 'Invalid password or username' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong from our end' });
  }
};

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, retypedPassword } = req.body;

  try {
    // check if user already exists
    const user = await PatientModel.findOne({ email }).lean();

    if (user) {
      res.status(400).json({ error: 'User already exists. Try sign in' });
    }

    const passwordMatch = password === retypedPassword;

    if (passwordMatch) {
      // hash password and store in db along with other user data
      const saltRounds = 12;
      const hash = await bcrypt.hash(password, saltRounds);

      await PatientModel.create({
        name: `${firstName} ${lastName}`,
        email,
        password: hash,
      });
      
      res.status(200).json({message: 'User account created. Proceed to sign in'});
    }

    res.status(400).json({message: "Password don't match"});
  } catch (error) {
    res.status(500).json({error: "Something went wrong from our end"});
  }
};
