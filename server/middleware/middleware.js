const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const validUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, 'Expense');
    const userEmail = decodedToken.user;
    
    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = {
      userID: user.id,
      userEmail: user.email,
      userName: user.name,
    };

    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  validUser,
};
