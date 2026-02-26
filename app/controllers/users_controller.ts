import { registerValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'

// On garde ton tableau temporaire en dehors de la classe
type User = {
  id: number
  name: string
  email: string
  password: string
}
const users: User[] = []

export default class UsersController {
  /**
   * Affiche le formulaire d'inscription
   */
  async showRegister({ view }: HttpContext) {
    return view.render('pages/register')
  }
  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

  async store({ request, response, view }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)

      // 2. Création de l'objet utilisateur
      const user: User = {
        id: users.length + 1,
        name: payload.name, // Utilise les données validées
        email: payload.email,
        password: payload.password, // Attention: en prod, il faut hacher le mot de passe !
      }

      // 3. Sauvegarde en mémoire
      users.push(user)

      // 4. Réponse
      return response.redirect().toRoute('login') // Ou renvoie un JSON pour tester
      
    } catch (error) {
      // Gestion manuelle si tu ne veux pas le comportement automatique d'Adonis
      // Note: Adonis gère souvent ça tout seul si tu utilises les messages flash
      return response.status(400).send({
        message: 'Erreur de validation',
        errors: error.messages
      })
    }
  }
}