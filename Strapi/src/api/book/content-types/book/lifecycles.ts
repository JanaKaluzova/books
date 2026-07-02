import type { Event } from '@strapi/database/dist/lifecycles/types'
import { errors } from '@strapi/utils'

export default {
  async beforeCreate(event: Event) {
    const { data } = event.params
    // Strapi 5 fires beforeCreate for both draft and published rows.
    // Only check uniqueness for the published row to avoid false positives.
    if (!data.isbn || !data.publishedAt) return

    const existing = await strapi.db.query('api::book.book').findOne({
      where: { isbn: data.isbn, publishedAt: { $ne: null } },
    })

    if (existing) {
      throw new errors.ApplicationError(`A book with ISBN ${data.isbn} already exists.`)
    }
  },

  async beforeUpdate(event: Event) {
    const { data, where } = event.params
    if (!data.isbn || !data.publishedAt) return

    const existing = await strapi.db.query('api::book.book').findOne({
      where: { isbn: data.isbn, publishedAt: { $ne: null } },
    })

    if (existing && existing.id !== where.id) {
      throw new errors.ApplicationError(`A book with ISBN ${data.isbn} already exists.`)
    }
  },
}
