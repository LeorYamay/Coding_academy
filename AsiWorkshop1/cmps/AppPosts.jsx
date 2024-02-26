import { Post } from "./Post.jsx"
import { NextPrevBar } from "./NexPrevBar.jsx"
export function AppPosts() {

    return (
        <main className="posts-container">
            <Post
                title="Duis aute irure dolor in henderit in voluptate."
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo doconsequat, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..."
                pictureUrl="../assets/img/image1.png"
            />
            <Post
                title="Duis aute irure dolor in henderit in voluptate."
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo doconsequat, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..."
                pictureUrl="../assets/img/image2.png"
            />
            <Post
                title="Duis aute irure dolor in henderit in voluptate."
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo doconsequat, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..."
                pictureUrl="../assets/img/image3.png"
            />
            <NextPrevBar/>
        </main>
    )
}