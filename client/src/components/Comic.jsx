import React, {useState, useEffect} from 'react'
import arrow from "../img/arrow.png"
import axios from 'axios';

function Comic() {

    const [comic, setComic] = useState({})
    const [count, setCount] = useState(1)
    const [isTranscript, setIsTranscript] = useState(false)

    useEffect(() => {
        const fetchComic = async() => {
            const url = `/api/${count}`
            const response = await axios.get(url)
            console.log(response.data)
            setComic(response.data)
        }
        fetchComic();
    }, [count])

    const random = () => {
        const rand = parseInt(Math.random() * (599) + 1)
        console.log(rand)
        setCount(rand)
    }

    return (
        <div className="comic">
            <div className="comic__background"></div>
            <div className="comic__strip-container">
                <div className="comic__strip-info">
                    <h3 className="date">{comic.day}/{comic.month}/{comic.year}</h3>
                    <h1 className="title">{comic.title}</h1>
                    <h3 className="views">Views: {comic.view_count}</h3>
                </div>
                <div className="comic__strip-buttons random">
                    <div className="comic__strip-button" onClick={() => random()}>
                        <a href="#/">Random</a>
                    </div>
                    <div className="comic__strip-button transcript" onClick={() => setIsTranscript(!isTranscript)}>
                        <a href="#/">Transcript</a>
                    </div>
                </div>
                <div className="comic__strip-content">
                    <div className="comic__btn comic__btn-left" onClick={() => {setCount(count-1);}}>
                        <img src={arrow} alt="arrow"></img>
                    </div>
                    <div className={`comic__img-container`}>
                        <img src={comic.img} alt={comic.alt} className={`comic__img`}></img>
                    </div>
                    <div className="comic__btn comic__btn-right" onClick={() => {setCount(count+1);}}>
                        <img src={arrow} alt="arrow"></img>
                    </div>
                </div>
                <div className={`comic__strip-transcript ${isTranscript ? 'toggleTranscript' : 'removeTranscript'}`}>
                    <p>{`${comic.transcript}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Comic
