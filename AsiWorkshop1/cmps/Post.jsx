


// export function Post(title,content,pictureUrl,onClick) {
export function Post({title, content, pictureUrl}) {
    const onClick = () => { console.log("selected continue reading") }
    return (
        <section className="post-container">
            <img src={pictureUrl} className="post-image" />
            <div className="post-text-container">
                <div className="post-title">{title}</div>
                <div className="post-content">{content}</div>
                <div className="post-button" onClick={onClick}>Continue Reading<span className="hidden-arrow">→</span></div>
            </div>
        </section>
    )
}
