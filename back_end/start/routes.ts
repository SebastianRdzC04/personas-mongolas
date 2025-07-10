/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import PeopleController from '#controllers/people_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
}).use(middleware.auth({guards: ['api']}))

router.get('/me', async ({ auth }) => {
  const user = await auth.authenticate()
  return { usuario: user}
})

router.post('/login', [AuthController, 'login'])

router.post('/register', [AuthController, 'register'])

router.post('/logout', [AuthController, 'logout'])



router.get('/people', [PeopleController, 'index']).use(middleware.auth({guards: ['api']}))

router.get('/people/logs', [PeopleController, 'viewLogs']).use(middleware.auth({guards: ['api']}))

router.get('/people/:id', [PeopleController, 'show']).use(middleware.auth({guards: ['api']}))

router.post('/people', [PeopleController, 'store']).use(middleware.auth({guards: ['api']}))

router.put('/people/:id', [PeopleController, 'update']).use(middleware.auth({guards: ['api']}))

router.delete('/people/:id', [PeopleController, 'destroy']).use(middleware.auth({guards: ['api']}))




