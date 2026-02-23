/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.on('/').render('pages/home')
router.get('/registrer', [UsersController, 'showRegister'])
router.post('/registrer', [UsersController, 'store'])
