import { Route, Routes } from 'react-router-dom'
import { MyBooks } from '../pages/MyBooks'
import { Wishlist } from '../pages/Wishlist'
import { Path } from '../utils/paths'

export const Routing = () => {
  return (
    <main className="mx-auto max-w-[1600px] px-8 py-10">
      <Routes>
        <Route path={Path.MY_BOOKS} element={<MyBooks />} />
        <Route path={Path.WISHLIST} element={<Wishlist />} />
      </Routes>
    </main>
  )
}
