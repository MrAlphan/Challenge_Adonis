import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Actualite from '#models/actualite'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
declare name: string

@column()
declare email: string

@column({ serializeAs: null })
declare password: string

  @hasOne(() => Role)
  declare role: HasOne<typeof Role>

  @hasMany(() => Actualite)
  declare actualites: HasMany<typeof Actualite>
}