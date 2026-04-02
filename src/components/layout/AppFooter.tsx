import Container from 'react-bootstrap/Container'

export function AppFooter() {
  return (
    <footer className="appFooter border-top mt-4 mt-lg-5">
      <Container className="py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <div className="fw-semibold">TrendScope Analytics Showcase</div>
            <p className="text-body-secondary mb-0 small">
              Built with React, TypeScript, and reusable data visualization
              components.
            </p>
          </div>
          <div className="small text-body-secondary">
            <div>Data preview for demonstration purposes.</div>
            <div>Links and methodology will be added in a future step.</div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

