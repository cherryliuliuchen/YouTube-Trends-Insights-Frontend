import Badge from 'react-bootstrap/Badge'

type Props = {
  countriesCount?: number
  categoriesCount?: number
}

export function HeroSection({ countriesCount, categoriesCount }: Props) {
  return (
    <section className="heroSurface p-4 p-lg-5 mb-4 mb-lg-5" aria-labelledby="hero-title">
      <Badge bg="light" text="dark" className="border mb-3">
        Analytics Showcase
      </Badge>
      <h1 id="hero-title" className="display-6 fw-semibold mb-3">
        Explore global YouTube trends in a clean, interactive view
      </h1>
      <p className="lead mb-2 text-body-secondary">
        A product-style analytics homepage focused on trend discovery and
        comparison across countries, categories, and time ranges.
      </p>
      <p className="mb-0 text-body-secondary">
        This shell is intentionally structured for progressive loading, reusable
        chart modules, and fast filter-driven iteration.
      </p>
      {countriesCount != null && categoriesCount != null ? (
        <p className="mb-0 mt-3 small text-body-secondary">
          Tracking {countriesCount} countries and {categoriesCount} categories.
        </p>
      ) : null}
    </section>
  )
}

