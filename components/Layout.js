import Header from './Header'
import Footer from './Footer'

const emptyLayout = ({children}) => {
  return <>{children}</>
}

export default function Layout({ Component, children }) {
  const NestedLayout = Component.Layout || emptyLayout;
  const hasHero = Component.HasHero || false;

  return (
    <>
      <Header hasHero={hasHero} />
      <NestedLayout>
        <main>{children}</main>
      </NestedLayout>
      <Footer />
    </>
  )
}

