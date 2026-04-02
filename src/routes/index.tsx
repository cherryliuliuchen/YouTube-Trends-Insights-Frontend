import { createBrowserRouter } from 'react-router-dom'

import { App } from '../app/App'
import { AnalyticsShowcasePage } from '../pages/AnalyticsShowcasePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TestConnectionPage } from '../pages/TestConnectionPage'

export const ROUTE_PATHS = {
  root: '/',
  devTest: '/dev/test',
} as const

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.root,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <AnalyticsShowcasePage />,
      },
      {
        path: ROUTE_PATHS.devTest,
        element: <TestConnectionPage />,
      },
    ],
  },
])

