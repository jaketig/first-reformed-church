import { withSessionRoute } from '../../../lib/auth'

function logoutRoute(req, res, session) {
  req.session.destroy();
  res.setHeader("cache-control", "no-store, max-age=0");
  res.send({ ok: true });
}

export default withSessionRoute(logoutRoute)