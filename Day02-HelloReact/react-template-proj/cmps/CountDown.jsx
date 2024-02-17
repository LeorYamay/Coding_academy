
import { utilService } from '../services/util.service.js'
const { useState, useRef, useEffect } = React
export function CountDown({ startFrom, onDone, toTime = null }) {

    const toTimeValue = (toTime-Date.now()) / 1000
    const [counter, setCounter] = useState(toTime ? toTimeValue : startFrom )
    const [audioLoaded, setAudioLoaded] = useState(false);
    // counter in seconds
    useEffect(() => {
        if (counter>0){
            const intervalId = setInterval(() => {
                setCounter((counter) => counter - 1)
            }, 1000)
            return () => {
                if (false) {
                    onDone();
                }
                clearInterval(intervalId)
            }
        }
        else
        {
            if (onDone){
                onDone();
            }
            if (audioLoaded) {
                sound.play();
            }
        }
    }, [counter])

    useEffect(() => {
        sound.addEventListener('canplay', () => {
          setAudioLoaded(true);
        });
      
        return () => {
          sound.removeEventListener('canplay', () => {
            setAudioLoaded(false);
          });
        };
      }, []);

    const sound = new Audio('../assets/audio/mixkit-click-balloon-small-burst-3070.wav')
    const formattedTime = (counter) => {
        //todo fix issue with onDone
        const hours = counter/(60*60);
        const minutes = (hours-Math.floor(hours))*60;
        const seconds = (minutes - Math.floor(minutes))*60 +1;

        const secondsClass = seconds < 6 ? 'red-counter' : '';
        const formattedTime = <div>
            <span>{`${Math.floor(hours)}:`}</span>
            <span>{`${Math.floor(minutes)}:`}</span>
            <span className={secondsClass}>{`${Math.floor(seconds)}`}</span>
            </div>

        return formattedTime;
    }
    const seconds = (counter) =>{
        const secondsClass = counter < 6 ? 'red-counter' : '';
        
        return <div>
            <p className={secondsClass}>{`${counter}`}</p>
        </div>
    }
    return (
        <header className="count-down component">
            <section className={`count-down-container`}>
            {toTime?formattedTime(counter):seconds(counter)}
            </section>
        </header>
    )
}