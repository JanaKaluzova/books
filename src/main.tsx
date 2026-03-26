import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1500} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <App />
        </SnackbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
