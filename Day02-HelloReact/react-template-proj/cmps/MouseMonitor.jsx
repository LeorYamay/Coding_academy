const { useState, useEffect } = React


export function MouseMonitor() {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [paused, setPaused] = useState(false)
    useEffect(() => {
        if (!paused){
            document.onmousemove = (ev) => {
                setPos({ x: ev.clientX, y: ev.clientY })
            }
        }
        else{
            document.onmousemove = null
        }
        return () => {
            document.onmousemove = null
        }
    }, [paused])

    return(
    <header className="mouse-monitor-component">
        <section className="mouse-monitor-container">
            <h1>Mouse position</h1>
            {!paused &&<span>x:{pos.x}y:{pos.y}</span>}
            <button onClick={()=>setPaused(!paused)}>{`${paused?'Resume':'Pause'}`}</button>
        </section>
    </header>
    )
}