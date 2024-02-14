
import { utilService } from '../services/util.service.js'
const { useState, useRef, useEffect } = React
export function SeasonClock({ }) {
    
    const [isDark, setIsDark] = useState(false)
    const [date, setDate] = useState(new Date())
    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [])

    return (
        <header className="season-clock-component">
            <section className={`season-clock-container ${isDark ? 'darkseason' : 'lightseason'} `}>
                <h1>{utilService.getMonthName(date)}</h1>
                <button onClick={() => setIsDark(!isDark)} >

                </button>
                <h2>{utilService.getDayName(date, 'en-US')}</h2>
            </section>
        </header>
    )
}