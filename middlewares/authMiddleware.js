const admin = require('firebase-admin')
require('dotenv').config()

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii')
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1]

  if (!token) return res.status(401).send('No token provided')

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    const user = await admin.auth().getUser(decodedToken.uid); // Fetch user details
    console.log("Decoded token: ", decodedToken);
    console.log("User: ", user);
    req.user = user;
    
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' })
  }
}

module.exports = authMiddleware
