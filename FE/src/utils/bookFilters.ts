export const PAGE_SIZE = 20

export const buildBookFilters = (isWishlist: boolean, search: string) => ({
  isWishlist: { eq: isWishlist },
  ...(search.trim()
    ? {
        or: [{ title: { containsi: search } }, { author: { containsi: search } }],
      }
    : {}),
})
