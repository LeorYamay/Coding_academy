
import { utilService } from '../services/util.service.js'
const { useState, useRef, useEffect } = React
export function SeasonClock() {

    const [isDark, setIsDark] = useState(false)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])
    const getSeasonByMonth = (date) => {
        const seasonNames = ['Winter', 'Spring', 'Summer', 'Fall']
        return seasonNames[Math.floor(((date.getMonth() + 11) % 12) / 3)]
    };
    return (
        <header className="season-clock-component">
            <section className={`season-clock-container ${isDark ? 'darkseason' : 'lightseason'} `}>
                <h1>{`${utilService.getMonthName(date)} (${getSeasonByMonth(date)})`}</h1>
                <button onClick={() => setIsDark(!isDark)} >
                    <img src={`../assets/img/${getSeasonByMonth(date)}.png`} alt="Button Image"></img>
                </button>
                <h2>{utilService.getDayName(date, 'en-US')}</h2>
            </section>
        </header>
    )
}