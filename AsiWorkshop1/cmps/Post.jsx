


// export function Post(title,content,pictureUrl,onClick) {
export function Post() {
    const title = "LeorTitle"
    const content = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo doconsequat, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..."
    const picURL = "pic"
    const onClick = ()=>{console.log("selected continue reading")}
    return (
            <section className="post-container">
            <img src={picURL} className="postimage" />
            <div className="post-title">{title}</div>
            <div className="post-content">{content}</div>
            <div className="post-button" onClick={onClick}>Continue Reading</div>
            </section>
    )
}
