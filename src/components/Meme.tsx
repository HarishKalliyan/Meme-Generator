import React, { ChangeEvent } from "react"

interface MemeProps {
    id: string
    name: string
    url: string
    width: number
    height: number
    box_count: number
    caption: number
}

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        lefttext: "",
        righttext: "",
        bottomText: "",
        midTopText: "",
        midBotText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState<MemeProps[]>([])
    
    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />

                
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    placeholder="Mid Top text"
                    className="form--input"
                    name="midTopText"
                    value={meme.midTopText}
                    onChange={handleChange}
                />
                
                <input 
                    type="text"
                    placeholder="Mid Bot text"
                    className="form--input"
                    name="midBotText"
                    value={meme.midBotText}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    placeholder="Left text"
                    className="form--input"
                    name="lefttext"
                    value={meme.lefttext}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    placeholder="Right text"
                    className="form--input"
                    name="righttext"
                    value={meme.righttext}
                    onChange={handleChange}
                />
                
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <center><img src={meme.randomImage} className="meme--image" /></center>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text midTop">{meme.midTopText}</h2>
                <h2 className="meme--text lefttext">{meme.lefttext}</h2>
                <h2 className="meme--text righttext">{meme.righttext}</h2>
                <h2 className="meme--text midBot">{meme.midBotText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}