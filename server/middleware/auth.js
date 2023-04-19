import jwt from 'jsonwebtoken';
//jsonwebtoken is used for authorization but not authentication
//Authentication verifies the identity of a user or service, and authorization determines their access rights
// session a memory inside the server where we save our user and then creates a unique id to it which has the info abt this user
// in the session and this id is sent to the browser as a cookie which it saves
// in jwt the server does not store the user but the jwt has the information about the user signed with a secret key which is sent to the browser
// user info is stored in the client and the server does not have to remember anything
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
