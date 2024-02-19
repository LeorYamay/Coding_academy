
import { utilService } from '../services/util.service.js'
import { watcherService } from '../services/watcher.service.js'

const { useState, useRef, useEffect } = React

export function WatcherApp() {

    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(null)
    const getWatchers = async () => {
        const tempWatchers = await watcherService.query()
        return tempWatchers
    }
    async function asyncFetchWatchers() {
        const wats = await watcherService.query()
        setWatchers(wats)
    }
    useEffect(() => {

        asyncFetchWatchers()
    }, [])
    const onSelectWatcher = async (watcherid) => {
        const selected = await watcherService.get(watcherid)
        setSelectedWatcher(selected);
    }
    const onDeleteWatcher = async (watcherid) => {
        await watcherService.remove(watcherid)
        asyncFetchWatchers()
    }
    const addWatcher = async () => {
        const watcher = {};
        let fullname = prompt("What is your fullname?")
        if (fullname) {
            watcher.fullname = fullname
            let movies = prompt("what are your movies. (comma seperated)")
            watcher.movies = movies.split(",")
            // watcher.id = utilService.makeId()
            // const newWatchers = watchers.concat(watcher)
            // setWatchers(newWatchers)
            await watcherService.save(watcher)
            asyncFetchWatchers()
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
                    {
                        watchers.map(
                            watcher =>
                                <Watcher key={watcher.id} watcher={watcher} onSelectWatcher={onSelectWatcher} onDeleteWatcher={onDeleteWatcher} />)
                    }
                </div>
                {selectedWatcher && <WatcherDetailsModal watcher={selectedWatcher} onCloseModal={onCloseModal} />}
            </section>
        </header>
    )
}
const getNumberFromString = (inputString) => {
    let result = 1
    if (inputString) {
        let sum = inputString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        result = (sum % 4) + 1;
    }
    return result;
}
export function Watcher({ watcher, onSelectWatcher, onDeleteWatcher }) {

    const setNumber = getNumberFromString(watcher.id)
    return (
        <div className="watcher">
            {/* <div>{`id:${watcher.id}`}</div> */}
            <img src={`https://robohash.org/${watcher.id}?set=set${setNumber}`} />
            <div>{`${watcher.fullname}`}</div>
            <button onClick={() => onSelectWatcher(watcher.id)}>Select </button>
            <button onClick={() => onDeleteWatcher(watcher.id)}>X</button>
            {/* <div>{`movies:${watcher.movies.join(",")}`}</div> */}
        </div>
    )
}

export function WatcherDetailsModal({ watcher, onCloseModal }) {
    const setNumber = getNumberFromString(watcher.id)
    return (
        <ul className="watcher-details-modal">
            <li>{`id:${watcher.id}`}</li>
            <img src={`https://robohash.org/${watcher.id}?set=set${setNumber}`} />
            <li>{`fullname:${watcher.fullname}`}</li>
            <li>{`movies:${watcher.movies.join(",")}`}</li>
            <button onClick={() => onCloseModal()}>Close</button>
        </ul>
    )
}