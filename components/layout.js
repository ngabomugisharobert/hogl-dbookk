// components/layout.js

import NavScrll from './navbar'
import Footer from './footer'

export default function Layout({ children, activeNav }) {
    return (
        <>
            <NavScrll activeNav={activeNav} />
            <>{children}</>
            <Footer />
        </>
    )
}