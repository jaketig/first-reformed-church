import { withSessionRoute } from '../../../lib/auth'

async function loginRoute(req, res) {
  const { email, password } = await req.body

  try {
    //todo verify user in mongo

    const user = {
      isLoggedIn: true,
      email: email
    }

    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default withSessionRoute(loginRoute)