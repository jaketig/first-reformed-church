import dbConnect from '../../lib/dbConnect'

export default async function Announcements(req, res) {
  //connect to mongo
  await dbConnect();

  try {
    //retrieve announcements
    if (req.method === 'GET') {

    }
    //update announcements
    else if (req.method === 'PATCH') {

    }
    else {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500);
    return res.json({success: false, itemsUpdated: 0});
  }
}