
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { AppPosts } from "./cmps/AppPosts.jsx"

export function RootCmp() {
    return (
        <body className="app-container">
            <AppHeader />
            <AppPosts />
            <AppFooter />
        </body>

    )
}