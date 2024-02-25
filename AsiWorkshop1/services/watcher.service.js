import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const WATCHER_KEY = 'watcherDB'
_createWatchers()

export const watcherService = {
    query,
    get,
    remove,
    save,
    getEmptyWatcher: getEmptyWatcher,
    getDefaultFilter,
}
// For Debug (easy access from console):
// window.cs = carService
 function query(filterBy = {}) {
    return storageService.query(WATCHER_KEY)
        //     .then(watchers => {
        //     if (filterBy.fullname) {
        //         const regExp = new RegExp(filterBy.fullname, 'i')
        //         watchers = watchers.filter(watcher => regExp.test(watcher.fullname))
        //     }

        //     if (filterBy.movies) {
        //         watchers = watchers.filter(watcher => watcher.movies == filterBy.movies)
        //     }
        //     console.log(watchers)
        //     return watchers
        // })
}

function get(watcherId) {
    return storageService.get(WATCHER_KEY, watcherId)
}

function remove(watcherId) {
    return storageService.remove(WATCHER_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(WATCHER_KEY, watcher)
    } else {
        return storageService.post(WATCHER_KEY, watcher)
    }
}

function getEmptyWatcher(fullname = '', movies = []) {
    return { fullname, movies }
}

function getDefaultFilter(filterBy = { fullname: '', movies: [] }) {
    return { fullname: filterBy.fullname, movies: filterBy.movies }
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(WATCHER_KEY)
    if (!watchers || !watchers.length) {
        watchers = []
        const names = ['puki ma', 'muki ja', 'cookie ya', 'mitsu ba', 'suki la', 'niki ta', 'luki pa', 'dookie sa', 'zuki ka', 'fuki ga']
        const moviesList = ['movie1', 'movie2', 'movie3', 'movie4', 'movie5', 'movie6', 'movie7', 'movie8', 'movie9', 'movie10'];

        function getRandomSubset(movies) {
            const subsetSize = Math.floor(Math.random() * (movies.length + 1)); // Random size between 0 and the size of the array
            const shuffledMovies = movies.sort(() => Math.random() - 0.5);
            return shuffledMovies.slice(0, subsetSize);
        }
        for (let i = 0; i < 6; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            watchers.push(_createWatcher(name, [getRandomSubset(moviesList)]))
        }
        utilService.saveToStorage(WATCHER_KEY, watchers)
    }
}

function _createWatcher(name, movies) {
    const watcher = getEmptyWatcher(name, movies)
    watcher.id = utilService.makeId()
    return watcher
}
