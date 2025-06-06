import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/userModel.js';

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google Token
    const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const { email, name } = googleResponse.data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, password: null });
      await user.save();
    }

    // Generate JWT Token
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token: authToken });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};

export default googleLogin;
