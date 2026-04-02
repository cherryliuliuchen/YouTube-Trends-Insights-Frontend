import { Outlet } from 'react-router-dom'

import { AppFooter } from '../components/layout/AppFooter'
import { AppHeader } from '../components/layout/AppHeader'
import { PageContainer } from '../components/layout/PageContainer'

export function App() {
  return (
    <div className="appShell">
      <AppHeader />
      <PageContainer as="main" className="py-4 py-lg-5">
        <Outlet />
      </PageContainer>
      <AppFooter />
    </div>
  )
}

