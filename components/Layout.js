import Header from './Header'
import Footer from './Footer'

const emptyLayout = ({children}) => {
  return <>{children}</>
}

export default function Layout({ Component, children }) {
  const NestedLayout = Component.Layout || emptyLayout;

  return (
    <>
      <Header />
      <NestedLayout>
        <main>{children}</main>
      </NestedLayout>
      <Footer />
    </>
  )
}

