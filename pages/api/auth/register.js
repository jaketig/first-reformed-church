import { withSessionRoute } from '../../../lib/auth/IronSessionConfig'
import bcrypt from 'bcrypt'
import User from '../../../models/User'
import dbConnect from '../../../lib/dbConnect'


async function registerRoute(req, res) {
  await dbConnect();

  try {

    //make sure a user does not exist with this email
    if (await User.findOne({email: req.body.email}))
      return res.status(400).json({message: "An account with this email already exists!"})

    const salt = await bcrypt.genSalt(10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      roles: [],
      failedLoginAttempts: 0,
      lastLogin: new Date(),
    })

    delete user.password;

    req.session.user = user
    await req.session.save()
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export default withSessionRoute(registerRoute)