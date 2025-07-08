import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async register({ request, response, auth}: HttpContext){
    const data = request.all()
    const payload = await registerUserValidator.validate(data)
    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password
    })
    response.created({
      message: 'User created successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email, 
      },
    })
  }

  async login({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await loginUserValidator.validate(data)

    const user = await User.verifyCredentials(payload.email, payload.password)
  

    const token = await auth.use('api').createToken(user)
    return response.ok({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token: token,
    })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({
      message: 'Logout successful',
    })
  }
}