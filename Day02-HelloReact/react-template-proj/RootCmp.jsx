
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AnimalList } from "./cmps/animalList.jsx"
import { SeasonClock } from "./cmps/SeasonClock.jsx"
import { CountDown } from "./cmps/CountDown.jsx"
import { WatcherApp } from "./cmps/WatcherApp.jsx"
import { MouseMonitor } from "./cmps/MouseMonitor.jsx"

export function RootCmp() {
    const animalInfos = [ {type: 'Malayan Tiger', count: 787}, {type: 'Mountain Gorilla', count: 212}, {type: 'Fin Whale', count: 28}, ]
    return (
        <section className="app main-layout">
            <AppHeader />
                <main>
                    {/* <Home /> */}
                    {/* <AnimalList animals={animalInfos}/>
                    <SeasonClock/>
                    <CountDown startFrom={10} onDone = {()=>{console.log("done")}} />
                    <CountDown toTime={Date.now() + 10*1000} onDone={()=>{ console.log('Its Time!') }} /> */}
                    <WatcherApp/>
                    <MouseMonitor/>
                </main>
        </section>

    )
}