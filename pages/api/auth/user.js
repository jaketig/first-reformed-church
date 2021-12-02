import { withSessionRoute } from '../../../lib/auth'
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

async function userRoute(req, res) {
  await dbConnect();

  if (req.session.user) {

    const user = await User.findById(req.session.user._id).lean()

    if (!user) {
      req.session.destroy();
      return res.json({
        isLoggedIn: false,
      })
    }

    delete user.password;

    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    return res.json({
      ...user,
      isLoggedIn: true,
    })
  }

  return res.json({
    isLoggedIn: false,
  })

}

export default withSessionRoute(userRoute)