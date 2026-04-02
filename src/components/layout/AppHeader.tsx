import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

import { ROUTE_PATHS } from '../../routes'

export function AppHeader() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeView = searchParams.get('view') === 'snapshot-overview' ? 'snapshot-overview' : 'overview'
  const isOverviewPage = location.pathname === ROUTE_PATHS.root

  const handleViewChange = (view: 'overview' | 'snapshot-overview') => {
    const next = new URLSearchParams(searchParams)
    next.set('view', view)
    setSearchParams(next)
  }

  return (
    <header>
      <Navbar expand="md" className="appHeader border-bottom" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to={ROUTE_PATHS.root} className="fw-semibold">
            TrendScope
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="primary-nav" />
          <Navbar.Collapse id="primary-nav">
            {isOverviewPage ? (
              <Nav className="ms-auto align-items-md-center">
                <div className="btn-group btn-group-sm" role="tablist" aria-label="Showcase views">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === 'overview'}
                    className={`btn ${activeView === 'overview' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleViewChange('overview')}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === 'snapshot-overview'}
                    className={`btn ${activeView === 'snapshot-overview' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleViewChange('snapshot-overview')}
                  >
                    Snapshot Overview
                  </button>
                </div>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

