const { useState, useRef, useEffect } = React

export function WatcherApp() {

    const [watchers, setWatchers] = useState([]) 
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        setWatchers([{ id: 'w101', fullname : 'Puki Ba', movies: ['Rambo', 'Rocky'] },{ id: 'y101', fullname : 'Puki Ba', movies: ['Rambo', 'Rocky'] } ])
    }, [])
    const onSelectWatcher =(watcherid) =>
    {
        const selected = watchers.find(watcher => watcher.id === watcherid)
        setSelectedWatcher(selected);
    }
    return (
        <header className="watcher-app-component">
            <section className="watcher-app-container">
                {watchers.map(watcher => <Watcher key = {watcher.id} watcher={watcher} onSelectWatcher={onSelectWatcher}/>)}
                {/* <Watcher watcher={watcher}/> */}
                {selectedWatcher && <WatcherDetailsModal watcher={selectedWatcher}/>}
            </section>
        </header>
    )
}

export function Watcher({watcher,onSelectWatcher}) {
    return (
        <div className="watcher">
            {/* <div>{`id:${watcher.id}`}</div> */}
            <div>{`fullname:${watcher.fullname}`}</div>
            <button onClick={()=>onSelectWatcher(watcher.id)}/>
            {/* <div>{`movies:${watcher.movies.join(",")}`}</div> */}
        </div>
    )
}

export function WatcherDetailsModal({watcher}) {
    return (
        <div className="watcher-details-modal">
            <div>{`id:${watcher.id}`}</div>
            <div>{`fullname:${watcher.fullname}`}</div>
            <div>{`movies:${watcher.movies.join(",")}`}</div>
        </div>
    )
}