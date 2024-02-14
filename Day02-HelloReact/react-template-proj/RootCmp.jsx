
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AnimalList } from "./cmps/animalList.jsx"
import { SeasonClock } from "./cmps/SeasonClock.jsx"


export function RootCmp() {
    const animalInfos = [ {type: 'Malayan Tiger', count: 787}, {type: 'Mountain Gorilla', count: 212}, {type: 'Fin Whale', count: 28}, ]
    return (
        <section className="app main-layout">
            <AppHeader />
            <main>
                <main>
                    {/* <Home /> */}
                    <AnimalList animals={animalInfos}/>
                    <SeasonClock/>
                </main>
            </main>
        </section>

    )
}