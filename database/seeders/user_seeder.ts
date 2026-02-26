import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const email = 'alphanwina@outlook.com'
    const password = 'admin1234'
    const user = await User.findBy('email', email)

    if (user) {
      user.merge({ name: 'ALPHAN WINA WINA', password })
      await user.save()
    } else {
      await User.create({
        name: 'ALPHAN WINA WINA',
        email,
        password,
      })
    }

    const savedUser = user ?? (await User.findByOrFail('email', email))

    const existingRole = await savedUser.related('role').query().first()
    if (existingRole) {
      existingRole.merge({ name: 'ADMIN' })
      await existingRole.save()
    } else {
      await savedUser.related('role').create({
        name: 'ADMIN',
      })
    }
  }
}