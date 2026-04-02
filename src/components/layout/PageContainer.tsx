import Container from 'react-bootstrap/Container'

type Props = {
  as?: 'main' | 'div' | 'section'
  className?: string
  children: React.ReactNode
}

export function PageContainer({ as, className, children }: Props) {
  return (
    <Container as={as} className={className}>
      {children}
    </Container>
  )
}

