
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { AppPosts } from "./cmps/AppPosts.jsx"

export function RootCmp() {
    return (
        <section >
            <AppHeader />
            <AppPosts />
            <AppFooter />
        </section>

    )
}