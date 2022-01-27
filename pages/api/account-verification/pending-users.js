import dbConnect from '../../../lib/dbConnect'
import User from "../../../models/User";
import {withSessionRoute} from "../../../lib/auth/IronSessionConfig";

async function PendingUsers(req, res) {
  //connect to mongo
  await dbConnect();

  try {

    console.log(req.session)
    //authorization
    if (!(req?.session?.user?.roles || []).includes('admin')) {
      return res.status(401).json({success:false, message: 'Unauthorized - Missing Role' })
    }

    //retrieve announcements
    if (req.method === 'GET') {

      //get list of events
      const pendingUsers = await User.find({
        roles: {$size: 0}
      }).lean()

      res.json(pendingUsers)
    }
    else {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err)
    res.status(500);
    return res.json({success: false, message: err.message});
  }
}

export default withSessionRoute(PendingUsers)