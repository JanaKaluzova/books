import { ApolloProvider } from '@apollo/client/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { apolloClient } from './lib/apolloClient'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <App />
          </SnackbarProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
