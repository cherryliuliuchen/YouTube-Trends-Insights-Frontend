import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { QueryProvider } from './providers/QueryProvider'
import { AppRouterProvider } from './providers/RouterProvider'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRouterProvider />
    </QueryProvider>
  </React.StrictMode>,
)

