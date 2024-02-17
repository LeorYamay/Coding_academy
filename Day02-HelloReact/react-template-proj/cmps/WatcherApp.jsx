
import { utilService } from '../services/util.service.js'
const { useState, useRef, useEffect } = React

export function WatcherApp() {

    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        setWatchers([{ id: 'w101', fullname: 'Puki Ba', movies: ['Rambo', 'Rocky'] }, { id: 'y101', fullname: 'Juki Ma', movies: ['Rambo', 'Rocky'] }])
    }, [])
    const onSelectWatcher = (watcherid) => {
        const selected = watchers.find(watcher => watcher.id === watcherid)
        setSelectedWatcher(selected);
    }
    const onDeleteWatcher = (watcherid) => {
        const updatedWatchers = watchers.filter(watcher => watcher.id !== watcherid);
        setWatchers(updatedWatchers);
    }
    const addWatcher = () => {
        const watcher = {};
        let fullname = prompt("What is your fullname?")
        if (fullname) {
            watcher.fullname = fullname
            let movies = prompt("what are your movies. (comma seperated)")
            if (movies) {
                watcher.movies = movies.split(",")
                watcher.id = utilService.makeId()
                const newWatchers = watchers.concat(watcher)
                setWatchers(newWatchers)
            }
        }
    }
    const onCloseModal = () => {
        setSelectedWatcher(null)
    }
    return (
        <header className="watcher-app-component">
            <section className="watcher-app-container">
                <button onClick={() => addWatcher()}>Add Watcher</button>
                <div className="watchers-container">
                    {watchers.map(watcher => <Watcher key={watcher.id} watcher={watcher} onSelectWatcher={onSelectWatcher} onDeleteWatcher={onDeleteWatcher} />)}
                </div>
                {selectedWatcher && <WatcherDetailsModal watcher={selectedWatcher} onCloseModal={onCloseModal} />}
            </section>
        </header>
    )
}

export function Watcher({ watcher, onSelectWatcher, onDeleteWatcher }) {
    return (
        <div className="watcher">
            {/* <div>{`id:${watcher.id}`}</div> */}
            <div>{`${watcher.fullname}`}</div>
            <button onClick={() => onSelectWatcher(watcher.id)}>Select </button>
            <button onClick={() => onDeleteWatcher(watcher.id)}>X</button>
            {/* <div>{`movies:${watcher.movies.join(",")}`}</div> */}
        </div>
    )
}

export function WatcherDetailsModal({ watcher, onCloseModal }) {
    return (
        <ul className="watcher-details-modal">
            <li>{`id:${watcher.id}`}</li>
            <li>{`fullname:${watcher.fullname}`}</li>
            <li>{`movies:${watcher.movies.join(",")}`}</li>
            <button onClick={() => onCloseModal()}>Close</button>
        </ul>
    )
}