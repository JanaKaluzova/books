import { Header } from './components/Header/Header'
import { BookModalProvider } from './context/BookModalContext'
import { Routing } from './router/Routes'

function App() {
  return (
    <BookModalProvider>
      <div className="min-h-screen bg-surface-50 text-text-primary">
        <Header />
        <Routing />
      </div>
    </BookModalProvider>
  )
}

export default App
