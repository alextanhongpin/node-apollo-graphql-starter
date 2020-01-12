import jwt from 'jsonwebtoken'

export const decodedToken = (req, requireAuth = true) => {
  console.log(req.headers)
  const header = req.headers.authorization
  if (!header) {
    return {}
    // throw new Error('authorization header is required')
  }
  const token = header.replace(/bearer\s/i, '')
  const decoded = jwt.verify(token, 'supersecret')
  return decoded
}
