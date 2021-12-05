import { withSessionRoute } from '../../../lib/auth/IronSessionConfig'
import bcrypt from 'bcrypt'
import User from '../../../models/User'
import dbConnect from '../../../lib/dbConnect'

async function loginRoute(req, res) {
  await dbConnect();

  try {
    const user = await User.findOne({email: req.body.email})

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {

      if (user) {
        user.failedLoginAttemps += 1;
        await user.save();
      }

      return res.status(403).json({ message: "Invalid username or password"})
    }

    user.failedLoginAttemps = 0;
    user.lastLogin = new Date();
    await user.save();

    delete user.password;

    req.session.user = user
    await req.session.save()
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export default withSessionRoute(loginRoute)