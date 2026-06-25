import type { Event } from '@strapi/database/dist/lifecycles/types'
import { errors } from '@strapi/utils'

export default {
  async beforeCreate(event: Event) {
    const { data } = event.params
    if (!data.isbn) return

    const existing = await strapi.db.query('api::book.book').findOne({
      where: { isbn: data.isbn },
    })

    if (existing) {
      throw new errors.ApplicationError(`A book with ISBN ${data.isbn} already exists.`)
    }
  },

  async beforeUpdate(event: Event) {
    const { data, where } = event.params
    if (!data.isbn) return

    const existing = await strapi.db.query('api::book.book').findOne({
      where: { isbn: data.isbn },
    })

    if (existing && existing.id !== where.id) {
      throw new errors.ApplicationError(`A book with ISBN ${data.isbn} already exists.`)
    }
  },
}
